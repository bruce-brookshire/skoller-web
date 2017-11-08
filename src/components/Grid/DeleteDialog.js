import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal'

class DeleteDialog extends React.Component {
  /*
  * Render the action options to user in modal. Put them in the footer.
  */
  renderOptionButtons () {
    return (
      <div className='align-right margin-top'>
        <button className='confirm button-box-shadow margin-top' onClick={(event) => this.props.onDelete(event)}> Yes </button>
        <button className='close button-box-shadow margin-top margin-right' onClick={(event) => this.props.onClose(event)}>No</button>
      </div>
    )
  }

  render () {
    const deleteMessage = this.props.deleteMessage ? this.props.deleteMessage : 'Are you sure you want to remove this item?'

    return (
      <div>
        <Modal
          title='Are you sure?'
          open={this.props.open}
          footer={this.renderOptionButtons()}
        >
          <span> {deleteMessage} </span>
        </Modal>
      </div>
    )
  }
}

DeleteDialog.propTypes = {
  deleteMessage: PropTypes.string,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  open: PropTypes.bool
}

export default DeleteDialog
