import React from 'react'
import PropTypes from 'prop-types'
import SkSelectOptions from './SkSelectOptions'

class SkSelectDropDown extends React.Component {
  handleClickOutside = () => {
    this.props.toggle(false)
  }

  render () {
    return (
      <div
        className='sk-select-dropdown-container'
        ref={(ref) => { this.ref = ref }}
      >
        {this.props.show &&
          <SkSelectOptions
            refWidth={this.ref.offsetWidth.toString() + 'px'}
            refObject={this.ref}
            toggle={this.props.toggle}
            optionsMap={this.props.optionsMap}
            disableModalLogic={this.props.disableModalLogic}
            jobsMode={this.props.jobsMode}
          />
        }
      </div>
    )
  }
}

SkSelectDropDown.propTypes = {
  optionsMap: PropTypes.func,
  show: PropTypes.bool,
  toggle: PropTypes.func,
  disableModalLogic: PropTypes.bool,
  jobsMode: PropTypes.bool
}

export default SkSelectDropDown
