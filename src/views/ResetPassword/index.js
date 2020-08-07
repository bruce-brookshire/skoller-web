import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import actions from '../../actions'
import queryString from 'query-string'

// const requiredFields =
// {
//   'password': {
//     type: 'password'
//   },
//   'password_confirmation': {
//     type: 'passwordConfirmation'
//   }
// }

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
    console.log(this.props)
    if (this.state.form.password !== '' && this.state.form.password === this.state.form.password_confirmation) {
      const token = queryString.parse(this.props.location.search).token
      // const token = null
      actions.auth.resetPassword(this.state.form, token).then(() => {
        this.props.history.push('/landing')
      }).catch(() => false)
    }
  }

  onLogin () {
    this.props.history.push('/landing')
  }

  render () {
    const {form} = this.state
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
            <input
              autoFocus
              className="sk-input"
              placeholder="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => this.setState({form: {...this.state.form, password: e.target.value}})}
            />
          </div>

          <div className='margin-top'>
            <input
              className="sk-input"
              placeholder="Password Confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={(e) => this.setState({form: {...this.state.form, password_confirmation: e.target.value}})}
            />
          </div>

          <a className='right login-button link-style' onClick={this.onLogin.bind(this)}>Login?</a>
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Reset Password</button>

        </div>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  location: PropTypes.object,
  validateForm: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(ResetPassword)
