import React from 'react'
import PropTypes from 'prop-types'

class DownloadApp extends React.Component {
  render () {
    return (
      <div id='cn-download-app'>
        <div className='center-text'>
          To get the most out of Skoller, download the app!
          <a href='https://itunes.apple.com/us/app/skoller/id1314782490'><img src='/src/assets/images/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg' /></a>
        </div>
        <div className='center-text'>
          Otherwise, click the button below to
          <button className='button full-width' onClick={() => this.props.onNext()}>Continue to the Web App</button>
        </div>
      </div>
    )
  }
}

DownloadApp.propTypes = {
  onNext: PropTypes.func
}

export default DownloadApp
