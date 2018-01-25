import React from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Modal from '../../../components/Modal/index'

class StudentRequestModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose()}>
        <button className='button-invert full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
      </Modal>
    )
  }
}

StudentRequestModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default StudentRequestModal
