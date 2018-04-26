import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import moment from 'moment-timezone'
import {SliderField, PillField, TimeInputField, SelectField} from '../../../components/Form'

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

class MeetingTimeModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false
    }
  }

  initializeFormData () {
    return {
      is_online: this.extractOnline() || false,
      selectedDays: this.extractDays() || [],
      meet_time_hour: this.extractHour() || '',
      meet_time_min: this.extractMin() || '',
      meet_time_ampm: this.extractAmPm() || 'am'
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

  toggleDays (newVal) {
    let newForm = this.state.form
    let newDays = this.state.form.selectedDays
    let index = newDays.indexOf(newVal)
    if (index > -1) {
      newDays.splice(index, 1)
    } else {
      newDays.push(newVal)
    }
    newForm.selectedDays = newDays
    this.setState({form: newForm})
  }

  renderDays () {
    const {form} = this.state
    return daysOfWeek.map((c) => {
      return <PillField
        key={c.code}
        label={c.day}
        value={form.selectedDays.find(day => day === c.day) ? c.day : ''}
        onClick={this.toggleDays.bind(this)}
        type='button'
      />
    })
  }

  mapDays (form) {
    let newDays = []
    form.selectedDays.map((day) => {
      let newDay = daysOfWeek.find(dow => dow.day === day)
      if (newDay) {
        newDays.push(newDay.code)
      }
    })
    return newDays.join('')
  }

  mapTime (form) {
    let mappedTime = moment(form.meet_time_hour + ':' + form.meet_time_min + form.meet_time_ampm, 'h:mma')
    return mappedTime.format('HH:mm:ss')
  }

  mapForm () {
    const {form} = this.state
    let mappedForm = {
      days: this.mapDays(form),
      time: this.mapTime(form)
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

  renderTimes () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div>
        <div className='cn-meeting-time-label'>Meet time</div>
        <div className='cn-meeting-times'>
          <TimeInputField
            containerClassName='cn-meeting-time'
            error={formErrors.meet_time_hour}
            name='meet_time_hour'
            onBlur={() => {
              if (form.meet_time_hour.length < 2) {
                let newForm = form
                newForm.meet_time_hour = form.meet_time_hour.padStart(2, '0')
                this.setState({form: newForm})
              }
            }}
            onChange={(updateProperty)}
            value={form.meet_time_hour}
            type='hour'
          />
          <div className='cn-meeting-time'>:</div>
          <TimeInputField
            containerClassName='cn-meeting-time'
            error={formErrors.meet_time_min}
            name='meet_time_min'
            onBlur={() => {
              let newForm = form
              if (newForm.meet_time_min[1] % 5 !== 0) {
                newForm.meet_time_min = (5 * Math.round(newForm.meet_time_min / 5)).toString()
              }
              if (newForm.meet_time_min.length < 2) {
                newForm.meet_time_min = newForm.meet_time_min.padStart(2, '0')
              }
              this.setState({form: newForm})
            }}
            onChange={updateProperty}
            value={form.meet_time_min}
            type='min'
          />
          <SelectField
            containerClassName='cn-meeting-time-select'
            error={formErrors.meet_time_ampm}
            name='meet_time_ampm'
            onChange={updateProperty}
            value={form.meet_time_ampm}
            options={ampm}
          />
        </div>
      </div>
    )
  }

  render () {
    const {form, universityError} = this.state
    const {formErrors, updateProperty} = this.props
    // let disabled = (!form.is_online || (form.selectedDays === [] && form.meet_time_min === '' && form.meet_time_hour === ''))

    return (
      <div className='cn-meeting-time-container'>
        <div className='cn-meeting-time-header'>
          Pick meeting times
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='cn-meeting-time-slider'>
            This is an online class
            <SliderField
              name='is_online'
              onChange={updateProperty}
              value={form.is_online}
            />
          </div>
          {!form.is_online && <div className='cn-meeting-time-label'>Meet days</div>}
          {!form.is_online && <div className='cn-meeting-time-days'>
            {this.renderDays()}
          </div>}
          {!form.is_online && this.renderTimes()}
          <button
            className={`button full-width margin-top`}
            type='submit'
          >Done</button>
        </form>
      </div>
    )
  }
}

MeetingTimeModal.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  days: PropTypes.string,
  time: PropTypes.string
}

export default ValidateForm(Form(MeetingTimeModal, 'form'))
