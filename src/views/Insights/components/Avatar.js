import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  return (
    <div className='si-avatar'>
      {(props.user && props.user.avatar)
        ? <div className='avatar' style={{backgroundImage: `url("${props.user.avatar}")`}} />
        : <div className='avatar'><i className='fas fa-user' /></div>
      }
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object
}

export default Avatar
