import React from 'react'
import PropTypes from 'prop-types'

class ForwardArrow extends React.Component {
  getDefaultProps () {
    return {
      width: '12',
      height: '17'
    }
  }

  render () {
    return (
      <svg
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 8 13"
        version="1.1"
      >
        <title>Forward</title>
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
            transform="translate(-883.000000, -103.000000)"
            stroke="#55B9E5"
          >
            <g id="Group-4" transform="translate(290.000000, 84.000000)">
              <g id="Group-3">
                <g
                  id="forward-arrow"
                  transform="translate(594.000000, 20.000000)"
                >
                  <g
                    id="slim-back-arrow"
                    transform="translate(3.000000, 5.500000) rotate(-180.000000) translate(-3.000000, -5.500000) "
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
        </g>
      </svg>
    )
  }
}

ForwardArrow.defaultProps = {
  width: '12',
  height: '17'
}

ForwardArrow.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default ForwardArrow
