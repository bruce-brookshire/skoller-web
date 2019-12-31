import React from 'react'
import PropTypes from 'prop-types'

class Arrow extends React.Component {
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
      fillColor = '#4a4a4a'
    }

    return fillColor
  }

  render () {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 205 48"
        version="1.1"
      >
        <title>Arrow</title>
        <g id="Arrow" stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
          <path
            d="M33,0.97248914 L0.812457151,24 L33,47.0275109 L33,34.5 L204.5,34.5 L204.5,13.5 L33,13.5 L33,0.97248914 Z"
            id="Combined-Shape"
            stroke="#000000"
            fill={fillColor}
            fillRule="nonzero"
          ></path>
        </g>
      </svg>
    )
  }
}

Arrow.defaultProps = {
  width: '205',
  height: '48'
}

Arrow.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Arrow
