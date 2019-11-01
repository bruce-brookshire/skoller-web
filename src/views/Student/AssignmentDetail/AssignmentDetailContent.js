import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'

@inject('rootStore') @observer
class AssignmentDetailContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,

      currentAssignment: this.props.assignment,
      assignmentWeightCategory: this.props.assignmentWeightCategory,

      addGrade: false,
      editGrade: false,
      newGrade: null,

      editName: false,
      newName: null
    }
  }

  // Assignment Grading Handlers
  addGradeHandler = () => {
    let toggle = this.state.addGrade
    this.setState({ addGrade: !toggle })
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
        addGrade: false,
        editGrade: false,
        currentAssignment: currentAssignment
      })
    } else if (newGrade === currentAssignment.grade) {
      this.setState({
        addGrade: false,
        editGrade: false
      })
    } else {
      this.setState({
        addGrade: false,
        editGrade: false
      })
    }
  }

  editGradeHandler = () => {
    this.setState({ editGrade: !this.state.editGrade })
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

  async updateAssignment () {
    this.setState({loading: true})
    await actions.assignments.getAllStudentAssignments(this.props.rootStore.userStore.user.student.id)
      .then(r => {
        let currentAssignment = r.filter(a => a.id === this.state.currentAssignment.id)[0]
        currentAssignment.name = this.state.newName
        this.setState({currentAssignment, loading: false, newName: null, editName: false})
      })
      .catch(e => console.log(e))
  }

  handleSaveName () {
    this.setState({loading: true})
    let form = {
      name: this.state.newName,
      id: this.state.currentAssignment.id
    }
    actions.assignments.updateStudentAssignment(form)
      .then(() => {
        this.updateAssignment()
      })
      .catch((e) => {
        this.setState({loading: false, editName: false, newName: null})
        console.log(e)
      })
  }

  // Render Methods

  renderAssignmentTitle () {
    const assignment = this.state.currentAssignment

    if (this.state.editName) {
      return (
        <div className="sk-assignment-detail-edit-name">
          <input className="sk-assignment-detail-edit-name-input" type="text" placeholder={assignment.name} onChange={(e) => this.setState({newName: e.target.value})} />
          <button className="sk-assignment-detail-edit-name-save" onClick={() => this.handleSaveName()}>Save assignment name</button>
        </div>
      )
    } else {
      return (
        <div className="sk-assignment-detail-name">
          <h1>{assignment.name}</h1>
          <i onClick={() => this.setState({editName: !this.state.editName})} className='fas fa-pencil-alt'/>
        </div>
      )
    }
  }

  renderAssignmentDetails (assignment) {
    return (
      <div>
        <div className='sk-assignment-detail-content-header'>
          {this.renderAssignmentTitle()}
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
            <p>{this.props.assignmentWeightCategory ? this.props.assignmentWeightCategory.name : 'Not weighted'}</p>
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
              {assignment.grade && !this.state.editGrade
                ? <div className="sk-assignment-detail-grade" onClick={() => this.editGradeHandler()}>{assignment.grade}</div>
                : this.state.addGrade
                  ? <div className="sk-assignment-detail-edit-grade" id="edit-grade-form">
                    <input type="text" className="sk-assignment-detail-edit-grade-input" onChange={this.addGradeOnChangeHandler} /><br />
                    <button className="sk-assignment-detail-edit-grade-save" onClick={this.addGradeOnSubmitHandler}>Save Grade</button>
                  </div>
                  : !this.state.editGrade
                    ? <a className="sk-assignment-detail-add-grade" onClick={this.addGradeHandler}>Add Grade</a>
                    : this.state.editGrade
                      ? <div className="sk-assignment-detail-edit-grade">
                        <input className="sk-assignment-detail-edit-grade-input" type="text" placeholder={assignment.grade} onChange={this.addGradeOnChangeHandler} />
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
          ? <SkLoader />
          : this.renderAssignmentDetails(assignment)}
      </div>
    )
  }
}

AssignmentDetailContent.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  assignment: PropTypes.object,
  assignmentWeightCategory: PropTypes.object,
  cl: PropTypes.object
}

export default AssignmentDetailContent
