import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'

import 'react-document-meta'
import 'react-smartbanner'
import '../../../node_modules/react-smartbanner/src/styles/style.scss'

import LandingNav from '../components/LandingNav'
import Signup from './Signup'
import LandingMessageType from './LandingMessageType'
import LandingFooter from '../components/LandingFooter'

@inject('rootStore') @observer
class Landing extends React.Component {
  render () {
    const meta = { // eslint-disable-line no-unused-vars
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
            <LandingMessageType rootStore={this.props.rootStore}/>
            <Signup rootStore={this.props.rootStore}/>
          </div>

          <div className='cn-learn-more'>
            <a className='button cn-landing-button' href='https://explore.skoller.co'>Explore</a>
          </div>
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
