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
      >
        <form>
          <textarea
            ref={(textArea) => { this.textArea = textArea }}
            value={this.props.linkValue}
            readOnly={true}
            style={{cursor: 'pointer'}}
          />
        </form>
        {this.state.copyStatus &&
          <p>link copied to clipboard! 📋</p>
        }
      </div>
    )
  }
}

CopyBox.propTypes = {
  linkValue: PropTypes.string
}

export default CopyBox
