import React from 'react'
import SignUpForm from './SignUpForm'
import Slant from '../../components/Slant'

class PromoSignup extends React.Component {
  render () {
    return (
      <div id='promo-signup' className='container-promo-signup'>
        <div className='video'>
          <iframe src="https://www.youtube.com/embed/gUCFtHqbygc" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className='container-form-register'>
          <SignUpForm {...this.props}/>
        </div>
      </div>
    )
  }
}

export default PromoSignup
