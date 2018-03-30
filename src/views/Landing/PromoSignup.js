import React from 'react'
import SignUpForm from './SignUpForm'

class PromoSignup extends React.Component {
  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='video'>
          <iframe src="https://www.youtube.com/embed/SIMVxy0sr74" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className='container-form-register'>
          <SignUpForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default PromoSignup
