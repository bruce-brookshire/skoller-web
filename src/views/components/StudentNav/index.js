import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import NavItem from './NavItem'
import { browserHistory } from 'react-router'

@inject('rootStore')
@observer
class StudentNav extends React.Component {
  getActivePage () {
    const {
      studentNavStore: { activePage }
    } = this.props.rootStore
    return activePage
  }

  renderLogout () {
    return (
      <div
        className={
          's-nav-item bottom'
        }
        onClick={() => {
          browserHistory.push('/logout')
        }}
      >
        <i className='fas fa-sign-out-alt fa-lg' />
        <a>Logout</a>
        <span />
      </div>
    )
  }

  render () {
    return (
      <div className="s-nav-wrapper">
        <div className="s-nav">
          <NavItem pageName="home" text="Home" />
          <NavItem pageName="classes" text="Classes" />
          <NavItem pageName="tasks" text="Tasks" />
          <NavItem pageName="calendar" text="Calendar" />
          <NavItem pageName="share" text="Share" />
          {/* <NavItem pageName="activity" text="Activity" />
          <NavItem pageName="chat" text="Chat" /> */}
          {this.renderLogout()}
        </div>
      </div>
    )
  }
}

StudentNav.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string
}

export default StudentNav
