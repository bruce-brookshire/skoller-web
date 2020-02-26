import React from 'react'
import PropTypes from 'prop-types'

class BackArrow extends React.Component {
  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 8 13"
        version="1.1"
      >
        <title>Back</title>
        <g
          id="Calendar"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g
            id="Calendar---Main---Month"
            transform="translate(-304.000000, -103.000000)"
            stroke={this.props.fill || '#55B9E5'}
          >
            <g id="Group-4" transform="translate(290.000000, 84.000000)">
              <g id="Group-3">
                <g
                  id="slim-back-arrow"
                  transform="translate(15.000000, 20.000000)"
                >
                  <g id="Path-2">
                    <polyline
                      strokeWidth="2"
                      points="6 -7.81597009e-15 0 5.51485815 6 11"
                    />
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

BackArrow.defaultProps = {
  width: '12',
  height: '17'
}

BackArrow.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default BackArrow
