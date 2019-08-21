import React from 'react'
import PropTypes from 'prop-types'

class AddUser extends React.Component {
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
        <title>AddUser</title>
        <g
          id="add-user"
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
            d="M5,11 L13,11 C15.7614237,11 18,13.2385763 18,16 L18,21 C18,22.6568542 16.6568542,24 15,24 L3,24 C1.34314575,24 -1.57345071e-15,22.6568542 -1.77635684e-15,21 L-8.8817842e-16,16 C-1.2263553e-15,13.2385763 2.23857625,11 5,11 Z M6,17.388 L6,18.732 L8.304,18.732 L8.304,21.144 L9.708,21.144 L9.708,18.732 L12.024,18.732 L12.024,17.388 L9.708,17.388 L9.708,15 L8.304,15 L8.304,17.388 L6,17.388 Z"
            id="Combined-Shape"
            fill={fillColor}
            fillRule="nonzero"
          />
        </g>
      </svg>
    )
  }
}

AddUser.defaultProps = {
  width: '18',
  height: '24'
}

AddUser.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default AddUser
