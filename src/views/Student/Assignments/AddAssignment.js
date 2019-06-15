import React, { Component } from 'react'
import SkModal from '../../components/SkModal/SkModal'
import actions from '../../../actions'
// import Loading from '../../../components/Loading'
import moment from 'moment'
import PropTypes from 'prop-types'

class AddAssignment extends Component {
  state = {
    newAssignment: {
      due: new Date().toISOString(),
      name: null,
      weight_id: null,
      created_on: 'web'
    },
    newAssignments: [],
    weights: []
  }

  componentDidMount () {
    const { classId } = this.props.params
    actions.weights.getClassWeightsByClassId(classId)
      .then(weights => {
        this.setState({weights: weights})
      })
  }

  selectWeightHandler = async (event) => {
    const { newAssignment } = this.state
    newAssignment.weight_id = parseInt(event.target.value)
    this.setState({ newAssignment: newAssignment })
    await actions.classes.lockClassWeight(classId, newAssignment.weight_id)
  }

  datePickerChangeHandler = (date) => {
    const { newAssignment } = this.state
    // newAssignment.dueDate = date
    this.setState({ newAssignment: newAssignment })
  }

  addAssignmentChangeHandler = (event) => {
    const { newAssignment } = this.state
    newAssignment.name = event.target.value
    this.setState({ newAssignment: newAssignment })
  }

  addAssignmentSubmitHandler = () => {
    const { newAssignments, newAssignment } = this.state
    if (newAssignment.name) {
      newAssignments.push(newAssignment)
      this.setState({
        newAssignment: {
          name: null,
          due: new Date(),
          weight_id: null
        },
        newAssignments: newAssignments
      })
    } else {
      console.error('This assignment needs a name!')
    }
  }

  submitNewAssignmentsHandler = async () => {
    const { newAssignments } = this.state
    const { classId } = this.props.params
    newAssignments.forEach(async newAssignment => {
      if (newAssignment.weight_id) {
        console.log(newAssignment)
        await actions.assignments.createAssignmentByClassId(classId, newAssignment)
          .then(response => {
            console.log('RESPONSE')
            console.log(response)
          })
        await actions.classes.unlockClass(classId)
      } else {
        console.error('You must select a weight!')
      }
    })
  }

  renderWeightSelection = () => {
    const { weights } = this.state
    return (
      <select onChange={this.selectWeightHandler}>
        <option value="null">Select a Grading Category...</option>
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
    return newAssignments.map((a, index) => {
      console.log('assignment!')
      console.log(a)
      return (
        <div className='cn-class-list-container' key={a.name + index}>
          <h2>{a.name}</h2>
          <p>{String(moment(a.dueDate))}</p>
        </div>
      )
    })
  }

  renderSubmitAssignmentButton = () => {
    const { newAssignments } = this.state
    return (
      <button onClick={this.submitNewAssignmentsHandler} disabled={ newAssignments.length ? null : 'disabled'} >Submit New Assignment{ (newAssignments.length > 1) ? 's' : null}</button>
    )
  }

  render () {
    return (
      <SkModal closeModal={this.props.closeModal}>
        <div id='cn-class-detail-container'>
          <h1>Add Assignment</h1>
          {this.renderWeightSelection()}
          <br/>
          <label htmlFor="assignmentName">Assignment name</label><br />
          <input type="text" name="assignmentName" onChange={this.addAssignmentChangeHandler} />
          <button onClick={this.addAssignmentSubmitHandler} >Add Assignment</button>
          <div className='cn-class-assignments-container'>
            {this.renderNewAssignments()}
            {this.renderSubmitAssignmentButton()}
          </div>
        </div>
      </SkModal>
    )
  }
}

AddAssignment.propTypes = {
  closeModal: PropTypes.function
}

export default AddAssignment
