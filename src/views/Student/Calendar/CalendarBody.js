import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import moment from 'moment'
import DayCell from './DayCell'

@inject('rootStore')
@observer
class CalendarBody extends React.Component {
  renderDaysArray () {
    const days = []
    let lastDay = null
    // this loops 42 times because the calendar will always have 42 cells (6 weeks)
    for (let i = 0; i < 42; i++) {
      let day = moment(this.props.firstOfMonth).add(i, 'd')
      if (day.month() === this.props.firstOfMonth.getMonth()) {
        days.push(day)
        lastDay = day
      } else {
        break
      }
    }

    for (let i = 1; i < this.props.firstOfMonth.getDay() + 1; ++i) {
      let day = moment(this.props.firstOfMonth).subtract(i, 'd')
      days.splice(0, 0, day)
    }

    while (days.length < 42) {
      let day = moment(lastDay).add(1, 'd')
      lastDay = day
      days.push(day)
    }

    return days
  }

  render () {
    const days = this.renderDaysArray()
    return (
      <div className="calendar-body">
        {console.log(this.props.classColors)}
        {console.log(this.props.assignments)}
        {console.log(this.props.firstOfMonth)}
        { days.map((item, i) => (
          <div className="calendar-day-cell-container" key={i}>
            <DayCell day={item} classColors={this.props.classColors} firstOfMonth={this.props.firstOfMonth} assignments={this.props.assignments} />
          </div>
        )) }
      </div>
    )
  }
}

CalendarBody.propTypes = {
  firstOfMonth: propTypes.object,
  classColors: propTypes.object,
  assignments: propTypes.object
}

export default CalendarBody
