import React from 'react'
import PropTypes from 'prop-types'

class FileTab extends React.Component {
  render () {
    let classes = ['cn-file-tab']
    if (this.props.className) classes.push(this.props.className)
    return (
      <div className={classes.join(' ')} onClick={() => this.props.onClick()}>
        <span>{this.props.name}</span>
      </div>
    )
  }
}

FileTab.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func
}

export default FileTab
