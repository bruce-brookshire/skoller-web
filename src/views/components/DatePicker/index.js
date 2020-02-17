import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import DatePickerBody from './DatePickerBody'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import OutsideClickHandler from 'react-outside-click-handler'

class DatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentMonth: this.props.givenDate ? moment(this.props.givenDate).startOf('month') : moment().startOf('month'),
      selectedDay: moment(this.props.givenDate)
    }
  }

  prevMonth () {
    const prevMonth = moment(this.state.currentMonth).subtract(1, 'M')
    this.setState({currentMonth: prevMonth})
  }

  nextMonth () {
    const nextMonth = moment(this.state.currentMonth).add(1, 'M')
    this.setState({currentMonth: nextMonth})
  }

  renderDaysArray () {
    let currentMonth = this.state.currentMonth
    const days = []
    let lastDay = null

    // this loops 42 times because the calendar will always have 42 cells (6 weeks)
    for (let i = 0; i < 31; i++) {
      let day = moment(currentMonth).startOf('month').add(i, 'day')
      if (day.month() === currentMonth.month()) {
        days.push(day)
        lastDay = moment(day)
      } else {
        break
      }
    }

    for (let i = 1; i < currentMonth.day() + 1; ++i) {
      let day = moment(currentMonth).subtract(i, 'day')
      days.splice(0, 0, day)
    }

    while (days.length < 42) {
      days.push(moment(lastDay).add(1, 'd'))
      lastDay = moment(lastDay).add(1, 'd')
    }

    return days
  }

  changeSelectedDay = (selectedDay) => {
    this.setState({selectedDay: moment(selectedDay)})
  }

  render () {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.props.close ? this.props.close() : null}
      >
        <div className={'datepicker-container' + ((this.props.inline === true) ? ' inline' : '')}>
          <div className='datepicker-header'>
            <div className='datepicker-nav-item' onClick={() => this.prevMonth()}>
              <BackArrow height="12" width="10"/>
            </div>
            <div className='datepicker-nav-item'>
              <h2>{moment(this.state.currentMonth).format('MMMM')}</h2>
            </div>
            <div className='datepicker-nav-item' onClick={() => this.nextMonth()}>
              <ForwardArrow height="12" width="10"/>
            </div>
          </div>
          <DatePickerBody days={this.renderDaysArray()} currentMonth={this.state.currentMonth} selectedDay={this.state.selectedDay} changeSelectedDay={this.changeSelectedDay}/>
          <div className='datepicker-done-button' onClick={() => this.props.returnSelectedDay(this.state.selectedDay)}>
            <p>Done</p>
          </div>
        </div>
      </OutsideClickHandler>
    )
  }
}

DatePicker.propTypes = {
  givenDate: PropTypes.object,
  returnSelectedDay: PropTypes.func,
  inline: PropTypes.bool,
  close: PropTypes.function
}

export default DatePicker
