import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import CalendarAssignment from './CalendarAssignment'
import moment from 'moment'

@inject('rootStore')
@observer
class DayCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isHover: false
    }
  }

  changeHoverState () {
    this.setState({ isHover: !this.state.isHover })
  }

  // return the rendered calendar day cell
  render () {
    // grab assignments from state and create array of their keys
    const assignments = this.props.assignments
    const assignmentsKeys = []
    const day = this.props.day
    Object.keys(this.props.assignments).forEach(function (element) {
      assignmentsKeys.push(element)
    })

    // push assignment objects into dayAssignments array
    const dayAssignments = []
    assignmentsKeys.forEach(function (element) {
      if (
        new Date(Date.parse(assignments[element].due)).getDate() === new Date(day).getDate() &&
        new Date(Date.parse(assignments[element].due)).getMonth() === new Date(day).getMonth() &&
        new Date(Date.parse(assignments[element].due)).getYear() === new Date(day).getYear()
      ) {
        dayAssignments.push(assignments[element])
      }
    })

    // check to see if date is in month for purposes of formatting the date
    let isCurrentMonth = false
    if (day.month() === moment(this.props.firstOfMonth).month()) {
      isCurrentMonth = true
    }

    // check to see if date is current day for purposes of formatting the date
    let isCurrentDay = false
    if (day.isSame(moment(), 'month') && day.isSame(moment(), 'day') && day.isSame(moment(), 'year')) {
      isCurrentDay = true
    }

    return (
      <div className="calendar-day-cell-wrapper" onMouseEnter={() => this.changeHoverState()} onMouseLeave={() => this.changeHoverState()}>
        <div className={'calendar-date ' + (isCurrentMonth ? 'current-month ' : '') + (isCurrentDay ? 'current-day' : '')}>
          <p>
            {this.props.day.format('D')}
          </p>
        </div>
        <div className={'calendar-day-cell ' + (isCurrentDay ? 'current-day-cell' : '')}>
          {dayAssignments.map((item, i) => {
            return (
              <div key={i} className="calendar-assignment-container">
                <CalendarAssignment classColors={this.props.classColors} assignment={item} />
              </div>
            )
          })}
          { this.state.isHover
            ? <div className="calendar-assignment-container">
              <div className="calendar-assignment add-new" onClick={() => console.log('add new button')}>
                +
              </div>
            </div>
            : ''}
        </div>
      </div>
    )
  }
}

DayCell.propTypes = {
  day: propTypes.object,
  classColors: propTypes.object,
  firstOfMonth: propTypes.object,
  assignments: propTypes.object
}

export default DayCell
