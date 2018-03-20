import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'

class HelpNeededInfo extends React.Component {
  constructor (props) {
    super(props)
  }

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

  renderTitle(){
    return (
      <div className='help-request-title center-text' style={{margin: '0.5em 0'}}>
        {this.state.helpRequests[0].user && this.state.helpRequests[0].user.email ? (
          <h5 style={{margin: '2px'}}>{this.state.helpRequests[0].user.email}</h5>
        ) : null}
        <h6 className='help-request-type' style={{margin: '2px'}}>Help Needed</h6>
        <h6 style={{margin: '2px'}}>{this.state.helpRequests[0].hasOwnProperty('help_type') ? this.state.helpRequests[0].help_type.name : this.state.helpRequests[0].change_type.name}</h6>
      </div>
    )
  }

  renderHelpRequestNote(){
    return (
      <div className='help-request-note row'>
        <em>Note:</em><span className='margin-left'>{this.state.helpRequests[0].note ? this.state.helpRequests[0].note : this.state.helpRequests[0].notes}</span>
      </div>
    )
  }

  render () {
    const {cl} = this.props
    if(this.state.helpRequests && this.state.helpRequests[0]){
      return (
        <div className='cn-section-control' style={{margin: '10px 0',height: '8em',overflowY: "scroll"}}>
          {this.renderTitle()}
          {this.state.helpRequests[0].note || this.state.helpRequests[0].notes ? this.renderHelpRequestNote() : null}
        </div>
      )
    } else { return null }
  }
}

HelpNeededInfo.propTypes = {
  cl: PropTypes.object.isRequired,
}

export default HelpNeededInfo
