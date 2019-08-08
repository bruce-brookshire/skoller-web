import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import { browserHistory } from 'react-router'
import PopUp from './PopUp'
import ClassStatusModal from '../../components/ClassStatusModal'

@inject('rootStore') @observer
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      showPopUp: false,
      classStatusModal: {show: false, cl: null}
    }

    this.updateClasses()
    this.props.rootStore.studentNavStore.setActivePage('home')
  }

  async componentDidMount () {
    if (this.props.rootStore.userStore.showPopUps) {
      this.showFirstClassPopUp()
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
      this.setState({showPopUp: true})
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

  closeClassStatusModal () {
    console.log('closing modal')
    this.setState({classStatusModal: {show: false, cl: null}})
    this.updateClasses()
  }

  render () {
    return (
      <StudentLayout>
        {console.log(this.props.rootStore)}
        {this.state.showPopUp &&
          <PopUp closeModal={() => this.setState({showPopUp: false})} />
        }
        {this.state.classStatusModal.show &&
          <ClassStatusModal closeModal={() => this.closeClassStatusModal()} onSubmit={() => this.closeClassStatusModal()} cl={this.state.classStatusModal.cl} />
        }
        <div className="home-container">
          <div className="home-column">
            <div className="home-shadow-box">
              <h1 onClick={() => browserHistory.push('/student/classes')}>Classes</h1>
              <div className="home-card-content">
                <ClassList
                  classes={this.state.classes}
                  emptyMessage='You are not enrolled in any classes.'
                  onSelect={this.onClassSelect.bind(this)}
                />
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
                <p>content</p>
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
