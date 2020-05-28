import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import actions from '../../actions'

class ForgotPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: this.initializeFormData(),
      insightsReset: false
    }
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
    if (this.state.form.email !== '') {
      actions.auth.forgotPassword(this.state.form).then(() => {
        if (this.state.insightsReset) {
          this.props.history.push('/insights')
        } else {
          this.props.history.push('/admin-login')
        }
      }).catch(() => false)
    }
  }

  onLogin () {
    if (this.state.insightsReset) {
      this.props.history.push('/insights')
    } else {
      this.props.history.push('/admin-login')
    }
  }

  renderHeader () {
    if (this.state.insightsReset) {
      return (
        <h1>
          <img src='../../../src/assets/images/logo-wide-blue@1x.png' style={{height: '5rem'}} />
          <span style={{display: 'block'}}>Reset your password</span>
        </h1>
      )
    } else {
      return (
        <h1>
          <img src='../../../src/assets/images/logo-wide-blue@1x.png' style={{height: '5rem'}} />
          <span style={{display: 'block'}}>Forgot your password?</span>
        </h1>
      )
    }
  }

  render () {
    const {form} = this.state
    return (
      <div className='cn-forgot-password-container'>
        <div className='content-landing'>
          <div>
            {this.renderHeader()}
            <span>
              Enter the email address associated with your Skoller{this.state.insightsReset ? ' Insights' : ''} account,
              and we will send you an email with further instructions {this.state.insightsReset ? ' reset your password' : 'to access your account'}.
            </span>
          </div>

          <div className='margin-top'>
            <input
              autoFocus
              className="sk-input"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={(e) => this.setState({form: {email: e.target.value}})}
            />
          </div>

          <a className='right login-button link-style' onClick={this.onLogin.bind(this)}>Login?</a>
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Submit</button>

        </div>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object
}

export default withRouter(ForgotPassword)
