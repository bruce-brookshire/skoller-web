import React from 'react'
import PropTypes from 'prop-types'

class SiToggle extends React.Component {
  render () {
    return (
      <label className="si-switch">
        <input type="checkbox" checked={this.props.checked} onChange={() => this.props.onChange()} />
        <span className="slider round" />
      </label>
    )
  }
}

SiToggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

export default SiToggle
