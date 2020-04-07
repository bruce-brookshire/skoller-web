import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  return (
    <div className='si-avatar'>
      <div className='avatar' style={{backgroundImage: `url("${props.user.avatar}")`}} />
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object
}

export default Avatar
