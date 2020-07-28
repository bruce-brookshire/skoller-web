import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassDetail from '../../../Student/ClassDetail/ClassDetail'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import NestedNav from '../../components/NestedNav'
import actions from '../../../../actions'

@inject('rootStore') @observer
export default class SiStudentClassDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeAssignmentId: null
    }
  }

  static propTypes = {
    rootStore: PropTypes.object,
    match: PropTypes.object
  }

  onCompleteAssignment = () => {

  }

  onDeleteAssignment = () => {

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

    this.props.rootStore.studentClassesStore.updateClasses()
  }

  createAssignment = () => {

  }

  updateClasses = () => {

  }

  render () {
    let user
    if (this.props.match.params.invitationId) {
      user = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))
    } else {
      user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }
    let cl = toJS(user.classes.find(cl => cl.id === parseInt(this.props.match.params.classId)))
    cl.color = this.props.match.params.invitationId ? '4a4a4a' : cl.color
    return (
      <div>
        <NestedNav pageType='studentDetail' />
        <ClassDetail
          insightsUser
          cl={cl}
          onCompleteAssignment={this.onCompleteAssignment}
          onDeleteAssignment={this.onDeleteAssignment}
          editAssignment={this.editAssignment}
          createAssignment={this.createAssignment}
          updateClass={() => this.props.rootStore.studentClassesStore.updateClasses()}
          activeAssignmentId={this.state.activeAssignmentId}
        />
      </div>
    )
  }
}
