import React from 'react'
import PropTypes from 'prop-types'

class Extras extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 20 21"
        version="1.1"
      >
        <title>Extras</title>
        <g id="Jobs" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
          <g id="Jobs-Profile-Complete" transform="translate(-485.000000, -813.000000)" stroke="#4A4A4A" strokeWidth="2">
            <g id="Group-25" transform="translate(470.000000, 795.000000)">
              <g id="Stroke-2" transform="translate(16.000000, 19.000000)">
                <polygon id="Stroke-1" points="11.4559187 4.73276904 17.9564708 3.58723516 14.9070451 9.46993323 18 15.3296567 11.4912986 14.2328689 6.90225265 19 5.92890901 12.4392514 0 9.52587141 5.90724382 6.5679407 6.8316917 0"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

Extras.defaultProps = {
  width: '20',
  height: '21'
}

Extras.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default Extras
