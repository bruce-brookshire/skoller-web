import React from 'react'
import PropTypes from 'prop-types'

class CheckIcon extends React.Component {
  render () {
    return (
      <svg fill={this.props.fill ? this.props.fill : '#FFFFFF'} width={this.props.width} height={this.props.height} viewBox="0 0 22 22" version="1.1">
        <title>Tasks</title>
        <g id="Symbols" fill="none" fillRule="evenodd">
          <g id="Sidebar" transform="translate(0.000000, -96.000000)" fill={this.props.fill ? this.props.fill : '#FFFFFF'}>
            <g id="Group-4">
              <g id="Group-20" transform="translate(0.000000, 96.000000)">
                <g id="Tasks-17-Highlight">
                  <g id="Page-1-Copy">
                    <path d="M14.8680618,6.25132764 C13.0886886,8.95423345 11.3092061,11.6571393 9.52972348,14.3600451 C8.55209163,13.3798931 7.57456925,12.3997412 6.59693741,11.4195893 C5.83175333,10.6523028 4.61201203,11.8077253 5.37500706,12.5727396 C6.60328566,13.8041781 7.83145482,15.0356166 9.05984288,16.2671584 C9.45113641,16.659529 10.1308379,16.5366227 10.4169474,16.1021128 C12.3980419,13.0928708 14.3792459,10.0835255 16.3603404,7.07428345 C16.9501812,6.17830683 15.4547285,5.36020531 14.8680618,6.25132764" id="Fill-4"></path>
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

CheckIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default CheckIcon
