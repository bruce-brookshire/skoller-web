import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import partners from '../../../views/Student/Onboard/partners'
import { withRouter } from 'react-router-dom'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import JobsSwitch from '../../../components/NavBar/JobsSwitch'
import actions from '../../../actions'
import SkModal from '../../components/SkModal/SkModal'
import InvitationTermsAgreement from '../../Student/components/InvitationTermsAgreement'

@inject('rootStore') @observer
class SkBanner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      banners: [],
      currentBanner: null,
      showInviteModal: false
    }
  }

  componentDidMount () {
    this.getBannerChoices()
  }

  async getBannerChoices () {
    let banners = []

    if (this.partnerLogic() && this.props.rootStore.navStore.activePage !== 'share') {
      banners.push('partner')
    }

    if (
      this.props.rootStore.studentJobsStore.hasJobsProfile &&
      (this.props.rootStore.navStore.activePage === 'home' ||
      this.props.rootStore.navStore.activePage === 'jobs' ||
      this.props.rootStore.navStore.activePage === 'jobs/profile' ||
      this.props.rootStore.navStore.activePage === 'jobs/home') &&
      window.innerWidth <= 1000
    ) {
      banners.push('jobs')
    }

    let invitation
    await actions.insights.students.checkOrgInvites(this.props.rootStore.userStore.user.student.id)
      .then((r) => {
        if (r.length > 0) {
          invitation = r[0]
          banners.unshift('invites')
        }
      })

    this.setState({banners, invitation, currentBanner: banners[0]})
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
      this.props.rootStore.navStore.activePage !== 'share' &&
      this.props.rootStore.navStore.activePage !== 'home' &&
      this.renderPartnerBanner() &&
      !this.props.rootStore.navStore.jobsMode
    ) {
      return true
    } else {
      return false
    }
  }

  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey] && partnerSlug) {
        if (partners[partnerKey].slug.toLowerCase() === partnerSlug.toLowerCase()) {
          partner = partners[partnerKey]
        } else if (partners[partnerKey].altName.toLowerCase() === partnerSlug.toLowerCase()) {
          partner = partners[partnerKey]
        }
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
                  onClick={() => this.props.history.push('/student/share')}
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
    if (this.props.rootStore.navStore.jobsMode) {
      return (
        <div className='sk-banner-jobs'>
          {/* <p>Keep up with classes, <b>together.</b></p> */}
          <JobsSwitch />
        </div>
      )
    } else {
      return (
        <div className='sk-banner-jobs'>
          {/* <p>Skoller can help you find your <b>dream job.</b></p> */}
          <JobsSwitch />
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

  renderInviteAcceptBanner () {
    if (this.state.banners.includes('invites')) {
      return (
        <div className='sk-banner-jobs'>
          <p>You have a pending invitation</p>
          <div onClick={() => this.setState({showInviteModal: true})} className='si-button' style={{marginLeft: 16}}><p style={{paddingTop: 8}}><b>Review</b></p></div>
        </div>
      )
    }
  }

  renderInviteModal () {
    if (this.state.showInviteModal) {
      return (
        <SkModal closeModal={() => this.setState({showInviteModal: false})}>
          <InvitationTermsAgreement user={this.props.rootStore.userStore.user} invitation={this.state.invitation} onSubmit={() => {
            this.setState({showInviteModal: false})
            this.getBannerChoices()
          }} />
        </SkModal>
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
          {this.state.currentBanner === 'invites' && this.renderInviteAcceptBanner()}
          {this.renderForwardArrow()}
        </div>
        {this.renderBannerIndicator()}
        {this.renderInviteModal()}
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
  hideText: PropTypes.bool,
  history: PropTypes.object
}

export default withRouter(SkBanner)
