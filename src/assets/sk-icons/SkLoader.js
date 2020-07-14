import React from 'react'
import PropTypes from 'prop-types'

class SkLoader extends React.Component {
  render () {
    return (
      <div className={'sk-loader ' + (this.props.small ? ' small' : '')}>
        <div id='ball-1' className='circle'></div>
        <div id='ball-2' className='circle'></div>
        <div id='ball-3' className='circle'></div>
      </div>
    )
  }
}

SkLoader.propTypes = {
  small: PropTypes.bool
}

export default SkLoader
