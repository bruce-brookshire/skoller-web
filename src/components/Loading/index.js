import React from 'react'
import PropTypes from 'prop-types'

class Loading extends React.Component {
  render () {
    return (
      <i className="fa fa-circle-o-notch fa-spin cn-blue" style={{...this.props.style}} />
    )
  }
}

Loading.propTypes = {
  style: PropTypes.object
}

export default Loading
