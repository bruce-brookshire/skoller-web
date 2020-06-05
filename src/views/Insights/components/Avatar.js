import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  return (
    <div className='si-avatar'>
      {(props.user && props.user.student.users[0].pic_path)
        ? <div className={'avatar ' + (props.large ? 'large' : '')} style={{backgroundImage: `url("${props.user.student.users[0].pic_path}")`}} />
        : <div className={'avatar ' + (props.large ? 'large' : '')}><i className='fas fa-user' /></div>
      }
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object,
  large: PropTypes.bool
}

export default Avatar
