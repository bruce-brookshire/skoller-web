import React from 'react'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router'

@inject('rootStore') @observer
class NavBar extends React.Component {
  getName () {
    const {userStore: {user}} = this.props.rootStore
    if (user.student) {
      return `${user.student.name_first} ${user.student.name_last}`
    } else {
      return user.email
    }
  }

  isAdmin () {
    const {userStore: {user}} = this.props.rootStore
    return user.roles.findIndex(r => r.name.toLowerCase() === 'admin') > -1
  }

  getDescription () {
    const {userStore: {user}} = this.props.rootStore
    if (user.student) {
      return this.getSchool()
    } else if (this.isAdmin()) {
      return 'Admin'
    } else {
      return 'Syllabi Worker'
    }
  }

  getSchool () {
    const {userStore: {user}} = this.props.rootStore
    if (user.student) {
      return `${user.student.school.name}`
    } else {
      return 'Skoller'
    }
  }

  render () {
    const {userStore: {user}} = this.props.rootStore
    return (
      <div className='cn-navbar'>
        <div className='left'>
          <img alt="Skoller" className='logo' src='/src/assets/images/logo-wide-blue@1x.png' />
        </div>
        <div className='user-info right'>
          <div className='left'>
            <p>{this.getName()}</p>
            <span>{this.getDescription()}</span>
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
