import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  renderModal () {
    const {open, footer} = this.props
    const bodyClass = footer ? 'account-for-footer' : ''

    if (open) {
      return (
        <div className='cn-modal-container' onClick={this.props.onClose}>
          <div className='cn-modal' onClick={(event) => { event.stopPropagation() }}>
            {this.renderHeader()}
            <div className={`cn-modal-body ${bodyClass}`}>
              {this.props.children}
            </div>
            {this.renderFooter()}
          </div>
        </div>
      )
    }
  }

  renderHeader () {
    if (this.props.title) {
      return (
        <div className='cn-modal-title-container margin-top margin-bottom'>
          <h2>{this.props.title}</h2>
        </div>
      )
    }
  }

  renderFooter () {
    if (this.props.footer) {
      return (
        <div className='cn-modal-footer'>
          {this.props.footer}
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderModal()}
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.node,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func
}

export default Modal
