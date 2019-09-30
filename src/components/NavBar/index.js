import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassInfo from './ClassInfo'
import { browserHistory } from 'react-router';

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

  getDescription () {
    const {userStore: {user}} = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    if (user.student) {
      return 'Student'
    } else if (admin) {
      return 'Admin'
    } else {
      return 'Syllabi Worker'
    }
  }

  getInitials () {
    const {userStore: {user}} = this.props.rootStore
    const admin = this.props.rootStore.userStore.isAdmin()
    if (user.student) {
      if (user.student.name_first && user.student.name_last) {
        return user.student.name_first[0].toUpperCase() + user.student.name_last[0].toUpperCase()
      } else if (user.student.name_first.length >= 2) {
        return user.student.name_first.substring(0, 2).toUpperCase()
      } else {
        return 'ST'
      }
    } else if (admin) {
      return 'AD'
    } else {
      return 'SW'
    }
  }

  renderClassInfo () {
    const {navbarStore: {cl, isDIY, toggleRequestResolved}} = this.props.rootStore
    if (cl) {
      return (
        <ClassInfo cl={cl}
          isDIY={isDIY}
          toggleRequestResolved={toggleRequestResolved} />
      )
    }
  }

  render () {
    if (this.props.onboard) {
      return (
        <div className='cn-navbar'>
          <div>
            <img alt="Skoller" className='logo' src='/src/assets/images/logo-wide-blue@1x.png' />
          </div>
          <div className='user-info'>
            <div className='left'>
            </div>
            <div className='right'>
            </div>
          </div>
        </div>
      )
    } else {
      const {userStore: {user}} = this.props.rootStore
      const admin = this.props.rootStore.userStore.isAdmin()
      return (
        <div className='cn-navbar'>
          <div
            onClick={() => {
              if (admin) {
                browserHistory.push('/hub/landing')
              } else {
                browserHistory.push('/')
              }
            }}
          >
            <img alt="Skoller" className='logo' src='/src/assets/images/logo-wide-blue@1x.png' />
            <div className='cn-navbar-message'>Keep Up with Classes, Together.</div>
          </div>
          <div className='class-info'>
            {/* {this.renderClassInfo()} */}
          </div>
          <div className='user-info'>
            <div className='left'>
              <p>{this.getName()}</p>
              <span>{this.getDescription()}</span>
            </div>
            <div className='right'>
              {user.avatar
                ? <img className='profile-img' src={user.avatar}/>
                : <div className='profile-img vertical-align profile-initials'>{this.getInitials()}</div>}
            </div>
          </div>
        </div>
      )
    }
  }
}

NavBar.propTypes = {
  rootStore: PropTypes.object,
  onboard: PropTypes.bool
}

export default NavBar
