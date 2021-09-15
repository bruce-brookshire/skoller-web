import React from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import Exit from '../../../assets/sk-icons/navigation/Exit'
import OutsideClickHandler from 'react-outside-click-handler'
import { CSSTransition } from 'react-transition-group'

@inject('rootStore')
@observer
class SkModal extends React.Component {
  constructor () {
    super()

    this.state = {
      ios: this.getMobileOperatingSystem() === 'iOS',
      initHeight: window.innerHeight
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
    this.cnLandingContainer = document.getElementById('cn-landing-container')

    if (this.main && this.state.ios) {
      // this.main.style = {display: 'none'}
    }

    if (this.cnLandingContainer) {
      this.cnLandingContainer.addEventListener('touchmove', preventDefault)
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

    if (this.cnLandingContainer) {
      this.cnLandingContainer.removeEventListener('touchmove', preventDefault)
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
    let style = {}
    let containerStyle = {}
    // const height = window.innerHeight
    if (this.state.ios) {
      style = {
        width: '100vw',
        maxHeight: 'none',
        height: (this.state.initHeight - 64).toString() + 'px',
        boxShadow: 'none',
        borderRadius: '0',
        margin: '0',
        paddingBottom: '46px'
      }

      containerStyle = {
        backgroundColor: 'rgba(0,0,0,0)',
        maxHeight: 'none',
        alignItems: 'flex-start',
        top: '64px'
      }
    }

    return (
      <div className={'sk-modal-wrapper'} style={containerStyle}>        

        {/* <div className="sk-modal-container modal-sm" id="sk-modal-container" style={style}> */}
        {/* <div className="sk-modal-container modal-lg" id="sk-modal-container" style={style}> */}
        <div className="sk-modal-container modal-md" id="sk-modal-container" style={style}>
          <OutsideClickHandler
            onOutsideClick={() => {
              if (!this.props.disableOutsideClick) {
                this.closeModal()
              }
            }}
          >
            <div className={this.props.className ? this.props.className : 'sk-modal'}>
              {this.props.closeModal
                ? <div className="sk-modal-exit" onClick={() => {
                  this.closeModal()
                }}>
                  <Exit width="18" height="18" fill={this.props.rootStore.navStore.jobsMode ? 'jobs' : '$cn-color-blue'}/>
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
  rootStore: PropTypes.object,
  closeModal: PropTypes.func,
  // use the closeModal function to close the modal from the parent component.
  disableOutsideClick: PropTypes.bool,
  className: PropTypes.string
}

export default SkModal
