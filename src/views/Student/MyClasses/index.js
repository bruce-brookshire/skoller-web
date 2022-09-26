import React from 'react'
import actions from '../../../actions'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import StudentLayout from '../../components/StudentLayout'
import AddClassModal from '../components/AddClassModal'
import ClassStatusModal from '../../components/ClassStatusModal'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import { withRouter } from 'react-router-dom'
import SecondClassPrompt from '../../components/Sammi/Prompts/SecondClassPrompt'
import JoinFirstClassPrompt from '../../components/Sammi/Prompts/JoinFirstClassPrompt'

@inject('rootStore') @observer
class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subscribed: false,
      subscriptionCancelled: false,
      trial: this.props.rootStore.userStore.user.trial,
      classes: [],
      showAddClassModal: false,
      classStatusModal: {show: false, cl: null},
      loading: true
    }
    this.props.rootStore.navStore.location = this.props.location
    this.props.rootStore.studentClassesStore.updateClasses()
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    this.props.rootStore.navStore.setActivePage('classes')
  }

  async componentDidMount () {
    if (this.props.rootStore.userStore.showPopUps) {
      this.runPopUpLogic()
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

    await actions.stripe.getMySubscription()
    .then((data) => {
      console.log(data, "DATA SDAS")
      if (data.data.length > 0) {
        this.setState({ subscribed: true })
        this.setState({ subscriptionCancelled: data.data[0].cancel_at_period_end })
        if (showPopUp) {
          this.setState({ popUp: { type: type, show: true } })
        }
      } else if (data.data.length === 0 && this.props.rootStore.userStore.user.trial === false) {
        this.setState({ popUp: { type: 'PaymentPlans', show: true } })
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }

  

  findFullClass (classId) {
    return this.props.rootStore.studentClassesStore.classes.find((cl) => cl.id === classId)
  }

  updateClasses () {
    this.props.rootStore.studentClassesStore.updateClasses()
    this.props.rootStore.studentAssignmentsStore.updateAssignments()
    this.setState({ loading: false })
    this.setState({ showAddClassModal: false})
  }

  upgradeToPremium = () => {
    this.closeClassStatusModal()
    this.setState({ popUp: { type: 'PaymentPlans', show: true }})
  }

  numberOfClassesNeedingSyllabus () {
    return this.props.rootStore.studentClassesStore.classes.filter((item, index) => {
      var nameL = item.status.name.toLowerCase()
      return ['new class', 'needs setup', 'needs student input', 'class setup', 'class issue'].includes(nameL) && !item.status.is_complete
    }).length
  }

  renderNeedsSyllabusInfo () {
    let num = this.numberOfClassesNeedingSyllabus()
    if (num > 0) {
      return (
        <div className='cn-needs-syllabus-info margin-bottom center-text cn-blue'>
          {`${num} class${num > 1 ? 'es' : ''} still need${num > 1 ? '' : 's'} to be set up.`}
        </div>
      )
    } else {
      return null
    }
  }

  /*
  * Renders the class table for the user
  *
  * @return [Array]. Array of formatted row data.
  */
  renderContent () {
    const { classes } = this.props.rootStore.studentClassesStore

    return (
      <div>
        {this.renderNeedsSyllabusInfo()}
        <div className='cn-table-grid-container'>
          <ClassList
            classes={classes}
            emptyMessage='You are not enrolled in any classes.'
            onSelect={this.onClassSelect.bind(this)}
          />
          {classes.length > 1 &&
            <button className='button add-button' onClick={() => this.setState({showAddClassModal: true})}>
              Join a Class
            </button>
          }
          <JoinFirstClassPrompt onAddClass={() => this.updateClasses()} show={!classes.length} />
          <SecondClassPrompt onAddClass={() => this.updateClasses()} show={classes.length} />
        </div>
      </div>
    )
  }

  onClassSelect (cl) {
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

  closeAddClassModal () {
    this.setState({showAddClassModal: false})
    this.updateClasses()
  }

  closeClassStatusModal () {
    this.setState({classStatusModal: {show: false, cl: null}})
    this.updateClasses()
  }

  renderView () {
    return (
      <div className='cn-my-classes-wrapper'>
        <div className='cn-my-classes-container'>
          <h1 className='cn-my-classes-title'>Classes</h1>
          <i className='fas fa-plus cn-my-classes-add-new' onClick={() => this.setState({showAddClassModal: true})} />
          <div className='cn-my-classes-content'>
            {this.renderContent()}
          </div>
        </div>
        {this.state.showAddClassModal &&
          <AddClassModal 
            closeModal={() => this.closeAddClassModal()}
            trial={this.state.trial}
            isSubscribed={this.state.subscribed}
            subscribedCancelled={this.state.subscriptionCancelled}
            onUpgradeToPremiumClicked={() => this.upgradeToPremium()} />
        }
        {this.state.classStatusModal.show &&
          <ClassStatusModal 
            closeModal={() => this.closeClassStatusModal()} 
            onSubmit={() => this.closeClassStatusModal()} 
            cl={this.state.classStatusModal.cl} 
            trial={this.state.trial}
            isSubscribed={this.state.subscribed}
            subscribedCancelled={this.state.subscriptionCancelled}
            onUpgradeToPremiumClicked={() => this.upgradeToPremium()} />
        }
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.props.rootStore.studentClassesStore.loading
          ? <SkLoader />
          : this.renderView()}
      </StudentLayout>
    )
  }
}

MyClasses.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(MyClasses)
