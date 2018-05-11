import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'

class ProblemsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '', note: '', helpTypes: [] }
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div>
          <button className='button-invert close full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
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
