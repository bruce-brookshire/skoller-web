import React from 'react'
import {browserHistory} from 'react-router'

class LandingFooter extends React.Component {
  render () {
    return (
      <footer className='cn-landing-footer'>
        <div className='footer-content'>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://blog.skoller.co'>Blog</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' onClick={() => { browserHistory.push('/what-people-say'); window.scrollTo(0, 0) }}>What people are saying about us</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' onClick={() => { browserHistory.push('/our-team'); window.scrollTo(0, 0) }}>Our team</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' onClick={() => { browserHistory.push('/privacypolicy'); window.scrollTo(0, 0) }}>Privacy policy</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href="mailto:support@skoller.co">Contact us</a>
          </div>
          <div className='footer-link'>
            Skoller, Inc. &copy; 2018
          </div>
        </div>
      </footer>
    )
  }
}
export default LandingFooter
