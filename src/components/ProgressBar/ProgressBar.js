import React from 'react'
import PropTypes from 'prop-types'

class ProgressBar extends React.Component {
  getProgressSteps () {
    const {children, currentStep} = this.props
    return children.map((child, index) => {
      const newProps = {
        active: index < currentStep,
        key: `step-${index}`
      }
      return React.cloneElement(child, newProps)
    })
  }

  render () {
    return (
      <div>
        {this.getProgressSteps()}
      </div>
    )
  }
}

ProgressBar.propTypes = {
  children: PropTypes.node,
  currentStep: PropTypes.number
}

export default ProgressBar
