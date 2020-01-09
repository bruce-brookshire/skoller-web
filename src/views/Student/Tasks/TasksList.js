import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import TaskCard from './TaskCard'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'

@inject('rootStore') @observer

class TasksList extends React.Component {
  static studentClasses = {}

  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      tasks: [],
      loading: true
    }

    this.getStudentTasks()
  }

  async getStudentTasks () {
    const {user: {student}} = this.props.rootStore.userStore

    await actions.classes.getStudentClassesById(student.id).then((classes) => {
      classes.forEach(studentClass => { TasksList.studentClasses[studentClass.id] = studentClass })
      this.setState({classes})
    }).catch(() => false)

    await actions.assignments.getTaskAssignments(student.id).then((tasks) => {
      const parentClassGetter = function () {
        return TasksList.studentClasses[this.class_id]
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

  renderNoTasks () {
    return (
      <div style={{color: 'rgba(0,0,0,0.3)', width: '100%', textAlign: 'center', padding: '2rem'}}>
        No to-do&apos;s.
      </div>
    )
  }

  renderTasks () {
    let i = 0
    if (this.state.tasks.length === 0) {
      return (
        this.renderNoTasks()
      )
    } else {
      let taskCount = 0
      this.state.tasks.forEach(task => {
        let daysAway = moment(task.due).diff(moment(), 'days')
        let maxDays = this.props.maxDays ? this.props.maxDays : 10000
        let maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000
        if (daysAway <= maxDays && i <= maxTasks) {
          taskCount += 1
        }
      })
      console.log(taskCount)
      if (taskCount === 0) {
        return this.renderNoTasks()
      } else {
        return (
          this.state.tasks.map(task => {
            let cl = this.getClassForTask(task)
            let daysAway = moment(task.due).diff(moment(), 'days')
            let maxDays = this.props.maxDays ? this.props.maxDays : 10000
            let maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000
            i += 1
            if (daysAway <= maxDays && i <= maxTasks) {
              return (
                <div key={task.id}>
                  <TaskCard task={task} clName={cl.clName} clColor={cl.clColor} />
                </div>
              )
            }
          })
        )
      }
    }
  }

  renderContent () {
    return (
      this.renderTasks()
    )
  }

  render () {
    return (
      <div>
        {this.state.loading && <SkLoader />}
        {!this.state.loading && this.renderContent()}
      </div>
    )
  }
}

TasksList.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  maxTasks: PropTypes.number,
  maxDays: PropTypes.number
}

export default TasksList
