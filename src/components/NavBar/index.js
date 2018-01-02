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

  getInitials () {
    const {userStore: {user}} = this.props.rootStore
    var roleNames = user.roles.map((r) => r.name)
    if (roleNames.indexOf('Admin') !== -1) {
      return 'AD'
    } else if (roleNames.indexOf('Syllabus Worker') !== -1) {
      return 'SW'
    } else if (roleNames.indexOf('Student') !== -1) {
      if (user.student.name_first && user.student.name_last) {
        return user.student.name_first[0].toUpperCase() + user.student.name_last[0].toUpperCase()
      } else if (user.student.name_first.length >= 2) {
        return user.student.name_first.substring(0,2).toUpperCase()
      } else {
        return 'ST'
      }
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
            {user.avatar ?
              <img className='profile-img' src={this.user.avatar}/> :
              <div className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
