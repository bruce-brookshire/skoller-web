import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import VerificationCode from '../../../components/VerificationCode'
import actions from '../../../actions'
import {formatPhone} from '../../../utilities/display'
import { withRouter } from 'react-router-dom'
import SkModal from '../../components/SkModal/SkModal'
import {Cookies} from 'react-cookie'

const numberOfDigits = 5

@inject('rootStore') @observer
class Verification extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = {
      code: '',
      buttonDisabled: false
    }
  }

  /*
  * On verification code input change.
  *
  * @param [String] code. The code from the input.
  */
  onChange (code) {
    this.setState({code})
    console.log(this.state, "STATE STATE")
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
  * Disable button on click until response is received.
  */
 disableButton(shouldDisable) {
  this.setState({buttonDisabled: shouldDisable});
 }

  /*
  * Sumbit the verification code for authorization.
  */
  onSubmit = () => {
    this.setState({buttonDisabled: true})
    actions.auth.loginStudentWithPhone(this.getForm().phone, this.getForm().verification_code).then(() => {
      this.setState({buttonDisabled: false})
      const { userStore: { authToken } } = this.props.rootStore
      this.cookie.remove('skollerToken', { path: '/' })
      this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 270, path: '/' })
      if (this.props.rootStore.userStore.user.student.primary_school) {
        this.props.history.push('/student')
      } else if (this.props.onSubmit) {
        this.props.onSubmit()
      } else {
        this.props.history.push('/onboard/select-school')
      }
    }).catch((r) => {
      console.log('error town', r)
      this.setState({buttonDisabled: false})
    })
  }

  /*
  * Resend verification code to the user.
  */
  onResendVerification () {
    actions.auth.resendVerification().then(() => {
    }).catch(() => false)
  }

  render () {
    console.log(this.state.buttonDisabled)
    const phone = this.props.phone
    const disableButton = !this.isValid()
    const disableClass = this.state.buttonDisabled ? 'disabled' : ''

    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className='sk-verification-container'>
          <div className='sk-verification-content'>
            <img src='/src/assets/images/letter2.png' />
            <div className='sk-verification-content-container'>
              <h1>Check your texts 🤓</h1>
              <span>We sent a verification code to {formatPhone(phone)}. Enter it here!<br /> Didn’t get it? <a className='link-style' onClick={() => this.onResendVerification()}>Resend link</a>.</span>
              <div className='sk-verification-code-container'>
                <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
              </div>
              <button
                className={`sk-verification-button ${disableClass}`}
                onClick={() => this.onSubmit()}
                disabled={this.state.buttonDisabled || disableButton}
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
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func
}

export default withRouter(Verification)
