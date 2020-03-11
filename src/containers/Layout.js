import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import NavBar from '../components/NavBar'
import TopNav from '../components/TopNav'
import { Cookies } from 'react-cookie'
import actions from '../actions'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class Layout extends React.Component {
  isStudent () {
    const roles = this.props.rootStore.userStore.user.roles
    let isStudent = false
    if (this.props.rootStore.userStore.user.roles === undefined) {
      isStudent = true
    }
    roles.forEach(role => {
      if (role.name === 'Student') {
        isStudent = true
      }
    })
    return isStudent
  }

  render () {
    let layoutStyle = {
      top: this.isStudent() ? '64px' : '96px'
    }

    return (
      <div className='sk-app-container'>
        <NavBar />
        {!this.isStudent() &&
          <TopNav />
        }
        <div
          className='layout'
          id='layout'
          style={layoutStyle}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(Layout)
