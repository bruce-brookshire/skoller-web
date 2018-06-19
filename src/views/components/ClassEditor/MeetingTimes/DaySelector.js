import React from 'react'
import PropTypes from 'prop-types'
import {PillField, SliderField} from '../../../../components/Form'

const daysOfWeek = [
  {
    day: 'Sun',
    code: 'U'
  },
  {
    day: 'Mon',
    code: 'M'
  },
  {
    day: 'Tue',
    code: 'T'
  },
  {
    day: 'Wed',
    code: 'W'
  },
  {
    day: 'Thu',
    code: 'R'
  },
  {
    day: 'Fri',
    code: 'F'
  },
  {
    day: 'Sat',
    code: 'S'
  }
]

class DaySelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      selectedDays: this.extractDays() || [],
      isOnline: this.extractOnline() || false
    }
  }

  extractOnline () {
    const {days} = this.props
    if (days) {
      return (days.indexOf('Online') > -1)
    }
  }

  extractDays () {
    const {days} = this.props
    let newDays = []
    if (days) {
      days.split('').map((day) => {
        let newDay = daysOfWeek.find(dow => dow.code === day.toString())
        if (newDay) {
          newDays.push(newDay.day)
        }
      })
    }
    return newDays
  }

  toggleDays (newVal) {
    let newDays = this.state.selectedDays
    let index = newDays.indexOf(newVal)
    if (index > -1) {
      newDays.splice(index, 1)
    } else {
      newDays.push(newVal)
    }
    this.setState({selectedDays: newDays})
    this.props.onChange(this.mapDays(newDays))
  }

  mapDays (days) {
    let newDays = []
    days.map((day) => {
      let newDay = daysOfWeek.find(dow => dow.day === day)
      if (newDay) {
        newDays.push(newDay.code)
      }
    })
    return newDays.join('')
  }

  renderDays () {
    const {selectedDays} = this.state
    return daysOfWeek.map((c) => {
      return <PillField
        key={c.code}
        label={c.day}
        value={selectedDays.find(day => day === c.day) ? c.day : ''}
        onClick={this.toggleDays.bind(this)}
        type='button'
        error={this.props.error}
      />
    })
  }

  render () {
    const {isOnline} = this.state

    return (
      <div>
        <div className='cn-meeting-time-slider margin-bottom'>
          This is an online class
          <SliderField
            name='is_online'
            onChange={(name, value) => {
              this.setState({isOnline: value})
              this.props.onChange(value ? 'Online' : '')
            }}
            value={isOnline}
            error={this.props.error}
          />
        </div>
        {!isOnline && <div className='cn-meeting-time-label'>Meet days</div>}
        {!isOnline && <div className='cn-day-selector'>
          {this.renderDays()}
        </div>}
      </div>
    )
  }
}

DaySelector.propTypes = {
  days: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool
}

export default DaySelector
