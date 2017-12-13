import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import actions from '../../../actions'

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
    const {id, name, start_date, end_date} = formData

    return ({
      id: id || '',
      name: name || '',
      start_date: start_date || '',
      end_date: end_date || ''
    })
  }

  /*
  * Determine whether the user is submiting updated period or a new period.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreatePeriod() : this.onUpdatePeriod()
    }
  }

  /*
  * Create a new period
  */
  onCreatePeriod () {
    actions.periods.createPeriod(this.props.school, this.state.form).then((period) => {
      this.props.onSubmit(period)
    }).catch(() => false)
  }

  /*
  * Update an existing period
  */
  onUpdatePeriod () {
    actions.periods.updatePeriod(this.state.form).then((period) => {
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
