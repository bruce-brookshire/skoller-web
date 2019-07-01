import React from 'react'
import PropTypes from 'prop-types'

class HomeIcon extends React.Component {
  render () {
    return (
      <svg fill={this.props.fill} width={this.props.width} height={this.props.height} viewBox="0 0 24 24" version="1.1">
        <title>Home</title>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
          <g id="Sidebar" transform="translate(1.000000, 1.000000)" stroke="#FFFFFF" strokeWidth="1.5">
            <g id="Group-4">
              <g id="Group-22-Copy">
                <polygon id="Page-1" points="0 11.0717697 2.3163682 11.0717697 2.3163682 22 9.14064532 22 9.14064532 18.2407838 12.8593547 18.2407838 12.8593547 22 19.6837568 22 19.6837568 11.0717697 22 11.0717697 11.0001874 0"></polygon>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
}

HomeIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default HomeIcon
