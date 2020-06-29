import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import logo from '../../../assets/images/insights/skoller-insights-logo.png'
import moment from 'moment'

@inject('rootStore') @observer
class InsightsLanding extends React.Component {
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
    this.cookie = new Cookies()
    this.tokenLogin()
  }

  tokenLogin () {
    let authToken = this.cookie.get('skollerToken')
    if (authToken) {
      actions.auth.getUserByToken(authToken)
        .then(r => {
          if (r.user.roles.map(r => r.id).includes(700)) {
            this.props.history.push('/insights/dashboard')
          }
        })
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

        this.props.history.push('/insights/dashboard')
      }).catch((reason) => false)
    }
  }

  onForgotPassword () {
    this.props.history.push('/forgot_password')
  }

  render () {
    return (
      <div className='si-landing'>
        <nav>
          <div className='nav-content'>
            <div className='si-l-logo'>
              <img src={logo} />
              <span>A product of Skoller, Inc.</span>
            </div>
            <div className='si-l-login'>
              <div className='si-l-login-form-container'>
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
                </div>

                <button type="submit" className="button" onClick={this.onSubmit.bind(this)}>Login</button>
              </form>
              </div>
              <Link to={{
                pathname: '/forgot_password',
                state: {
                  insightsReset: true
                }
              }} className='si-l-login-forgot-password link-style'>Forgot password?</Link>
            </div>
          </div>
        </nav>
        <div className='si-landing-content'>
          <iframe
            className='jumbo'
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4qXVfl6cUe4"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
          <div className='si-landing-heading'>
            <h1>Helping coaches and advisors visualize upcoming work for student-athletes.</h1>
            <a href='https://explore.skoller.co/insights'><p>Explore</p></a>
          </div>
        </div>
        <footer>
          <div className='footer-content'>
            <a href={'https://explore.skoller.co'} className='link-style'>What is Skoller?</a>
            <a href={'https://explore.skoller.co/insights'} className='link-style'>About Skoller Insights</a>
            <a href={'https://explore.skoller.co/privacy-policy'} className='link-style'>Privacy policy</a>
            <a href={'https://explore.skoller.co/contactus'} className='link-style'>Contact us</a>
            <p style={{color: '#a9a9a9'}}>&copy; Skoller, Inc. {moment().format('YYYY')}</p>
          </div>
        </footer>
      </div>
    )
  }
}

InsightsLanding.propTypes = {
  history: PropTypes.object
}

export default withRouter(InsightsLanding)
