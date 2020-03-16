import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import TaskCard from './TaskCard'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'

@inject('rootStore') @observer
class TasksList extends React.Component {
  static studentClasses = {}

  constructor (props) {
    super(props)
    this.state = {
      classes: this.props.rootStore.studentClassesStore.classes,
      tasks: this.props.rootStore.studentAssignmentsStore.assignments,
      loading: false,
      seeMore: false
    }
  }

  getClassForTask (task) {
    let clName, clColor
    this.props.rootStore.studentClassesStore.classes.forEach(cl => {
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

  getSortedAssignments () {
    return this.props.rootStore.studentAssignmentsStore.assignments
      .slice()
      .sort((a, b) => moment(a.due).isBefore(moment(b.due)) ? -1 : 1)
  }

  getTaskDisplayCount () {
    let i = 0
    this.getSortedAssignments().forEach(task => {
      let daysAway = moment(task.due).diff(moment(), 'days')
      let maxDays = this.props.maxDays ? this.props.maxDays - 1 : 10000
      if (
        (daysAway <= maxDays) && // if maxDays prop is given, check to make sure that task is within maxDays
        (daysAway >= 0 || this.props.cl) && // make sure task is in the future, unless it's within a class detail view
        (this.props.cl ? task.class_id === this.props.cl.id : true) // if class detail view, make sure assignment is for that class
      ) {
        i += 1
      }
    })
    return i
  }

  renderTasks () {
    let i = 0
    if (this.props.rootStore.studentAssignmentsStore.assignments.length === 0 || this.getTaskDisplayCount().length <= 0) {
      return (
        this.renderNoTasks()
      )
    } else {
      let taskCount = 0
      this.getSortedAssignments().forEach(task => {
        let daysAway = moment(task.due).diff(moment(), 'days')
        let maxDays = this.props.maxDays ? this.props.maxDays : 10000
        let maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000
        if (daysAway <= maxDays && i <= maxTasks) {
          taskCount += 1
        }
      })
      if (taskCount === 0) {
        return this.renderNoTasks()
      } else {
        return (
          this.getSortedAssignments().map(task => {
            let cl = this.getClassForTask(task)
            let daysAway = moment(task.due).diff(moment(), 'days')
            let maxDays = this.props.maxDays ? this.props.maxDays - 1 : 10000
            let maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000
            if (
              (daysAway <= maxDays) && // if maxDays prop is given, check to make sure that task is within maxDays
              (i < maxTasks || this.state.seeMore) && // if number of tasks already displayed is greater than limit given by prop maxTasks, don't display... unless user has clicked See More
              (daysAway >= 0 || this.props.cl) && // make sure task is in the future, unless it's within a class detail view
              (this.props.cl ? task.class_id === this.props.cl.id : true) // if class detail view, make sure assignment is for that class
            ) {
              i += 1
              return (
                <div key={task.id}>
                  <TaskCard task={task} clName={cl.clName} clColor={cl.clColor} classDetailView={this.props.cl} />
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
      <div>
        {this.renderTasks()}
        {
          !this.state.seeMore &&
          this.props.maxTasks &&
          this.props.maxTasks < this.getTaskDisplayCount() &&
          <div
            style={{color: '#57B9E4', cursor: 'pointer', textAlign: 'center', marginBottom: '8px'}}
            onClick={() => this.setState({seeMore: true})}
          >
            See all {this.getTaskDisplayCount()} {this.props.cl ? 'assignments' : "to-do's"}
          </div>
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {(this.props.rootStore.studentAssignmentsStore.loading || this.props.rootStore.studentClassesStore.loading) && <SkLoader />}
        {!(this.props.rootStore.studentAssignmentsStore.loading || this.props.rootStore.studentClassesStore.loading) && this.renderContent()}
      </div>
    )
  }
}

TasksList.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  maxTasks: PropTypes.number,
  maxDays: PropTypes.number,
  seeMore: PropTypes.bool,
  cl: PropTypes.object
}

export default TasksList
