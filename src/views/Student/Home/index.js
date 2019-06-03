import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import { browserHistory } from 'react-router'

@inject('rootStore') @observer
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  componentWillMount () {
    this.updateClasses()
    this.props.rootStore.studentNavStore.setActivePage('home')
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
    browserHistory.push({
      pathname: `/student/class/${cl.id}/`,
      state: {
        enrollmentLink: fullClass.enrollment_link,
        enrollmentCount: fullClass.enrollment
      }
    })
  }

  render () {
    return (
      <StudentLayout>
        {console.log(this.props.rootStore)}
        <div className="home-container">
          <div className="home-shadow-box">
            <h1>Tasks</h1>
            <div className="home-card-content">
              <p>content</p>
            </div>
          </div>
          <div className="home-shadow-box">
            <h1>Classes</h1>
            <div className="home-card-content">
              <ClassList
                classes={this.state.classes}
                emptyMessage='You are not enrolled in any classes.'
                onSelect={this.onClassSelect.bind(this)}
              />
            </div>
          </div>
          <div className="home-shadow-box">
            <h1>Activity</h1>
            <div className="home-card-content">
              <p>content</p>
            </div>
          </div>
          <div className="home-shadow-box">
            <h1>Chat</h1>
            <div className="home-card-content">
              <p>content</p>
            </div>
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
