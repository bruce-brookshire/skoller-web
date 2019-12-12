import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import partners from '../../../views/Student/Onboard/partners'
import { browserHistory } from 'react-router'
import SkollerJobsSwitch from '../../../assets/sk-icons/jobs/SkollerJobsSwitch'
import SkollerSwitch from '../../../assets/sk-icons/jobs/SkollerSwitch'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'

@inject('rootStore') @observer
class SkBanner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      banners: [],
      currentBanner: null
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

    if (
      this.props.rootStore.studentJobsStore.hasJobsProfile &&
      (this.props.rootStore.studentNavStore.activePage === 'home' ||
      this.props.rootStore.studentNavStore.activePage === 'jobs')
    ) {
      banners.push('jobs')
    }

    this.setState({banners, currentBanner: banners[0]})
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
      this.renderPartnerBanner() &&
      !this.props.rootStore.studentNavStore.jobsMode
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
    if (this.props.rootStore.studentNavStore.jobsMode) {
      return (
        <div className='sk-banner-jobs'>
          <p>Keep up with classes, <b>together.</b></p>
          <div
            className='sk-banner-skoller-button'
            onClick={() => {
              if (this.props.rootStore.studentNavStore.jobsMode) {
                browserHistory.push('/student/home')
              } else {
                browserHistory.push('/student/jobs')
              }
            }}
          >
            <p>
              <SkollerSwitch />
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div className='sk-banner-jobs'>
          <p>Skoller can help you find your <b>dream job.</b></p>
          <div
            className='sk-banner-jobs-button'
            onClick={() => {
              if (this.props.rootStore.studentNavStore.jobsMode) {
                browserHistory.push('/student/home')
              } else {
                browserHistory.push('/student/jobs')
              }
            }}
          >
            <p>
              <SkollerJobsSwitch />
            </p>
          </div>
        </div>
      )
    }
  }

  renderForwardArrow () {
    let currentBanner = this.state.currentBanner
    let banners = this.state.banners
    if (this.state.banners.length > 1) {
      return (
        <div style={{marginLeft: '1rem', cursor: 'pointer'}} onClick={() => {
          if (banners.indexOf(currentBanner) === (banners.length - 1)) {
            this.setState({currentBanner: banners[0]})
          } else {
            this.setState({currentBanner: banners[banners.indexOf(currentBanner) + 1]})
          }
        }}>
          <ForwardArrow />
        </div>
      )
    } else {
      return null
    }
  }

  renderBackArrow () {
    let currentBanner = this.state.currentBanner
    let banners = this.state.banners
    if (banners.length > 1) {
      return (
        <div style={{marginRight: '1rem', cursor: 'pointer'}} onClick={() => {
          if (banners.indexOf(currentBanner) === 0) {
            this.setState({currentBanner: banners[banners.length - 1]})
          } else {
            this.setState({currentBanner: banners[banners.indexOf(currentBanner) - 1]})
          }
        }}>
          <BackArrow />
        </div>
      )
    } else {
      return null
    }
  }

  renderBannerIndicator () {
    let banners = this.state.banners
    let currentBanner = this.state.currentBanner
    if (banners.length > 1) {
      return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '8px 0 0 0'}}>
          {banners.map(banner => {
            return (
              <div
                key={banners.indexOf(banner)}
                style = {{
                  backgroundColor: banner === currentBanner ? '#57B9E4' : '#4a4a4a',
                  height: '6px',
                  width: '6px',
                  borderRadius: '100%',
                  margin: '0 4px',
                  cursor: 'pointer'
                }}
                onClick={() => this.setState({currentBanner: banner})}
              />
            )
          })}
        </div>
      )
    }
  }

  renderContent () {
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {this.renderBackArrow()}
          {this.state.currentBanner === 'partner' && this.renderPartnerBanner()}
          {this.state.currentBanner === 'jobs' && this.renderJobsBanner()}
          {this.renderForwardArrow()}
        </div>
        {this.renderBannerIndicator()}
      </div>
    )
  }

  render () {
    if (this.props.state === 'partner') {
      return (
        <div className='sk-banner-wrapper'>
          <div className='sk-banner' style={this.props.style ? this.props.style : null}>
            {this.renderPartnerBanner()}
          </div>
        </div>
      )
    } else if (this.state.banners.length > 0) {
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
