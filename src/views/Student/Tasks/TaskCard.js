import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'
import WeightIcon from './WeightIcon';

@inject('rootStore') @observer
class TaskCard extends React.Component {
  formatDueDate (dd) {
    const today = moment()
    const dueDate = moment(dd)
    const daysTillDue = dueDate.diff(today, 'days')
    if (today.isSame(dueDate, 'date')) {
      return 'Today'
    } else {
      return daysTillDue >= 7 ? 'in ' + dueDate.from(today, 'days') : 'on ' + moment.weekdays((daysTillDue + today.weekday()) % 7)
    }
  }

  goToAssignment () {
    browserHistory.push({pathname: '/student/class/' + this.props.task.class_id + '/assignments/' + this.props.task.assignment_id, state: { prevPath: this.props.rootStore.studentNavStore.location.pathname }})
  }

  renderCard () {
    const task = this.props.task
    const color = '#' + this.props.clColor
    return (
      <div className="task-card-container" key={task.id} onClick={() => this.goToAssignment()} >
        <div className="task-card" style={{border: '1px solid', borderColor: color, borderRadius: '5px'}}>
          <div className="task-card-heading">
            <h2 className="task-card-left" style={{color: color}}>{task.name}</h2>
            <p className="task-card-right"><WeightIcon color={color} weight={task.weight} /></p>
          </div>
          <div className="task-card-content">
            <p className="task-card-left">{'Due ' + this.formatDueDate(task.due)}</p>
            <p className="task-card-left" style={{color: '#a9a9a9'}}>{this.props.clName}</p>
          </div>
        </div>
      </div>
    )
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
  rootStore: PropTypes.object
}

export default TaskCard
