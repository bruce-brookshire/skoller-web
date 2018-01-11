import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
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
          <h1>
            <img alt="Skoller" className='logo' src='src/assets/images/logo-wide-blue@1x.png' />
          </h1>
          <LoginForm rootStore={this.props.rootStore}/>
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

        <footer className="site-footer">
          <span className="copyright">
            Copyright &copy; Skoller, LLC {}. All rights reserved.
          </span>
          <span className="privacypolicy">
            <a onClick={()=>{ browserHistory.push('/privacypolicy') }}>Privacy policy.</a>
          </span>
          <span className="support">
            Need help? <a href="mailto:support@skoller.com">Contact us.</a>
          </span>
        </footer>

      </div>
    )
  }
}

Landing.PropTypes = {
  rootStore: PropTypes.object
}

export default Landing
