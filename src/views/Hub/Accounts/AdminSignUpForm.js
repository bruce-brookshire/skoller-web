import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'email': {
    type: 'email'
  },
  'password': {
    type: 'required'
  }
}

class AdminSignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    return {
      email: '',
      password: ''
    }
  }

  onSubmit () {
    const form = this.state.form
    if (this.props.validateForm(form, requiredFields)) {
      actions.auth.registerUserAdmin(form).then((user) => {
        this.props.resetValidation()
        this.props.onSubmit(user)
      }).catch(() => false)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, header, buttonText} = this.props

    return (
      <div className='cn-sign-up-form'>
        <form className='form-padding'>
          {header && <h2>{header}</h2>}
          <div className='row'>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.email}
                label='Email'
                name='email'
                onChange={(name, value) => {
                  updateProperty(name, value.trim())
                }}
                placeholder='Email'
                value={form.email}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.password}
                label='Password'
                name='password'
                onChange={updateProperty}
                placeholder='Password'
                type='password'
                value={form.password}
              />
            </div>
          </div>
          <div className='center-text'>
            <button
              className='button margin-top margin-bottom full-width'
              type='button'
              onClick={this.onSubmit.bind(this)}
            >{buttonText || 'Submit'}</button>
          </div>
        </form>
      </div>
    )
  }
}

AdminSignUpForm.propTypes = {
  formErrors: PropTypes.object,
  resetValidation: PropTypes.func,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func
}

export default ValidateForm(Form(AdminSignUpForm, 'form'))
