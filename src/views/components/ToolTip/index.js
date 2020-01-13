import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

class ToolTip extends React.Component {
  render () {
    return (
      <div className={'tooltip-container'}>
        <div data-tip data-for="tooltip" data-type='light' data-class='tooltip'>{this.props.children}</div>
        <ReactTooltip
          id="tooltip"
        >
          <div className='tooltip-content'>
            {this.props.tip}
          </div>
        </ReactTooltip>
      </div>
    )
  }
}

ToolTip.propTypes = {
  children: PropTypes.object,
  tip: PropTypes.object
}

export default ToolTip
