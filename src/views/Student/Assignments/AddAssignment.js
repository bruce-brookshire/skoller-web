import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { inject, observer } from 'mobx-react'
// import actions from '../../../actions'
// import Loading from '../../../components/Loading'
import moment from 'moment'

class AddAssignment extends Component {
  state = {
    newAssignment: {
      dueDate: new Date(),
      title: null
    },
    newAssignments: []
  }

  datePickerChangeHandler = (date) => {
    const { newAssignment } = this.state
    // newAssignment.dueDate = date
    this.setState({ newAssignment: newAssignment })
  }

  addAssignmentChangeHandler = (event) => {
    const { newAssignment } = this.state
    newAssignment.title = event.target.value
    this.setState({ newAssignment: newAssignment })
  }

  addAssignmentSubmitHandler = () => {
    const { newAssignments, newAssignment } = this.state
    if (newAssignment.title) {
      newAssignments.push(newAssignment)
      this.setState({
        newAssignment: {
          title: null,
          dueDate: new Date()
        },
        newAssignments: newAssignments
      })
    } else {
      console.error('This assignment needs a title!')
    }
  }

  renderNewAssignments = () => {
    const { newAssignments } = this.state
    return newAssignments.map((a, index) => {
      console.log('assignment!')
      console.log(a)
      return (
        <div className='cn-class-list-container' key={a.title + index}>
          <h2>{a.title}</h2>
          <p>{String(moment(a.dueDate))}</p>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div id='cn-class-detail-container'>
          <h1>Add Assignment</h1>
          <label htmlFor="assignmentName">Assignment Title</label><br />
          <input type="text" name="assignmentName" onChange={this.addAssignmentChangeHandler} />
          <button onClick={this.addAssignmentSubmitHandler} >Add Assignment</button>
          <div className='cn-class-assignments-container'>
            {this.renderNewAssignments()}
          </div>
        </div>
      </div>
    )
  }
}

export default AddAssignment
