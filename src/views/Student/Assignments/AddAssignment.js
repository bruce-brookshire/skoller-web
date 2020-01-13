import React, { Component } from 'react'
import SkModal from '../../components/SkModal/SkModal'
import actions from '../../../actions'
import moment from 'moment'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import DatePicker from '../../components/DatePicker'
import NewAssignment from './NewAssignment'
import {showSnackbar} from '../../../utilities/snackbar'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import Sammi from '../../components/Sammi'
import { browserHistory } from 'react-router'

@inject('rootStore')
@observer
class AddAssignment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // student info stuff
      newAssignment: {
        due: this.props.assignmentParams.due,
        name: null,
        weight_id: null,
        class: this.props.assignmentParams.class,
        created_on: 'web',
        share: true
      },
      newAssignments: {},
      weights: [],
      classes: [],
      selectedClass: {},
      selectedStudentClass: null,
      studentId: this.props.rootStore.userStore.user.student.id,

      // visibility stuff
      showClassField: true,
      showWeightsField: false,
      showNameField: false,
      showAddButton: false,
      showSaveButton: false,
      showDateField: false,
      showDatePicker: false,
      formView: false,
      lockView: false,
      notWeighted: false,
      showShareField: false,
      autoComplete: {weights: false, classes: false},

      // batch adding assignments when there are none
      needLock: false
    }

    // get the student class and class objects from the class passed through assignmentParams
    if (this.props.assignmentParams.class) {
      this.setState({selectedStudentClass: this.props.assignmentParams.class})
      let selectedClassId = this.props.assignmentParams.class.id
      let newAssignment = this.state.newAssignment
      actions.classes
        .getStudentClass(this.state.studentId, selectedClassId)
        .then(selectedStudentClass => {
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
  }

  // create the class list after component mounts
  componentDidMount () {
    actions.classes
      .getStudentClassesById(this.state.studentId)
      .then(classes => {
        this.setState({ classes: classes })
      })

    if (this.props.assignmentParams.classId) {
      this.getClassWeights(this.props.assignmentParams.classId)
    }
  }

  // get the class user selects
  async selectClassHandler (cl) {
    console.log(cl)
    let newAssignment = this.state.newAssignment
    newAssignment.weight_id = null
    this.setState({newAssignment: newAssignment})
    this.toggleClasses(false)
    let selectedClassId = cl.id
    if (this.state.selectedClass.id === selectedClassId) {
      newAssignment.weight_id = null
    }
    await actions.classes
      .getStudentClass(this.state.studentId, selectedClassId)
      .then(selectedStudentClass => {
        newAssignment.class = selectedStudentClass
        this.setState({
          selectedStudentClass: selectedStudentClass,
          newAssignment: newAssignment
        })
      })
    actions.classes.getClassById(selectedClassId).then(selectedClass => {
      this.getClassWeights(selectedClassId)
      this.setState({
        selectedClass: selectedClass,
        showWeightsField: true
      })
    })
  }

  getClassWeights (classId) {
    actions.weights.getClassWeightsByClassId(classId).then(weights => {
      this.setState({ weights: weights })
    })
  }

  selectWeightHandler = weight => {
    this.setState({autoComplete: {weights: false}})
    let newAssignment = this.state.newAssignment
    if (weight === 'notWeighted') {
      newAssignment.weight_id = null
      this.setState({
        notWeighted: true,
        showNameField: true,
        newAssignment: newAssignment,
        showDateField: true,
        showShareField: true
      })
    } else {
      let i = 0
      this.state.selectedStudentClass.assignments.forEach(assignment => {
        if (assignment.weight_id === weight.id) {
          i += 1
        }
      })
      if (i === 0) {
        this.setState({lockView: true})
      }
      newAssignment.weight_id = weight.id
      this.setState({
        notWeighted: false,
        newAssignment: newAssignment,
        showNameField: true,
        showDateField: true,
        showShareField: true
      })
    }
  }

  addAssignmentNameHandler = event => {
    let newAssignment = this.state.newAssignment
    newAssignment.name = event.target.value
    this.setState({ newAssignment: newAssignment, showAddButton: true })
  }

  addAssignmentButtonHandler = () => {
    const { newAssignments, newAssignment } = this.state

    let givenClass = false
    if (this.props.assignmentParams.class) {
      givenClass = true
    }

    if (!newAssignment.weight_id && !this.state.notWeighted) {
      showSnackbar('Please select a weight for the assignment.')
    } else if (!newAssignment.name) {
      showSnackbar('Please give the assignment a name.')
    } else if (!newAssignment.class.name) {
      showSnackbar('Please select a class for the assignment.')
    } else if (!moment(newAssignment.class.due)) {
      showSnackbar('Please select a due date for the assignment.')
    } else {
      newAssignments[newAssignment.name + newAssignment.due + newAssignment.class.id + newAssignment.weight_id + newAssignment.share] = newAssignment
      this.setState({
        newAssignment: {
          name: null,
          due: moment(this.props.assignmentParams.due),
          weight_id: null,
          class: null,
          share: true
        },
        newAssignments: newAssignments,
        showSaveButton: true,
        selectedClass: givenClass ? this.state.selectedClass : null,
        selectedStudentClass: givenClass ? this.state.selectedStudentClass : null,
        formView: true
      })
      this.resetFormState()
    }
  }

  addAnotherAssignmentButtonHandler = () => {
    this.setState({
      showClassField: true,
      showWeightsField: false,
      showDateField: false,
      showNameField: false,
      showAddButton: false,
      showShareField: false,
      notWeighted: false,
      formView: false
    })

    if (this.props.assignmentParams.class) {
      this.setState({selectedStudentClass: this.props.assignmentParams.class})
      let selectedClassId = this.props.assignmentParams.class.id
      let newAssignment = this.state.newAssignment
      actions.classes
        .getStudentClass(this.state.studentId, selectedClassId)
        .then(selectedStudentClass => {
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
  }

  saveNewAssignmentsHandler = async () => {
    const newAssignments = this.state.newAssignments
    Object.keys(newAssignments).forEach(async newAssignment => {
      let assignment = newAssignments[newAssignment]

      let assignmentToSubmit = {
        name: assignment.name,
        weight_id: assignment.weight_id,
        due: new Date(assignment.due),
        is_completed: false,
        is_private: !assignment.share,
        created_on: 'web'
      }

      actions.assignments.createStudentAssignment(this.state.studentId, assignment.class.id, assignmentToSubmit)
        .then(() => {
          actions.assignments.getAllStudentAssignments(this.state.studentId)
        })
      //  TODO if (needLock === true) do stuff here to unlock
    })
    let successMessage = 'Created ' + Object.keys(this.state.newAssignments).length.toString() + ' new assignment' + ((Object.keys(this.state.newAssignments).length > 1) ? 's' : '') + '.'
    showSnackbar(successMessage, 'success')
    this.props.closeModal()
  }

  getDateSelection = selectedDate => {
    let newAssignment = this.state.newAssignment
    newAssignment.due = new Date(selectedDate)
    this.setState({ newAssignment: newAssignment, showDatePicker: false })
  }

  resetFormState () {
    let givenClass = false
    if (this.props.assignmentParams.class) {
      givenClass = true
    }
    this.setState({
      // student info stuff
      newAssignment: {
        due: this.props.assignmentParams.due,
        name: null,
        weight_id: null,
        class: this.props.assignmentParams.class,
        created_on: 'web',
        share: true
      },
      selectedClass: givenClass ? this.state.selectedClass : {},
      selectedStudentClass: givenClass ? this.state.selectedStudentClass : null,
      autoComplete: {weights: false, classes: false},

      // visibility stuff
      showClassField: true,
      showWeightsField: false,
      showNameField: false,
      showAddButton: false,
      showSaveButton: true,
      showDateField: false,
      showDatePicker: false,
      formView: true,
      notWeighted: false,
      showShareField: false
    })
  }

  renderClassOptions = () => {
    const classes = this.state.classes
    return (
      <div>
        {classes.map(studentClass => {
          return (
            <div
              className='add-assignment-autocomplete-option'
              key={studentClass.id}
              onClick={() => {
                this.selectClassHandler(studentClass)
              }}
              style={{color: studentClass.getColor()}}
            >
              {studentClass.name}
            </div>
          )
        })}
      </div>
    )
  }

  toggleClasses (bool) {
    let autoComplete = this.state.autoComplete
    autoComplete.classes = bool
    this.setState({autoComplete})
  }

  renderClassSelection () {
    let givenClass = null
    if (this.props.assignmentParams.class) {
      givenClass = this.props.assignmentParams.class
    } else {
      givenClass = false
    }
    let classSelection = this.state.selectedStudentClass
    let classSelectionName
    if (this.state.selectedStudentClass) {
      classSelectionName = this.state.selectedStudentClass.name
    } else {
      classSelectionName = 'Select a Class'
    }
    return (
      <div>
        <div>
          {givenClass
            ? <div
              className='add-assignment-field-selection'
              style={{color: '#' + givenClass.color, cursor: 'default'}}
            >
              {givenClass.name}
            </div>
            : <div
              value={null}
              onClick={() => {
                this.toggleClasses(true)
              }}
              className='add-assignment-field-selection'
              style={{color: classSelection ? classSelection.getColor() : null}}
            >
              {classSelectionName}
            </div>
          }
        </div>
        <SkSelectDropDown
          optionsMap={this.renderClassOptions}
          toggle={() => this.toggleClasses(false)}
          show={this.state.autoComplete.classes}
        />
      </div>
    )
  }

  sortWeights (weightsArray) {
    let sortedWeights = []
    weightsArray.forEach(weight => {
      let assignmentsCount = 0
      this.state.selectedStudentClass.assignments.forEach(assignment => {
        if (assignment.weight_id === weight.id) {
          assignmentsCount += 1
        }
      })
      if (assignmentsCount > 0) {
        sortedWeights.push({weight, hasAssignments: true})
      } else {
        sortedWeights.unshift({weight, hasAssignments: false})
      }
    })
    return sortedWeights
  }

  renderWeightsOptions = () => {
    const weights = this.state.weights
    let sortedWeights = this.sortWeights(weights)
    return (
      <div>
        {sortedWeights.map(sortedWeight => {
          let weight = sortedWeight.weight
          let hasAssignments = sortedWeight.hasAssignments
          return (
            <div
              className='add-assignment-autocomplete-option'
              key={weight.id}
              onClick={() => {
                this.selectWeightHandler(weight)
              }}
            >
              <div>
                {weight.name}
              </div>
              <span>
                {!hasAssignments &&
                  'Add assignments'
                }
              </span>
            </div>
          )
        })}
        <div
          className='add-assignment-autocomplete-option'
          onClick={() => {
            this.selectWeightHandler('notWeighted')
          }}
        >
          <div>
            Not weighted
          </div>
        </div>
      </div>
    )
  }

  toggleWeights (bool) {
    let autoComplete = this.state.autoComplete
    autoComplete.weights = bool
    this.setState({autoComplete})
  }

  renderWeightSelection = () => {
    let weightName = 'Select a Weight'
    if (this.state.selectedStudentClass && (this.state.newAssignment.weight_id !== null)) {
      if (!this.state.notWeighted) {
        weightName = this.state.selectedStudentClass.weights.find(weight => weight.id === this.state.newAssignment.weight_id).name
      }
    }
    if (this.state.notWeighted) {
      weightName = 'Not weighted'
    }
    return (
      <div>
        <div>
          <div onClick={() => this.toggleWeights(!this.state.autoComplete.weights)} className='add-assignment-field-selection'>
            {weightName}
          </div>
        </div>
        <SkSelectDropDown
          optionsMap={this.renderWeightsOptions}
          toggle={() => this.toggleWeights(false)}
          show={this.state.autoComplete.weights}
        />
      </div>
    )
  }

  renderNewAssignments = () => {
    const { newAssignments } = this.state
    return Object.keys(newAssignments).map((key, index) => {
      return (
        <NewAssignment
          key={index}
          assignment={newAssignments[key]}
          removeNewAssignment={this.removeNewAssignment}
        />
      )
    })
  }

  renderSaveAssignmentButton = () => {
    const newAssignments = this.state.newAssignments
    return (
      <div className="add-assignment-save-button">
        <p onClick={this.saveNewAssignmentsHandler}>
          Save new assignment
          {Object.keys(newAssignments).length > 1 ? 's' : null}
        </p>
      </div>
    )
  }

  removeNewAssignment = assignment => {
    let newAssignments = this.state.newAssignments
    delete newAssignments[assignment.name + assignment.due + assignment.class.id + assignment.weight_id + assignment.share]
    if (Object.keys(newAssignments).length === 0) {
      this.setState({
        formView: false,
        showSaveButton: false,
        showClassField: true
      })
    }
    // newAssignments = newAssignments.removeElement(assignment.id, 1)
    this.setState({ newAssignments: newAssignments })
  }

  toggleShareOption = (bool) => {
    let newAssignment = this.state.newAssignment
    newAssignment.share = bool
    this.setState({newAssignment: newAssignment})
  }

  renderForm () {
    return (
      <div className="add-assignment-form">
        <h1>Add Assignment</h1>
        {(Object.keys(this.state.newAssignments).length > 0)
          ? <p
            className="add-assignment-back-button"
            onClick={() => {
              this.setState({formView: true})
              this.resetFormState()
            }}
          >
            <span>👈 </span>
            Go back ({Object.keys(this.state.newAssignments).length.toString()} assignment{Object.keys(this.state.newAssignments).length > 1 ? 's' : ''} unsaved)
          </p>
          : null
        }
        {this.state.showClassField ? (
          <div className="add-assignment-form-row">
            <p>Class</p>
            {this.renderClassSelection()}
          </div>
        ) : null}
        {(this.state.showWeightsField === true || this.props.assignmentParams.class) ? (
          <div className="add-assignment-form-row">
            <p>Weight</p>
            {this.renderWeightSelection()}
            {this.state.notWeighted ? (
              <small>This assignment will not affect your grade.</small>
            ) : null}
          </div>
        ) : null}
        {this.state.showNameField ? (
          <div className="add-assignment-form-row">
            <label htmlFor="assignmentName">Assignment name</label>
            <input
              autoComplete="off"
              type="text"
              name="assignmentName"
              onChange={this.addAssignmentNameHandler}
            />
          </div>
        ) : null}
        {this.state.showDateField ? (
          <div className="add-assignment-form-row">
            <p>Due date</p>
            {this.state.newAssignment.due ? (
              <div>
                <p
                  className="add-assignment-due-date"
                  onClick={ () => this.setState({ showDatePicker: true })}
                >
                  {moment(this.state.newAssignment.due).format(
                    'MMMM D, YYYY'
                  )}
                </p>
                {this.state.showDatePicker ? (
                  <DatePicker
                    givenDate={this.state.newAssignment.due}
                    returnSelectedDay={this.getDateSelection}
                    inline={false}
                  />
                ) : null}
              </div>
            ) : (
              <div>
                <p
                  className="add-assignment-due-date"
                  onClick={ () => this.setState({ showDatePicker: true })}
                >
                  Select due date
                </p>
                {this.state.showDatePicker ? (
                  <DatePicker
                    givenDate={this.state.newAssignment.due}
                    returnSelectedDay={this.getDateSelection}
                  />
                ) : null}
              </div>
            )}
          </div>
        ) : null}
        {this.state.showShareField
          ? <div className="add-assignment-form-row">
            <p>Share</p>
            <div className="add-assignment-share-row">
              <label
                className={this.state.newAssignment.share === true ? 'is-active' : null}
              >
                <input
                  type="radio"
                  value={true}
                  checked={this.state.newAssignment.share === true}
                  onChange={() => this.toggleShareOption(true)}
                />
                <div className="radio-button" />
                <p>Share with class as update</p>
              </label>
              <label
                className={this.state.newAssignment.share === false ? 'is-active' : null}
              >
                <input
                  type="radio"
                  value={false}
                  checked={this.state.newAssignment.share === false}
                  onChange={() => this.toggleShareOption(false)}
                />
                <div className="radio-button" />
                <p>Keep Private</p>
              </label>
            </div>
          </div>
          : null
        }
        <div
          className="add-assignment-add-button"
          onClick={this.addAssignmentButtonHandler}
        >
          <p className={this.state.showAddButton ? '' : 'not-available'}>
            Add Assignment
          </p>
        </div>
      </div>
    )
  }

  renderFormHandler () {
    return (
      <div>
        {Object.keys(this.state.newAssignments).length !== 0 ? (
          <div className="add-assignment-new-assignments-container">
            <h1>
              New assignment
              {Object.keys(this.state.newAssignments).length > 1 ? 's' : null}
            </h1>
            <div className="add-assignment-new-assignments">
              {this.renderNewAssignments()}
            </div>
          </div>
        ) : null}
        {this.state.showSaveButton ? (
          <div
            className="add-assignment-save-row"
            style={Object.keys(this.state.newAssignments).length >= 4 ? {boxShadow: '0 -4px 12px rgba(0,0,0,.05)', paddingBottom: '8px'} : null}
          >
            {this.renderSaveAssignmentButton()}
            <div className="add-assignment-add-another-button">
              <p
                onClick={ () =>
                  this.addAnotherAssignmentButtonHandler()
                }
              >
                Add another assignment
              </p>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  cancelLock = () => {
    let newAssignment = this.state.newAssignment
    newAssignment.weight_id = null
    this.setState({
      newAssignment,
      lockView: false,
      showDateField: false,
      showShareField: false,
      showNameField: false
    })
  }

  sendToDiy () {
    browserHistory.push({
      pathname: `/class/${this.state.selectedClass.id}/syllabus_tool/`,
      state: {
        isDIY: true,
        weightId: this.state.newAssignment.weight_id
      }
    })
  }

  submitLock = () => {
    if (Object.keys(this.state.newAssignments).length > 0) {
      this.saveNewAssignmentsHandler()
    }
    this.sendToDiy()
  }

  renderLockView () {
    let newAssignmentsCount = Object.keys(this.state.newAssignments).length
    return (
      <div className='add-assignment-lock-view'>
        <Sammi
          position='left'
          emotion='ooo'
          message='Looks like there are no assignments for this category. Use the syllabus to add them all!'
        />
        <div className='add-assignment-syllabus-control'>
          <div
            onClick={() => this.cancelLock()}
            className='add-assignment-syllabus-button'
          >
            <p>Cancel</p>
          </div>
          <div
            onClick={() => this.submitLock()}
            className='add-assignment-syllabus-cancel'
          >
            <p>Start adding assignments</p>
            {newAssignmentsCount > 0 &&
              <small>(And save the {newAssignmentsCount} new assignment{newAssignmentsCount > 1 ? 's' : ''})</small>
            }
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className="add-assignment-container">
          {this.state.lockView
            ? this.renderLockView()
            : this.state.formView
              ? this.renderFormHandler()
              : this.renderForm()
          }
        </div>
      </SkModal>
    )
  }
}

AddAssignment.propTypes = {
  rootStore: PropTypes.object,
  closeModal: PropTypes.func,
  assignmentParams: PropTypes.object
}

export default AddAssignment
