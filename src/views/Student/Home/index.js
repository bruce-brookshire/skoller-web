import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import { withRouter } from 'react-router-dom'
import PopUp from './PopUp'
import ClassStatusModal from '../../components/ClassStatusModal'
import {Cookies} from 'react-cookie'
import HomeClasses from './HomeClasses'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import HomeTasks from './HomeTasks'
import HomeShare from './HomeShare'
import HomeJobs from './HomeJobs'
import HomeInsights from './HomeInsights'

@inject('rootStore') @observer
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      assignments: [],
      popUp: {show: false, type: null},
      // classStatusModal exists on this page because it needs to be rendered if a student logs in,
      // has only one class, and that class is not yet set up.
      classStatusModal: {show: false, cl: null},
      loading: false,
      shareWillDisplay: false
    }

    this.props.rootStore.navStore.setActivePage('home')
    this.props.rootStore.navStore.location = this.props.location
    this.cookie = new Cookies()
    console.log(this.props.rootStore)
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
          showPopUp = true
          type = 'findClass'
        }
      })
      .catch(() => false)
    if (this.props.rootStore.studentJobsStore.hasJobsProfile && !showPopUp) {
      if (this.props.rootStore.studentJobsStore.profile.resume_url === null) {
        showPopUp = true
        type = 'getResume'
      }
    }
    if (showPopUp) {
      this.setState({popUp: {type: type, show: true}})
    }
  }

  async showPrimarySchoolPopUp () {
    const student = this.props.rootStore.userStore.user.student
    if (!student.primary_school || !student.primary_period) {
      this.setState({popUp: {type: 'needPrimarySchool', show: true}})
    }
  }

  async updateClasses () {
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    this.props.rootStore.studentClassesStore.updateClasses()
    this.setState({loading: false})
  }

  findFullClass (classId) {
    return this.props.rootStore.studentClassesStore.classes.find((cl) => cl.id === classId)
  }

  onClassSelect = (cl) => {
    // Need to get enrollment link from classes
    // because ClassList will not return it

    let fullClass = this.findFullClass(cl.id)
    if (fullClass.status.id < 1400) {
      this.setState({classStatusModal: {show: true, cl: fullClass}})
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
    this.setState({classStatusModal: {show: false, cl: null}})
    this.updateClasses()
  }

  closeAddClassModal () {
    this.updateClasses()
  }

  closePopUp () {
    this.updateStudent()
    this.updateClasses()
    this.setState({popUp: {show: false}})
  }

  launchClassStatusModal (cl) {
    this.setState({classStatusModal: {show: true, cl: cl}})
  }

  renderContent () {
    return (
      <div>
        {this.state.popUp.show &&
          <PopUp closeModal={() => this.closePopUp()} type={this.state.popUp.type} refreshClasses={() => this.updateClasses()}/>
        }
        {this.state.classStatusModal.show &&
          <ClassStatusModal
            closeModal={() => this.closeClassStatusModal()}
            onSubmit={() => this.closeClassStatusModal()}
            cl={this.state.classStatusModal.cl}
          />
        }
        <div className="home-container">
          <div className="home-column home-column-lg">
            <div className="home-shadow-box">
              <h1 className='home-heading' onClick={() => this.props.history.push('/student/classes')}>Classes</h1>
              <div className="home-card-content">
                <HomeClasses classes={this.props.rootStore.studentClassesStore.classes} onAddClass={() => this.closeAddClassModal()} onClassSelect={this.onClassSelect} launchClassStatusModal={(cl) => this.launchClassStatusModal(cl)} />
              </div>
            </div>
            <HomeInsights />
          </div>
          <div className="home-column home-column-sm">
            <div className="home-shadow-box">
              <h1 className='home-heading' onClick={() => this.props.history.push('/student/tasks')}>To-Do&apos;s</h1>
              <div className="home-sub-heading">Next 10 days</div>
              <div className="home-card-content">
                <HomeTasks />
              </div>
            </div>
            <HomeJobs updateStudent={() => this.updateStudent()} user={this.props.rootStore.userStore.user} />
            <HomeShare classes={this.props.rootStore.studentClassesStore.classes} willDisplay={() => this.setState({shareWillDisplay: true})} />
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
