import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import moment from 'moment'
import DayCell from './DayCell'
import WeekCell from './WeekCell'

@inject('rootStore')
@observer
class CalendarBody extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isWeek: this.props.isWeek
    }
  }

  toggleWeekView () {
    this.setState = {
      isWeek: !this.state.isWeek
    }
  }

  renderDaysArray () {
    const days = []
    let lastDay = null
    // this loops 42 times because the calendar will always have 42 cells (6 weeks)
    for (let i = 0; i < 42; i++) {
      let day = moment(this.props.thisMonth).add(i, 'd')
      if (day.month() === this.props.thisMonth.getMonth()) {
        days.push(day)
        lastDay = day
      } else {
        break
      }
    }

    for (let i = 1; i < this.props.thisMonth.getDay() + 1; ++i) {
      let day = moment(this.props.thisMonth).subtract(i, 'd')
      days.splice(0, 0, day)
    }

    while (days.length < 42) {
      let day = moment(lastDay).add(1, 'd')
      lastDay = day
      days.push(day)
    }

    return days
  }

  renderWeekDaysArray () {
    console.log('run this')
    const weekDays = []
    let lastDay = null
    for (let i = 0; i < 7; i++) {
      let day = moment(this.props.thisWeek).add(i, 'd')
      if (day.week() === moment(this.props.thisWeek).week()) {
        weekDays.push(day)
        lastDay = day
      } else {
        break
      }
    }

    console.log(weekDays)

    for (let i = 1; i < this.props.thisWeek.getDay() + 1; ++i) {
      let day = moment(this.props.thisMonth).subtract(i, 'd')
      weekDays.splice(0, 0, day)
    }

    while (weekDays.length < 7) {
      let day = moment(lastDay).add(1, 'd')
      lastDay = day
      weekDays.push(day)
    }

    return weekDays
  }

  render () {
    const days = this.renderDaysArray()
    const weekDays = this.renderWeekDaysArray()
    return (
      <div className="calendar-body">
        { this.props.isWeek
          ? weekDays.map((item, i) => (
            <div className="calendar-week-cell-container" key={i}>
              <WeekCell day={item} classColors={this.props.classColors} thisWeek={this.props.thisWeek} assignments={this.props.assignments} />
            </div>
          ))
          : days.map((item, i) => (
            <div className="calendar-day-cell-container" key={i}>
              <DayCell day={item} classColors={this.props.classColors} thisMonth={this.props.thisMonth} assignments={this.props.assignments} />
            </div>
          ))
        }
      </div>
    )
  }
}

CalendarBody.propTypes = {
  thisMonth: propTypes.object,
  classColors: propTypes.object,
  assignments: propTypes.object,
  isWeek: propTypes.bool,
  thisWeek: propTypes.object
}

export default CalendarBody
