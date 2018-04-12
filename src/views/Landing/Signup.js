import React from 'react'
import SignUpForm from './SignUpForm'

class Signup extends React.Component {
  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='container-form-register'>
          <SignUpForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default Signup
