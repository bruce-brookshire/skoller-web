import React from 'react'
import LoginForm from './LoginForm'

class LandingNav extends React.Component {
  render () {
    return (
      <div className='cn-landing-navbar'>
        <div className='cn-navbar-content'>
          <h1>
            <img alt="Skoller" className='logo' src='src/assets/images/logo-wide-blue@1x.png' />
          </h1>
          <LoginForm rootStore={this.props.rootStore}/>
        </div>
      </div>
    )
  }
}
export default LandingNav
