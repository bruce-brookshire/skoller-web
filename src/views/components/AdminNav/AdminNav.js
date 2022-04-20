import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import AdminNavItem from './AdminNavItem'
import { toTitleCase } from '../../Insights/utils'

@inject('rootStore') @observer
class AdminNav extends React.Component {
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
          this.props.history.push({
            pathname: '/logout',
            redirect: '/admin-login'
          })
        }}
      >
        <i className='fas fa-sign-out-alt fa-lg' />
        <a>Logout</a>
        <span />
      </div>
    )
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    let groupsTitle = toTitleCase(insightsStore.org.groupsAlias) + 's'
    let isOrgOwner = insightsStore.userType === 'orgOwner'
    return (
      <div className="si-nav-wrapper">
        <div className="si-nav">
          {/* <AdminNavItem pageName="hub/classes" text="Dashboard" /> */}
          {isOrgOwner && <AdminNavItem pageName="hub/dashboard" text='Dashboard' />}
          {isOrgOwner && <AdminNavItem pageName="hub/classes" text='Classes' />}
          {isOrgOwner && <AdminNavItem pageName="hub/schools" text="Schools" />}
          {isOrgOwner && <AdminNavItem pageName="hub/accounts" text="Students" />}
          {isOrgOwner && <AdminNavItem pageName="hub/switchboard" text="Switchboard" />}
          {isOrgOwner && <AdminNavItem pageName="hub/insights" text="Insights" />}
          {/* <AdminNavItem pageName="insights/settings" text="Settings" /> */}
          {this.renderLogout()}
        </div>
      </div>
    )
  }
}

AdminNav.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(AdminNav)
