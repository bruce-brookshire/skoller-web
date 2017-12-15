import React from 'react'
import PropTypes from 'prop-types'

class FileTabs extends React.Component {
  getFileTabs () {
    const {children, currentIndex} = this.props
    return children.map((child, index) => {
      const newProps = {
        active: index === currentIndex,
        key: `step-${index}`
      }
      return React.cloneElement(child, newProps)
    })
  }

  render () {
    return (
      <div className='cn-file-tabs' style={this.props.style}>
        {this.getFileTabs()}
      </div>
    )
  }
}

FileTabs.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}

export default FileTabs
