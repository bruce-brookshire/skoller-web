import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../assets/sk-icons/navigation/Exit'

@inject('rootStore')
@observer
class SkModal extends React.Component {
  render () {
    return (
      <div className="sk-modal-wrapper">
        <div className="sk-modal-container">
          <div className="sk-modal">
            <div className="sk-modal-exit" onClick={() => this.props.closeModal()}>
              <Exit width="18" height="18" fill="$cn-color-blue"/>
            </div>
            <div className="sk-modal-header">
              <h1>{this.props.title}</h1>
            </div>
            <div className="sk-modal-content">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SkModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func
  // use the closeModal function to close the modal from the parent component.
}

export default SkModal
