import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class TaskCard extends React.Component {
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

  renderCard () {
    const task = this.props.task
    return (
      <div className="task-card-container" key={task.id}>
        <div className="task-card">
          <div className="task-card-heading">
            <h2 className="task-card-left" style={{color: '#' + this.props.clColor}}>{this.props.clName}</h2>
            <p className="task-card-right">{this.formatDueDate(task.due)}</p>
          </div>
          <div className="task-card-content">
            <p className="task-card-left">{task.name}</p>
            <p className="task-card-left">{task.weight * 100 + '%'}</p>
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
  clColor: PropTypes.string
}

export default TaskCard
