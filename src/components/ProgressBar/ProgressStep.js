import React from 'react'
import PropTypes from 'prop-types'

class ProgressStep extends React.Component {
  render () {
    const {active, label, index} = this.props
    const icons = ['cn-progress-bar']
    const headers = ['progress-bar-title']
    if (active) {
      icons.push('active')
      headers.push('active')
    }

    return (
      <div className='cn-progress-step'>
        <div className={icons.join(' ')}>
          <div className='cn-progress-divider-left'></div>
          {index + 1}
          <div className='cn-progress-divider-right'></div>
        </div>
        <p className={headers.join(' ')}><strong>{label}</strong></p>
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
