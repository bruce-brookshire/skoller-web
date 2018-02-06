import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'

class StudentRequestInfo extends React.Component {
  constructor (props) {
    super(props)
  }

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

  renderTitle(){
    return (
      <h5 className='student-request-title center-text' style={{margin: '0.5em 0'}}>
        <span className='student-request-type'>Student Request</span><br/>
        {this.state.studentRequests[0] && this.state.studentRequests[0].user.name ? (<span className='student-request-user'> from {this.state.studentRequests[0].user.name}</span>) : null}
        <span>Change Type: {this.state.studentRequests[0].change_type.name}</span><br/>
      </h5>
    )
  }

  renderStudentRequestFields(fields){
    return Object.keys(fields).map((field, index) => {
      let val = fields[field]
      let formattedField = field.replace(/_/g,' ')
      let finalFormat = formattedField.charAt(0).toUpperCase() + formattedField.slice(1)
      if(val && field != 'id'){
        return (
          <div className='student-request-field row' key={index}>
            <em className='col-xs-6'>{finalFormat}</em>
            <span className='col-xs-6'>{val}</span>
          </div>
        )
      }
    })
  }

  renderContent(){
    return (
      <div className='student-request-content'>
        <div className='student-request-fields'>
          {this.renderStudentRequestFields(this.state.studentRequests[0].data)}
        </div>
      </div>
    )
  }

  render () {
    const {cl} = this.props
    if(this.state.studentRequests && this.state.studentRequests[0] && this.state.studentRequests[0].data){
      return (
        <div className='cn-section-control' style={{margin: '10px 0',maxHeight: '12em'}}>
          {this.renderTitle()}
          <div className='row'>
            <div className='col-xs-12'>
              {this.renderContent()}
            </div>
          </div>
        </div>
      )
    } else { return null }
  }
}

StudentRequestInfo.propTypes = {
  cl: PropTypes.object.isRequired,
}

export default StudentRequestInfo
