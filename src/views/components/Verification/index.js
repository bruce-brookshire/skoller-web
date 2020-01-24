import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import VerificationCode from '../../../components/VerificationCode'
import actions from '../../../actions'
import {formatPhone} from '../../../utilities/display'
import { withRouter } from 'react-router-dom'
var Environment = require('../../../../environment.js')

const numberOfDigits = 5

@inject('rootStore') @observer
class Verification extends React.Component {
  constructor (props) {
    super(props)
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
  onNext () {
    actions.auth.verifyPhoneNumber(this.getForm()).then(() => {
      if (this.props.onSubmit) {
        this.props.onSubmit()
      } else {
        this.props.history.push('/student')
      }
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
    const disableButton = !this.isValid()
    const disableClass = disableButton ? 'disabled' : ''
    const {userStore: {user}} = this.props.rootStore
    const {location} = this.props
    const referralCode = this.props.referralCode || (location && location.state && location.state.referralCode) || null

    return (
      <div className='cn-verification-container'>
        <div className='vertical-align'>
          <div className='cn-verification-content'>
            <div className='img-container'>
              <img src='/src/assets/images/letter2.png' />
            </div>
            <div className='content-container'>
              <h1>Verify your phone number</h1>
              <span>We sent a verification code to {formatPhone(user.student.phone)}. Enter it here! Didn’t get it? <a onClick={this.onResendVerification.bind(this)}>Resend link</a>.</span>
              <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
              <button
                className={`button full-width ${disableClass}`}
                onClick={this.onNext.bind(this)}
                disabled={disableButton}
              >Continue</button>
            </div>
          </div>
        </div>
        {user.student && referralCode &&
          <img src={`//socialladder.rkiapps.com/socialladderapi/api/v1/campaign/track?Action=SALE&UDF1=${Environment.NAME + user.student.id}&udf3=SKOLLER&udf4=1&UDF5=${referralCode}`} />
        }
      </div>
    )
  }
}

Verification.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func,
  referralCode: PropTypes.string,
  location: PropTypes.object
}

export default withRouter(Verification)
