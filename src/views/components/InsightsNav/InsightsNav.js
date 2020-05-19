import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import InsightsNavItem from './InsightsNavItem'
import { toTitleCase } from '../../Insights/utils'

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
    let insightsStore = this.props.rootStore.insightsStore
    let groupsTitle = toTitleCase(insightsStore.org.groupsAlias) + 's'
    return (
      <div className="si-nav-wrapper">
        <div className="si-nav">
          <InsightsNavItem pageName="insights/dashboard" text="Dashboard" />
          <InsightsNavItem pageName="insights/students" text="Students" />
          <InsightsNavItem pageName="insights/groups" text={groupsTitle} />
          <InsightsNavItem pageName="insights/organization" text="Organization" />
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
