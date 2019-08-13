import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import { browserHistory } from 'react-router'
import PopUp from './PopUp'
import ClassStatusModal from '../../components/ClassStatusModal'
import AddClassModal from '../MyClasses/AddClassModal'
import {Cookies} from 'react-cookie'
import HomeClasses from './HomeClasses';

@inject('rootStore') @observer
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      popUp: {show: false, type: null},
      classStatusModal: {show: false, cl: null},
      addClassModal: {show: false}
    }

    this.cookie = new Cookies()

    this.updateClasses()
    this.props.rootStore.studentNavStore.setActivePage('home')
  }

  async componentDidMount () {
    if (this.props.rootStore.userStore.showPopUps) {
      this.showFirstClassPopUp()
      this.showPrimarySchoolPopUp()
    }
  }

  async showFirstClassPopUp () {
    let showPopUp = false
    await actions.classes.getStudentClassesById(this.props.rootStore.userStore.user.student.id)
      .then((classes) => {
        if (classes.length > 1) {
          showPopUp = false
        } else {
          let cl = classes[0]
          let id = cl.status.id
          if (id === 1100) {
            showPopUp = true
          }
        }
      })
      .catch(() => false)
    if (showPopUp) {
      this.setState({popUp: {type: 'needSyllabus', show: true}})
    }
  }

  async showPrimarySchoolPopUp () {
    const student = this.props.rootStore.userStore.user.student
    if (!student.primary_school || !student.primary_period) {
      this.setState({popUp: {type: 'needPrimarySchool', show: true}})
    }
  }

  updateClasses () {
    const {user: {student}} = this.props.rootStore.userStore
    actions.classes.getStudentClassesById(student.id).then((classes) => {
      this.setState({classes})
    }).catch(() => false)
  }

  findFullClass (classId) {
    const {classes} = this.state

    return classes.find((cl) => cl.id === classId)
  }

  onClassSelect (cl) {
    // Need to get enrollment link from classes
    // because ClassList will not return it

    let fullClass = this.findFullClass(cl.id)
    console.log(fullClass.status.id < 1400)
    if (fullClass.status.id < 1400) {
      this.setState({classStatusModal: {show: true, cl: fullClass}})
    } else {
      browserHistory.push({
        pathname: `/student/class/${cl.id}/`,
        state: {
          enrollmentLink: fullClass.enrollment_link,
          enrollmentCount: fullClass.enrollment
        }
      })
    }
  }

  async updateStudent () {
    console.log('async login student')
    await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
  }

  closeClassStatusModal () {
    this.setState({classStatusModal: {show: false, cl: null}})
    this.updateClasses()
  }

  closeAddClassModal () {
    this.setState({addClassModal: {show: false}})
    this.updateClasses()
  }

  closePopUp () {
    this.updateStudent()
    this.setState({popUp: {show: false}})
  }

  render () {
    return (
      <StudentLayout>
        {console.log(this.props.rootStore)}
        {this.state.popUp.show &&
          <PopUp closeModal={() => this.closePopUp()} type={this.state.popUp.type}/>
        }
        {this.state.classStatusModal.show &&
          <ClassStatusModal
            closeModal={() => this.closeClassStatusModal()}
            onSubmit={() => this.closeClassStatusModal()}
            cl={this.state.classStatusModal.cl}
          />
        }
        {this.state.addClassModal.show &&
          <AddClassModal closeModal={() => this.closeAddClassModal()} />
        }
        <div className="home-container">
          <div className="home-column">
            <div className="home-shadow-box">
              <h1 onClick={() => browserHistory.push('/student/classes')}>Classes</h1>
              <div className="home-card-content">
                <HomeClasses classes={this.state.classes} onClick={() => this.setState({addClassModal: {show: true}})} onClassSelect={() => this.onClassSelect()} />
              </div>
            </div>
            {/* // this is for activity once we get it ready
            <div className="home-shadow-box">
              <h1>Activity</h1>
              <div className="home-card-content">
                <p>content</p>
              </div>
            </div> */}
          </div>
          <div className="home-column">
            <div className="home-shadow-box">
              <h1 onClick={() => browserHistory.push('/student/tasks')}>Tasks</h1>
              <div className="home-sub-heading">Due soon</div>
              <div className="home-card-content">
                <p style={{textAlign: 'center', color: 'rgba(0,0,0,0.30)', margin: '3rem 0'}}>No tasks yet.</p>
              </div>
            </div>
            {/* // this is for chat once we get it ready
            <div className="home-shadow-box">
              <h1>Chat</h1>
              <div className="home-card-content">
                <p>content</p>
              </div>
            </div> */}
          </div>
        </div>
      </StudentLayout>
    )
  }
}

Home.propTypes = {
  rootStore: PropTypes.object
}

export default Home
