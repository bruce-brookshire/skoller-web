import React from 'react'
import PropTypes from 'prop-types'

class ActivityIcon extends React.Component {
  render () {
    return (
      <svg
        fill={this.props.fill}
        width={this.props.width}
        height={this.props.height}
        viewBox="0 0 30 30"
        version="1.1"
      >
        <title>Activity</title>
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Activity" fill="#FFFFFF">
            <path
              d="M16.2204151,13.7444672 L19.8544719,13.7444672 L13.7794266,24.2349409 L13.7794266,15.9571605 L10.1453698,15.9571605 L16.2204151,5.46668685 L16.2204151,13.7444672 Z M14.3400146,27.6341132 C10.9018606,27.4986814 7.70291516,25.821099 5.43950752,23.2690657 C3.1228591,20.657124 2.13737993,17.1295914 2.43537828,13.6868914 C3.01397798,7.00614048 9.12721826,2.12023609 15.6654849,2.37788681 C22.333479,2.64064249 27.5803194,8.42892497 27.6320605,15.0060751 C27.5752203,22.2220969 21.5155208,27.9168383 14.3400146,27.6341132 M0.531908239,11.0486742 C-1.48869149,18.2576391 2.42503007,26.006079 9.2630947,28.8708667 C16.1520005,31.7571252 24.2233014,28.9202647 27.9871989,22.524341 C29.3209177,20.2580357 29.9793036,17.6267252 30,15.0060751 C29.9413602,7.54531514 24.3708758,1.12596859 16.9663594,0.130199622 C9.59183772,-0.861515399 2.53226148,3.91177941 0.531908239,11.0486742 Z"
              id="Fill-1"
            />
          </g>
        </g>
      </svg>
    )
  }
}

ActivityIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default ActivityIcon
