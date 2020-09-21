import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassDetail from '../../../Student/ClassDetail/ClassDetail'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import NestedNav from '../../components/NestedNav'
import actions from '../../../../actions'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class SiStudentClassDetail extends Component {
  constructor (props) {
    super(props)

    let user
    if (this.props.match.params.invitationId) {
      user = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))
    } else {
      user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }

    this.state = {
      activeAssignmentId: this.props.location.state ? this.props.location.state.activeAssignmentId : null,
      user
    }
  }

  static propTypes = {
    rootStore: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object
  }

  refreshUser () {
    let user = this.state.user
    if (user.isInvitation) {
      this.props.rootStore.insightsStore.updateInvitation(user.id)
    } else {
      this.props.rootStore.insightsStore.updateStudent(user.id)
    }
  }

  onCompleteAssignment = (assignmentId, isCompleted) => {
    actions.assignments.toggleCompleteAssignmentById(this.state.user.student.id, assignmentId, isCompleted)
      .then(() => {
        this.refreshUser()
      })
  }

  onDeleteAssignment = (assignmentId) => {
    actions.assignments.deleteStudentAssignment(assignmentId)
      .then(() => {
        this.refreshUser()
      })
  }

  editAssignment = async (form, assignmentId, isPrivate = true) => {
    if (form.grade || isNaN(form.grade)) {
      if (isNaN(form.grade)) {
        await actions.assignments.removeGradeFromAssignment(assignmentId)
      } else {
        await actions.assignments.gradeAssignment(assignmentId, form.grade)
      }
    } else {
      form.id = assignmentId
      await actions.assignments.updateStudentAssignment(form, isPrivate)
    }

    this.refreshUser()
  }

  createAssignment = () => {

  }

  updateClasses = () => {
    this.refreshUser()
  }

  render () {
    let user
    if (this.props.match.params.invitationId) {
      user = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))
    } else {
      user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }
    
    let cl = toJS(user.classes.find(cl => cl.id === parseInt(this.props.match.params.classId)))
    console.log(cl)
    cl.color = this.props.match.params.invitationId ? '4a4a4a' : cl.color
    return (
      <div className='si-class-detail'>
        <NestedNav pageType='studentDetail' />
        <ClassDetail
          insightsUser
          cl={cl}
          classes={user.classes}
          onCompleteAssignment={this.onCompleteAssignment}
          onDeleteAssignment={this.onDeleteAssignment}
          editAssignment={this.editAssignment}
          createAssignment={this.createAssignment}
          updateClass={() => this.refreshUser()}
          activeAssignmentId={this.state.activeAssignmentId}
          insightsUserStudentId={user.student_id}
        />
      </div>
    )
  }
}

export default withRouter(SiStudentClassDetail)
