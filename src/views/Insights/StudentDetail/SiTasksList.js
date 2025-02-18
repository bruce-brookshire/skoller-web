import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import WeightIcon from '../../Student/Tasks/WeightIcon'
import { toJS } from 'mobx'

function WeightWrapper (props) {
  const [hover, setHover] = React.useState(false)

  const renderHover = () => {
    return (
      <div className='hover-container'>
        {props.name} is worth {(Math.round(props.weight * 1000) / 10) + '%'} of the total class grade
      </div>
    )
  }

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <WeightIcon color={props.color} weight={props.weight} />
      {hover && renderHover()}
    </div>
  )
}

WeightWrapper.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  weight: PropTypes.number
}

class SiTasksList extends Component {
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
    maxTasks: PropTypes.number,
    user: PropTypes.object,
    match: PropTypes.object
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
      if (this.taskValidity(task, false)) {
        i += 1
      }
    })
    return i
  }

  formatDueDate (dd) {
    let today = moment(0, 'HH')
    let dueDate = moment.utc(dd)
    let daysTillDue = dueDate.diff(today, 'days')
    if (moment(today).format('MMDDYYYY') === moment(dueDate).format('MMDDYYYY')) {
      return 'today'
    } else if (daysTillDue === 1) {
      return 'tomorrow'
    } else {
      return moment(dueDate).format('dddd, MMMM Do')
      // if (today.isAfter(dueDate)) {
      //   return moment(dueDate).fromNow()
      // } else {
      //   return daysTillDue >= 7 ? 'in ' + dueDate.from(today, 'days') : 'on ' + moment.weekdays((daysTillDue + today.weekday()) % 7)
      // }
    }
  }

  getPath (cl) {
    if (this.props.match.params.invitationId) {
      return '/insights/invitations/' + this.props.user.id + '/classes/' + cl.id + '/'
    } else {
      return '/insights/students/' + this.props.user.id + '/classes/' + cl.id + '/'
    }
  }

  render () {
    let tasks = this.state.assignments
    let i = 0

    return (
      <div className='si-tasks-list'>
        {/* <div className='si-tasks-list-detail'>
          <div>
            {this.props.user.assignments.length > 0
              ? <div>{this.props.user.student.name_first} has <b>{taskDisplayCount} assignment{(taskDisplayCount > 1 || taskDisplayCount === 0) ? 's' : ''}</b> due in the next {this.props.maxDays} days.</div>
              : <div>{this.props.user.student.name_first} has no to-do&apos;s.</div>
            }
          </div>
        </div> */}
        <div className='si-tasks-list-tasks'>
          {tasks.map(t => {
            if (this.taskValidity(t, i)) {
              i += 1
              let cl = this.props.classes.find(cl => cl.id === t.class_id)
              if (!cl) return null;
              let color = "#" + cl.color

              return (
                <Link to={{pathname: this.getPath(cl), state: { activeAssignmentId: t.id }}} key={tasks.indexOf(t)} className='si-tasks-list-task' style={{border: '1px solid ' + color, borderRadius: '5px'}}>
                  <div className='si-tasks-list-task-row'>
                    <div className='si-task-title' style={{color}}>{t.name}</div>
                    <div className='si-task-weight'>
                      {/* {(Math.round(t.weight * 1000) / 10) + '% of grade'} */}
                      <WeightWrapper name={t.name} weight={t.weight} color={color} />
                    </div>
                  </div>
                  <div className='si-tasks-list-task-row'>
                    <div className='si-task-due'>Due {this.formatDueDate(t.due)}</div>
                    <div className='si-task-class'>{this.props.classes.find(cl => cl.id === t.class_id).name}</div>
                  </div>
                </Link>
              )
            }
          })}
          {/* {(
            !this.state.seeMore &&
            this.props.maxTasks &&
            this.props.maxTasks < this.getTaskDisplayCount()
          ) && <div className='si-tasks-see-more' onClick={() => this.setState({seeMore: true})}>See all {this.getTaskDisplayCount()} to-do&apos;s in the next {this.props.maxDays} days</div>} */}
        </div>
      </div>
    )
  }
}

export default withRouter(SiTasksList)
