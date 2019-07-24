import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../assets/sk-icons/navigation/Exit'
import { mobileCheck } from '../../../utilities/display'

@inject('rootStore')
@observer
class SkModal extends React.Component {
  render () {
    const modalStyle = {}
    if (mobileCheck()) {
      modalStyle.marginTop = '64px'
    }
    return (
      <div className="sk-modal-wrapper">
        <div className="sk-modal-container">
          <div className="sk-modal" style={modalStyle}>
            {this.props.closeModal
              ? <div className="sk-modal-exit" onClick={() => this.props.closeModal()}>
                <Exit width="18" height="18" fill="$cn-color-blue"/>
              </div>
              : null
            }
            {this.props.title
              ? <div className="sk-modal-header">
                <h1>{this.props.title}</h1>
              </div>
              : null
            }
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
