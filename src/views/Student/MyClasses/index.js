import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import { browserHistory } from 'react-router'
import Card from '../../../components/Card'

@inject('rootStore') @observer
class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  componentWillMount () {
    this.updateClasses()
  }

  findFullClass (classId) {
    const {classes} = this.state

    return classes.find((cl) => cl.id === classId)
  }

  updateClasses () {
    const {user: {student}} = this.props.rootStore.userStore
    actions.classes.getStudentClassesById(student.id).then((classes) => {
      this.setState({classes})
    }).catch(() => false)
  }

  updateClass (cl) {
    actions.classes.getClassById(cl.id).then(cl => {
      const index = this.state.classes.findIndex(c => c.id === cl.id)
      const newClasses = this.state.classes
      newClasses[index] = cl
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  numberOfClassesNeedingSyllabus () {
    return this.state.classes.filter((item, index) => {
      return item.status.name === 'Needs Syllabus'
    }).length
  }

  renderNeedsSyllabusInfo () {
    let num = this.numberOfClassesNeedingSyllabus()
    if (num > 0) {
      return (
        <div className='needs-syllabus-info margin-bottom center-text cn-red'>
          {`Skoller needs a syllabus for ${num} of your classes.`}
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
    return (
      <div>
        <div className='margin-bottom center-text'>From this page, you can enroll in your classes, upload syllabi, and check other class details.</div>
        {this.renderNeedsSyllabusInfo()}
        <div className='cn-table-grid-container'>
          <ClassList
            classes={this.state.classes}
            onDelete={() => this.onDeleteClass.bind(this)}
            deleteMessage={'Are you sure you want to drop this class?'}
            emptyMessage='You are not enrolled in any classes.'
            onSelect={this.onClassSelect.bind(this)}
          />
          <button className='button-invert full-width add-button' onClick={() => { browserHistory.push('student/find-classes') }}>
            Add a Class
          </button>
        </div>
      </div>
    )
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

  /*
  * Method for deleting a class.
  *
  * @param [Object] cl. Class user is in.
  * @return [Object] null.
  */
  onDeleteClass (cl) {
    actions.classes.dropClass(cl.id).then(() => {
      const newClasses = this.state.classes.filter(cc => cc.id !== cl.id)
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  renderTitle () {
    return (
      <div className='cn-icon-flex'>
        My classes
        <i className='fa fa-plus cn-blue cursor' onClick={() => browserHistory.push('student/find-classes') } />
      </div>
    )
  }

  render () {
    return (
      <div className='cn-my-classes-container'>
        <Card
          title={this.renderTitle()}
          content={this.renderContent()}
        />
      </div>
    )
  }
}

MyClasses.propTypes = {
  rootStore: PropTypes.object
}

export default MyClasses
