import React from 'react'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField, TextAreaField} from '../../components/Form'
import actions from '../../actions'
import stores from '../../stores'

@inject('rootStore') @observer
class RequestResolvedModal extends React.Component {
  constructor (props) {
    super(props)
  }

  isSW () {
    const {userStore} = stores
    return userStore.isSW()
  }

  navigateToNeedsChange() {
    browserHistory.push({
      pathname: '/hub/classes',
      state: {
        needsChange: true
      }
    })
  }

  resolveChangeRequest(){
    const {cl} = this.props
    actions.classhelp.resolveChangeRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        if(!this.props.request){
          this.navigateToNeedsChange()
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
          this.navigateToNeedsChange()
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

  onCancel(){
    this.props.onClose()
  }

  renderContent(){
    if(this.props.request){
      return (
        <div>
          <h5 className="center-text">Did you fix the change request?</h5>
          <button
            className={`button full-width`}
            onClick={() => { this.onResolve() }}>Yes (email will be sent to student regarding the fix)
          </button>
          <button
            className={`button-invert full-width margin-top`}
            onClick={() => { this.onCancel() }}>No, cancel
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
