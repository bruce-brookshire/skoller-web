import React from 'react'
import LoginForm from './LoginForm'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'

class LandingNav extends React.Component {
  render () {
    return (
      <div className='cn-landing-navbar'>
        <div className='cn-navbar-content'>
          <h1>
            <a onClick={() => { browserHistory.push('/landing'); window.scrollTo(0, 0) }} ><img alt="Skoller" className='logo' src='src/assets/images/logo-wide-blue@1x.png' /></a>
          </h1>
          {!this.props.hideLogin && <LoginForm rootStore={this.props.rootStore}/>}
        </div>
      </div>
    )
  }
}

LandingNav.propTypes = {
  hideLogin: PropTypes.bool,
  rootStore: PropTypes.object
}

export default LandingNav
