import React from 'react'
import PropTypes from 'prop-types'

class CompletionCircle extends React.Component {
  render () {
    let completion
    if (this.props.completion === 0) {
      completion = 0
    } else {
      completion = this.props.completion
    }
    const radius = 5
    const circumference = radius * 2 * Math.PI
    const offset = circumference - completion / 100 * circumference

    // circle.style.strokeDasharray = `${circumference} ${circumference}`
    // circle.style.strokeDashoffset = `${circumference}`

    let color = '#4a4a4a'
    if (this.props.hexColor) {
      color = this.props.hexColor
    }

    let size = {height: '16', width: '16'}
    if (this.props.customSize) {
      size.height = this.props.customSize
      size.width = this.props.customSize
    }

    return (
      <div
        className="completion-circle-container"
      >
        <svg
          className="completion-circle"
          width={size.width.toString()}
          height={size.height.toString()}
          viewBox='0 0 24 24'
        >
          <circle
            className="completion-circle__circle"
            stroke={color}
            strokeWidth="2"
            fill="transparent"
            r={radius + 4}
            cx="12"
            cy="12"
          />
          <circle
            className="completion-circle__circle"
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            r={radius}
            cx="12"
            cy="12"
            style={{
              strokeDashoffset: `${offset}`,
              strokeDasharray: `${circumference} ${circumference}`
            }}
          />
        </svg>
      </div>
    )
  }
}

CompletionCircle.propTypes = {
  completion: PropTypes.number,
  hexColor: PropTypes.string,
  customSize: PropTypes.number
}

export default CompletionCircle
