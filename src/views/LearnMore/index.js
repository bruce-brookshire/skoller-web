import React from 'react'
import LandingNav from '../components/LandingNav'
import {inject, observer} from 'mobx-react'
import Purpose from './Purpose'
import Process from './Process'
import FeatureHighlights from './FeatureHighlights'
import CommunityFeature from './CommunityFeature'
import CallToAction from './CallToAction'
import LandingFooter from '../components/LandingFooter'
import PropTypes from 'prop-types'

@inject('rootStore') @observer
class LearnMore extends React.Component {
  render () {
    return (
      <div className='cn-learn-more-container'>
        <LandingNav rootStore={this.props.rootStore} />
        <div className='cn-learn-more-content'>
          <div className='video'>
            <iframe src="https://www.youtube.com/embed/SIMVxy0sr74" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
        <Purpose/>
        <Process/>
        <FeatureHighlights/>
        <CommunityFeature/>
        <CallToAction/>
        <LandingFooter />
      </div>
    )
  }
}

LearnMore.propTypes = {
  rootStore: PropTypes.object
}

export default LearnMore
