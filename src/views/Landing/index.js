import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const styles = {
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
}


class Landing extends React.Component {
  render () {
    return (
      <div className='cn-landing-container'>
        <div className='cn-navbar'>
          <div className='left'>
            <img className='logo' src='src/assets/images/blue-logo-full.png'></img>
          </div>
          <div className='user-info right'>
              <LoginForm />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-8 vertical-align center'>
            <iframe src="https://www.youtube.com/embed/ENnO_5o52sE" frameborder="0" allowfullscreen></iframe>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 vertical-align center'>
            <SignUpForm />
          </div>
        </div>
      </div>

    )
  }
}

export default Landing
