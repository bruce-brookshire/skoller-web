import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import { withRouter } from 'react-router-dom'
import PopUp from './PopUp'
import ClassStatusModal from '../../components/ClassStatusModal'
import { Cookies } from 'react-cookie'
import HomeClasses from './HomeNewClasses'
import HomeClasses1 from './HomeClasses'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Book from '../../../assets/sk-icons/Book'

import HomeTasks from './HomeTasks'
import HomeShare from './HomeShare'
import HomeJobs from './HomeJobs'
import HomeInsights from './HomeInsights'

import HomeGraphImpact from './HomeGraphImpact'
import HomeAssignments from './HomeAssignments'

import HomeAssignmentGraph from '../Insights/HomeAssignmentGraph'
import { formatDate } from '../../../utilities/time'
import PremiumClassModal from './PremiumClassModal'
import TrialClassModal from './TrialClassModal'
import ClassStatusPopUp from './_ClassStatusPopUp'
import AddAssignment from '../Assignments/AddAssignment'
@inject('rootStore') @observer
class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subscribed: false,
      subscriptionCancelled: false,
      classes: [],
      assignments: [],
      popUp: { show: false, type: null },
      // classStatusModal exists on this page because it needs to be rendered if a student logs in,
      // has only one class, and that class is not yet set up.
      classStatusModal: { show: false, cl: null },
      loading: false,
      shareWillDisplay: false,
      classModal: true,
      showTrialClassStatusModal: false,
      showAddAssignmentModal: false
    }

    this.props.rootStore.navStore.setActivePage('home')
    this.props.rootStore.navStore.location = this.props.location
    this.cookie = new Cookies()
  }

  async updateStudent () {
    if (this.cookie) {
      if (this.cookie.get('skollerToken')) {
        await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
      }
    }
  }

  async componentDidMount () {
    if (this.props.rootStore.userStore.showPopUps) {
      this.runPopUpLogic()
      this.showPrimarySchoolPopUp()
    }
  }

  async runPopUpLogic () {
    let showPopUp = false
    let type
    let student = this.props.rootStore.userStore.user.student

    /*

            if (sub=[] and trial=false){ // 30 days trial has finished
                show unremoveable pop up
            }

        */

    await actions.classes.getStudentClassesById(student.id)
      .then((classes) => {
        if (classes.length > 1) {
          showPopUp = false
          if (student.fields_of_study[0] === undefined) {
            showPopUp = true
            type = 'getMajor'
          }
        } else if (classes.length === 1) {
          let cl = classes[0]
          let id = cl.status.id
          if (id === 1100) {
            showPopUp = true
            type = 'needSyllabus'
          }
        } else if (classes.length === 0) {
          if (student.primary_school === null) {
            showPopUp = true
            type = 'needPrimarySchool'
          } else {
            showPopUp = true
            type = 'findClass'
          }
        }
      })
      .catch(() => false)
    if (this.props.rootStore.studentJobsStore.hasJobsProfile && !showPopUp) {
      if (this.props.rootStore.studentJobsStore.profile.resume_url === null) {
        showPopUp = true
        type = 'getResume'
      }
    }
    // if (this.props.rootStore.userStore.user.lifetime_trial) {
    // //   showPopUp = true
    // //   type = 'LifeTimeTrialUser'
    //   this.setState({ popUp: { type: 'LifeTimeTrialUser', show: true } })
    // }

    await actions.stripe.getMySubscription()
      .then((data) => {
        if (data.data.length > 0) {
          this.setState({ subscribed: true })
          this.setState({ subscriptionCancelled: data.data[0].cancel_at_period_end })
          if (showPopUp) {
            this.setState({ popUp: { type: type, show: true } })
          }
        } else if (data.data.length === 0 && this.props.rootStore.userStore.user.trial === false) {
          this.setState({ popUp: { type: 'PaymentPlans', show: true } })
        }
        // } else  {
        //     this.setState({ popUp: { type: 'PaymentPlans', show: true } });
        // }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async showPrimarySchoolPopUp () {
    const student = this.props.rootStore.userStore.user.student
    if (!student.primary_school || !student.primary_period) {
      this.setState({ popUp: { type: 'needPrimarySchool', show: true } })
    }
  }

  async updateClasses () {
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    this.props.rootStore.studentClassesStore.updateClasses()
    this.setState({ loading: false })
  }

  findFullClass (classId) {
    return this.props.rootStore.studentClassesStore.classes.find((cl) => cl.id === classId)
  }

  getMonthAndYearInDays (val) {
    if (val === 'week') return 7
    if (val === 'month') return 30
    else if (val === 'year') return 365
    return 0
  }

  getIntervalDate () {
    let endDate = new Date()
    console.log({
      interval: this.props.rootStore.userStore.subscriptionStartedDate
    })
    console.log({
      int: this.props.rootStore.userStore.interval
    })
    const interval = this.props.rootStore.userStore.interval
    console.log({
      str: this.getMonthAndYearInDays(interval)
    })
    let newDate = new Date(this.props.rootStore.userStore.subscriptionStartedDate * 1000)
    endDate.setDate(newDate.getDate() + this.getMonthAndYearInDays(interval))
    console.log({ endDate })
    return endDate
  }

  onClassSelect = (cl) => {
    // Need to get enrollment link from classes
    // because ClassList will not return it

    let fullClass = this.findFullClass(cl.id)
    if (fullClass.status.id < 1400) {
      if (this.props.rootStore.userStore.user.trial && !this.props.rootStore.userStore.user.lifetime_trial) {
        this.setState({showTrialClassStatusModal: true})
        this.setState({ classStatusModal: { show: false, cl: fullClass } })
      } else {
        this.setState({ classStatusModal: { show: true, cl: fullClass } })
      }
    } else {
      this.props.history.push({
        pathname: `/student/class/${cl.id}/`,
        state: {
          enrollmentLink: fullClass.enrollment_link,
          enrollmentCount: fullClass.enrollment
        }
      })
    }
  }

  closeClassStatusModal () {
    this.setState({ classStatusModal: { show: false, cl: null } })
    this.updateClasses()
  }

  closeAddClassModal () {
    this.updateClasses()
  }

  closePopUp () {
    this.updateStudent()
    this.updateClasses()
    this.setState({ popUp: { show: false } })
  }

  launchClassStatusModal (cl) {
    this.setState({ classStatusModal: { show: true, cl: cl } })
  }

  handleClassModalClose () {
    this.setState({
      classModal: false
    })
  }

  renderAddAssignmentModal () {
    if (!this.state.showAddAssignmentModal) {
      return null
    }

    return (
      <AddAssignment
        classes={this.props.rootStore.studentClassesStore.classes}
        assignmentParams={{}}
        closeModal={() => this.setState({showAddAssignmentModal: false})}
      />
    )
  }

  renderContent () {
    return (
      <div>
        {this.state.popUp.show &&
                  <PopUp closeModal={(!this.props.rootStore.userStore.user.trial && !this.state.subscribed) ? () => null : () => this.closePopUp()} handleModalClose={() => this.closePopUp()} type={this.state.popUp.type} refreshClasses={() => this.updateClasses()} />
        }
        {this.state.classStatusModal.show &&
                  <ClassStatusModal
                    closeModal={() => this.closeClassStatusModal()}
                    onSubmit={() => this.closeClassStatusModal()}
                    cl={this.state.classStatusModal.cl}
                  />
        }
        {this.state.showTrialClassStatusModal && <TrialClassModal
          onUpgradeToPremium={() => {
            this.setState({showTrialClassStatusModal: false})
            this.setState({ popUp: { type: 'PaymentPlans', show: true } })
          }}
          cl={this.state.classStatusModal.cl} closeModal={() => this.setState({showTrialClassStatusModal: false})} status={{ options: ['Class', 'Syllabus', 'Review', 'Live'], state: 'Review' }}/>}
        {/* {this.state.classModal && (this.state.subscribed ? <PremiumClassModal closeModal={this.handleClassModalClose.bind(this)} status={{state: false}} /> : <TrialClassModal closeModal={this.handleClassModalClose.bind(this)} status={{state: false}}/>)} */}
        {/* <ClassStatusPopUp subscribed={this.state.subscribed} /> */}
        {/* <PremiumClassModal closeModal={() => {}} status={{state: false}} /> */}
        <div className="home-container">
          <div className="home-column col-md-8 col-lg-8">
            <div className="home-shadow-box">
              <div className="home-section-header">
                <h2 className="home-section-header__header">
                  <Book className="home-section-header__icon" /> Classes
                </h2>
              </div>
              <div className="home-card-content home-class-list">
                <HomeClasses1 classes={this.props.rootStore.studentClassesStore.classes} onAddClass={() => this.closeAddClassModal()} onClassSelect={this.onClassSelect} launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)} />
              </div>
            </div>
            { this.props.rootStore.studentAssignmentsStore.assignments.length > 0 &&
              <HomeGraphImpact assignments={this.props.rootStore.studentAssignmentsStore.assignments} />
            }
            {/* <HomeAssignmentGraph/> */}
          </div>
          <div className="home-column col-md-4 col-lg-4">

            <div className="home-shadow-box">
              {/* } <h1 className='home-heading' onClick={() => this.props.history.push('/student/tasks')}>Assignments</h1> */}

              <div className="home-section-header">
                <h2 className="home-section-header__header">
                  <i className="far fa-check-circle home-section-header__icon"></i>
                  Assignments
                  <div className='home-add-new' onClick={() => this.setState({showAddAssignmentModal: true})}><i className='fas fa-plus' /></div>
                </h2>

                <span>Current week</span>
              </div>

              <div className="home-assignment-list">
                <HomeTasks />
                {this.renderAddAssignmentModal()}

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading
          ? <SkLoader />
          : this.renderContent()
        }
      </StudentLayout>
    )
  }
}

Home.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(Home)
