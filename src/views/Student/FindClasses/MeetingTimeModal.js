import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {SliderField, PillField, TimeInputField, SelectField} from '../../../components/Form'

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
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
      is_online: false,
      selectedDays: [],
      meet_time_hour: '',
      meet_time_min: '',
      meet_time_ampm: 'am'
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
    return days.map((c) => {
      return <PillField
        key={c}
        label={c}
        value={form.selectedDays.find(day => day === c) ? c : ''}
        onClick={this.toggleDays.bind(this)}
      />
    })
  }

  /*
  * On submit, create meeting times.
  */
  onSubmit (event) {
    event.preventDefault()

    // if (this.props.validateForm(this.state.form, requiredFields)) {
    //   const form = this.mapForm(this.state.form)
    //   this.onCreateSchool(form)
    // }
  }

  render () {
    const {form, universityError} = this.state
    const {formErrors, updateProperty} = this.props

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
          <div className='cn-meeting-time-label'>Meet days</div>
          <div className='cn-meeting-time-days'>
            {this.renderDays()}
          </div>
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
                if (form.meet_time_min.length < 2) {
                  let newForm = form
                  newForm.meet_time_min = form.meet_time_min.padStart(2, '0')
                  this.setState({form: newForm})
                }
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
  onSubmit: PropTypes.func.isRequired
}

export default ValidateForm(Form(MeetingTimeModal, 'form'))
