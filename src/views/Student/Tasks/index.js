import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
import TaskCard from './TaskCard'
import SkLoader from '../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer

class Tasks extends React.Component {
  static studentClasses = {}

  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      tasks: [],
      loading: true
    }

    this.getStudentTasks()
    this.props.rootStore.studentNavStore.setActivePage('tasks')
  }

  getStudentTasks () {
    const {user: {student}} = this.props.rootStore.userStore

    actions.classes.getStudentClassesById(student.id).then((classes) => {
      classes.forEach(studentClass => { Tasks.studentClasses[studentClass.id] = studentClass })
      this.setState({classes})
    }).catch(() => false)

    actions.assignments.getTaskAssignments(student.id).then((tasks) => {
      const parentClassGetter = function () {
        return Tasks.studentClasses[this.class_id]
      }
      tasks.forEach(task => {
        task.getParentClass = parentClassGetter.bind(task)
      })
      this.setState({tasks, loading: false})
    }).catch(() => false)
  }

  getClassForTask (task) {
    let clName, clColor
    this.state.classes.forEach(cl => {
      if (cl.id === task.class_id) {
        clName = cl.name
        clColor = cl.color
      }
    })
    return {clName, clColor}
  }

  renderTasks () {
    return (
      this.state.tasks.map(task => {
        let cl = this.getClassForTask(task)
        return (
          <div key={task.id}>
            <TaskCard task={task} clName={cl.clName} clColor={cl.clColor} />
          </div>
        )
      })
    )
  }

  renderContent () {
    return (
      <div className='tasks-container'>
        {this.renderTasks()}
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading && <SkLoader />}
        {!this.state.loading && this.renderContent()}
      </StudentLayout>
    )
  }
}

Tasks.propTypes = {
  rootStore: PropTypes.object
}

export default Tasks
