import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'

class SkipCategoryModal extends React.Component {
  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
      >
        <div id='cn-skip-category-modal'>
          <h3 className='center-text'>Are you sure you want to skip this category?</h3>
          <div className='center-text'>
            Not having any assignments for a category can throw off your grade calculator. 
            Even if you don’t know the due date yet, you should add any assignments that you know about for this category.
          </div>
          <div className='cn-button-yes-no'>
            <button className='button cn-red-background' onClick={() => {
              this.props.onConfirm()
              this.props.onClose()
            }}>Yes, I&apos;m sure.</button>
            <button className='button' onClick={() => this.props.onClose()}>No, go back.</button>
          </div>
        </div>
      </Modal>
    )
  }
}

SkipCategoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
}

export default SkipCategoryModal
