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
        style={{height: this.props.longMessage ? '100%' : '56px'}}
      >
        <form>
          <textarea
            ref={(textArea) => { this.textArea = textArea }}
            value={this.props.linkValue}
            readOnly={true}
            style={{cursor: 'pointer', paddingTop: this.props.hiddenText ? '24px' : ''}}
            className={(this.props.longMessage ? 'sk-copy-box-long' : 'sk-copy-box-short') + (this.props.smallText ? ' small-text' : '')}
          />
          <CSSTransition
            in={this.state.copyStatus}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <p>
              copied to clipboard! 📋
            </p>
          </CSSTransition>
          {this.props.hiddenText &&
            <textarea
              ref={(hiddenTextArea) => { this.hiddenTextArea = hiddenTextArea }}
              value={this.props.hiddenText}
              readOnly={true}
              style={{height: '1px', opacity: '0', margin: '-24px 0 24px 0'}}
            />
          }
        </form>
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
