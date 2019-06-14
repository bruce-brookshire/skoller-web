import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import moment from 'moment'

@inject('rootStore') @observer
class AssignmentDetailContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      currentAssignment: this.props.assignment,
      assignmentWeightCategory: this.props.assignmentWeightCategory,
      toggleAddGrade: false,
      toggleEditGrade: false,
      newGrade: null
    }
  }
  // Assignment Grading Handlers

  toggleAddGradeHandler = () => {
    let toggle = this.state.toggleAddGrade
    this.setState({ toggleAddGrade: !toggle })
  }

  addGradeOnChangeHandler = (event) => {
    this.setState({ newGrade: event.target.value })
  }

  addGradeOnSubmitHandler = () => {
    const newGrade = this.state.newGrade
    const currentAssignment = this.state.currentAssignment
    if (isNaN(newGrade)) {
      window.confirm('Please enter a valid number')
      document.getElementById('add-grade-form').reset()
      this.setState({newGrade: this.state.currentAssignment.grade})
    } else if (newGrade !== currentAssignment.grade && newGrade !== null) {
      currentAssignment.grade = newGrade
      actions.assignments.gradeAssignment(currentAssignment.id, newGrade)
      this.setState({
        toggleAddGrade: false,
        toggleEditGrade: false,
        currentAssignment: currentAssignment
      })
    } else if (newGrade === currentAssignment.grade) {
      this.setState({
        toggleAddGrade: false,
        toggleEditGrade: false
      })
    } else {
      this.setState({
        toggleAddGrade: false,
        toggleEditGrade: false
      })
    }
  }

  toggleEditGradeHandler = () => {
    this.setState({ toggleEditGrade: !this.state.toggleEditGrade })
  }

  removeGradeHandler () {
    const { currentAssignment } = this.state
    const assignment = { ...currentAssignment }
    assignment.grade = null
    actions.assignments.removeGradeFromAssignment(currentAssignment.id)
    this.setState({
      newGrade: null,
      currentAssignment: assignment
    })
  }

  // Render Methods

  renderAssignmentDetails (assignment) {
    return (
      <div>
        <div className='sk-assignment-detail-content-header'>
          <h1>{assignment.name}</h1>
          <p>
            {assignment.weight
              ? 'Worth ' + (assignment.weight * 100).toPrecision(2).toString() + '% of your final grade'
              : 'No weight given.'
            }
          </p>
        </div>
        <div className='sk-assignment-detail-content-section'>
          <div className='sk-assignment-detail-content-section-title'>
            <p>Assignment details</p><br />
          </div>
          <div className='sk-assignment-detail-content-row'>
            <p>Grading category</p>
            <p>{this.props.assignmentWeightCategory.name}</p>
          </div>
          <div className='sk-assignment-detail-content-row'>
            <p>Due date</p>
            <p>{moment(assignment.due).format('MMMM D, YYYY')}</p>
          </div>
        </div>
        <div className='sk-assignment-detail-content-section'>
          <div className='sk-assignment-detail-content-section-title'>
            <p>Personal details</p><br />
          </div>
          <div className='sk-assignment-detail-content-row'>
            <p>Grade earned</p>
            <div>
              {assignment.grade && !this.state.toggleEditGrade
                ? <div className="sk-assignment-detail-grade" onClick={() => this.toggleEditGradeHandler()}>{assignment.grade}</div>
                : this.state.toggleAddGrade
                  ? <div className="sk-assignment-detail-edit-grade" id="edit-grade-form">
                    <input type="text" className="sk-assignment-detail-edit-grade-input" onChange={this.addGradeOnChangeHandler} /><br />
                    <button className="sk-assignment-detail-edit-grade-save" onClick={this.addGradeOnSubmitHandler}>Save Grade</button>
                  </div>
                  : !this.state.toggleEditGrade
                    ? <a className="sk-assignment-detail-add-grade" onClick={this.toggleAddGradeHandler}>Add Grade</a>
                    : this.state.toggleEditGrade
                      ? <div className="sk-assignment-detail-edit-grade">
                        <input className="sk-assignment-detail-edit-grade-input" type="text" placeholder={assignment.grade} onChange={this.addGradeOnChangeHandler} /><br />
                        <button className="sk-assignment-detail-edit-grade-save" onClick={this.addGradeOnSubmitHandler}>Save grade</button>
                      </div>
                      : null}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { loading } = this.state
    const assignment = this.props.assignment
    return (
      <div className='sk-assignment-detail-content'>
        {loading
          ? <Loading />
          : this.renderAssignmentDetails(assignment)}
      </div>
    )
  }
}

AssignmentDetailContent.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  assignment: PropTypes.object,
  assignmentWeightCategory: PropTypes.object
}

export default AssignmentDetailContent
