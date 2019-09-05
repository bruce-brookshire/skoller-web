import React from 'react'
import PropTypes from 'prop-types'

class CompletionCircle extends React.Component {
  render () {
    console.log(this.props)
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

    return (
      <div
        className="completion-circle-container"
      >
        <svg
          className="completion-circle"
          width="16"
          height="16"
          viewBox='0 0 24 24'
        >
          <circle
            className="completion-circle__circle"
            stroke="#4a4a4a"
            strokeWidth="2"
            fill="transparent"
            r={radius + 4}
            cx="12"
            cy="12"
          />
          <circle
            className="completion-circle__circle"
            stroke="#4a4a4a"
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
  completion: PropTypes.number
}

export default CompletionCircle
