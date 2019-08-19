import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'

class SkSelectOptions extends React.Component {
  handleClickOutside = () => {
    this.props.toggle(false)
  }

  render () {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.handleClickOutside()}
      >
        <div style={{width: this.props.refWidth}} className='sk-select-dropdown'>
          {this.props.optionsMap()}
        </div>
      </OutsideClickHandler>
    )
  }
}

SkSelectOptions.propTypes = {
  optionsMap: PropTypes.func,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  refWidth: PropTypes.string
}

export default SkSelectOptions
