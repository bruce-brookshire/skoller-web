import React from 'react'
import PropTypes from 'prop-types'

class User extends React.Component {
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
      '$cn-primary-background-color': '#f5f7f9',
      '$cn-blue-cell-background': '#edf5ff',
      '$cn-link-background': 'rgba(85,185,229,0.2)',
      '$cn-form-border': '#CCC',
      '$cn-color-hover-grey': '#e9e9e9'
    }

    if (givenFillColor) {
      Object.keys(skColors).forEach(function (item) {
        if (givenFillColor === item) {
          fillColor = skColors[item]
        }
      })
      fillColor = '#' + givenFillColor
    } else {
      fillColor = givenFillColor
    }

    return fillColor
  }
  render () {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 18 24"
        version="1.1"
      >
        <title>User</title>
        <g
          id="user"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <circle
            id="Oval"
            fill={fillColor}
            fillRule="nonzero"
            cx="9"
            cy="5"
            r="5"
          />
          <path
            d="M5,11 L13,11 C15.7614237,11 18,13.2385763 18,16 L18,21 C18,22.6568542 16.6568542,24 15,24 L3,24 C1.34314575,24 -6.85272294e-16,22.6568542 -8.8817842e-16,21 L0,16 C-3.38176876e-16,13.2385763 2.23857625,11 5,11 Z"
            id="Rectangle"
            fill={fillColor}
            fillRule="nonzero"
          />
        </g>
      </svg>
    )
  }
}

User.defaultProps = {
  width: '18',
  height: '24'
}

User.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default User
