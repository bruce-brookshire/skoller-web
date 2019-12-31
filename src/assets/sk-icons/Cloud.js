import React from 'react'
import PropTypes from 'prop-types'

class Cloud extends React.Component {
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
        viewBox="0 0 670 478"
        version="1.1"
      >
        <title>Cloud</title>
        <g
          id="Exit"
          stroke="none"
          strokeWidth="1"
          fillRule="evenodd"
        >
          <path
            d="M552.6,209.6 C556.7,198.9 559,187.2 559,175 C559,122 516,79 463,79 C443.3,79 424.9,85 409.7,95.2 C382,47.2 330.3,15 271,15 C182.6,15 111,86.6 111,175 C111,177.7 111.1,180.4 111.2,183.1 C55.2,202.8 15,256.2 15,319 C15,398.5 79.5,463 159,463 L527,463 C597.7,463 655,405.7 655,335 C655,273.1 611,221.4 552.6,209.6 Z"
            id="Combined-Shape"
            fill="#FFFFFF"
            stroke={fillColor}
            strokeWidth="30"
          />
        </g>
      </svg>
    )
  }
}

Cloud.defaultProps = {
  width: '12',
  height: '12'
}

Cloud.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Cloud
