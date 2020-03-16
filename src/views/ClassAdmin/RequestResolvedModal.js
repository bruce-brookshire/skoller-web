import React from 'react'
import { withRouter } from 'react-router-dom'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import actions from '../../actions'
import SkModal from '../components/SkModal/SkModal'

@inject('rootStore') @observer
class RequestResolvedModal extends React.Component {
  navigateToNeedsChange () {
    this.props.history.push({
      pathname: '/hub/classes',
      state: {
        needsChange: true
      }
    })
  }

  resolveChangeRequest () {
    const {cl} = this.props
    actions.classhelp.resolveChangeRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        const sr = cl.student_requests.filter(c => !c.is_completed)
        const cr = cl.change_requests.filter(c => !c.is_completed)
        let allRequests = sr.concat(cr)
        if (allRequests.length === 0) {
          this.navigateToNeedsChange()
        }
      }).catch(() => false)
    }).catch(() => false)
  }

  resolveStudentRequest () {
    const {cl} = this.props
    actions.classhelp.resolveStudentRequest(this.props.request.id).then((res) => {
      actions.classes.getClassById(cl.id).then((cl) => {
        this.props.onSubmit(cl)
        const sr = cl.student_requests.filter(c => !c.is_completed)
        const cr = cl.change_requests.filter(c => !c.is_completed)
        let allRequests = sr.concat(cr)
        if (allRequests.length === 0) {
          this.navigateToNeedsChange()
        }
      }).catch(() => false)
    }).catch(() => false)
  }

  onResolve () {
    // This must be a standard change request
    if (this.props.request.hasOwnProperty('note')) {
      this.resolveChangeRequest()
    // This must be a student request
    } else {
      this.resolveStudentRequest()
    }
    this.props.onClose()
  }

  onCancel () {
    this.props.onClose()
  }

  renderContent () {
    if (this.props.request) {
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
    } else {
      return null
    }
  }

  render () {
    if (this.props.open) {
      return (
        <SkModal
          open={this.props.open}
          closeModal={() => this.props.onClose()}
        >
          {this.renderContent()}
        </SkModal>
      )
    } else {
      return null
    }
  }
}

RequestResolvedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  request: PropTypes.object
}

export default withRouter(RequestResolvedModal)
