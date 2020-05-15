import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class SiTasksList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      assignments: this.getAllTasks(),
      seeMore: false
    }
  }

  static propTypes = {
    classes: PropTypes.array,
    cl: PropTypes.object,
    maxDays: PropTypes.number,
    maxTasks: PropTypes.number
  }

  getAllTasks () {
    return [].concat.apply([], this.props.classes.map(cl => cl.assignments)).sort((a, b) => moment(a.due).isAfter(moment(b.due)) ? 1 : -1)
  }

  taskValidity (t, i) {
    const daysAway = moment(t.due).diff(moment(), 'days')
    const maxDays = this.props.maxDays ? this.props.maxDays - 1 : 10000
    const maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000

    if (
      (daysAway <= maxDays) && // if maxDays prop is given, check to make sure that task is within maxDays
      (daysAway >= 0 || this.props.cl) && // make sure task is in the future, unless it's within a class detail view
      (i === false ? !i : (i < maxTasks || this.state.seeMore)) && // if number of tasks already displayed is greater than limit given by prop maxTasks, don't display... unless user has clicked See More or unless i is not given
      (this.props.cl ? t.class_id === this.props.cl.id : true) // if class detail view, make sure assignment is for that class
    ) {
      return true
    } else {
      return false
    }
  }

  getTaskDisplayCount () {
    let i = 0
    this.state.assignments.forEach(task => {
      if (this.taskValidity(task)) {
        i += 1
      }
    })
    return i
  }

  render () {
    let tasks = this.state.assignments
    let i = 0
    return (
      <div className='si-tasks-list'>
        <div className='si-tasks-list-detail'>sah</div>
        <div className='si-tasks-list-tasks'>
          {tasks.map(t => {
            if (this.taskValidity(t, i)) {
              i += 1
              let color = this.props.classes.find(cl => cl.id === t.class_id).getColor()

              return (
                <div key={tasks.indexOf(t)} className='si-tasks-list-task'>
                  <div className='si-tasks-list-task-row'>
                    <div className='si-task-title' style={{color}}>{t.name}</div>
                    <div className='si-task-weight'>{(Math.round(t.weight * 1000) / 10) + '% of grade'}</div>
                  </div>
                  <div className='si-tasks-list-task-row'>
                    <div className='si-task-due'>{moment(t.due).fromNow()}</div>
                    <div className='si-task-class'>{this.props.classes.find(cl => cl.id === t.class_id).name}</div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}
