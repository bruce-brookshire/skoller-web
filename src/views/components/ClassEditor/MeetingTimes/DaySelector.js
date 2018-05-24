import React from 'react'
import PropTypes from 'prop-types'
import {PillField} from '../../../../components/Form'

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
      selectedDays: this.extractDays() || []
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
      />
    })
  }

  render () {
    return (
      <div className='cn-day-selector'>
        {this.renderDays()}
      </div>
    )
  }
}

DaySelector.propTypes = {
  days: PropTypes.string,
  onChange: PropTypes.func
}

export default DaySelector
