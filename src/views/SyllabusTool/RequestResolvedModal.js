import React from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField, TextAreaField} from '../../components/Form'
import actions from '../../actions'

class RequestResolvedModal extends React.Component {
  constructor (props) {
    super(props)
  }

  onResolve(){
    const {cl} = this.props
    actions.classhelp.resolveStudentRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        if(!this.props.request){ browserHistory.push('/hub/landing') }
      }).catch(() => false)
    }).catch(() => false)
  }

  renderContent(){
    if(this.props.request){
      return (
        <div>
          {this.props.request.notes ? (<h4 className="center-text">{this.props.request.notes}</h4>) : null}
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
