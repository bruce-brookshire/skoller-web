import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import partners from '../../../views/Student/Onboard/partners'
import { browserHistory } from 'react-router'

@inject('rootStore') @observer
class SkBanner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      banner: this.getBannerChoice()
    }
  }

  getBannerChoice () {
    if (this.partnerLogic() && this.props.rootStore.studentNavStore.activePage !== 'share') {
      return 'partner'
    } else {
      return null
    }
  }

  hasCompletedClass () {
    let classes = this.props.rootStore.studentClassesStore.classes
    let hasCompletedClass = false
    if (classes) {
      classes.forEach(cl => {
        if (cl.status.id > 1300) {
          hasCompletedClass = true
        }
      })
    }
    return hasCompletedClass
  }

  partnerLogic () {
    let hasCompletedClass = this.hasCompletedClass()
    if (
      this.props.rootStore.userStore.user.student.raise_effort &&
      hasCompletedClass &&
      this.props.rootStore.studentNavStore.activePage !== 'share'
    ) {
      return true
    } else {
      return false
    }
  }

  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug === partnerSlug) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  renderPartnerBanner () {
    const partner = this.getPartner(this.props.rootStore.userStore.user.student.raise_effort.org_name)
    return (
      <div className='sk-banner-partner'>
        <div className='sk-banner-partner-logo'>
          <img src={partner.logo} />
        </div>
        <div className='sk-banner-partner-content'>
          <p className='sk-banner-partner-content-headline'><span style={{color: '#' + partner.primaryColor}}>RAISE HUNDREDS</span> for {partner.philanthropy}!</p>
          <div className='sk-banner-partner-content-action'>
            <div className='sk-banner-partner-content-button'>
              <p
                style={{backgroundColor: '#' + partner.primaryColor}}
                onClick={() => browserHistory.push('/student/share')}
              >
                CLICK HERE
              </p>
            </div>
            <p>to share with classmates</p>
          </div>
        </div>
      </div>
    )
  }

  renderContent () {
    if (this.state.banner === 'partner') {
      return (
        this.renderPartnerBanner()
      )
    } else {
      return null
    }
  }

  render () {
    if (this.state.banner) {
      return (
        <div className='sk-banner-wrapper'>
          <div className='sk-banner'>
            {this.renderContent()}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

SkBanner.propTypes = {
  rootStore: PropTypes.object
}

export default SkBanner
