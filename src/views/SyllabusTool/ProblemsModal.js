import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {browserHistory} from 'react-router'

class ProblemsModal extends React.Component {
  // TODO: Go to new documents page when made.
  goToDocuments () {
    browserHistory.push('/student/classes')
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div id='cn-student-problems-modal'>
          <h3 className='center-text'>Having problems?</h3>
          <div className='center-text'>
            If someone uploaded the wrong documents for this class, 
            you can delete and add files on the <a onClick={() => this.goToDocuments()}>documents page</a> for this class.
          </div>
          <div className='center-text margin-top'>
          If that’s not your issue, <a className='link' href='mailto:support@skoller.com'>let us know</a> what’s going on and we’ll figure it out.
          </div>
          <button className='button full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Got it</button>
        </div>
      </Modal>
    )
  }
}

ProblemsModal.propTypes = {
  cl: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default ProblemsModal
