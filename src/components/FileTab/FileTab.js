import React from 'react'
import PropTypes from 'prop-types'

class FileTab extends React.Component {

  renderRemoveBtn () {
    if (this.props.removable) {
      return (<button className='fa fa-times' onClick={() => this.props.onDelete()}></button>)
    } else {
      return null
    }
  }

  render () {
    let classes = ['cn-file-tab']
    if (this.props.className) classes.push(this.props.className)
    if (this.props.active) classes.push('active')
    if (this.props.changed) classes.push('cn-red-background-alt')
    return (
      <div className={classes.join(' ')} onClick={() => this.props.onClick()}>
        {this.props.name}
        {this.renderRemoveBtn()}
      </div>
    )
  }
}

FileTab.propTypes = {
  active: PropTypes.bool,
  changed: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  removable: PropTypes.bool
}

export default FileTab
