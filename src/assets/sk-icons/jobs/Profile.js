import React from 'react'
import PropTypes from 'prop-types'

class Profile extends React.Component {
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
      if (givenFillColor === 'white') {
        givenFillColor = 'fff'
      }
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
        viewBox="0 0 22 22"
        version="1.1"
      >
        <title>Swith to SkollerJobs</title>
        <g id="Jobs" stroke="none" strokeWidth="1" fill={fillColor} fillRule="evenodd">
          <g id="Home---Jobs" transform="translate(-15.000000, -134.000000)" fill={fillColor}>
            <g id="Layout">
              <g id="Group-27" transform="translate(0.000000, 75.000000)">
                <g id="Group-17" transform="translate(15.000000, 59.000000)">
                  <g id="Activity">
                    <path d="M10.5160107,20.2650164 C7.99469779,20.1656997 5.64880445,18.9354726 3.98897218,17.0639815 C2.29009668,15.1485576 1.56741195,12.5617004 1.78594407,10.0370537 C2.21025052,5.13783635 6.69329339,1.5548398 11.4880222,1.74378366 C16.3778846,1.93647116 20.2255676,6.18121164 20.263511,11.0044551 C20.2218282,16.2962044 15.7780486,20.4723481 10.5160107,20.2650164 M11,10 C12.6568542,10 14,8.65685425 14,7 C14,5.34314575 12.6568542,4 11,4 C9.34314575,4 8,5.34314575 8,7 C8,8.65685425 9.34314575,10 11,10 Z M9.5,11 L12.5,11 C14.4329966,11 16,12.5670034 16,14.5 L16,14.5 C16,16.4329966 14.4329966,18 12.5,18 L9.5,18 C7.56700338,18 6,16.4329966 6,14.5 L6,14.5 C6,12.5670034 7.56700338,11 9.5,11 Z M0.390066042,8.10236108 C-1.0917071,13.3889354 1.77835538,19.0711246 6.79293612,21.1719689 C11.8448004,23.2885585 17.7637543,21.2081941 20.5239459,16.5178501 C21.5020063,14.8558928 21.9848226,12.9262651 22,11.0044551 C21.9569975,5.53323111 17.8719756,0.825710298 12.4419969,0.0954797228 C7.03401433,-0.631777959 1.85699175,2.86863824 0.390066042,8.10236108 Z" id="Fill-1"></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Profile.defaultProps = {
  width: '22',
  height: '22'
}

Profile.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Profile
