import React from 'react'
import PropTypes from 'prop-types'
import {TimeInputField, SelectField} from '../../../../components/Form'
import moment from 'moment-timezone'

const ampm = [
  {
    id: 'am',
    name: 'AM'
  },
  {
    id: 'pm',
    name: 'PM'
  }
]

class TimeFields extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      meetHour: this.extractHour() || '',
      meetMin: this.extractMin() || '',
      meetAmpm: this.extractAmPm() || 'am'
    }
  }

  extractHour () {
    const {time} = this.props
    if (time) {
      let newTime = moment(time, 'HH:mm:ss')
      let hour = newTime.hour()
      if (hour === 0) {
        hour = 24
      }
      if (hour > 12) {
        hour -= 12
      }
      return hour.toString().padStart(2, '0')
    }
  }

  extractMin () {
    const {time} = this.props
    if (time) {
      let newTime = moment(time, 'HH:mm:ss')
      return newTime.minute().toString().padStart(2, '0')
    }
  }

  extractAmPm () {
    const {time} = this.props
    if (time) {
      let newTime = moment(time, 'HH:mm:ss')
      return newTime.hour() > 11 ? 'pm' : 'am'
    }
  }

  mapTime () {
    const {meetAmpm, meetHour, meetMin} = this.state
    if (meetHour && meetMin) {
      let mappedTime = moment(meetHour + ':' + meetMin + meetAmpm, 'h:mma')
      return mappedTime.format('HH:mm:ss')
    } else {
      return ''
    }
  }

  onChange () {
    let time = this.mapTime()
    console.log(time)
    this.props.onChange(time)
  }

  render () {
    const {meetAmpm, meetHour, meetMin} = this.state
    return (
      <div>
        <div className='cn-meeting-time-label'>Meet time</div>
        <div className='cn-meeting-times'>
          <TimeInputField
            containerClassName='cn-meeting-time'
            name='meetHour'
            onBlur={() => {
              if (meetHour.length < 2) {
                this.setState({meetHour: meetHour.padStart(2, '0')})
                this.onChange()
              }
            }}
            onChange={(name, value) => {
              this.setState({meetHour: value})
              this.onChange()
            }}
            value={meetHour}
            type='hour'
          />
          <div className='cn-meeting-time'>:</div>
          <TimeInputField
            containerClassName='cn-meeting-time'
            name='meetMin'
            onBlur={() => {
              let newMeetMin = meetMin
              if (newMeetMin[1] % 5 !== 0) {
                newMeetMin = (5 * Math.round(newMeetMin / 5)).toString()
              }
              if (newMeetMin.length < 2) {
                newMeetMin = newMeetMin.padStart(2, '0')
              }
              this.setState({meetMin: newMeetMin})
              this.onChange()
            }}
            onChange={(name, value) => {
              this.setState({meetMin: value})
              this.onChange()
            }}
            value={meetMin}
            type='min'
          />
          <SelectField
            containerClassName='cn-meeting-time-select'
            name='meetAmpm'
            onChange={(name, value) => {
              this.setState({meetAmpm: value})
              this.onChange()
            }}
            value={meetAmpm}
            options={ampm}
          />
        </div>
      </div>
    )
  }
}

TimeFields.propTypes = {
  onChange: PropTypes.func,
  time: PropTypes.string
}

export default TimeFields
