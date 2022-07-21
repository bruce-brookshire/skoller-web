import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

class CopyBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      copyStatus: false
    }

    this.timer = () => setTimeout(() => this.setState({copyStatus: false}), 5000)
  }

  copyToClipboard = (e) => {
    if (this.hiddenTextArea) {
      this.hiddenTextArea.select()
    } else {
      this.textArea.select()
    }
    document.execCommand('copy')
    e.target.focus()
    this.setState({ copyStatus: true })
    this.timer()
  }

  render () {
    return (
      <div
        className={'sk-copy-box ' + this.props.className}
        onClick={(e) => this.copyToClipboard(e)}
      >
        <div className="link-value">{this.props.linkValue}</div>
        <CSSTransition
            in={this.state.copyStatus}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <p className="copied-text">Copied!</p>
          </CSSTransition>
          {this.props.hiddenText &&
            <textarea
              ref={(hiddenTextArea) => { this.hiddenTextArea = hiddenTextArea }}
              value={this.props.hiddenText}
              readOnly={true}
              style={{height: '1px', opacity: '0', margin: '-24px 0 24px 0'}}
            />
          }
        <div>
          <svg width="16" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.6875 10.8594C3.4375 10.8594 3.21875 10.7656 3.03125 10.5781C2.84375 10.3906 2.75 10.1719 2.75 9.92188V1.17187C2.75 0.921875 2.84375 0.703125 3.03125 0.515625C3.21875 0.328125 3.4375 0.234375 3.6875 0.234375H10.5625C10.8125 0.234375 11.0312 0.328125 11.2188 0.515625C11.4062 0.703125 11.5 0.921875 11.5 1.17187V9.92188C11.5 10.1719 11.4062 10.3906 11.2188 10.5781C11.0312 10.7656 10.8125 10.8594 10.5625 10.8594H3.6875ZM3.6875 9.92188H10.5625V1.17187H3.6875V9.92188ZM1.8125 12.7344C1.5625 12.7344 1.34375 12.6406 1.15625 12.4531C0.96875 12.2656 0.875 12.0469 0.875 11.7969V2.375H1.8125V11.7969H9.21875V12.7344H1.8125ZM3.6875 1.17187V9.92188V1.17187Z" fill="#57B9E4"/>
          </svg>
        </div>      

      </div>
    )
  }
}

CopyBox.propTypes = {
  linkValue: PropTypes.string,
  longMessage: PropTypes.bool,
  smallText: PropTypes.bool,
  hiddenText: PropTypes.string,
  className: PropTypes.string
}

export default CopyBox
