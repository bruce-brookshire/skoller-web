import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'

const requiredFields = {
  'email': {
    type: 'required'
  }
}

class ForgotPassword extends React.Component {
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
      email: ''
    }
  }

  /*
  * On submit forgot password.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.auth.forgotPassword(this.state.form).then(() => {
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
              <span style={{display: 'block'}}>Forgot your password?</span>
            </h1>
            <span>
              Enter the email address associated with your Skoller account,
              and we will send you an email with further instructuons to access your account.
            </span>
          </div>

          <div className='margin-top'>
            <InputField
              className=""
              placeholder="Email Address"
              name="email"
              value={form.email}
              error={formErrors.email}
              onChange={updateProperty}
            />
          </div>

          <a className='right login-button' onClick={this.onLogin.bind(this)}>Login?</a>
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Submit</button>

        </div>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(ForgotPassword, 'form'))
