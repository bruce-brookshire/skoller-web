import React from 'react'
import PropTypes from 'prop-types'

class DownloadApp extends React.Component {
  render () {
    return (
      <div id='cn-download-app'>
        <div className='center-text margin-bottom'>
          <div className='margin-bottom'>To get the most out of Skoller, download the app!</div>
          <a href='https://itunes.apple.com/us/app/skoller/id1314782490'><img src='/src/assets/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg' /></a>
        </div>
        <div className='center-text'>
          <div className='margin-bottom'>Otherwise, click the button below to</div>
          <button className='button full-width' onClick={() => this.props.onNext()}>Continue to Skoller on the web</button>
        </div>
      </div>
    )
  }
}

DownloadApp.propTypes = {
  onNext: PropTypes.func
}

export default DownloadApp
