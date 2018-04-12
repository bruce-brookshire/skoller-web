import React from 'react'
import {browserHistory} from 'react-router'

class LandingFooter extends React.Component {
  render () {
    return (
      <footer className='cn-landing-footer'>
        <div className='footer-content'>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://docs.google.com/forms/d/1lgXeLjNEbrFeQ6YWJw-q-Ou6BKY8TSaOpGyUkAkNWKY/edit'>Become an ambassador</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' onClick={() => { browserHistory.push('/what-people-say'); window.scrollTo(0, 0) }}>What people are saying about us</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' onClick={() => { browserHistory.push('/privacypolicy'); window.scrollTo(0, 0) }}>Privacy policy.</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href="mailto:support@skoller.com">Contact us.</a>
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
