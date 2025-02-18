import React from 'react'
import PropTypes from 'prop-types'
import AppStore from '../../../../assets/images/app_download/app-store-badge.svg'
import GooglePlay from '../../../../assets/images/app_download/google-play-badge.png'
import live from '../../../../assets/images/class_status/todolist_gif.gif'

class EnrollDownload extends React.Component {
  redirect () {
    this.props.onNext && this.props.onNext()
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      this.redirect()
    } else if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    } else {
      this.redirect()
    }
  }

  render () {
    const operatingSystem = this.getMobileOperatingSystem()
    return (
      <div className='sk-enroll-download'>
        <div style={{display: 'flex', width: '100%', height: '280px', maxHeight: '300px', flexDirection: 'row', justifyContent: 'center', backgroundImage: `url(${live})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
        <h1>
          Get Skoller on {operatingSystem}.
        </h1>
        <p>
          Skoller works best in the app.
        </p>
        <div className='sk-enroll-download-badge'>
          {operatingSystem === 'Android' &&
            <a
              href='http://play.google.com/store/apps/details?id=com.skoller'
            >
              <img src={GooglePlay} />
            </a>
          }
          {operatingSystem === 'iOS' &&
            <a
              href='http://appstore.com/skoller'
            >
              <img src={AppStore} />
            </a>
          }
        </div>
        {this.props.onNext &&
          <div
            className='sk-enroll-download-next'
            onClick={() => this.props.onNext()}
          >
            <p>Continue to Skoller on the Web</p>
          </div>
        }
      </div>
    )
  }
}

EnrollDownload.propTypes = {
  onNext: PropTypes.function
}

export default EnrollDownload
