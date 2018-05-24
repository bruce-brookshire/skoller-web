import React from 'react'
import PropTypes from 'prop-types'
import {mapProfessor} from '../../utilities/display'
import {mapTimeToDisplay} from '../../utilities/time'

class ClassInfo extends React.Component {
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
        </div>
        {this.renderClassDetails()}
      </div>
    )
  }
}

ClassInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  isDIY: PropTypes.bool,
  toggleHelpResolved: PropTypes.func,
  toggleRequestResolved: PropTypes.func
}

export default ClassInfo
