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
      continueButtonDisabled: false,
      resendButtonDisabled: false
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
  onSubmit = () => {
    this.setState({continueButtonDisabled: true})
    actions.auth.loginStudentWithPhone(this.getForm().phone, this.getForm().verification_code).then(() => {
      this.setState({continueButtonDisabled: false})
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
      console.log('On submit error', r)
      this.setState({continueButtonDisabled: false})
    })
  }

  /*
  * Resend verification code to the user.
  */
  onResendVerification () {
    this.setState({resendButtonDisabled: true})
    actions.auth.resendVerification().then(() => {
      this.setState({resendButtonDisabled: false})
    }).catch((r) => {
      console.log('Resend verification error:', r);
      this.setState({resendButtonDisabled: false})
    })
  }

  render () {
    const phone = this.props.phone
    const disableContinueButton = !this.isValid()
    const disableContinueButtonClass = this.state.continueButtonDisabled ? 'disabled' : ''
    const disableResendButtonClass = this.state.resendButtonDisabled ? 'disabled' : ''

    return (
      <SkModal closeModal={this.props.closeModal}>
        <div className='sk-verification-container'>
          <div className='sk-verification-content'>
            <img src='/src/assets/images/letter2.png' />
            <div className='sk-verification-content-container'>
              <h1>Check your texts 🤓</h1>
                We sent a verification code to {formatPhone(phone)}. Enter it here!
                <br /> 
                Didn’t get it? 
                <button 
                  className={`button-link-type ${disableResendButtonClass}`}
                  style={{marginLeft: '8px'}} 
                  onClick={() => this.onResendVerification()}
                  disabled={this.state.resendButtonDisabled}
                >Resend link.</button>
              <div className='sk-verification-code-container'>
                <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
              </div>
              <button
                className={`sk-verification-button ${disableContinueButtonClass}`}
                onClick={() => this.onSubmit()}
                disabled={this.state.continueButtonDisabled || disableContinueButton}
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
