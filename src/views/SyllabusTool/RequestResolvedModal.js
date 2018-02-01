import React from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField, TextAreaField} from '../../components/Form'
import StudentRequestForm from './StudentRequestForm'
import actions from '../../actions'

class RequestResolvedModal extends React.Component {
  constructor (props) {
    super(props)
  }

  resolveChangeRequest(){
    const {cl} = this.props
    actions.classhelp.resolveChangeRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        if(!this.props.request){
          browserHistory.push({
            pathname: '/hub/classes',
            state: {
              needsChange: true
            }
          })
        }
      }).catch(() => false)
    }).catch(() => false)
  }

  resolveStudentRequest(){
    const {cl} = this.props
    actions.classhelp.resolveStudentRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        if(!this.props.request){
          browserHistory.push({
            pathname: '/hub/classes',
            state: {
              needsChange: true
            }
          })
        }
      }).catch(() => false)
    }).catch(() => false)
  }

  onResolve(){
    // This must be a standard change request
    if(this.props.request.hasOwnProperty('note')){
      this.resolveChangeRequest()
    // This must be a student request
    }else{
      this.resolveStudentRequest()
    }
  }

  renderContent(){
    if(this.props.request){
      return (
        <div>
          {this.props.request.notes ? (<h4 className="center-text">{this.props.request.notes}</h4>) : (this.props.request.hasOwnProperty('note') ? <StudentRequestForm cl={this.props.cl}/> : null)}
          {this.props.request.change_type.name ? (<h5 className="center-text">Change Type: {this.props.request.change_type.name}</h5>) : null}
          <button
            className={`button full-width margin-top`}
            onClick={() => { this.onResolve() }}>Resolve
          </button>
        </div>
      )
    }else{
      return null
    }
  }

  render () {
    const {cl} = this.props
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        {this.renderContent()}
      </Modal>
    )
  }
}

RequestResolvedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  request: PropTypes.object,
}

export default RequestResolvedModal
