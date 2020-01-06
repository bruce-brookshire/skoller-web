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
    if (this.props.rootStore.studentNavStore.jobsMode) {
      return (
        <div className="s-nav-wrapper">
          <div className="s-nav">
            <NavItem pageName="jobs" text="Home" />
            <NavItem pageName="jobs/profile" text="Profile" />
            {/* <NavItem pageName="jobs/resume" text="Résumé" /> */}
            {/* <NavItem pageName="activity" text="Activity" />
            <NavItem pageName="chat" text="Chat" /> */}
            {this.renderLogout()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="s-nav-wrapper">
          <div className="s-nav">
            <NavItem pageName="home" text="Home" />
            <NavItem pageName="classes" text="Classes" />
            <NavItem pageName="tasks" text="To-Do's" />
            <NavItem pageName="calendar" text="Calendar" />
            {this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id === 1400).length !== 0 &&
              <NavItem pageName="share" text="Share" />
            }
            {/* <NavItem pageName="activity" text="Activity" />
            <NavItem pageName="chat" text="Chat" /> */}
            {this.renderLogout()}
          </div>
        </div>
      )
    }
  }
}

StudentNav.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string
}

export default StudentNav
