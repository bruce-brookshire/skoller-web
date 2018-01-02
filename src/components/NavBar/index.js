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

  determineProfileLogo () {
    const {userStore: {user}} = this.props.rootStore
    if (user.avatar != null){
      return true
    }
    else {
      return false
    }
  }

  mapRoles (r){
    return r.name
  }

  getInitials () {
    const {userStore: {user}} = this.props.rootStore
    var role_names = user.roles.map(this.mapRoles);
    if (role_names.indexOf("Admin") != -1){
      return 'AD'
    } else if (role_names.indexOf("Syllabus Worker") != -1) {
      return 'SW'
    } else if (role_names.indexOf("Student") != -1){
      return user.student.name_first[0].toUpperCase() + user.student.name_last[0].toUpperCase()
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
            {this.determineProfileLogo() ? <img className='profile-img' src={this.user.avatar}/> : <div className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
