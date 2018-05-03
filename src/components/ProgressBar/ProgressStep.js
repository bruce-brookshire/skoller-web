import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
  render () {
    const {active, label, index} = this.props
    const classes = ['progress-bar-step']
    if (active) {
      classes.push('active')
    }

    // if (label == 'Input Weights' || label == 'Assignments Intro') steps_with_spacing.push('progress-step-spacing')

    return (
      <div className='cn-progress-step'>
        <div className='cn-progress-bar'>
          <div className='cn-progress-divider-left'></div>
          {index + 1}
          <div className='cn-progress-divider-right'></div>
        </div>
        <p className='progress-bar-title'><strong>{label}</strong></p>
      </div>
    )
  }
}

ProgressStep.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  index: PropTypes.number
}

export default ProgressStep
