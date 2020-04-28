import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import TasksList from './TasksList'
import AddAssignment from '../Assignments/AddAssignment'
import SkSelect from '../../components/SkSelect'
import moment from 'moment'

@inject('rootStore') @observer

class Tasks extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.location = this.props.location

    this.props.rootStore.navStore.setActivePage('tasks')

    this.state = {
      showAddAssignmentModal: false,
      outlookChoice: 'Rest of the semester'
    }
  }

  renderOutlookSelect () {
    const options = ['Next 10 days', 'Next 30 days', 'Rest of the semester']
    return (
      <SkSelect selection={this.state.outlookChoice} optionsMap={() => {
        return (
          options.map(o => {
            return (
              <div
                key={options.indexOf(o)}
                onClick={() => this.setState({outlookChoice: o})}
                className='tasks-filter-option'
              >
                {o}
              </div>
            )
          })
        )
      }} />
    )
  }

  renderCount () {
    let count = this.getTaskDisplayCount()
    return (
      <p className='tasks-sub-heading'>
        {count} {'assignment' + (count > 1 ? 's' : '')}
      </p>
    )
  }

  getTaskDisplayCount () {
    let i = 0
    this.props.rootStore.studentAssignmentsStore.assignments.forEach(task => {
      if (this.taskValidity(task)) {
        i += 1
      }
    })
    return i
  }

  outlookLogic (task) {
    if (this.state.outlookChoice === 'Rest of the semester') {
      return true
    } else if (this.state.outlookChoice === 'Next 10 days') {
      return moment(task.due).diff(moment(), 'day') <= 10
    } else if (this.state.outlookChoice === 'Next 30 days') {
      return moment(task.due).diff(moment(), 'day') <= 30
    }
  }

  taskValidity (task, i = false) {
    if (
      (this.outlookLogic(task)) && // if outlook is on, check to see if task should be displayed
      (moment(task.due).isAfter(moment()) || moment(task.due).isSame(moment(), 'day'))
    ) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <StudentLayout>
        <div className='tasks-wrapper'>
          <div className='tasks-container'>
            <h1>To-Do&apos;s</h1>
            {this.renderCount()}
            <p className='tasks-filter'>
              {this.renderOutlookSelect()}
            </p>
            <div className='tasks-add-new' onClick={() => this.setState({showAddAssignmentModal: true})}><i className='fas fa-plus' /></div>
            <TasksList outlook={this.state.outlookChoice} displayCountCallback={(displayCount) => this.setState({displayCount})} />
            {this.state.showAddAssignmentModal && <AddAssignment assignmentParams={{}} closeModal={() => this.setState({showAddAssignmentModal: false})} />}
          </div>
        </div>
      </StudentLayout>
    )
  }
}

Tasks.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Tasks
