import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'

class AutoCompleteDropDown extends React.Component {
  handleClickOutside = () => {
    this.props.toggle(false)
  }

  render () {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.handleClickOutside()}
      >
        <div style={{width: this.props.refWidth}} className='autocomplete-dropdown'>
          {this.props.optionsMap()}
        </div>
      </OutsideClickHandler>
    )
  }
}

AutoCompleteDropDown.propTypes = {
  optionsMap: PropTypes.function,
  show: PropTypes.bool,
  toggle: PropTypes.function,
  refWidth: PropTypes.string
}

export default AutoCompleteDropDown
