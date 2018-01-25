import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../actions'

class ChangeRequestForm extends React.Component {
  constructor (props) {
    super(props)

    this.testData = [
      {name:'Name',value:'John Kevin Moulton'},
      {name:'Phone',value:'979-845-4953'},
      {name:'Email',value:'jflkejw@tamu.edu'},
      {name:'Office Location',value:'THOM 102B'},
      {name:'Office Hours',value:'W 3:30-5, 8-8:30'},
    ]
  }

  /*
  * Get the open change requests.
  */
  getOpenChangeRequests () {
    const {cl} = this.props
    return cl.change_requests.filter(c => !c.is_completed)
  }

  /*
  * Handle request resolution submission
  *
  */
  onSubmit () {
    const {cl, madeClassChange} = this.props
    let changeRequest = this.getOpenChangeRequests()[0]
    if (madeClassChange) {
      actions.classhelp.resolveChangeRequest(changeRequest.id).then((res) => {
        actions.classes.getClassById(cl.id).then((newCL) => {
          navbarStore.cl = newCL
        }).catch(() => false)
      }).catch(() => false)
    }
  }

  renderTitle(){
    let changeRequest = this.getOpenChangeRequests()[0]
    return (
      <h5 className='change-request-title' style={{margin: '0.5em 0'}}>
        <span className='change-request-icon-container'>
          <i className='fa fa-refresh cn-red margin-right' />
        </span>
        <span className='change-request-type'>{changeRequest.change_type.name} </span>
        change requested
        {changeRequest.user ? (<span className='change-request-user'> from {changeRequest.user.name}</span>) : null}
      </h5>
    )
  }

  renderChangeRequestFields(fields){
    return fields.map((field, index) => {
      return (
        <div className='change-request-field row'>
          <em className='col-xs-6'>{field.name}</em>
          <span className='col-xs-6'>{field.value}</span>
        </div>
      )
    })
  }

  renderContent(){
    let changeRequest = this.getOpenChangeRequests()[0]
    if(changeRequest.data){
      return (
        <div className='change-request-content'>
          <div className='change-request-fields'>
            {this.renderChangeRequestFields(changeRequest.data)}
          </div>
        </div>
      )
    }else{
      return (
        <div className='change-request-content'>
          <div className='change-request-fields'>
            {this.renderChangeRequestFields(this.testData)}
          </div>
        </div>
      )
    }
  }

  renderSubmit(){
    return (
      <button
        className='button'
        onClick={this.onSubmit.bind(this)}
      >Mark Resolved</button>
    )
  }

  render () {
    const {cl} = this.props
    return (
      <div className='cn-section-control' style={{margin: '10px 0',maxHeight: '12em'}}>
        {this.renderTitle()}
        <div className='row'>
          <div className='col-xs-8'>
            {this.renderContent()}
          </div>
          <div className='col-xs-4'>
            {this.renderSubmit()}
          </div>
        </div>
      </div>
    )
  }
}

ChangeRequestForm.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ChangeRequestForm
