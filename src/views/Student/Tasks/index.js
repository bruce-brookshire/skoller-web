import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import actions from '../../../actions'

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

  formatDueDate (dd) {
    const today = moment()
    const dueDate = moment(dd)
    const daysTillDue = dueDate.diff(today, 'days')
    if (today.isSame(dueDate, 'date')) {
      return 'Today'
    } else {
      return daysTillDue >= 7 ? dueDate.from(today, 'days') : moment.weekdays((daysTillDue + today.weekday()) % 7)
    }
  }

  render () {
    const card = this.state.tasks.map(task =>
      <div className="task-container" key={task.id}>
        <div className="task">
          <div className="task-heading">
            <h1 className="alignleft">{Tasks.studentClasses[task.class_id].name}</h1>
            <p className="alignright">{this.formatDueDate(task.due)}</p>
          </div>
          <div className="task-content">
            <p className="alignleft">{task.name}</p>
            <p className="alignright">{task.weight * 100 + '%'}</p>
          </div>
        </div>
      </div>
    )

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
