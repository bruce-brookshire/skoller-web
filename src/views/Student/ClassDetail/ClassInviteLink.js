import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Card from '../../../components/Card'

@inject('rootStore') @observer
class ClassInviteLink extends React.Component {
  renderContent () {
    const {enrollmentLink} = this.props

    return (
      <div id='cn-class-inv-link-content'>
        <div id='cn-class-inv-link-header'>
          Click to copy this link, then send it to your classmates!
        </div>
        <div id='cn-class-invite-link'>
          {enrollmentLink}
        </div>
        <div id='cn-class-invite-link-classmates'>
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
