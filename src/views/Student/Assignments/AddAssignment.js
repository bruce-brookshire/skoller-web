import React, { Component } from 'react'
import SkModal from '../../components/SkModal/SkModal'
import actions from '../../../actions'
// import Loading from '../../../components/Loading'
import moment from 'moment'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import DatePicker from '../../components/DatePicker'
import NewAssignment from './NewAssignment'
import {showSnackbar} from '../../../utilities/snackbar'

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
      hideAddAssignmentForm: false,
      notWeighted: false,
      showShareField: false,

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
  selectClassHandler = event => {
    const selectedClassId = event.target.value
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

  getClassWeights (classId) {
    actions.weights.getClassWeightsByClassId(classId).then(weights => {
      this.setState({ weights: weights })
    })
  }

  selectWeightHandler = event => {
    let newAssignment = this.state.newAssignment
    if (event.target.value === 'notWeighted') {
      newAssignment.weight_id = 'notWeighted'
      this.setState({
        notWeighted: true,
        showNameField: true,
        newAssignment: newAssignment,
        showDateField: true,
        showShareField: true
      })
    } else {
      newAssignment.weight_id = parseInt(event.target.value)
      this.setState({
        notWeighted: false,
        newAssignment: newAssignment,
        showNameField: true,
        showDateField: true,
        showShareField: true
      })
    }

    if (this.state.selectedStudentClass.assignments.length <= 0) {
      // TODO stuff here to get lock
      this.setState({ needLock: true })
    }
  }

  addAssignmentNameHandler = event => {
    let newAssignment = this.state.newAssignment
    newAssignment.name = event.target.value
    this.setState({ newAssignment: newAssignment, showAddButton: true })
  }

  addAssignmentButtonHandler = () => {
    const { newAssignments, newAssignment } = this.state

    if (!newAssignment.weight_id) {
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
        selectedClass: null,
        selectedStudentClass: null,
        hideAddAssignmentForm: true
      }).then(this.resetFormState())
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
      hideAddAssignmentForm: false
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

      actions.assignments.createStudentAssignment(this.state.studentId, assignment.class.id, assignmentToSubmit).then(actions.assignments.getAllStudentAssignments(this.state.studentId))
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
      selectedClass: {},
      selectedStudentClass: null,

      // visibility stuff
      showClassField: true,
      showWeightsField: false,
      showNameField: false,
      showAddButton: false,
      showSaveButton: true,
      showDateField: false,
      showDatePicker: false,
      hideAddAssignmentForm: true,
      notWeighted: false,
      showShareField: false
    })
  }

  renderClassSelection = () => {
    const classes = this.state.classes
    let givenClass = null
    if (this.props.assignmentParams.class) {
      givenClass = this.props.assignmentParams.class
    } else {
      givenClass = false
    }
    return (
      <select
        className="add-assignment-class-select"
        onChange={this.selectClassHandler}
        style={
          this.state.selectedStudentClass
            ? { color: this.state.selectedStudentClass.getColor() }
            : { color: '#57B9E4' }}
        defaultValue={this.props.assignmentParams.class}
      >
        {givenClass
          ? <option
            value={givenClass.id}
            style={{color: givenClass.getColor}}
          >
            {givenClass.name}
          </option>
          : <option value={null}>
            Select a Class
          </option>
        }
        {classes.map(studentClass => {
          return (
            (givenClass)
              ? (studentClass.id === givenClass.id)
                ? null
                : <option
                  style={{color: studentClass.getColor}}
                  value={studentClass.id}
                  key={studentClass.id}
                >
                  {studentClass.name}
                </option>
              : <option
                style={{color: studentClass.getColor}}
                value={studentClass.id}
                key={studentClass.id}
              >
                {studentClass.name}
              </option>
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
            <option value={weight.id} key={weight.id}>
              {weight.name}
            </option>
          )
        })}
        <option value="notWeighted">Not weighted</option>
      </select>
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
        hideAddAssignmentForm: false,
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
              this.setState({hideAddAssignmentForm: true})
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

  render () {
    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className="add-assignment-container">
          {(this.state.hideAddAssignmentForm)
            ? this.renderFormHandler()
            : this.renderForm()}
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
