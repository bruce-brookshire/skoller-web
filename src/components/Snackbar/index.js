import React from 'react'
import PropTypes from 'prop-types'

class Snackbar extends React.Component {
  render () {
    const {message, type, show} = this.props

    const classes = ['snackbar']
    if (show) classes.push('show')
    switch (type) {
      case 'info':
        classes.push('info')
        break
      case 'warning':
        classes.push('warning')
        break
      case 'error':
        classes.push('error')
        break
      default:
        break
    }

    return (
      <div className={classes.join(' ')}>
        {message}
      </div>
    )
  }
}

Snackbar.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string
}

export default Snackbar
