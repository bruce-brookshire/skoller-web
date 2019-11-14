import React from 'react'
import { observer, inject } from 'mobx-react'
import VerificationCode from '../../../../components/VerificationCode'
import {formatPhone} from '../../../../utilities/display'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import {Cookies} from 'react-cookie'

@inject('rootStore') @observer
class EnrollVerify extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = {
      code: ''
    }
    console.log('ok its constructing EnrollVerify', this.props)
  }

  getForm () {
    return {
      phone: this.props.phone,
      verification_code: this.state.code
    }
  }

  onSubmit = () => {
    actions.auth.loginStudentWithPhone(this.getForm().phone, this.getForm().verification_code).then((response) => {
      const { userStore: { authToken } } = this.props.rootStore
      this.cookie.remove('skollerToken', { path: '/' })
      this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 270, path: '/' })
      this.props.onSubmit()
    }).catch((r) => console.log('error verifying phone', r))
  }

  /*
  * Resend verification code to the user.
  */
  onResendVerification () {
    actions.auth.resendVerification().then(() => {
    }).catch(() => false)
  }

  /*
  * Determine if the form is valid.
  */
  isValid () {
    return this.state.code.length === 5
  }

  onChange (code) {
    this.setState({code})
  }

  render () {
    const disableButton = !this.isValid()
    const disableClass = disableButton ? 'disabled' : ''

    return (
      <div className='sk-verification-container'>
        <div className='sk-verification-content'>
          <div className='sk-verification-content-container'>
            <p>We sent a verification code to {formatPhone(this.props.phone)}. Enter it here!<br /> Didn’t get it? <a onClick={() => console.log('make this work jonjon')}>Resend link</a>.</p>
            <div className='sk-verification-code-container'>
              <VerificationCode numberOfDigits={5} onChange={this.onChange.bind(this)} />
            </div>
            <button
              className={`sk-verification-button ${disableClass}`}
              onClick={() => this.onSubmit()}
              disabled={disableButton}
            >Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

EnrollVerify.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.function,
  phone: PropTypes.string,
  classNotFound: PropTypes.bool
}

export default EnrollVerify
