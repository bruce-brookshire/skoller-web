import React from 'react'
import PropTypes from 'prop-types'
class Exit extends React.Component {
  getColor (givenFillColor) {
    let fillColor = '#4a4a4a'

    const skColors = {
      '$cn-font-color': '#4a4a4a',
      '$cn-color-darkgrey': '#4a4a4a',
      '$cn-color-blue': '#57B9E4',
      '$cn-color-yellow': '#FDBA22',
      '$cn-color-pink': '#EA8A8A',
      '$cn-color-white': '#fff',
      '$cn-color-grey': '#a9a9a9',
      '$cn-color-orange': '#ff6d00',
      '$cn-color-red': '#ff4159',
      '$cn-color-green': '#7ed321',
      '$cn-primary-background-color': '#EDFAFF',
      '$cn-blue-cell-background': '#edf5ff',
      '$cn-link-background': 'rgba(85,185,229,0.2)',
      '$cn-form-border': '#CCC',
      '$cn-color-hover-grey': '#e9e9e9',
      'jobs': '#6ED6AE'
    }

    if (givenFillColor) {
      fillColor = givenFillColor

      Object.keys(skColors).forEach(function (item) {
        if (givenFillColor === item) {
          fillColor = skColors[item]
        }
      })
    }

    return fillColor
  }
  render () {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 12 12"
        version="1.1"
      >
        <title>Exit</title>
        <g
          id="Exit"
          stroke="none"
          strokeWidth="1"
          fillRule="evenodd"
        >
          <path
            d="M7.2,4.8 L12,4.8 L12,7.2 L7.2,7.2 L7.2,12 L4.8,12 L4.8,7.2 L0,7.2 L1.46957616e-16,4.8 L4.8,4.8 L4.8,0 L7.2,0 L7.2,4.8 Z"
            id="Combined-Shape"
            fill={fillColor}
            transform="translate(6.000000, 6.000000) rotate(-315.000000) translate(-6.000000, -6.000000) "
          />
        </g>
      </svg>
    )
  }
}

Exit.defaultProps = {
  width: '12',
  height: '12'
}

Exit.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Exit
