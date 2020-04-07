import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import DatePicker from '../../components/DatePicker'

@inject('rootStore') @observer
class AssignmentDetailContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,

      assignment: this.props.assignment,
      assignmentWeightCategory: this.props.assignmentWeightCategory,

      addGrade: false,
      editGrade: false,
      newGrade: null,

      editMode: false,
      newName: null,
      newDue: null,
      isPrivate: false,
      showDatePicker: false
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
    const currentAssignment = this.state.assignment
    if (isNaN(newGrade)) {
      window.confirm('Please enter a valid number')
      document.getElementById('add-grade-form').reset()
      this.setState({newGrade: this.state.assignment.grade})
    } else if (newGrade !== currentAssignment.grade && newGrade !== null) {
      currentAssignment.grade = newGrade
      actions.assignments.gradeAssignment(currentAssignment.id, newGrade).then(() => {
        this.props.rootStore.studentClassesStore.updateClasses()
        this.props.rootStore.studentAssignmentsStore.updateAssignments()
      })
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

  handleSave () {
    if (this.state.newDue || this.state.newName) {
      let form = {
        id: this.state.assignment.id,
        is_private: this.state.isPrivate
      }
      if (this.state.newName !== null) {
        form.name = this.state.newName
      }
      if (this.state.newDue !== null) {
        let dueDate = moment(this.state.newDue)
        let schoolTz = this.props.rootStore.userStore.user.student.primary_school.timezone
        let convertedDueDate = moment(dueDate).tz(schoolTz)
        form.due = convertedDueDate
      }
      actions.assignments.updateStudentAssignment(form, this.state.isPrivate)
        .then((r) => {
          actions.assignments.getAllStudentAssignments(this.props.rootStore.userStore.user.student.id)
            .then((data) => {
              let a = data.filter(a => a.id === r.id)[0]
              this.setState({
                assignment: a,
                newName: null,
                newDue: null,
                editMode: false
              })
              this.props.rootStore.studentClassesStore.updateClasses()
              this.props.rootStore.studentAssignmentsStore.updateAssignments()
            })
        })
        .catch((e) => {
          this.setState({loading: false, editMode: false, newName: null, newDue: false})
        })
    } else {
      this.setState({
        newName: null,
        newDue: null,
        editMode: false
      })
    }
  }

  // Render Methods

  renderAssignmentTitle () {
    const assignment = this.state.assignment

    if (this.state.editMode) {
      return (
        <div className="sk-assignment-detail-edit-name">
          <input className="sk-assignment-detail-edit-name-input" type="text" placeholder={assignment.name} onChange={(e) => this.setState({newName: e.target.value})} />
        </div>
      )
    } else {
      return (
        <div className="sk-assignment-detail-name">
          <h1>{assignment.name}</h1>
          <i onClick={() => this.setState({editMode: !this.state.editMode})} className='fas fa-pencil-alt'/>
        </div>
      )
    }
  }

  renderSave () {
    return (
      <div className='sk-assignment-detail-save'>
        <div className="sk-assignment-detail-radio">
          <label
            className={this.state.isPrivate === false ? 'is-active' : null}
          >
            <input
              type="radio"
              value={true}
              checked={this.state.isPrivate === false}
              onChange={() => this.setState({isPrivate: false})}
            />
            <div className="radio-button" />
            <p>Share changes with class as update</p>
          </label>
          <label
            className={this.state.isPrivate === true ? 'is-active' : null}
          >
            <input
              type="radio"
              value={false}
              checked={this.state.isPrivate === true}
              onChange={() => this.setState({isPrivate: true})}
            />
            <div className="radio-button" />
            <p>Keep changes private</p>
          </label>
        </div>
        <div className="sk-assignment-detail-save-button" onClick={() => this.handleSave()}>
          <p>Save changes</p>
        </div>
        <p className='sk-assignment-detail-cancel' onClick={() => this.setState({editMode: false})}>Cancel</p>
      </div>
    )
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
            {this.state.editMode
              ? <div>
                <p
                  onClick={() => this.setState({showDatePicker: true})}
                  style={{cursor: 'pointer', color: '#57B9E4'}}
                >
                  {moment.utc(this.state.newDue ? this.state.newDue : assignment.due).format('MMMM D, YYYY')}
                </p>
                {this.state.showDatePicker && <DatePicker givenDate={assignment.due ? assignment.due : null} returnSelectedDay={(d) => {
                  this.setState({newDue: d, showDatePicker: false})
                }} />}
              </div>
              : <p>{moment.utc(assignment.due).format('MMMM D, YYYY')}</p>
            }
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
                ? <div className="sk-assignment-detail-grade" onClick={() => this.editGradeHandler()}>{assignment.grade}%</div>
                : this.state.addGrade
                  ? <div className="sk-assignment-detail-edit-grade" id="edit-grade-form">
                    <input type="text" className="sk-assignment-detail-edit-grade-input" onChange={this.addGradeOnChangeHandler} /><br />
                    <button className="sk-assignment-detail-edit-grade-save" onClick={this.addGradeOnSubmitHandler}>Save Grade</button>
                  </div>
                  : !this.state.editGrade
                    ? <a className="sk-assignment-detail-add-grade link-style" onClick={this.addGradeHandler}>Add Grade</a>
                    : this.state.editGrade
                      ? <div className="sk-assignment-detail-edit-grade">
                        <input className="sk-assignment-detail-edit-grade-input" type="text" placeholder={assignment.grade} onChange={this.addGradeOnChangeHandler} />
                        <button className="sk-assignment-detail-edit-grade-save" onClick={this.addGradeOnSubmitHandler}>Save grade</button>
                      </div>
                      : null}
            </div>
          </div>
        </div>

        {this.state.editMode && this.renderSave()}
      </div>
    )
  }

  render () {
    let assignment = this.state.assignment
    return (
      <div className='sk-assignment-detail-content'>
        {this.state.loading
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
