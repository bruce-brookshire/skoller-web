import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
  render () {
    const {active, label} = this.props
    const classes = []
    const steps_with_spacing = ['widen-step']
    if (active) 
      classes.push('progress-step-bar-reached')
    else
      classes.push('progress-step-bar-unreached')

    // if (label == 'Input Weights' || label == 'Assignments Intro') steps_with_spacing.push('progress-step-spacing')

    return (
      <div className={steps_with_spacing.join(' ')}>
        <p className='progress-bar-title'><strong>{label}</strong></p>
        <div className={classes.join(' ')}>&ensp;</div>
      </div>
    )
  }
}

ProgressStep.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string
}

export default ProgressStep
