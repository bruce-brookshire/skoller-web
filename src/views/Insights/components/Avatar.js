import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  return (
    <div className='si-avatar'>
      {(props.user && props.user.student.users[0].pic_path)
        ? <div className={'avatar ' + (props.large ? 'large' : '')} style={{backgroundImage: `url("${props.user.student.users[0].pic_path}")`}} />
        : <div className={'avatar ' + (props.large ? 'large' : '')}><span>{props.invitation ? props.invitation.name_first[0] + props.invitation.name_last[0] : null}{props.user ? props.user.student.name_first[0] + props.user.student.name_last[0] : null}</span></div>
      }
    </div>
  )
}

Avatar.propTypes = {
  user: PropTypes.object,
  large: PropTypes.bool,
  invitation: PropTypes.object
}

export default Avatar
