import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
  render () {
    const {active, label, index} = this.props
    const classes = ['cn-progress-bar']
    if (active) {
      classes.push('active')
    }

    return (
      <div className='cn-progress-step'>
        <div className={classes.join(' ')}>
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
