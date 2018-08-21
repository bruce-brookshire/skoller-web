import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import SignUpForm from '../components/SignUpForm'
import {inject, observer} from 'mobx-react'
import {Cookies} from 'react-cookie'

@inject('rootStore') @observer
class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
  }

  onSubmit (referralCode) {
    const { userStore: { authToken } } = this.props.rootStore
    this.cookie.remove('skollerToken', { path: '/' })
    this.cookie.set('skollerToken', authToken, { maxAge: 84600 * 7, path: '/' })
    browserHistory.push({pathname: '/student/verify', state: {referralCode: referralCode}})
  }

  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='container-form-register'>
          <div id='sign-up-form'>
            <SignUpForm {...this.props}
              header={<div>Sign up <small className='sub-header'>(it&apos;s free!)</small></div>}
              buttonText='Take me there.'
              onSubmit={this.onSubmit.bind(this)}
              referralCode={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  rootStore: PropTypes.object
}

export default Signup
