import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class LandingFooter extends React.Component {
  render () {
    return (
      <footer className='cn-landing-footer'>
        <div className='footer-content'>
          <div className='footer-link'>
            <Link className='link-style' to='/insights'>Skoller Insights</Link>
          </div>
          <div className='footer-link'>
            <a className='link-style' href='https://explore.skoller.co/press'>What students say about us</a>
          </div>
          <div className='footer-link'>
            <a className='link-style' href='https://explore.skoller.co/team'>Our team</a>
          </div>
          <div className='footer-link'>
            <a className='link-style' href='https://explore.skoller.co/privacy-policy'>Privacy policy</a>
          </div>
          <div className='footer-link'>
            <a className='link-style' href="https://explore.skoller.co/contactus">Contact us</a>
          </div>
          <div className='footer-link'>
            &copy; Skoller, Inc. {moment().format('YYYY')}
          </div>
        </div>
      </footer>
    )
  }
}
export default LandingFooter
