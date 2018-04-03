import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {convertLocalDateToUTC} from '../../../utilities/time'
import SemesterDetails from './SemesterDetails'

const requiredFields = {
  'name': {
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
    const {id, name} = formData

    return ({
      id: id || '',
      name: name || ''
    })
  }

  /*
  * Determine whether the user is submiting updated period or a new period.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      const {form} = this.state
      !form.id ? this.onCreatePeriod(form) : this.onUpdatePeriod(form)
    }
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
    const {formErrors, updateProperty, period} = this.props

    return (
      <div>
        <div className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <SemesterDetails
                period={period}
              />
            </div>
          </div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='row align-center justify-center margin-top'>
              <div className='col-xs-12 col-md-8'>
                <InputField
                  error={formErrors.name}
                  name="name"
                  onChange={updateProperty}
                  placeholder="Semester name"
                  value={form.name}
                />
              </div>
              <div className='col-xs-12 col-md-4'>
                <button
                  className={`button full-width`}
                  type="submit"
                >Add</button>
              </div>
            </div>
          </form>
          <button className='button-invert full-width margin-top' onClick={() => this.props.onClose()}>Close</button>
        </div>
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
  onSubmit: PropTypes.func,
  period: PropTypes.array
}

export default ValidateForm(Form(PeriodForm, 'form'))
