import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import partners from '../../../views/Student/Onboard/partners'
import { browserHistory } from 'react-router'
import SkollerJobsSwitch from '../../../assets/sk-icons/SkollerJobsSwitch'

@inject('rootStore') @observer
class SkBanner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      banners: []
    }
  }

  componentDidMount () {
    this.getBannerChoices()
  }

  async getBannerChoices () {
    let banners = []

    if (this.partnerLogic() && this.props.rootStore.studentNavStore.activePage !== 'share') {
      banners.push('partner')
    }

    if (this.props.rootStore.studentJobsStore.hasJobsProfile && this.props.rootStore.studentNavStore.activePage === 'home') {
      banners.push('jobs')
    }

    this.setState({banners})
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
      this.props.rootStore.studentNavStore.activePage !== 'share' &&
      this.props.rootStore.studentNavStore.activePage !== 'home' &&
      this.renderPartnerBanner()
    ) {
      return true
    } else {
      return false
    }
  }

  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug.toLowerCase() === partnerSlug.toLowerCase()) {
        partner = partners[partnerKey]
      } else if (partners[partnerKey].altName.toLowerCase() === partnerSlug.toLowerCase()) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  renderPartnerBanner () {
    const partner = this.getPartner(this.props.rootStore.userStore.user.student.raise_effort.org_name)
    if (partner) {
      return (
        <div className='sk-banner-partner'>
          <div className='sk-banner-partner-logo'>
            <img src={partner.logo} />
          </div>
          <div className='sk-banner-partner-content'>
            <p style={{display: this.props.hideText ? 'none' : ''}} className='sk-banner-partner-content-headline'><span style={{color: '#' + partner.primaryColor}}>RAISE HUNDREDS</span> for {partner.philanthropy}!</p>
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
    } else {
      return null
    }
  }

  renderLogo (white = false) {
    if (white) {
      return (
        <span>
          <span style={{fontWeight: '900', color: 'white'}}>skoller</span>
          <span style={{fontWeight: '300', fontStyle: 'oblique', color: 'white'}}>Jobs</span>
        </span>
      )
    } else {
      return (
        <span>
          <span style={{fontWeight: '900', color: '#55B9E5'}}>skoller</span>
          <span style={{fontWeight: '300', fontStyle: 'oblique', color: '#4ADD58'}}>Jobs</span>
        </span>
      )
    }
  }

  renderJobsBanner () {
    return (
      <div className='sk-banner-jobs'>
        <p>Skoller can help you find your <b>dream job.</b></p>
        <div className='sk-banner-jobs-button'>
          <p>
            <SkollerJobsSwitch />
          </p>
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        {this.state.banners.includes('partner') && this.renderPartnerBanner()}
        {this.state.banners.includes('jobs') && this.renderJobsBanner()}
      </div>
    )
  }

  render () {
    if (this.state.banners.length > 0 && !this.state.loading) {
      return (
        <div className='sk-banner-wrapper'>
          <div className='sk-banner' style={this.props.style ? this.props.style : null}>
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
  rootStore: PropTypes.object,
  style: PropTypes.object,
  state: PropTypes.string,
  hideText: PropTypes.bool
}

export default SkBanner
