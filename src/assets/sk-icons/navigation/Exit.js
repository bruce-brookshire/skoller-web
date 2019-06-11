import React from 'react'
import PropTypes from 'prop-types'

class Exit extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 12 12"
        version="1.1"
      >
        <title>Exit</title>
        <g id="Exit" stroke="none" strokeWidth="1" fill={this.props.fill} fillRule="evenodd">
          <path d="M7.2,4.8 L12,4.8 L12,7.2 L7.2,7.2 L7.2,12 L4.8,12 L4.8,7.2 L0,7.2 L1.46957616e-16,4.8 L4.8,4.8 L4.8,0 L7.2,0 L7.2,4.8 Z" id="Combined-Shape" fill="#55B9E5" transform="translate(6.000000, 6.000000) rotate(-315.000000) translate(-6.000000, -6.000000) "></path>
        </g>
      </svg>
    )
  }
}

Exit.defaultProps = {
  width: '12',
  height: '12'
}

Exit.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Exit
