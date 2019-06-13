import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import moment from 'moment'
// import { browserHistory } from 'react-router'
// import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'

@inject('rootStore') @observer
class AssignmentDetailContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      currentAssignment: this.props.assignment,
      assignmentWeightCategory: this.props.assignmentWeightCategory,
      toggleAddGrade: false,
      newGrade: null
    }
  }
  // Assignment Grading Handlers

  toggleAddGradeHandler () {
    let toggle = this.state.toggleAddGrade
    this.setState({ toggleAddGrade: !toggle })
  }

  addGradeOnChangeHandler (event) {
    this.setState({ newGrade: event.target.value })
  }

  addGradeOnSubmitHandler () {
    const { currentAssignment, newGrade } = this.state
    const assignment = { ...currentAssignment }
    assignment.grade = newGrade
    actions.assignments.gradeAssignment(currentAssignment.id, newGrade)
    this.setState({
      toggleAddGrade: false,
      currentAssignment: assignment
    })
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
            <p>{assignment.grade
              ? assignment.grade
              : <a className="sk-assignment-detail-add-grade" onClick={this.toggleAddGradeHandler.bind(this)}>Add Grade</a>}
            </p>
          </div>
          <div className='sk-assignment-detail-content-row'>
            {this.state.toggleAddGrade
              ? <div>
                <input type="text" onChange={this.addGradeOnChangeHandler.bind(this)} /><br />
                <button onClick={this.addGradeOnSubmitHandler.bind(this)}>Save Grade</button>
              </div>
              : null}
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
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object,
  assignment: PropTypes.object,
  assignmentWeightCategory: PropTypes.object
}

export default AssignmentDetailContent
