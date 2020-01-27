import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import NavItem from './NavItem'
import { withRouter } from 'react-router-dom'

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
          this.props.history.push('/logout')
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
          <div className="s-nav" style={this.props.rootStore.studentNavStore.jobsMode ? {backgroundColor: '#5e5e5e', borderRight: '1px solid #7e7d7d'} : {}}>
            {/* <NavItem pageName="jobs" text="Home" /> */}
            <NavItem pageName="jobs/profile" text="Profile" />
            {/* <NavItem pageName="jobs/resume" text="Custom Resume (Coming Soon)" /> */}
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

export default withRouter(StudentNav)
