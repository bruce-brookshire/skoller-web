import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import LoginForm from './LoginForm'
import PromoSignup from './PromoSignup'
import Purpose from './Purpose'
import Process from './Process'
import FeatureHighlights from './FeatureHighlights'
import CommunityFeature from './CommunityFeature'
import Availability from './Availability'
import CallToAction from './CallToAction'

@inject('rootStore') @observer
class Landing extends React.Component {
  render () {
    return (

      // navbar login section
      <div className='cn-landing-container'>
        <div className='cn-navbar'>
          <div className='left'>
            <img className='logo' src='src/assets/images/blue-logo-full.png'></img>
          </div>
          <div className='user-info right'>
            <LoginForm rootStore={this.props.rootStore}/>
          </div>
        </div>

        {/* start of section 1 */}

        <PromoSignup rootStore={this.props.rootStore}/>

        {/* start of section 2 */}
        <Purpose/>

        {/* start of section 3 */}
        <Process/>

        {/* start of section 4 */}
        <FeatureHighlights/>

        {/* start of section 5 */}
        <CommunityFeature/>

        {/* start of section 6 */}
        <Availability/>

        {/* start of section 7 */}
        <CallToAction/>

      </div>
    )
  }
}

Landing.PropTypes = {
  rootStore: PropTypes.object
}

export default Landing
