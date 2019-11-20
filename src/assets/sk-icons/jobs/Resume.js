import React from 'react'
import PropTypes from 'prop-types'

class Resume extends React.Component {
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
      fillColor = '#FFFFFF'
    }

    return fillColor
  }

  render () {
    const fillColor = this.getColor(this.props.fill)
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 17 22"
        version="1.1"
      >
        <title>Swith to SkollerJobs</title>
        <defs>
          <polygon id="path-1" points="0 0 16.8235294 0 16.8235294 22 0 22"></polygon>
        </defs>
        <g id="Jobs" stroke="none" strokeWidth="1" fill={fillColor} fillRule="evenodd">
          <g id="Home---Jobs" transform="translate(-18.000000, -182.000000)">
            <g id="Layout">
              <g id="Group-20" transform="translate(18.000000, 182.000000)">
                <g id="Group-3">
                  <g id="Clip-2"></g>
                  <path d="M14.9493421,19.0326851 C14.9493421,19.6264616 14.4703724,20.1095367 13.8817616,20.1095367 L2.94176781,20.1095367 C2.35304985,20.1095367 1.87413374,19.6264616 1.87413374,19.0326851 L1.87413374,2.9673149 C1.87413374,2.37353841 2.35304985,1.89046326 2.94176781,1.89046326 L8.96195288,1.89046326 L8.96195288,4.79745458 C8.96195288,5.57382342 9.18428957,6.31689537 9.58802169,6.88980725 C10.0538623,7.55082616 10.7290178,7.92990258 11.4404523,7.92990258 L14.9493421,7.92990258 L14.9493421,19.0326851 Z M10.8360866,3.2272036 L13.6241104,6.03943932 L11.4404523,6.03943932 C11.2273863,6.03943932 10.8360866,5.56787754 10.8360866,4.79745458 L10.8360866,3.2272036 Z M14.9493421,4.69869903 L14.9493421,4.70269898 L12.1613719,1.89046326 L12.1652838,1.89046326 L10.2910965,0 L8.96195288,0 L2.94176781,0 C1.31965852,0 0,1.33117284 0,2.9673149 L0,19.0326851 C0,20.6688812 1.31965852,22 2.94176781,22 L13.8817616,22 C15.5038709,22 16.8235294,20.6688812 16.8235294,19.0326851 L16.8235294,7.89049766 L16.8235294,6.5891623 L14.9493421,4.69869903 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Resume.defaultProps = {
  width: '17',
  height: '22'
}

Resume.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Resume
