import React from 'react'
import PropTypes from 'prop-types'

class Browse extends React.Component {
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
      fillColor = '#FFFFFF'
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
        width="19px"
        height="18px"
        viewBox="0 0 19 18"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{paddingTop: '2px'}}
      >
        <g id="Jobs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Home---Jobs" transform="translate(-18.000000, -234.000000)" fill={fillColor} fillRule="nonzero">
            <g id="Layout">
              <g id="Group-20-Copy" transform="translate(18.000000, 234.000000)">
                <g id="Group-24">
                  <rect id="Rectangle" x="0" y="0" width="4" height="4" rx="1"></rect>
                  <rect id="Rectangle-Copy-10" x="6" y="0" width="13" height="4" rx="1"></rect>
                  <rect id="Rectangle-Copy-8" x="0" y="7" width="4" height="4" rx="1"></rect>
                  <rect id="Rectangle-Copy-11" x="6" y="7" width="13" height="4" rx="1"></rect>
                  <rect id="Rectangle-Copy-9" x="0" y="14" width="4" height="4" rx="1"></rect>
                  <rect id="Rectangle-Copy-12" x="6" y="14" width="13" height="4" rx="1"></rect>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Browse.defaultProps = {
  width: '19',
  height: '18'
}

Browse.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Browse
