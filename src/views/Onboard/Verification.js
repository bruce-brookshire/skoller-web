import React from 'react'
import VerificationCode from '../../components/VerificationCode'

const numberOfDigits = 5

class Verification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: ''
    }
  }
  onChange (code) {
    this.setState({code})
  }

  render () {
    return (
      <div className='cn-verification-container'>
        <div className='row'>
          <div className='col-xs-12 col-sm-4 img-container'>
            <img className='right center-vertical' src='src/assets/images/buzz_buzz.png' />
          </div>
          <div className='col-xs-12 col-sm-8 content-container'>
            <h1>Buzz Buzz</h1>
            <span>We sent a verification code to your phone. Enter it here, please.</span>
            <VerificationCode numberOfDigits={numberOfDigits} onChange={this.onChange.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Verification
