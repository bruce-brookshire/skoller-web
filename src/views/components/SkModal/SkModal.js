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

    this.state = {
      ios: this.getMobileOperatingSystem() === 'iOS'
    }

    this.main = null
    this.onboardLayout = null
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }
  }

  componentDidMount () {
    const preventDefault = e => e.preventDefault()

    this.main = document.getElementById('main')
    this.onboardLayout = document.getElementById('onboard-layout')
    this.enrollLinkLayout = document.getElementById('enroll-layout')

    if (this.main && this.state.ios) {
      // this.main.style = {display: 'none'}
    }

    if (this.onboardLayout) {
      // this.onboardLayout.addEventListener('touchmove', preventDefault)
    }

    if (this.enrollLinkLayout) {
      // this.enrollLinkLayout.addEventListener('touchmove', preventDefault)
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

    if (this.enrollLinkLayout) {
      this.enrollLinkLayout.removeEventListener('touchmove', preventDefault)
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
    // console.log(window.innerHeight.toString() + 'px')
    let style = {}
    let containerStyle = {}
    if (this.state.ios) {
      style = {
        width: '100vw',
        maxHeight: 'none',
        height: (window.innerHeight - 64).toString() + 'px',
        boxShadow: 'none',
        borderRadius: '0',
        margin: '0',
        paddingBottom: '46px'
      }

      containerStyle = {
        backgroundColor: 'rgba(0,0,0,0)',
        top: '-4px',
        maxHeight: 'none'
      }
    }

    return (
      <div className={'sk-modal-wrapper ' + (this.state.ios ? 'animate-bottom' : '')} style={containerStyle}>
        <div className="sk-modal-container" id="sk-modal-container" style={style}>
          <OutsideClickHandler
            onOutsideClick={() => {
              this.closeModal()
            }}
          >
            <div className="sk-modal">
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
