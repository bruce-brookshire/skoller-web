import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'
// import { browserHistory } from 'react-router'

@inject('rootStore') @observer

class Tasks extends React.Component {
  static studentClasses = {}

  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      tasks: []
    }
  }

  componentWillMount () {
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
      this.setState({tasks})
    }).catch(() => false)
  }

  render () {
    const card = this.state.tasks.map((task) =>
      <div className="task-container" key={task.class_id}>
        <div className="task">
          <h1>{task.parentClassGetter}</h1>
          <div className="task-content">
            <p>{task.name}</p>
          </div>
        </div>
      </div>
    )
    console.log('see below')
    console.log(card)
    console.log(this.state.tasks)

    return (
      <StudentLayout>
        {card}
      </StudentLayout>
    )
  }
}

Tasks.propTypes = {
  rootStore: PropTypes.object
}

export default Tasks
