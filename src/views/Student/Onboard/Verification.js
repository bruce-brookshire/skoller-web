import React from 'react'
import VerificationCode from '../../../components/VerificationCode'
import actions from '../../../actions'

const numberOfDigits = 5

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
      this.props.onNext()
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

    return (
      <div>
        <div className='cn-verification-container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-4 img-container'>
              <img className='right center-vertical' src='src/assets/images/buzz_buzz.png' />
            </div>
            <div className='col-xs-12 col-sm-8 content-container'>
              <h1>Buzz Buzz</h1>
              <span>We sent a verification code to your phone. Enter it here, please.</span>
              <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
              <a className='resend-verification' onClick={this.onResendVerification.bind(this)}>Resend verification code?</a>
            </div>
          </div>
        </div>

        <div className='row full-width justify-center'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
            <div style={{position: 'relative'}}>
              <button
                className={`button full-width margin-top margin-bottom ${disableClass}`}
                onClick={this.onNext.bind(this)}
                disabled={disableButton}
              >Aight</button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Verification
