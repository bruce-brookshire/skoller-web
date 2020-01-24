import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Cookies } from '../../../node_modules/react-cookie'
import actions from '../../actions'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class AdminLanding extends React.Component {
  static propTypes = {
    formErrors: PropTypes.object,
    resetValidation: PropTypes.func,
    rootStore: PropTypes.object,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
    onSubmit: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = {
      email: '',
      password: ''
    }
  }

  setEmail = e => {
    this.setState({email: e.target.value})
  }

  setPassword = e => {
    this.setState({password: e.target.value})
  }

  /*
  * Initialize state
  */
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

  onSubmit (event) {
    event.preventDefault()
    let {email, password} = this.state

    email = email.trim()
    password = password.trim()

    if (email !== '' && password !== '') {
      actions.auth.authenticateUser({email: email, password: password}).then(() => {
        const { userStore: { authToken } } = this.props.rootStore

        this.cookie.remove('skollerToken', { path: '/' })
        this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 270, path: '/' })

        this.props.history.push('/hub')
      }).catch((reason) => false)
    }
  }

  onForgotPassword () {
    this.props.history.push('/forgot_password')
  }

  render () {
    return (
      <div className='hub-admin-login'>
        <img alt="Skoller" className='logo' src='/src/assets/images/logo-wide-blue@1x.png' />
        <h1>Login to the Hub <i className="em em-crystal_ball"></i></h1>
        <form className="form-login" onSubmit={this.onSubmit.bind(this)}>
          <div className='form-control'>
            <input
              label=''
              name='email'
              placeholder='Email'
              onChange={this.setEmail}
            />
          </div>

          <div className='form-control' >
            <input
              label=''
              name='password'
              placeholder='Password'
              type='password'
              onChange={this.setPassword}
            />
            <a className='right forgot-password' onClick={this.onForgotPassword.bind(this)}>Forgot password?</a>
          </div>

          <button type="submit" className="button" onClick={this.onSubmit.bind(this)}>Login</button>
        </form>
      </div>
    )
  }
}

export default withRouter(AdminLanding)
