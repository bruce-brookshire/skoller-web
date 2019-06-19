import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import DatePickerDay from './DatePickerDay'

class DatePickerBody extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      todayDate: moment()
    }
  }

  render () {
    return (
      <div className='datepicker-body'>
        {this.props.days.map((item, i) =>
          <div key={i} className='datepicker-day-container'>
            <DatePickerDay day={item} selectedDay={this.props.selectedDay} changeSelectedDay={this.props.changeSelectedDay} currentMonth={this.props.currentMonth}/>
          </div>
        )}
      </div>
    )
  }
}

DatePickerBody.propTypes = {
  days: PropTypes.object,
  currentMonth: PropTypes.object,
  selectedDay: PropTypes.object,
  changeSelectedDay: PropTypes.function
}

export default DatePickerBody
