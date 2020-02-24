import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import WeightIcon from './WeightIcon'

@inject('rootStore') @observer
class TaskCard extends React.Component {
  formatDueDate (dd) {
    let today = moment(0, 'HH')
    let dueDate = moment.utc(dd)
    let daysTillDue = dueDate.diff(today, 'days')
    if (moment(today).format('MMDDYYYY') === moment(dueDate).format('MMDDYYYY')) {
      return 'today'
    } else if (daysTillDue === 1) {
      return 'tomorrow'
    } else {
      if (today.isAfter(dueDate)) {
        return moment(dueDate).fromNow()
      } else {
        return daysTillDue >= 7 ? 'in ' + dueDate.from(today, 'days') : 'on ' + moment.weekdays((daysTillDue + today.weekday()) % 7)
      }
    }
  }

  goToAssignment () {
    this.props.history.push({pathname: '/student/class/' + this.props.task.class_id + '/assignments/' + this.props.task.assignment_id, state: { prevPath: this.props.rootStore.studentNavStore.location.pathname }})
  }

  renderCard () {
    const task = this.props.task
    const color = '#' + this.props.clColor
    if (this.props.classDetailView) {
      return (
        <div className="task-card-container" key={task.id} onClick={() => this.goToAssignment()} >
          <div className="task-card-class-detail" style={{border: '1px solid', borderColor: color, borderRadius: '5px'}}>
            <div className='task-card-grade' style={{backgroundColor: task.grade ? color : 'rgba(0,0,0,0.04)', borderRight: task.grade ? 'none' : `1px solid ${color}`}}>
              <div style={{color: task.grade ? 'white' : '#4a4a4a'}}>{task.grade ? task.grade + '%' : '-'}</div>
            </div>
            <div className='task-card-detail'>
              <div className="task-card-left">
                <h2 className="task-card-left" style={{color: color}}>{task.name}</h2>
                <p className="task-card-left">{'Due ' + this.formatDueDate(task.due)}</p>
              </div>
              <div className="task-card-right">
                <div className="task-card-right"><WeightIcon color={color} weight={task.weight} /></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="task-card-container" key={task.id} onClick={() => this.goToAssignment()} >
          <div className="task-card" style={{border: '1px solid', borderColor: color, borderRadius: '5px'}}>
            <div className="task-card-heading">
              <h2 className="task-card-left" style={{color: color}}>{task.name}</h2>
              <div className="task-card-right"><WeightIcon color={color} weight={task.weight} /></div>
            </div>
            <div className="task-card-content">
              <p className="task-card-left">{'Due ' + this.formatDueDate(task.due)}</p>
              <p className="task-card-left" style={{color: '#a9a9a9'}}>{this.props.clName}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      this.renderCard()
    )
  }
}

TaskCard.propTypes = {
  task: PropTypes.object,
  clName: PropTypes.string,
  clColor: PropTypes.string,
  rootStore: PropTypes.object,
  classDetailView: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(TaskCard)
