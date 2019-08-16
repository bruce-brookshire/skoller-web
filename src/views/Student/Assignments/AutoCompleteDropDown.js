import React from 'react'
import PropTypes from 'prop-types'

class AutoCompleteDropDown extends React.Component {
  componentWillMount () {
    document.addEventListener('mousedown', (e) => this.handleClickOutside(e))
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', (e) => this.handleClickOutside(e))
  }

  handleClickOutside = (e) => {
    if (this.ref && !this.ref.contains(e.target)) {
      this.props.toggle(false)
    }
  }

  render () {
    return (
      <div className='autocomplete-dropdown-container' ref={ref => { this.ref = ref }}>
        {this.props.show &&
          <div style={{width: this.ref.offsetWidth + ('px')}} className='autocomplete-dropdown'>
            {this.props.optionsMap()}
          </div>
        }
      </div>
    )
  }
}

AutoCompleteDropDown.propTypes = {
  optionsMap: PropTypes.function,
  onClick: PropTypes.function,
  show: PropTypes.bool,
  toggle: PropTypes.func
}

export default AutoCompleteDropDown
