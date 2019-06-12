import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import moment from 'moment'
import StudentLayout from '../../components/StudentLayout'
import { browserHistory } from 'react-router'

@inject('rootStore') @observer
class AssignmentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      assignments: [],
      currentAssignment: {},
      currentWeight: {},
      cl: {},
      toggleAddGrade: false,
      newGrade: null
    }

    this.getData()
  }

  async getData () {
    this.getClass()
    await this.getAssignment()
    await this.getWeightInfo()
  }

  // async componentWillMount () {
  //   this.getClass()
  //   await this.getAssignment()
  //   await this.getWeightInfo()
  // }

  getClass () {
    const { classId } = this.props.params
    const { navbarStore } = this.props.rootStore

    this.setState({ loading: true })
    actions.classes.getClassById(classId).then(cl => {
      this.setState({ cl, loading: false })
      navbarStore.title = cl.name
      console.log(this.state.cl)
    }).catch(() => this.setState({ loading: false }))
  }

  async getAssignment () {
    const { classId } = this.props.params
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    const { assignmentId } = this.props.params
    const { assignments } = await actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      this.setState({ assignments: assignments })
      return assignments
    })
    const currentAssignment = assignments.find(a => parseInt(a.assignment_id) === parseInt(assignmentId))
    this.setState({currentAssignment: currentAssignment})
  }

  async getWeightInfo () {
    const { cl } = this.state
    const { weightId } = this.state.currentAssignment
    const weights = await actions.weights.getClassWeights(cl).then(res => res)
    const currentWeight = weights.find(w => parseInt(w.id) === parseInt(weightId))
    this.setState({currentWeight: currentWeight})
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

  renderDueDate (dd) {
    return moment(dd)
  }

  renderAssignmentDetails (assignment) {
    const { currentWeight, toggleAddGrade } = this.state
    return (
      <div>
        <h1>Assignment Details</h1>
        <h2>{assignment.name}</h2>
        {assignment.weight ? <p>Worth {assignment.weight * 100}% of your final grade</p>
          : <p>No weight given.</p>}
        <p>Grading Category: {currentWeight.name}</p>
        <p>Due Date: {assignment.due}</p>
        <h2>Personal Details</h2>
        <p>Grade Earned: {assignment.grade ? assignment.grade : '--'}</p>
        {assignment.grade
          ? <a onClick={this.removeGradeHandler.bind(this)} >Remove Grade</a>
          : <a onClick={this.toggleAddGradeHandler.bind(this)}>Add Grade</a>}
        {toggleAddGrade
          ? <div className="add-grade">
            <input type="text" onChange={this.addGradeOnChangeHandler.bind(this)} /><br />
            <button onClick={this.addGradeOnSubmitHandler.bind(this)}>Save Grade</button>
          </div>
          : null}
      </div>
    )
  }

  render () {
    const { loading } = this.state
    const assignment = this.state.currentAssignment
    return (
      <StudentLayout>
        <div className='back-button' onClick={() => browserHistory.push(this.props.rootStore.studentNavStore.location.pathname)}>Back</div>
        <div id='cn-class-detail-container'>
          {/* {loading
            ? <Loading />
            : this.renderClassDetails()} */}
          <h1></h1>
        </div>
        <div className='cn-class-assignments-container'>
          <div className='cn-class-list-container margin-top'>
            {loading
              ? <Loading />
              : this.renderAssignmentDetails(assignment)}
          </div>
        </div>
      </StudentLayout>
    )
  }
}

AssignmentDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default AssignmentDetail
