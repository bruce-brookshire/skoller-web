import React, { Component } from 'react'
import SkModal from '../../components/SkModal/SkModal'
import actions from '../../../actions'
// import Loading from '../../../components/Loading'
import moment from 'moment'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import DatePicker from '../../components/DatePicker'
import NewAssignment from './NewAssignment'

@inject('rootStore') @observer
class AddAssignment extends Component {
  state = {
    // student info state
    newAssignment: {
      due: this.props.assignmentParams.due,
      name: null,
      weight_id: null,
      class: null,
      created_on: 'web'
    },
    newAssignments: {},
    weights: [],
    classes: [],
    selectedClass: {},
    selectedStudentClass: null,
    studentId: this.props.rootStore.userStore.user.student.id,
    // visibility state
    showClassField: true,
    showWeightsField: false,
    showNameField: false,
    showAddButton: false,
    showSubmitButton: false,
    showDateField: false,
    showDatePicker: false,
    hideAddAssignmentForm: false,
    // batch adding assignments when there are none
    needLock: false
  }

  // create the class list after component mounts
  componentDidMount () {
    actions.classes.getStudentClassesById(this.state.studentId)
      .then(classes => {
        this.setState({classes: classes})
      })

    if (this.props.assignmentParams.classId) {
      this.getClassWeights(this.props.assignmentParams.classId)
    }
  }

  // get the class user selects
  selectClassHandler = (event) => {
    const selectedClassId = event.target.value
    let newAssignment = this.state.newAssignment
    actions.classes.getStudentClass(this.state.studentId, selectedClassId).then(selectedStudentClass => {
      newAssignment.class = selectedStudentClass
      this.setState({
        selectedStudentClass: selectedStudentClass,
        newAssignment: newAssignment
      })
    })
    actions.classes.getClassById(selectedClassId).then(selectedClass => {
      this.getClassWeights(selectedClass.id)
      this.setState({
        selectedClass: selectedClass,
        showWeightsField: true
      })
    })
  }

  getClassWeights (classId) {
    actions.weights.getClassWeightsByClassId(classId)
      .then(weights => {
        this.setState({weights: weights})
      })
  }

  selectWeightHandler = (event) => {
    let newAssignment = this.state.newAssignment
    newAssignment.weight_id = parseInt(event.target.value)
    this.setState({ newAssignment: newAssignment, showNameField: true, showDateField: true })

    if (this.state.selectedStudentClass.assignments.length <= 0) {
      actions.classes.lockClassWeight(this.state.selectedClass.id, newAssignment.weight_id)
      this.setState({needLock: true})
    }
  }

  addAssignmentNameHandler = (event) => {
    let newAssignment = this.state.newAssignment
    newAssignment.name = event.target.value
    this.setState({ newAssignment: newAssignment, showAddButton: true })
  }

  addAssignmentButtonHandler = () => {
    const { newAssignments, newAssignment } = this.state
    if (newAssignment.name) {
      newAssignments[newAssignment.name + newAssignment.due + newAssignment.class] = newAssignment
      console.log(newAssignments)
      this.setState({
        newAssignment: {
          name: null,
          due: moment(this.props.assignmentParams.due),
          weight_id: null,
          class: null
        },
        newAssignments: newAssignments,
        showSubmitButton: true,
        selectedClass: null,
        hideAddAssignmentForm: true
      })
      this.clearForm()
    } else {
      console.error('This assignment needs a name!')
    }
  }

  submitNewAssignmentsHandler = async () => {
    const newAssignments = this.state.newAssignments
    newAssignments.forEach(async newAssignment => {
      if (newAssignment.weight_id) {
        await actions.assignments.createAssignment(this.state.selectedClass, newAssignment)
      } else {
        console.error('You must select a weight!')
      }
    })
    if (this.state.needLock) {
      await actions.classes.unlockClass(this.state.selectedClass.id)
    }
  }

  getDateSelection = (selectedDate) => {
    let newAssignment = this.state.newAssignment
    newAssignment.due = new Date(selectedDate)
    this.setState({newAssignment: newAssignment, showDatePicker: false})
    console.log(newAssignment)
  }

  clearForm () {
    this.setState({givenDate: null, newAssignment: {due: null, class: null}, showNameField: false, showDateField: false, showAddButton: false, showClassField: false, showWeightsField: false})
  }

