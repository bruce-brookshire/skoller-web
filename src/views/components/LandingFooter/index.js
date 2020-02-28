import React from 'react'

class LandingFooter extends React.Component {
  render () {
    return (
      <footer className='cn-landing-footer'>
        <div className='footer-content'>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://explore.skoller.co/blog'>Blog</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://explore.skoller.co/press'>What people are saying about us</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://explore.skoller.co/team'>Our team</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href='https://explore.skoller.co/privacy-policy'>Privacy policy</a>
          </div>
          <div className='footer-link'>
            <a className='non-styled-link' href="https://explore.skoller.co/contactus">Contact us</a>
          </div>
          <div className='footer-link'>
            Skoller, Inc. &copy; {new Date().getFullYear().toString()}
          </div>
        </div>
      </footer>
    )
  }
}
export default LandingFooter
