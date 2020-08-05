import React from 'react'
import PropTypes from 'prop-types'

const Avatar = (props) => {
  let getAvi = false

  // one day javascript will include null propagation and we won't have to
  // use stupid conditionals like this or risk the whole app breaking
  if (props.user) {
    if (props.user.student) {
      if (props.user.student.user) {
        if (props.user.student.user.pic_path) getAvi = true
      }
    }
  }

  return (
    <div className='si-avatar'>
      {getAvi
        ? <div className={'avatar ' + (props.large ? 'large' : '')} style={{backgroundImage: `url("${props.user.student.user.pic_path}")`}} />
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
