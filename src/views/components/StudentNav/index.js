import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import NavItem from './NavItem'
import { withRouter } from 'react-router-dom'
import UpgradeBox from '../UpgradeBox'

@inject('rootStore')
@observer
class StudentNav extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subscribed: false
    }
  }

  getActivePage () {
    const {
      navStore: { activePage }
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
        style={{
          color: '#333'
        }}
      >
        <i className='fas fa-sign-out-alt fa-lg' />
        <a>Logout</a>
        <span />
      </div>
    )
  }

  render () {
    const { userStore } = this.props.rootStore

    if (this.props.rootStore.navStore.jobsMode) {
      return (
        <div className="s-nav-wrapper">
          <div className="s-nav" style={this.props.rootStore.navStore.jobsMode ? {backgroundColor: '#5e5e5e', borderRight: '1px solid #7e7d7d'} : {}}>
            <NavItem pageName="jobs/home" text="Home" />
            <NavItem pageName="jobs/profile" text="Profile" />
            <NavItem pageName="jobs/browse" text="Browse" />
            {this.renderLogout()}
          </div>
        </div>
      )
    } else {
      return (
        <div className="s-nav-wrapper">
          <div className="s-nav">
            <NavItem pageName="home" text="Home" />
            <NavItem pageName="calendar" text="Calendar" />
            {this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id === 1400).length !== 0 &&
              <NavItem pageName="share" text="Share" />
            }
            <div className="s-nav--spacer" />
            { userStore.user !== null &&
            <UpgradeBox userStore={userStore} subscribed={this.state.subscribed} />
            }
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
  imgPath: PropTypes.string,
  history: PropTypes.object
}

export default withRouter(StudentNav)
