import React from 'react'
import PropTypes from 'prop-types'

class WorkExperience extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 16 15"
        version="1.1"
      >
        <title>Work Experience</title>
        <g id="Jobs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Jobs-Profile-Complete" transform="translate(-746.000000, -250.000000)" fill="#4A4A4A">
            <g id="Group-14" transform="translate(730.000000, 229.000000)">
              <g id="Group-5" transform="translate(16.000000, 21.000000)">
                <path d="M9.625,8.74072315 C9.625,8.901888 9.495625,9.03256219 9.3360625,9.03256219 L6.6639375,9.03256219 C6.504375,9.03256219 6.375,8.901888 6.375,8.74072315 L6.375,7.38461538 L0,7.38461538 L0,13.7040069 C0,14.1206493 0.3375,14.4615385 0.75,14.4615385 L15.25,14.4615385 C15.6625,14.4615385 16,14.1206493 16,13.7040069 L16,7.38461538 L9.625,7.38461538 L9.625,8.74072315 Z" id="Fill-1"></path>
                <path d="M5.875,1.30997715 C5.875,1.22741813 5.9465625,1.15765423 6.03125,1.15765423 L9.96875,1.15765423 C10.0534375,1.15765423 10.125,1.22741813 10.125,1.30997715 L10.125,2.25437928 L5.875,2.25437928 L5.875,1.30997715 Z M15.25,2.25437928 L11.3125,2.25437928 L11.3125,1.30997715 C11.3125,0.587661843 10.7096875,0 9.96875,0 L6.03125,0 C5.2903125,0 4.6875,0.587661843 4.6875,1.30997715 L4.6875,2.25437928 L0.75,2.25437928 C0.3375,2.25437928 0,2.5833968 0,2.98552932 L0,6.15384615 L16,6.15384615 L16,2.98552932 C16,2.5833968 15.6625,2.25437928 15.25,2.25437928 Z" id="Fill-3"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

WorkExperience.defaultProps = {
  width: '16',
  height: '15'
}

WorkExperience.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default WorkExperience
