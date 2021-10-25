import React from 'react'
import PropTypes from 'prop-types'

class ShareIcon extends React.Component {
  render () {
    return (
      <svg
        fill={this.props.fill}
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 377.01 316.24"
        version="1.1"
      >
        <title>Share</title>
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Share" fill={this.props.fill}>
            <path d="M188.51,107.51a53.76,53.76,0,1,1,53.75-53.75A53.76,53.76,0,0,1,188.51,107.51Zm90.89,176V194a59.67,59.67,0,0,0-59.5-59.5H157.11A59.68,59.68,0,0,0,97.61,194v89.56a32.83,32.83,0,0,0,32.73,32.73H246.68A32.82,32.82,0,0,0,279.4,283.51Zm30-194.71a40,40,0,1,0-40-40A40,40,0,0,0,309.4,88.8Zm8.11,20H301.29A59.11,59.11,0,0,0,266,120.52,59.7,59.7,0,0,1,299.4,174v70.11H365a12,12,0,0,0,12-12V168.34A59.67,59.67,0,0,0,317.51,108.84Zm-249.9-20a40,40,0,1,0-40-40A40,40,0,0,0,67.61,88.8Zm10,85.15A59.69,59.69,0,0,1,111,120.52a59.12,59.12,0,0,0-35.3-11.68H59.5A59.67,59.67,0,0,0,0,168.34v63.72a12,12,0,0,0,12,12H77.61Z"/>
          </g>
        </g>
      </svg>
    )
  }
}

ShareIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default ShareIcon
