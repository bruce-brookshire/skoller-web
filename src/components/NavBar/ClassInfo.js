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
    }
    else if (isAdmin && is_editable) {
      return (
        <div className='margin-left'>
          <i className='fa fa-wrench cn-grey cursor' onClick={() => this.props.toggleWrench()} />
        </div>
      )
    }
  }

  renderClassIssue () {
    const {cl, isDIY} = this.props
    const helpRequests = cl.help_requests.filter(h => !h.is_completed)
    const needsHelp = helpRequests.length > 0
    if (needsHelp && !isDIY) {
      return (
        <div className='issue-icon-container' onClick={() => this.props.toggleIssues()}>
          <div className='message-bubble triangle-top'>
            {helpRequests[0].note}
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
            {this.renderClassIssue()}
            <h2>{this.props.cl && this.props.cl.name}</h2>
            {this.props.isAdmin && <div className='margin-left'>
            <i className='fa fa-pencil cn-blue cursor' onClick={() => this.props.onEdit()} />
          </div>}
          {this.renderWrench()}
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
  toggleWrench: PropTypes.func
}

export default ClassInfo