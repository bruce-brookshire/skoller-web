import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NavItem from './NavItem'

@inject('rootStore') @observer
class StudentNav extends React.Component {
  getActivePage () {
    const {studentNavStore: {activePage}} = this.props.rootStore
    return activePage
  }

  render () {
    return (
      <div className="s-nav-wrapper">
        <div className="s-nav">
          <NavItem
            pageName="home"
            text="Home"
          />
          <NavItem
            pageName="tasks"
            text="Tasks"
          />
          <NavItem
            pageName="classes"
            text="Classes"
          />
          <NavItem
            pageName="activity"
            text="Activity"
          />
          <NavItem
            pageName="chat"
            text="Chat"
          />
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
