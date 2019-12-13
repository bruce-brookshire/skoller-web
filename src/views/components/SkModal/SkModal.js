import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../assets/sk-icons/navigation/Exit'
import OutsideClickHandler from 'react-outside-click-handler'

@inject('rootStore')
@observer
class SkModal extends React.Component {
  constructor () {
    super()

    this.main = null
    this.onboardLayout = null
  }

  componentDidMount () {
    const preventDefault = e => e.preventDefault()

    this.main = document.getElementById('main')
    this.onboardLayout = document.getElementById('onboard-layout')

    if (this.main) {
      // this.main.addEventListener('touchmove', preventDefault)
    }

    if (this.onboardLayout) {
      this.onboardLayout.addEventListener('touchmove', preventDefault)
    }

    window.addEventListener('touchmove', preventDefault)
  }

  componentWillUnmount () {
    this.closeModal()
  }

  removeListener = () => {
    const preventDefault = e => e.preventDefault()
    window.removeEventListener('touchmove', preventDefault)

    if (this.main) {
      this.main.removeEventListener('touchmove', preventDefault)
    }

    if (this.onboardLayout) {
      this.onboardLayout.removeEventListener('touchmove', preventDefault)
    }
  }

  preventDefault = (e) => {
    e.preventDefault()
  }

  closeModal () {
    if (this.props.closeModal) {
      this.props.closeModal()
    }
    this.removeListener()
  }

  render () {
    const modalStyle = {}
    return (
      <div className="sk-modal-wrapper">
        <div className="sk-modal-container" id="sk-modal-container">
          <OutsideClickHandler
            onOutsideClick={() => {
              this.closeModal()
            }}
          >
            <div className="sk-modal" style={modalStyle}>
              {this.props.closeModal
                ? <div className="sk-modal-exit" onClick={() => {
                  this.closeModal()
                }}>
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
          </OutsideClickHandler>
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
