import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import TasksList from './TasksList'
import AddAssignment from '../Assignments/AddAssignment'

@inject('rootStore') @observer

class Tasks extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.location = this.props.location

    this.props.rootStore.studentNavStore.setActivePage('tasks')

    this.state = {
      showAddAssignmentModal: false
    }
  }

  render () {
    return (
      <StudentLayout>
        <div className='tasks-wrapper'>
          <div className='tasks-container'>
            <h1>To-Do&apos;s</h1>
            <p className='tasks-sub-heading'>Rest of the semester</p>
            <div className='tasks-add-new' onClick={() => this.setState({showAddAssignmentModal: true})}><i className='fas fa-plus' /></div>
            <TasksList />
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
