import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

class DatePickerDay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      todayDate: moment()
    }
  }

  checkIsCurrentMonth () {
    if (
      moment(this.props.day).month() ===
        moment(this.props.currentMonth).month()
    ) {
      return true
    } else {
      return false
    }
  }

  checkIsToday () {
    if (
      moment(this.props.day).date() === moment().date() &&
      moment(this.props.day).month() === moment().month() &&
      moment(this.props.day).year() === moment().year()
    ) {
      return true
    } else {
      return false
    }
  }

  checkIsSelected () {
    if (
      moment(this.props.day).date() === moment(this.props.selectedDay).date() &&
      moment(this.props.day).month() ===
        moment(this.props.selectedDay).month() &&
      moment(this.props.day).year() === moment(this.props.selectedDay).year()
    ) {
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <div
        className={
          'datepicker-day' +
          (this.checkIsToday() ? ' is-today' : '') +
          (this.checkIsCurrentMonth() ? ' is-current-month' : '') +
          (this.checkIsSelected() ? ' is-selection' : '')
        }
        onClick={() => this.props.changeSelectedDay(this.props.day)}
      >
        {moment(this.props.day).format('D')}
      </div>
    )
  }
}

DatePickerDay.propTypes = {
  day: PropTypes.object,
  currentMonth: PropTypes.object,
  selectedDay: PropTypes.object,
  changeSelectedDay: PropTypes.func
}

export default DatePickerDay
