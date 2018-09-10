import React from 'react'
import PropTypes from 'prop-types'
import DaySelector from './DaySelector'
import TimeFields from './TimeFields'

class MeetingTimes extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      loading: false,
      days: this.props.days || '',
      time: this.props.time || ''
    }
  }

  onDaysUpdate (newVal) {
    this.setState({days: newVal})
  }

  renderDays () {
    const {days} = this.props
    return (
      <DaySelector
        days={days}
        onChange={this.onDaysUpdate.bind(this)}
      />
    )
  }

  onTimeUpdate (newVal) {
    this.setState({time: newVal})
  }

  mapForm () {
    let mappedForm = {
      days: this.state.days,
      time: this.state.time
    }
    return mappedForm
  }

  /*
  * On submit, create meeting times.
  */
  onSubmit (event) {
    event.preventDefault()

    let form = this.mapForm()
    this.props.onSubmit(form)
    this.props.onClose()
  }

  render () {
    const {time, days} = this.state

    let disabled = (!time && days !== 'Online') || !days
    let buttonClasses = ['button full-width margin-top']

    if (disabled) {
      buttonClasses.push('disabled')
    }

    buttonClasses = buttonClasses.join(' ')

    return (
      <div className='cn-meeting-time-container'>
        <div className='cn-meeting-time-header'>
          Pick meeting times
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          {this.renderDays()}
          {days !== 'Online' &&
            <TimeFields
              time={time}
              onChange={this.onTimeUpdate.bind(this)}
            />
          }
          <button
            className={buttonClasses}
            disabled={disabled}
            type='submit'
          >Done</button>
        </form>
      </div>
    )
  }
}

MeetingTimes.propTypes = {
  validateForm: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  days: PropTypes.string,
  time: PropTypes.string
}

export default MeetingTimes
