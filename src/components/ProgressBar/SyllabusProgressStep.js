import React from 'react'
import PropTypes from 'prop-types'

class SyllabusProgressStep extends React.Component {
  render () {
    const {active, label, index} = this.props
    const classes = ['cn-syllabus-progress-bar']
    const headers = ['syllabus-progress-bar-title']
    if (active) {
      classes.push('active')
      headers.push('active')
    }

    return (
      <div className='cn-progress-step'>
        <div className={classes.join(' ')}>
          <div className='cn-progress-divider-left'></div>
          {index + 1}
          <div className='cn-progress-divider-right'></div>
        </div>
        <p className={headers.join(' ')}><strong>{label}</strong></p>
      </div>
    )
  }
}

SyllabusProgressStep.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  index: PropTypes.number
}

export default SyllabusProgressStep
