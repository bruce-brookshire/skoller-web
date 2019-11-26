import React from 'react'
import PropTypes from 'prop-types'

class PersonalityProfile extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 12 16"
        version="1.1"
      >
        <title>PersonalityProfile</title>
        <g id="Jobs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Jobs-Profile-Complete" transform="translate(-746.000000, -673.000000)" fill="#4A4A4A" fillRule="nonzero">
            <g id="Group-5-Copy-5" transform="translate(730.000000, 653.000000)">
              <g id="Group-23" transform="translate(16.000000, 20.000000)">
                <circle id="Oval" cx="5.71428571" cy="3.42857143" r="3.42857143"></circle>
                <rect id="Rectangle" x="0" y="8" width="11.4285714" height="8" rx="4"></rect>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

PersonalityProfile.defaultProps = {
  width: '12',
  height: '16'
}

PersonalityProfile.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default PersonalityProfile
