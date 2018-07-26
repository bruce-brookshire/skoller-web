import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
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
      name: ''
    })
  }

  /*
  * Determine whether the user is submiting updated period or a new period.
  *
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.onCreatePeriod(this.state.form)
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
    const {formErrors, updateProperty, periods} = this.props

    return (
      <div>
        <div className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <SemesterDetails
                periods={periods}
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
  periods: PropTypes.array
}

export default ValidateForm(Form(PeriodForm, 'form'))
