import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../../components/Card'

class StudentRequestInfo extends React.Component {
  componentWillMount () {
  }

  /*
  * Get the open change requests.
  */
  getOpenStudentRequests () {
    const {cl} = this.props
    const sr = cl.student_requests.filter(c => !c.is_completed)
    const cr = cl.change_requests.filter(c => !c.is_completed)
    return sr.concat(cr)
  }

  renderTitle () {
    let studentRequests = this.getOpenStudentRequests()
    return (
      <div className='cn-student-request-title margin-bottom'>
        <div className='cn-student-request-subtitle center-text'>
          {studentRequests[0].user && studentRequests[0].user.email ? (
            <h5 className='margin-zero'>{studentRequests[0].user.email}</h5>
          ) : null}
          <h6 className='margin-zero'>Student Request</h6>
          {studentRequests[0].change_type && studentRequests[0].change_type.name ? (
            <h6 className='margin-zero'>{studentRequests[0].change_type.name}</h6>
          ) : null}
          {studentRequests[0].notes ? (
            <h6 className='margin-zero'>{`Note: ${studentRequests[0].notes}`}</h6>
          ) : null}
        </div>
        <div className='cn-student-request-button'>
          <button className='button' onClick={() => this.props.onComplete()}>Complete</button>
        </div>
      </div>
    )
  }

  renderStudentRequestFields (fields) {
    if (fields) {
      return Object.keys(fields).map((field, index) => {
        let val = fields[field]
        let formattedField = field.replace(/_/g, ' ')
        let finalFormat = formattedField.charAt(0).toUpperCase() + formattedField.slice(1)
        if (val && field !== 'id') {
          return (
            <div className='cn-student-request-content' key={index}>
              <em>{finalFormat}</em>
              <span>{val}</span>
            </div>
          )
        }
      })
    } else {
      return null
    }
  }

  renderContent () {
    let studentRequests = this.getOpenStudentRequests()
    return (
      [this.renderTitle(), this.renderStudentRequestFields(studentRequests[0].data)]
    )
  }

  render () {
    let studentRequests = this.getOpenStudentRequests()
    if (studentRequests && studentRequests[0]) {
      return (
        <Card
          title='Change Request'
          boxClassName={this.props.boxClassName}
          contentClassName={this.props.contentClassName}
          content={
            this.renderContent()
          }
        />
      )
    } else { return null }
  }
}

StudentRequestInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string
}

export default StudentRequestInfo
