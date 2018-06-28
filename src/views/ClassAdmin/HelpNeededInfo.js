import React from 'react'
import PropTypes from 'prop-types'

class HelpNeededInfo extends React.Component {
  componentWillMount () {
    const open = this.getOpenHelpRequests()
    this.setState({
      helpRequests: open
    })
  }

  /*
  * Get the open help requests.
  */
  getOpenHelpRequests () {
    const {cl} = this.props
    const sr = cl.student_requests.filter(c => !c.is_completed)
    const hr = cl.help_requests.filter(c => !c.is_completed)
    return sr.concat(hr)
  }

  renderTitle () {
    return (
      <div className='cn-student-request-title'>
        <div className='center-text'>
          {this.state.helpRequests[0].user && this.state.helpRequests[0].user.email ? (
            <h5 className='margin-zero'>{this.state.helpRequests[0].user.email}</h5>
          ) : null}
          <h6 className='margin-zero'>Help Needed</h6>
          <h6 className='margin-zero'>{this.state.helpRequests[0].hasOwnProperty('help_type') ? this.state.helpRequests[0].help_type.name : this.state.helpRequests[0].change_type.name}</h6>
        </div>
        <button className='button' onClick={() => this.props.onComplete()}>Complete</button>
      </div>
    )
  }

  renderHelpRequestNote () {
    return (
      <div className='help-request-note'>
        <em>Note: </em><span>{this.state.helpRequests[0].note ? this.state.helpRequests[0].note : this.state.helpRequests[0].notes}</span>
      </div>
    )
  }

  render () {
    if (this.state.helpRequests && this.state.helpRequests[0]) {
      return (
        <div className='cn-section-content'>
          {this.renderTitle()}
          {this.state.helpRequests[0].note || this.state.helpRequests[0].notes ? this.renderHelpRequestNote() : null}
        </div>
      )
    } else { return null }
  }
}

HelpNeededInfo.propTypes = {
  cl: PropTypes.object.isRequired,
  onComplete: PropTypes.func
}

export default HelpNeededInfo
