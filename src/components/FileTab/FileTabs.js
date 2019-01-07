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

  renderAddButton () {
    return <button className='button' onClick={this.props.addFileClick}>+ Add file</button>
  }

  render () {
    return (
      <div className='cn-file-tabs'>
        {this.getFileTabs()}
        {this.renderAddButton()}
      </div>
    )
  }
}

FileTabs.propTypes = {
  children: PropTypes.node,
  currentIndex: PropTypes.number,
  addFileClick: () => {}
}

export default FileTabs
