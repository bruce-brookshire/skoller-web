import React from 'react'
import PropTypes from 'prop-types'

class TextAreaField extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      focus: false
    }
  }

  render () {
    return (
      <textarea
        className={'jobs-form-input ' + (this.state.focus && 'focus')}
        onChange={(e) => this.props.updateValue(e.target.value)}
        onFocus={() => this.setState({focus: true})}
        onBlur={() => this.setState({focus: false})}
        value={this.props.value}
        autoFocus={this.props.autoFocus}
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        style={{minHeight: '128px', width: '100%', resize: 'none', height: '100%'}}
      />
    )
  }
}

TextAreaField.propTypes = {
  updateValue: PropTypes.func,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string
}

export default TextAreaField
