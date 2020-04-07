import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import NavItem from '../StudentNav/NavItem'
import {withRouter} from 'react-router-dom'

@inject('rootStore') @observer
class InsightsNav extends React.Component {
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
          'si-nav-item bottom'
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
    return (
      <div className="si-nav-wrapper">
        <div className="si-nav" style={this.props.rootStore.studentNavStore.jobsMode ? {backgroundColor: '#5e5e5e', borderRight: '1px solid #7e7d7d'} : {}}>
          <NavItem pageName="insights/dashboard" text="Dashboard" />
          <NavItem pageName="insights/student" text="Student" />
          <NavItem pageName="insights/teams" text="Teams" />
          <NavItem pageName="insights/organization" text="Organization" />
          {this.renderLogout()}
        </div>
      </div>
    )
  }
}

InsightsNav.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(InsightsNav)
