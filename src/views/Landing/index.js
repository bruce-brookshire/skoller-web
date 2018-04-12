import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'

import DocumentMeta from 'react-document-meta'
import SmartBanner from 'react-smartbanner'
import '../../../node_modules/react-smartbanner/src/styles/style.scss'

import LandingNav from '../components/LandingNav'
import Signup from './Signup'
import LandingMessage from './LandingMessage'

import Availability from './Availability'

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
        <LandingNav rootStore={this.props.rootStore}/>

        {/* start of section 1 */}
        <div className='cn-landing-content-wrapper'>
          <div className='cn-landing-content'>
            <LandingMessage rootStore={this.props.rootStore}/>
            <Signup rootStore={this.props.rootStore}/>
          </div>

          <div className='cn-learn-more'>
            When one person is keeping up, everyone is keeping up. <a className='non-styled-link' onClick={() => { browserHistory.push('/learn-more'); window.scrollTo(0, 0) }}>Learn more</a>.
          </div>
        </div>

        {/* start of section 6 */}
        {/* <Availability/> */}

        {/* start of section 7 */}
        {/* <PeopleTalking/> */}

        <footer className="site-footer">
          <div className='footer-content'>
            <div className='footer-link'>
              <a className='non-styled-link' href='https://docs.google.com/forms/d/1lgXeLjNEbrFeQ6YWJw-q-Ou6BKY8TSaOpGyUkAkNWKY/edit'>Become an ambassador</a>
            </div>
            <div className='footer-link'>
              What people are saying about us
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

      </div>
    )
  }
}

Landing.PropTypes = {
  rootStore: PropTypes.object
}

export default Landing
