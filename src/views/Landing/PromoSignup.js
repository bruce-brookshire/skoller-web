import React from 'react'
import SignUpForm from './SignUpForm'


class PromoSignup extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-8 vertical-align center'>
          <iframe src="https://www.youtube.com/embed/ENnO_5o52sE" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 vertical-align center'>
          <SignUpForm />
        </div>
      </div>
    )
  }
}

export default PromoSignup
