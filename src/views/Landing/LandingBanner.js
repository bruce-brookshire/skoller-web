import React from 'react'

class LandingBanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showBanner: false
    }
  }

  render () {
    if (this.state.showBanner) {
      return (
        <div className='sk-landing-banner'>
          <i className='fas fa-times' onClick={() => this.setState({showBanner: false})} />
          <div className='sk-landing-banner-content'>
            <div className='sk-landing-banner-logos'>
              <div className='logo'><img alt="Skoller" src='/src/assets/images/logo-wide-white@1x.png' /></div>
              <div className='plus'> + </div>
              <div className='logo seedinvest'><img alt="SeedInvest" src='/src/assets/images/seedinvest.png' /></div>
            </div>
            <div className='sk-landing-banner-info'>
              <div className='light'>
                Campaign <span className='bold'>LIVE</span> for a <span className='bold'>LIMITED TIME</span>
              </div>
              <div className='light'>
                Act fast and check out the link <span className='bold'>BELOW</span>!
              </div>
              <a href='https://seedinvest.com/skoller' target='_blank' rel='noopener noreferrer' className='sk-landing-banner-button'>
                <p>Check it out!</p>
              </a>
            </div>
          </div>
          <div />
        </div>
      )
    } else {
      return null
    }
  }
}

export default LandingBanner
