import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Cloud from '../../../assets/sk-icons/Cloud'
import SkProgressBar from '../../components/SkProgressBar'
import Sammi from '../../components/Sammi'

@inject('rootStore') @observer
class SharePartner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      copyStatus: false
    }

    console.log('constructing share-partner')
  }

  copyToClipboard = (e) => {
    this.textArea.select()
    document.execCommand('copy')
    e.target.focus()
    this.setState({ copyStatus: true })
  }

  renderCopySection () {
    return (
      <div
        className='sk-onboard-share-partner-copy'
        onClick={this.copyToClipboard}
      >
        <form>
          <textarea
            ref={(textArea) => { this.textArea = textArea }}
            value={'https://skoller.co/onboard/' + this.props.partner.slug}
            readOnly={true}
          />
        </form>
        {this.state.copyStatus &&
          <p>link copied to clipboard! 📋</p>
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.renderPartner()}
        <div className='sk-onboard-share-partner'>
          <Sammi
            emotion='wow'
            position='left'
          >
            <p>Congratulations! Because of you, <b>$1 was just donated to {this.props.partner.philanthropy}.</b></p>
          </Sammi>
          <SkProgressBar progress={1} width={'100%'} backgroundColor={'$cn-color-blue'}/>
          <div className='sk-onboard-share-partner-cloud-container'>
            <div className='sk-onboard-share-partner-cloud-1'>
              <Cloud fill={this.props.partner.primaryColor} width="120" height="90" />
            </div>
            <div className='sk-onboard-share-partner-cloud-2'>
              <Cloud width="200" height="150" />
              <div className='sk-onboard-share-partner-cloud-content'>
                <p>
                  It doesn&apos;t have to<br /> stop here. Money<br />is donated when <b>ANY<br />STUDENT</b> uses the <b style={{color: '#' + this.props.partner.primaryColor}}>{this.props.partner.name}</b> link to sign up for Skoller!
                </p>
              </div>
            </div>
            <div className='sk-onboard-share-partner-cloud-3'>
              <Cloud fill={this.props.partner.secondaryColor} width="140" height="105" />
            </div>
          </div>
          {this.renderCopySection()}
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
