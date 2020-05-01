import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import InsightsNavItem from './InsightsNavItem'

@inject('rootStore') @observer
class InsightsNav extends React.Component {
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
        <div className="si-nav" style={this.props.rootStore.navStore.jobsMode ? {backgroundColor: '#5e5e5e', borderRight: '1px solid #7e7d7d'} : {}}>
          <InsightsNavItem pageName="insights/dashboard" text="Dashboard" />
          <InsightsNavItem pageName="insights/students" text="Students" />
          {/* <InsightsNavItem pageName="insights/groups" text="Groups" />
          <InsightsNavItem pageName="insights/organization" text="Organization" /> */}
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
