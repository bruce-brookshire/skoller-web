import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../assets/sk-icons/navigation/Exit'

@inject('rootStore')
@observer
class SkModal extends React.Component {
  closeModal () {
    this.props.callbackFromParent(false)
  }

  render () {
    return (
      <div className="sk-modal-wrapper">
        <div className="sk-modal-container">
          <div className="sk-modal">
            <div className="sk-modal-exit" onClick={() => this.closeModal()}>
              <Exit width="18" height="18"/>
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
  callbackFromParent: PropTypes.function
  // use the callbackFromParent function to close the modal from the parent component.
  // The callbackFromParent could look like:
  //  callbackFromParent = (bool) => {
  //    this.setState({showAddAssignmentModal: bool})
  // and within this component you would call:
  //  this.props.callbackFromParent(false)
}

export default SkModal
