import React from 'react'
import {CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

class CopyCellBox extends React.Component {
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
        className={'si-copy-cell'}
        onClick={(e) => this.copyToClipboard(e)}
      >
        <form>
          <textarea
            ref={(textArea) => { this.textArea = textArea }}
            value={this.props.linkValue}
            readOnly={true}
            style={{cursor: 'pointer'}}
            className={'sk-copy-box-short' + (this.props.smallText ? ' small-text' : '')}
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
        </form>
      </div>
    )
  }
}

CopyCellBox.propTypes = {
  linkValue: PropTypes.string,
  longMessage: PropTypes.bool,
  smallText: PropTypes.bool
}

function CopyCell ({isPhone, text}) {
  if (isPhone) {
    let match = text.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      text = '+1 (' + match[1] + ') ' + match[2] + '-' + match[3]
    }
  }
  return (
    <CopyCellBox smallText={true} linkValue={text} />
  )
}

CopyCell.propTypes = {
  isPhone: PropTypes.bool,
  text: PropTypes.string
}

export default CopyCell
