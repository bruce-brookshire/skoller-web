import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Cloud from '../../../assets/sk-icons/Cloud'
import SkProgressBar from '../../components/SkProgressBar'
import Sammi from '../../components/Sammi'
import CopyBox from '../../components/CopyBox'

@inject('rootStore') @observer
class SharePartner extends React.Component {
  renderSharePartner () {
    return (
      <div>
        <Sammi
          emotion='wow'
          position='left'
        >
          <p>Congratulations! Because of you, <b>$1 was just donated to {this.props.partner.philanthropy}.</b></p>
        </Sammi>
        <SkProgressBar progress={1} width={'100%'} backgroundColor={'$cn-color-blue'}/>
      </div>
    )
  }

  renderNonSharingPartner () {
    return (
      <div>
        <Sammi
          emotion='wow'
          position='left'
        >
          <p>You did it! Thanks for signing up for Skoller through {this.props.partner.name}.</p>
        </Sammi>
        <SkProgressBar progress={1} width={'100%'} backgroundColor={'$cn-color-blue'}/>
      </div>
    )
  }
  render () {
    return (
      <div>
        {this.props.renderPartner()}
        <div className='sk-onboard-share-partner'>
          {this.props.partner.philanthropy
            ? this.renderSharePartner()
            : this.renderNonSharingPartner()
          }
          <div
            className={'onboard-next'}
            onClick={() => this.props.onSubmit()}
          >
            <p>Enter Skoller</p>
          </div>
        </div>
      </div>
    )
  }
}

SharePartner.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object
}

export default SharePartner
