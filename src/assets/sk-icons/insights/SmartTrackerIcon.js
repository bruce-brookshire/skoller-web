import React from 'react'
import PropTypes from 'prop-types'

class SmartTrackerIcon extends React.Component {
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

    if (givenFillColor === 'white') {
      return 'white'
    }

    return fillColor
  }

  render () {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
      >
        <g id="Magic-Wand" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect id="Rectangle" stroke={fillColor} fill={fillColor} fillRule="nonzero" strokeLinecap="round" strokeLinejoin="round" transform="translate(9.828427, 14.171573) rotate(-315.000000) translate(-9.828427, -14.171573) " x="8.32842712" y="3.67157288" width="3" height="21"></rect>
          <rect id="Rectangle" fill="#FFFFFF" fillRule="nonzero" transform="translate(15.131728, 8.868272) rotate(-315.000000) translate(-15.131728, -8.868272) " x="14.131728" y="6.36827202" width="2" height="5"></rect>
          <polygon id="Star" stroke={fillColor} fill={fillColor} fillRule="nonzero" strokeLinecap="round" transform="translate(11.828427, 3.828427) rotate(-45.000000) translate(-11.828427, -3.828427) " points="11.8284271 4.63895712 10.4142136 5.24264069 11.0178971 3.82842712 10.4142136 2.41421356 11.8284271 3.01789712 13.2426407 2.41421356 12.6389571 3.82842712 13.2426407 5.24264069"></polygon>
          <polygon id="Star-Copy" stroke={fillColor} fill={fillColor} fillRule="nonzero" strokeLinecap="round" transform="translate(19.828427, 13.828427) rotate(-45.000000) translate(-19.828427, -13.828427) " points="19.8284271 14.6389571 18.4142136 15.2426407 19.0178971 13.8284271 18.4142136 12.4142136 19.8284271 13.0178971 21.2426407 12.4142136 20.6389571 13.8284271 21.2426407 15.2426407"></polygon>
          <polygon id="Star-Copy-2" stroke={fillColor} fill={fillColor} fillRule="nonzero" strokeLinecap="round" transform="translate(4.500000, 9.500000) rotate(-45.000000) translate(-4.500000, -9.500000) " points="4.5 9.9878976 3.43933983 10.5606602 4.0121024 9.5 3.43933983 8.43933983 4.5 9.0121024 5.56066017 8.43933983 4.9878976 9.5 5.56066017 10.5606602"></polygon>
        </g>
      </svg>
    )
  }
}

SmartTrackerIcon.defaultProps = {
  width: '19',
  height: '18'
}

SmartTrackerIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default SmartTrackerIcon
