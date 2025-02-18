import React from 'react'
import PropTypes from 'prop-types'
import { mapProfessor } from '../../utilities/display'
import { mapTimeToDisplay } from '../../utilities/time'

class ClassInfo extends React.Component {
  renderChangeRequest() {
    const { cl } = this.props
    const studentRequests = cl.student_requests.filter(c => !c.is_completed)
    const changeRequests = cl.change_requests.filter(c => !c.is_completed)
    const allRequests = studentRequests.concat(changeRequests)
    const needsChange = allRequests.length > 0 && (cl.status.name === 'Class Setup' || cl.status.name === 'Class Issue')
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

  /*
  * Render the class details for non DIY
  */
  renderClassDetails() {
    const { cl: { number, professor, school, meet_days: days, meet_start_time: startTime }, isDIY, assignmentPage } = this.props

    if (!isDIY && !assignmentPage) {
      return (
        <div className='class-details' style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>{this.props.cl.name}</span>
          <div>
            <span>{number}</span>
            <span>{professor && mapProfessor(professor)}</span>
            <span>{days}: {startTime ? mapTimeToDisplay(startTime) : 'TBA'}</span>
          </div>
        </div>
      )
    }
    if (!isDIY && assignmentPage && school) {
      return (
        <div className='class-details assignmnet-page' style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '20px', fontWeight: '600' }}>{this.props.cl.name}</span>
          <div className="bottomdiv">
            <span>{school.name}</span>
            <span>| {school.adr_locality}</span>
            <span>| {school.adr_region}</span>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className='header-container'>
        <div className='header'>
          {this.renderChangeRequest()}
        </div>
        {this.renderClassDetails()}
      </div>
    )
  }
}

ClassInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  isDIY: PropTypes.bool,
  toggleRequestResolved: PropTypes.func
}

export default ClassInfo
