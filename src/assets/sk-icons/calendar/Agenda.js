import React from 'react'
import PropTypes from 'prop-types'

class Agenda extends React.Component {
  render () {
    return (
      <svg
        fill={this.props.fill}
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 15 17"
        version="1.1"
      >
        <title>Week View</title>
        <g id="Agenda-Icon">
          <rect id="Rectangle-2" stroke="#55B9E5" strokeWidth="2" x="1" y="1" width="13" height="15" rx="2"></rect>
          <rect id="Rectangle" fill="#55B9E5" x="0" y="2" width="1.76470588" height="13"></rect>
          <polygon id="Rectangle-Copy" fill="#55B9E5" points="0 12 0 10 13.2352941 10 13.2352941 12"></polygon>
          <polygon id="Rectangle-Copy-3" fill="#55B9E5" points="0 7 0 5 13.2352941 5 13.2352941 7"></polygon>
          <rect id="Rectangle-Copy-2" fill="#55B9E5" x="13.2352941" y="2" width="1.76470588" height="13"></rect>
        </g>
      </svg>
    )
  }
}

Agenda.defaultProps = {
  width: '15',
  height: '17'
}

Agenda.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Agenda
