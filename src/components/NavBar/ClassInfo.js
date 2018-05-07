import React from 'react'
import PropTypes from 'prop-types'
import {mapProfessor} from '../../utilities/display'
import {mapTimeToDisplay} from '../../utilities/time'

class ClassInfo extends React.Component {
  renderWrench () {
    const {isAdmin, cl: {is_editable}} = this.props
    if (isAdmin && !is_editable) {
      return (
        <div className='margin-left'>
          <i className='fa fa-wrench cn-red cursor' onClick={() => this.props.toggleWrench()} />
        </div>
      )
    } else if (isAdmin && is_editable) {
      return (
        <div className='margin-left'>
          <i className='fa fa-wrench cn-grey cursor' onClick={() => this.props.toggleWrench()} />
        </div>
      )
    }
  }

  renderChatEnabled () {
    const {isAdmin, cl: {is_chat_enabled}} = this.props
    if (isAdmin && !is_chat_enabled) {
      return (
        <div className='margin-left'>
          <i className='fa fa-comment-o cn-grey cursor' onClick={() => this.props.toggleChat()} />
        </div>
      )
    } else if (isAdmin && is_chat_enabled) {
      return (
        <div className='margin-left'>
          <i className='fa fa-comment cn-blue cursor' onClick={() => this.props.toggleChat()} />
        </div>
      )
    }
  }

  renderChangeRequest () {
    const {cl} = this.props
    const studentRequests = cl.student_requests.filter(c => !c.is_completed)
    const changeRequests = cl.change_requests.filter(c => !c.is_completed)
    const allRequests = studentRequests.concat(changeRequests)
    const needsChange = allRequests.length > 0 && (cl.status.name === 'Complete' || cl.status.name === 'Change')
    if (needsChange) {
      return (
        <div className='issue-icon-container' onClick={() => this.props.toggleRequestResolved()}>
          <div className='message-bubble triangle-top'>
            {allRequests[0].note ? allRequests[0].note : (allRequests[0].notes ? allRequests[0].notes : allRequests[0].change_type.name)}
            <div className='triangle-inner' />
          </div>
          <i className='fa fa-refresh cn-red margin-right' />
        </div>
      )
    }
  }

  renderHelpRequest () {
    const {cl, isDIY} = this.props
    const studentRequests = cl.student_requests.filter(h => !h.is_completed)
    const helpRequests = cl.help_requests.filter(h => !h.is_completed)
    const allRequests = studentRequests.concat(helpRequests)
    const needsHelp = allRequests.length > 0 && cl.status.name !== 'Complete' && cl.status.name !== 'Change'
    if (needsHelp && !isDIY) {
      return (
        <div className='issue-icon-container' onClick={() => this.props.toggleHelpResolved()}>
          <div className='message-bubble triangle-top'>
            {allRequests[0].note ? allRequests[0].note : (allRequests[0].notes ? allRequests[0].notes : allRequests[0].change_type.name)}
            <div className='triangle-inner' />
          </div>
          <i className='fa fa-exclamation-triangle cn-red margin-right' />
        </div>
      )
    }
  }

  /*
  * Render the class details for non DIY
  */
  renderClassDetails () {
    const {cl: {number, professor, meet_days, meet_start_time}, isDIY} = this.props

    if (!isDIY) {
      return (
        <div className='class-details'>
          <span>{number}</span>
          <span>{professor && mapProfessor(professor)}</span>
          <span>{meet_days}: {meet_start_time ? mapTimeToDisplay(meet_start_time) : 'TBA'}</span>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='header-container'>
        <div className='header'>
          {this.renderChangeRequest()}
          {this.renderHelpRequest()}
          <h2>{this.props.cl && this.props.cl.name}</h2>
          {this.props.isAdmin && <div className='margin-left'>
            <i className='fa fa-pencil cn-blue cursor' onClick={() => this.props.onEdit()} />
          </div>}
          {this.renderWrench()}
          {this.renderChatEnabled()}
        </div>
        {this.renderClassDetails()}
      </div>
    )
  }
}

ClassInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  isDIY: PropTypes.bool,
  onEdit: PropTypes.func,
  toggleIssues: PropTypes.func,
  toggleHelpResolved: PropTypes.func,
  toggleRequestResolved: PropTypes.func,
  toggleWrench: PropTypes.func,
  toggleChat: PropTypes.func
}

export default ClassInfo
