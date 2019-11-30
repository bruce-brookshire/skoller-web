import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {
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
        viewBox="0 0 32 33"
        version="1.1"
      >
        <title>Search</title>
        <g id="Home" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Home---Main" transform="translate(-785.000000, -553.000000)" fillRule="nonzero" stroke={fillColor}>
            <g id="Group-17" transform="translate(788.000000, 556.000000)">
              <circle id="Oval" strokeWidth="5" cx="11" cy="11" r="11"></circle>
              <rect id="Rectangle" strokeWidth="4" fill={fillColor} transform="translate(22.596194, 23.596194) rotate(-45.000000) translate(-22.596194, -23.596194) " x="22.0961941" y="17.5961941" width="1" height="12" rx="0.5"></rect>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Search.defaultProps = {
  width: '32',
  height: '33'
}

Search.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Search
