import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassDetail from './ClassDetail'
import StudentLayout from '../../components/StudentLayout'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import NestedNav from '../../components/NestedNav'
import actions from '../../../actions'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class StudentClassDetailView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeAssignmentId: this.props.location.state ? this.props.location.state.activeAssignmentId : null
    }

    this.props.rootStore.navStore.setActivePage('classes')
    this.props.rootStore.navStore.location = this.props.location // set active page route location for access from assignment detail
  }

  getClass () {
    return this.props.rootStore.studentClassesStore.classes.find(cl => cl.id === parseInt(this.props.match.params.classId))
  }

  onCompleteAssignment = (assignmentId, isCompleted) => {
    console.log({assignmentId, isCompleted})
    actions.assignments.toggleCompleteAssignmentById(this.props.rootStore.userStore.user.student.id, assignmentId, isCompleted)
      .then(() => {
        this.props.rootStore.studentClassesStore.updateClasses()
      })
  }

  onDeleteAssignment = (assignmentId) => {
    actions.assignments.deleteStudentAssignment(assignmentId)
      .then(() => {
        this.props.rootStore.studentClassesStore.updateClasses()
      })
  }

  createAssignment () {

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

  render () {
    return (
      <StudentLayout>
        <NestedNav />
        {this.props.rootStore.studentClassesStore.loading
          ? <SkLoader />
          : <ClassDetail
            cl={this.getClass()}
            onCompleteAssignment={this.onCompleteAssignment}
            onDeleteAssignment={this.onDeleteAssignment}
            editAssignment={this.editAssignment}
            createAssignment={this.createAssignment}
            updateClasses={this.props.rootStore.studentClassesStore.updateClasses}
            updateClass={() => this.props.rootStore.studentClassesStore.updateClasses()}
            activeAssignmentId={this.state.activeAssignmentId}
          />
        }
      </StudentLayout>
    )
  }
}

StudentClassDetailView.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(StudentClassDetailView)
