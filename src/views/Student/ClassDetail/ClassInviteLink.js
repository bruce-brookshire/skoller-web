import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Card from '../../../components/Card'

@inject('rootStore') @observer
class ClassInviteLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Initialize the state
  */
  initializeState () {
    return {
      copiedPopup: false
    }
  }

  copyText () {
    const {enrollmentLink} = this.props
    const el = document.createElement('textarea')

    el.value = enrollmentLink
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.setState({copiedPopup: true})
  }

  renderContent () {
    const {enrollmentLink} = this.props
    const {copiedPopup} = this.state

    return (
      <div id='cn-class-inv-link-content'>
        <div id='cn-class-inv-link-header' className='cn-grey'>
          Click to copy this link, then send it to your classmates!
        </div>
        <div id='cn-class-invite-link' onClick={this.copyText.bind(this)}>
          {enrollmentLink}
          {copiedPopup && this.renderLinkCopied()}
        </div>
        <div id='cn-class-invite-link-classmates' className='cn-grey'>
          <i className='fa fa-users margin-right' />{this.renderEnrollmentCount()}
        </div>
      </div>
    )
  }

  renderEnrollmentCount () {
    const {enrollmentCount} = this.props

    if (enrollmentCount === 1) {
      return 'No classmates yet'
    } else {
      return (enrollmentCount - 1) + ' classmates'
    }
  }

  renderLinkCopied () {
    return (
      <div id='cn-link-copied'>
        Link has been copied to your clipboard!
      </div>
    )
  }

  renderTitle () {
    return (
      <div className='cn-align-row'>
        <div className='cn-lightning'>⚡️</div><div>Invite</div>
      </div>
    )
  }

  render () {
    return (
      <Card
        title={this.renderTitle()}
        content={this.renderContent()}
      />
    )
  }
}

ClassInviteLink.propTypes = {
  cl: PropTypes.object,
  enrollmentLink: PropTypes.string,
  enrollmentCount: PropTypes.number
}

export default ClassInviteLink
