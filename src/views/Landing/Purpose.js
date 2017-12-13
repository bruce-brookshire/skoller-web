import React from 'react'
import Slant from '../../components/Slant'

class Purpose extends React.Component {
  render () {
    return (
      <div className='horizontal-align-row center page-height'>
        <div className='section-dimensions blue-section-text even-section'>
          <Slant />
          <div className="section-header">
            <span className='blue-section-text section-text section-topper'>Skoller crowdsources the classroom</span>
            <span className='blue-section-text section-tagline'>to make it easier than ever to stay on top of your academic life</span>
          </div>
          <div className="center-text">
            <img className='purpose_image' src='src/assets/images/landing_page/iPhones_Background.png'/>
          </div>
          {/* <Slant /> */}
        </div>
      </div>
    )
  }
}

export default Purpose