  renderClassSelection = () => {
    const classes = this.state.classes
    return (
      <select onChange={this.selectClassHandler} style={this.state.selectedStudentClass ? {color: this.state.selectedStudentClass.getColor()} : null}>
        <option value="null">Select a Class</option>
        {classes.map(studentClass => {
          return (
            <option value={studentClass.id} key={studentClass.id}>{studentClass.name}</option>
          )
        })}
      </select>
    )
  }

  renderWeightSelection = () => {
    const { weights } = this.state
    return (
      <select onChange={this.selectWeightHandler}>
        <option value="null">Select a Grading Category</option>
        {weights.map(weight => {
          return (
            <option value={weight.id} key={weight.id}>{weight.name}</option>
          )
        })}
      </select>
    )
  }

  renderNewAssignments = () => {
    const { newAssignments } = this.state
    return Object.keys(newAssignments).map((key, index) => {
      return (
        <NewAssignment key={index} assignment={newAssignments[key]} removeNewAssignment={this.removeNewAssignment} />
      )
    })
  }

  renderSubmitAssignmentButton = () => {
    const newAssignments = this.state.newAssignments
    return (
      <div className='add-assignment-submit-button'>
        <p onClick={this.submitNewAssignmentsHandler}>Submit new assignment{ (Object.keys(newAssignments).length > 1) ? 's' : null}</p>
      </div>
    )
  }

  removeNewAssignment = (assignment) => {
    let newAssignments = this.state.newAssignments
    delete newAssignments[assignment.name + assignment.due + assignment.class]
    if (Object.keys(newAssignments).length === 0) {
      this.setState({hideAddAssignmentForm: false, showSubmitButton: false, showClassField: true})
    }
    // newAssignments = newAssignments.removeElement(assignment.id, 1)
    this.setState({newAssignments: newAssignments})
  }

  render () {
    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className='add-assignment-container'>
          { this.state.hideAddAssignmentForm
            ? null
            : <div className='add-assignment-form'>
              <h1>Add Assignment</h1>
              {this.state.showClassField
                ? <div className='add-assignment-form-row'>
                  <p>Class</p>
                  {this.renderClassSelection()}
                </div>
                : null
              }
              {this.state.showWeightsField
                ? <div className='add-assignment-form-row'>
                  <p>Weight</p>
                  {this.renderWeightSelection()}
                </div>
                : null
              }
              {this.state.showNameField
                ? <div className='add-assignment-form-row'>
                  <label htmlFor="assignmentName">Assignment name</label>
                  <input autoComplete="off" type="text" name="assignmentName" onChange={this.addAssignmentNameHandler} />
                </div>
                : null
              }
              {this.state.showDateField
                ? <div className='add-assignment-form-row'>
                  <p>Due date</p>
                  {this.state.newAssignment.due
                    ? <div>
                      <p className='add-assignment-due-date' onClick={() => this.setState({showDatePicker: true})}>{moment(this.state.newAssignment.due).format('MMMM D, YYYY')}</p>
                      {this.state.showDatePicker
                        ? <DatePicker givenDate={this.state.newAssignment.due} returnSelectedDay={this.getDateSelection}/>
                        : null}
                    </div>
                    : <div>
                      <p className='add-assignment-due-date' onClick={() => this.setState({showDatePicker: true})}>Select due date</p>
                      {this.state.showDatePicker
                        ? <DatePicker givenDate={this.state.newAssignment.due} returnSelectedDay={this.getDateSelection}/>
                        : null}
                    </div>
                  }
                </div>
                : null
              }
              <div className="add-assignment-add-button" onClick={this.addAssignmentButtonHandler} >
                <p className={this.state.showAddButton ? '' : 'not-available'}>Add Assignment</p>
              </div>
            </div> }
          {(Object.keys(this.state.newAssignments).length !== 0)
            ? <div className="add-assignment-new-assignments-container">
              <h2>New assignments</h2>
              <div className="add-assignment-new-assignments">
                {this.renderNewAssignments()}
              </div>
            </div>
            : null
          }
          {this.state.showSubmitButton
            ? <div className="add-assignment-submit-row">
              {this.renderSubmitAssignmentButton()}
              <div className="add-assignment-add-another-button">
                <p onClick={() => this.setState({showClassField: true, hideAddAssignmentForm: false})}>Add another assignment</p>
              </div>
            </div>
            : null
          }
        </div>
      </SkModal>
    )
  }
}

AddAssignment.propTypes = {
  rootStore: PropTypes.object,
  closeModal: PropTypes.function,
  assignmentParams: PropTypes.object
}

export default AddAssignment
