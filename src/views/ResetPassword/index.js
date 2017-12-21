import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'

const requiredFields =
{
  'password': {
    type: 'password'
  },
  'password_confirmation': {
    type: 'passwordConfirmation'
  }
}

class ResetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {form: this.initializeFormData()}
  }

  /*
  * Initialize form data.
  * Forgot password form.
  */
  initializeFormData () {
    return {
      password: '',
      password_confirmation: ''
    }
  }

  /*
  * On submit forgot password.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.auth.resetPassword(this.state.form).then(() => {
        browserHistory.push('/landing')
      }).catch(() => false)
    }
  }

  onLogin () {
    browserHistory.push('/landing')
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='cn-forgot-password-container'>
        <div className='content-landing'>
          <div>
            <h1>
              <img src='../../../src/assets/images/logo-wide-blue@1x.png' style={{height: '5rem'}} />
              <span style={{display: 'block'}}>Reset your password.</span>
            </h1>
          </div>

          <div className='margin-top'>
            <InputField
              className=""
              placeholder="Password"
              name="password"
              type="password"
              value={form.password}
              error={formErrors.password}
              onChange={updateProperty}
            />
          </div>

          <div className='margin-top'>
            <InputField
              className=""
              placeholder="Password Confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              error={formErrors.password_confirmation}
              onChange={updateProperty}
            />
          </div>

          <a className='right login-button' onClick={this.onLogin.bind(this)}>Login?</a>
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Reset Password</button>

        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(ResetPassword, 'form'))
