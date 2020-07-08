import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class OrgOverview extends React.Component {
  renderContent () {
    if (this.props.rootStore.insightsStore.userType === 'orgOwner') {
      return (
        <div className='si-org-overview-content'>
          <div className='si-org-overview-category'>
            <i className='fas fa-user' />
            <h2>{this.props.rootStore.insightsStore.students.length} Athlete{this.props.rootStore.insightsStore.students.length === 1 ? '' : 's'}</h2>
          </div>
          <div className='si-org-overview-category'>
            <i className='fas fa-users' />
            <h2>{this.props.rootStore.insightsStore.groups.length} Team{this.props.rootStore.insightsStore.groups.length === 1 ? '' : 's'}</h2>
          </div>
          <div className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>{this.props.rootStore.insightsStore.groupOwners.length} Viewer{this.props.rootStore.insightsStore.groupOwners.length === 1 ? '' : 's'}</h2>
          </div>
        </div>
      )
    } else {
      let groups = this.props.rootStore.insightsStore.groups
      return <div style={{textAlign: 'center', margin: '1rem 0'}}>
        You are the owner of {groups.map(g => {
          let lastItem = groups.indexOf(g) === groups.length - 1
          return (
            <span key={g.id}>{lastItem && groups.length > 1 ? 'and ' : ''}{g.name}{lastItem ? '.' : groups.length > 1 ? ', ' : '.'}</span>
          )
        })}
      </div>
    }
  }
  render () {
    return (
      <div className='si-org-overview'>
        <h1><i className='fas fa-globe'/> {this.props.rootStore.insightsStore.org.name}</h1>
        {this.renderContent()}
      </div>
    )
  }
}

OrgOverview.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default OrgOverview
