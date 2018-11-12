import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField} from '../../../components/Form'
import actions from '../../../actions'
import {convertLocalDateToUTC} from '../../../utilities/time'

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
      form: this.initializeFormData()
    }
  }

  /*
  * Method for intializing form data.
  * School period form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData () {
    return ({
      name: '',
      start_date: '',
      end_date: '',
      is_main_period: false
    })
  }

  mapForm (form) {
    const {school} = this.props
    let newForm = {...form}

    newForm.start_date = convertLocalDateToUTC(form.start_date, school.timezone)
    newForm.end_date = convertLocalDateToUTC(form.end_date, school.timezone)

    return newForm
  }

  /*
  * Determine whether the user is submiting updated period or a new period.
  *
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      let form = this.mapForm(this.state.form)
      this.onCreatePeriod(form)
    }
  }

  /*
  * Create a new period
  */
  onCreatePeriod (form) {
    actions.periods.createPeriod(this.props.school.id, form).then((period) => {
      this.props.onSubmit()
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='margin-top'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='row align-center justify-center margin-top'>
            <div className='col-xs-12 col-md-4'>
              <InputField
                error={formErrors.name}
                name="name"
                onChange={updateProperty}
                placeholder="Semester name"
                value={form.name}
                label="Name"
              />
            </div>
            <div className='col-xs-12 col-md-4'>
              <CheckboxField
                error={formErrors.is_main_period}
                name="is_main_period"
                onChange={updateProperty}
                value={form.is_main_period}
                label="Main Period?"
              />
            </div>
          </div>
          <div className='row align-center justify-center margin-top'>
            <div className='col-xs-12 col-md-4'>
              <InputField
                error={formErrors.start_date}
                name="start_date"
                onChange={updateProperty}
                type="date"
                value={form.start_date}
                label="Start"
              />
            </div>
            <div className='col-xs-12 col-md-4'>
              <InputField
                error={formErrors.end_date}
                name="end_date"
                onChange={updateProperty}
                type="date"
                value={form.end_date}
                label="End"
              />
            </div>
          </div>
          <div className='row align-center justify-center margin-top'>
            <div className='col-xs-12 col-md-4'>
              <button className='button full-width' type="submit" >Add</button>
            </div>
            <div className='col-xs-12 col-md-4'>
              <button className='button-invert full-width' onClick={() => this.props.onClose()}>Close</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

PeriodForm.propTypes = {
  formErrors: PropTypes.object,
  school: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

export default ValidateForm(Form(PeriodForm, 'form'))
