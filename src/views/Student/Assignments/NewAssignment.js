import React from 'react'
import moment from 'moment'
import Exit from '../../../assets/sk-icons/navigation/Exit'
import PropTypes from 'prop-types'

class NewAssignment extends React.Component {
  formatDueDate (dd) {
    const dueDate = moment(dd)
    const today = moment()
    const daysTillDue = dueDate.diff(today, 'days')
    if (today.isSame(dueDate, 'date')) {
      return 'Today'
    } else if (daysTillDue < 6 && daysTillDue > 0) {
      return dueDate.format('dddd')
    } else {
      return today.to(dueDate)
    }
  }

  render () {
    return (
      <div className="add-assignment-assignment" style={{borderColor: '#' + this.props.assignment.class.color}}>
        <div className="add-assignment-remove" onClick={() => this.props.removeNewAssignment(this.props.assignment)}>
          <Exit fill="$cn-font-color" width="10" height="10"/>
        </div>
        <div className="add-assignment-row">
          <h2 style={{color: '#' + this.props.assignment.class.color}}>{this.props.assignment.class.name}</h2>
          <div>{this.formatDueDate(this.props.assignment.due)}</div>
        </div>
        <div className="add-assignment-row">
          <div>{this.props.assignment.name}</div>
        </div>
      </div>
    )
  }
}

NewAssignment.propTypes = {
  assignment: PropTypes.object,
  removeNewAssignment: PropTypes.func
}

export default NewAssignment
