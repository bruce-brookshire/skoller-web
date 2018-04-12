import React from 'react'
import PropTypes from 'prop-types'

class AutoCompleteInput extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  onBlur () {
    if (this.props.onBlur) this.props.onBlur()
  }

  onFocus () {
    if (this.props.onFocus) this.props.onFocus()
  }

  render () {
    const input = this.props
    const classes = ['cn-autocomplete-input']
    if (input.className) classes.push(input.className)
    return (
      <input
        onClick={this.onClick}
        className={classes.join(' ')}
        placeholder={input.placeholder}
        onBlur={this.onBlur.bind(this)}
        onFocus={this.onFocus.bind(this)}
        onChange={(event) => this.props.onChange(event)}
        onKeyUp={(event) => this.props.onKeyUp(event)}
        value={input.value}
      />
    )
  }
}

AutoCompleteInput.propTypes = {
  icon: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

export default AutoCompleteInput
