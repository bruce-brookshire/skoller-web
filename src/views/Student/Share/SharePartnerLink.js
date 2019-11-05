import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import partners from '../Onboard/partners'
import Sammi from '../../components/Sammi'
import CopyBox from '../../components/CopyBox'

@inject('rootStore') @observer
class SharePartnerLink extends React.Component {
  getPartner (partnerSlug) {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug === partnerSlug) {
        partner = partners[partnerKey]
      } else if (partners[partnerKey].altName === partnerSlug) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  renderContent () {
    const partner = this.getPartner(this.props.params.partner)
    return (
      <div className='sk-share-partner-link-container'>
        <div className='sk-share-partner-link'>
          <h1>Share {partner.name}&apos;s Skoller link!</h1>
          {partner.philanthropy &&
            <Sammi
              emotion='wow'
              position='left'
            >
              <p>You&apos;re already signed up for Skoller, but you can still share this link to get <b>$1 donated to {partner.philanthropy}.</b></p>
            </Sammi>
          }
          <div className='sk-share-partner-link-copy-box'>
            <CopyBox linkValue={('https://skoller.co/c/' + partner.slug)} />
          </div>
          <img src={partner.logo} className='sk-share-partner-link-logo' />
        </div>
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.renderContent()}
      </StudentLayout>
    )
  }
}

SharePartnerLink.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default SharePartnerLink
