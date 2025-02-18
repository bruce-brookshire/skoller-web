import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

import 'react-document-meta'
import 'react-smartbanner'
import '../../../node_modules/react-smartbanner/src/styles/style.scss'

import LandingNav from '../components/LandingNav'
import Signup from './Signup'
import LandingFooter from '../components/LandingFooter'
import LandingBanner from './LandingBanner'
import skollerHome from '../../assets/images/landing_page/skoller-home.png'

@inject('rootStore') @observer
class Landing extends React.Component {
  render () {
    const meta = { // eslint-disable-line no-unused-vars
      title: `Skoller`,
      meta: {
        name: {
          'apple-itunes-app': 'app-id=1314782490'
        }
      },
      extend: true
    }

    return (
      <div className='cn-landing-wrapper'>
        <LandingBanner />
        {window.innerWidth > 767 && <LandingNav rootStore={this.props.rootStore}/>}
        <div className='cn-landing-container' id='cn-landing-container'>

          <div className='cn-landing-content-wrapper'>
            {window.innerWidth <= 767 && <LandingNav rootStore={this.props.rootStore}/>}
            <div className='cn-landing-content'>
              {/* <LandingMessageType rootStore={this.props.rootStore}/> */}
              <Signup rootStore={this.props.rootStore}/>
              <div className='cn-landing-image-container'>
                <div
                  className='cn-landing-image'
                  style={{
                    backgroundImage: `url(${skollerHome})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'}}
                  src={skollerHome}
                />
                {/* <div className='cn-learn-more'>
                  <p>Want to learn more?</p>
                  <a className='button cn-landing-button' href='https://explore.skoller.co'>Explore</a>
                </div> */}
              </div>
            </div>
          </div>

          {/* <LandingFooter /> */}

        </div>
        <LandingFooter />
      </div>
    )
  }
}

Landing.propTypes = {
  rootStore: PropTypes.object
}

export default Landing
