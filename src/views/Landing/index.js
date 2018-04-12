import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'

import DocumentMeta from 'react-document-meta'
import SmartBanner from 'react-smartbanner'
import '../../../node_modules/react-smartbanner/src/styles/style.scss'

import LoginForm from './LoginForm'
import PromoSignup from './PromoSignup'
import LandingMessage from './LandingMessage'
import Purpose from './Purpose'
import Process from './Process'
import FeatureHighlights from './FeatureHighlights'
import CommunityFeature from './CommunityFeature'
import Availability from './Availability'
import CallToAction from './CallToAction'
import PeopleTalking from './PeopleTalking'

@inject('rootStore') @observer
class Landing extends React.Component {
  render () {
    const meta = {
      title: 'Skoller',
      meta: {
        name: {
          'apple-itunes-app': 'app-id=1314782490'
        }
      },
      extend: true
    }

    return (
      <div className='cn-landing-container'>
        <div className='cn-navbar'>
          <div className='cn-navbar-content'>
            <h1>
              <img alt="Skoller" className='logo' src='src/assets/images/logo-wide-blue@1x.png' />
            </h1>
            <LoginForm rootStore={this.props.rootStore}/>
          </div>
        </div>

        {/* start of section 1 */}
        <div className='cn-landing-content-wrapper'>
          <div className='cn-landing-content'>
            <LandingMessage rootStore={this.props.rootStore}/>
            <PromoSignup rootStore={this.props.rootStore}/>
          </div>

          <div className='cn-learn-more'>
            When one person is keeping up, everyone is keeping up. Learn more.
          </div>
        </div>

        {/* start of section 2 */}
        {/* <Purpose/> */}

        {/* start of section 3 */}
        {/* <Process/> */}

        {/* start of section 4 */}
        {/* <FeatureHighlights/> */}

        {/* start of section 5 */}
        {/* <CommunityFeature/> */}

        {/* start of section 6 */}
        {/* <Availability/> */}

        {/* start of section 7 */}
        {/* <PeopleTalking/> */}

        {/* start of section 8 */}
        {/* <CallToAction/> */}

        <footer className="site-footer">
          <div className='footer-content'>
            {/* <div className='footer-link'>
              Become an ambassador
            </div> */}
            <span className="copyright">
              Copyright &copy; Skoller, LLC {}. All rights reserved.
            </span>
            <span className="privacypolicy">
              <a onClick={() => { browserHistory.push('/privacypolicy'); window.scrollTo(0, 0) }}>Privacy policy.</a>
            </span>
            <span className="support">
              Need help? <a href="mailto:support@skoller.com">Contact us.</a>
            </span>
          </div>
        </footer>

      </div>
    )
  }
}

Landing.PropTypes = {
  rootStore: PropTypes.object
}

export default Landing
