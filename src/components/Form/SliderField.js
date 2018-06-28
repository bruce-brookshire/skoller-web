import React from 'react'
import PropTypes from 'prop-types'

class SliderField extends React.Component {
  onChange (event) {
    this.props.onChange(event.target.name, event.target.checked)
  }

  render () {
    const input = this.props
    return (
      <label className="toggle-switch">
        <input
          type="checkbox"
          name={input.name}
          onChange={this.onChange.bind(this)}
          checked={input.value}
        />
        <span className="slider round"></span>
      </label>
    )
  }
}

SliderField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
}

export default SliderField
