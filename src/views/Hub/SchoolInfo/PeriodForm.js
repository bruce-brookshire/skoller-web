import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import actions from '../../../actions'
import {convertUTCDatetimeToDateString, convertLocalDateToUTC} from '../../../utilities/time'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'start_date': {
    type: 'required'
  },
  'end_date': {
    type: 'required'
  }
}

class PeriodForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      form: this.initializeFormData(this.props.period)
    }
  }

  /*
  * Method for intializing form data.
  * School period form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, name, start_date, end_date, enroll_date} = formData
    const {school} = this.props

    return ({
      id: id || '',
      name: name || '',
      enroll_date: enroll_date ? convertUTCDatetimeToDateString(enroll_date, school.timezone) : '',
      start_date: start_date ? convertUTCDatetimeToDateString(start_date, school.timezone) : '',
      end_date: end_date ? convertUTCDatetimeToDateString(end_date, school.timezone) : ''
    })
  }

  /*
  * Determine whether the user is submiting updated period or a new period.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      const form = this.mapForm()
      !form.id ? this.onCreatePeriod(form) : this.onUpdatePeriod(form)
    }
  }

  /*
  * Map form.
  */
  mapForm () {
    const {school} = this.props
    let form = {...this.state.form}
    form.enroll_date = convertLocalDateToUTC(this.state.form.enroll_date, school.timezone)
    form.start_date = convertLocalDateToUTC(this.state.form.start_date, school.timezone)
    form.end_date = convertLocalDateToUTC(this.state.form.end_date, school.timezone)
    return form
  }

  /*
  * Create a new period
  */
  onCreatePeriod (form) {
    actions.periods.createPeriod(this.props.school, form).then((period) => {
      this.props.onSubmit(period)
    }).catch(() => false)
  }

  /*
  * Update an existing period
  */
  onUpdatePeriod (form) {
    actions.periods.updatePeriod(form).then((period) => {
      this.props.onSubmit(period)
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div>
        <div className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.name}
                label="Period name"
                name="name"
                onChange={updateProperty}
                placeholder="Period name"
                value={form.name}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.enroll_date}
                label="Enroll date"
                name="enroll_date"
                onChange={updateProperty}
                placeholder="Enroll date"
                type='date'
                value={form.enroll_date}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.start_date}
                label="Start date"
                name="start_date"
                onChange={updateProperty}
                placeholder="Start date"
                type='date'
                value={form.start_date}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.end_date}
                label="End date"
                name="end_date"
                onChange={updateProperty}
                placeholder="End date"
                type='date'
                value={form.end_date}
              />
            </div>
          </div>
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Submit period</button>
          <button className='button-invert full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
        </div>
      </div>
    )
  }
}

PeriodForm.propTypes = {
  formErrors: PropTypes.object,
  school: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(PeriodForm, 'form'))
