import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
  render () {
    const {active, label} = this.props
    const classes = []
    if (active) classes.push('active')
    return (
      <div>
        <p><strong>{label}</strong></p>
        <div className='progress-step-bar'>&ensp;</div>
      </div>
    )
  }
}

ProgressStep.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string
}

export default ProgressStep
