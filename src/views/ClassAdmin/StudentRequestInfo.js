import React from 'react'
import PropTypes from 'prop-types'

class StudentRequestInfo extends React.Component {
  componentWillMount () {
    const open = this.getOpenStudentRequests()
    this.setState({
      studentRequests: open
    })
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
    return (
      <div className='cn-student-request-title margin-bottom'>
        <div className='center-text'>
          {this.state.studentRequests[0].user && this.state.studentRequests[0].user.email ? (
            <h5 className='margin-zero'>{this.state.studentRequests[0].user.email}</h5>
          ) : null}
          <h6 className='margin-zero'>Student Request</h6>
          {this.state.studentRequests[0].change_type && this.state.studentRequests[0].change_type.name ? (
            <h6 className='margin-zero'>{this.state.studentRequests[0].change_type.name}</h6>
          ) : null}
          {this.state.studentRequests[0].notes ? (
            <h6 className='margin-zero'>{`Note: ${this.state.studentRequests[0].notes}`}</h6>
          ) : null}
        </div>
        <button className='button' onClick={() => this.props.onComplete()}>Complete</button>
      </div>
    )
  }

  renderStudentRequestFields (fields) {
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
  }

  renderContent () {
    return (
      <div>
        {this.renderStudentRequestFields(this.state.studentRequests[0].data)}
      </div>
    )
  }

  render () {
    if (this.state.studentRequests && this.state.studentRequests[0]) {
      return (
        <div>
          {this.renderTitle()}
          {this.state.studentRequests[0].data ? (
            this.renderContent()
          ) : null}
        </div>
      )
    } else { return null }
  }
}

StudentRequestInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  onComplete: PropTypes.func
}

export default StudentRequestInfo
