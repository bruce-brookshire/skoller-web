import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import VerificationCode from '../../../components/VerificationCode'
import actions from '../../../actions'
import {formatPhone} from '../../../utilities/display'
import {browserHistory} from 'react-router'
import SkModal from '../../components/SkModal/SkModal'
import {Cookies} from 'react-cookie'

const numberOfDigits = 5

@inject('rootStore') @observer
class Verification extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = {
      code: ''
    }
  }

  /*
  * On verification code input change.
  *
  * @param [String] code. The code from the input.
  */
  onChange (code) {
    this.setState({code})
  }

  /*
  * Format the verification code.
  */
  getForm () {
    return {
      phone: this.props.phone,
      verification_code: this.state.code
    }
  }

  /*
  * Determine if the form is valid.
  */
  isValid () {
    return this.state.code.length === numberOfDigits
  }

  /*
  * Sumbit the verification code for authorization.
  */
  onSubmit () {
    console.log(this.getForm())
    actions.auth.loginStudentWithPhone(this.getForm().phone, this.getForm().verification_code).then((response) => {
      browserHistory.push('/student')
      const { userStore: { authToken } } = this.props.rootStore
      this.cookie.remove('skollerToken', { path: '/' })
      this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 7, path: '/' })
    }).catch(() => false)
  }

  /*
  * Resend verification code to the user.
  */
  onResendVerification () {
    actions.auth.resendVerification().then(() => {
    }).catch(() => false)
  }

  render () {
    const phone = this.props.phone
    const disableButton = !this.isValid()
    const disableClass = disableButton ? 'disabled' : ''

    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className='sk-verification-container'>
          <div className='sk-verification-content'>
            <img src='/src/assets/images/letter2.png' />
            <div className='sk-verification-content-container'>
              <h1>Check your texts 🤓</h1>
              <span>We sent a verification code to {formatPhone(phone)}. Enter it here!<br /> Didn’t get it? <a onClick={this.onResendVerification.bind(this)}>Resend link</a>.</span>
              <div className='sk-verification-code-container'>
                <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
              </div>
              <button
                className={`sk-verification-button ${disableClass}`}
                onClick={this.onSubmit.bind(this)}
                disabled={disableButton}
              >Continue</button>
            </div>
          </div>
        </div>
      </SkModal>
    )
  }
}

Verification.propTypes = {
  rootStore: PropTypes.object,
  phone: PropTypes.string,
  closeModal: PropTypes.func
}

export default Verification
