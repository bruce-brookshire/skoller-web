import React from 'react'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router'

@inject('rootStore') @observer
class NavBar extends React.Component {
  render () {
    const {userStore: {user}} = this.props.rootStore
    return (
      <div className='cn-navbar'>
        <div className='left'>
          <img className='logo' src='src/assets/images/blue-logo-full.png'></img>
        </div>
        <div className='user-info right'>
          <div className='left'>
            <p>{user.student.name_first} {user.student.name_last}</p>
            <span>{user.student.school.name}</span>
          </div>
          <div className='right'>
            <img className='profile-img' src='https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_300%2Cq_80%2Cw_300/MTE5NDg0MDU0NTIzODQwMDE1/steven-jobs-9354805-2-402.jpg'/>
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
