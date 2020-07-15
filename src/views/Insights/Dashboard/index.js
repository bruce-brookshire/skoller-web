import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SmartTracker from './SmartTracker'
import OrgOverview from './OrgOverview'
import Watchlist from './Watchlist'

@inject('rootStore') @observer
class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/dashboard')
  }

  renderWatchlist () {
    return (
      <Watchlist />
    )
  }

  renderOrgOverview () {
    return (
      <OrgOverview />
    )
  }

  renderSmartTracker () {
    return (
      <SmartTracker />
    )
  }

  renderContent () {
    return (
      <div className='si-dashboard'>
        <div className='si-dashboard-column-lg'>
          {this.renderOrgOverview()}
          {this.renderSmartTracker()}
        </div>
        <div className='si-dashboard-column-sm'>
          {this.renderWatchlist()}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='si-dashboard-container'>
        {this.renderContent()}
      </div>
    )
  }
}

Dashboard.propTypes = {
  rootStore: PropTypes.object
}

export default Dashboard
