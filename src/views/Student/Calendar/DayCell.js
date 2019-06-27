import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import CalendarAssignment from './CalendarAssignment'
import moment from 'moment'
import AddAssignment from '../Assignments/AddAssignment'
import PropTypes from 'prop-types'

@inject('rootStore')
@observer
class DayCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isHover: false,
      showAddAssignmentModal: false
    }
  }

  setHoverStateTrue () {
    this.setState({ isHover: true })
  }

  setHoverStateFalse () {
    this.setState({ isHover: false })
  }

  launchModal () {
    this.setState({ isHover: false })
    this.setState({showAddAssignmentModal: true})
  }

  closeModal = () => {
    this.setState({showAddAssignmentModal: false})
    this.setState({ isHover: false })
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
    if (day.month() === moment(this.props.thisMonth).month()) {
      isCurrentMonth = true
    }

    // check to see if date is current day for purposes of formatting the date
    let isCurrentDay = false
    if (day.isSame(moment(), 'month') && day.isSame(moment(), 'day') && day.isSame(moment(), 'year')) {
      isCurrentDay = true
    }

    return (
      <div className="calendar-day-cell-wrapper" onMouseEnter={() => this.setHoverStateTrue()} onMouseLeave={() => this.setHoverStateFalse()}>
        { this.state.showAddAssignmentModal
          ? <AddAssignment closeModal={this.closeModal} assignmentParams={{due: this.props.day}}/>
          : null
        }
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
            ? <div className="calendar-assignment-container add-new-assignment">
              <div key={this.state.isHover} className="calendar-assignment add-new " onClick={() =>
                this.launchModal()
              }>
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
  day: PropTypes.object,
  classColors: PropTypes.object,
  thisMonth: PropTypes.object,
  assignments: PropTypes.object
}

export default DayCell
