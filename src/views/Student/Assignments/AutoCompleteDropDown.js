import React from 'react'
import PropTypes from 'prop-types'
import AutoCompleteOptions from './AutoCompleteOptions'

class AutoCompleteDropDown extends React.Component {
  handleClickOutside = () => {
    this.props.toggle(false)
  }

  render () {
    return (
      <div
        className='autocomplete-dropdown-container'
        ref={(ref) => { this.ref = ref }}
      >
        {this.props.show &&
          <AutoCompleteOptions
            refWidth={this.ref.offsetWidth.toString() + 'px'}
            toggle={this.props.toggle}
            optionsMap={this.props.optionsMap}
          />
        }
      </div>
    )
  }
}

AutoCompleteDropDown.propTypes = {
  optionsMap: PropTypes.function,
  show: PropTypes.bool,
  toggle: PropTypes.func
}

export default AutoCompleteDropDown
