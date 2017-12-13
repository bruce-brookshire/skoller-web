import React from 'react'
import PropTypes from 'prop-types'

class FileTabs extends React.Component {
  render () {
    return (
      <div className='cn-file-tabs' style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

FileTabs.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default FileTabs
