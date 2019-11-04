import React from 'react'
import PropTypes from 'prop-types'

class CopyBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      copyStatus: false
    }
  }

  copyToClipboard = (e) => {
    this.textArea.select()
    document.execCommand('copy')
    e.target.focus()
    this.setState({ copyStatus: true })
  }

  render () {
    return (
      <div
        className='sk-copy-box'
        onClick={(e) => this.copyToClipboard(e)}
        style={{height: this.props.longMessage ? '100%' : '56px'}}
      >
        <form>
          <textarea
            ref={(textArea) => { this.textArea = textArea }}
            value={this.props.linkValue}
            readOnly={true}
            style={{cursor: 'pointer'}}
            className={this.props.longMessage ? 'sk-copy-box-long' : 'sk-copy-box-short'}
          />
        </form>
        {this.state.copyStatus &&
          <p>
            {!this.props.longMessage && 'link '}copied to clipboard! 📋
          </p>
        }
      </div>
    )
  }
}

CopyBox.propTypes = {
  linkValue: PropTypes.string,
  longMessage: PropTypes.bool
}

export default CopyBox
