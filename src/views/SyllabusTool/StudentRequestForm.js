import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'

class StudentRequestForm extends React.Component {
  constructor (props) {
    super(props)

    this.testData = [
      {name:'Name',value:'John Kevin Moulton'},
      {name:'Phone',value:'979-845-4953'},
      {name:'Email',value:'jflkejw@tamu.edu'},
      {name:'Office Location',value:'THOM 102B'},
      {name:'Office Hours',value:'W 3:30-5, 8-8:30'},
    ]

    this.state = {
      studentRequests: null
    }
  }

  componentWillMount () {
    this.setState({
      studentRequests: this.getOpenStudentRequests()
    })
  }

  /*
  * Get the open change requests.
  */
  getOpenStudentRequests () {
    const {cl} = this.props
    return cl.student_requests.filter(c => !c.is_completed)
  }

  renderTitle(){
    return (
      <h5 className='student-request-title' style={{margin: '0.5em 0'}}>
        <span className='student-request-type'>Student Request</span>
        {this.state.studentRequests[0] && this.state.studentRequests[0].user ? (<span className='student-request-user'> from {this.state.studentRequests[0].user.name}</span>) : null}
      </h5>
    )
  }

  renderStudentRequestFields(fields){
    return fields.map((field, index) => {
      return (
        <div className='student-request-field row' key={index}>
          <em className='col-xs-6'>{field.name}</em>
          <span className='col-xs-6'>{field.value}</span>
        </div>
      )
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

StudentRequestForm.propTypes = {
  cl: PropTypes.object.isRequired,
}

export default StudentRequestForm
