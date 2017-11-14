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

  render () {
    const input = this.props
    return (
      <input
        onClick={this.onClick}
        className='cn-autocomplete-input'
        placeholder={input.placeholder}
        onChange={(event) => this.props.onChange(event.target.value)}
        value={input.value}
      />
    )
  }
}

AutoCompleteInput.propTypes = {
  icon: PropTypes.string,
  onChange: PropTypes.func
}

export default AutoCompleteInput
