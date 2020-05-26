import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class OrgOverview extends React.Component {
  render () {
    return (
      <div className='si-org-overview'>
        <h1><i className='fas fa-globe'/> Skoller University Athletics</h1>
        <div className='si-org-overview-content'>
          <Link to='/insights/students' className='si-org-overview-category'>
            <i className='fas fa-user' />
            <h2>Students ({this.props.rootStore.insightsStore.students.length})</h2>
            {/* <div className='si-org-overview-subtitle'>{this.props.rootStore.insightsStore.students.length}</div> */}
          </Link>
          <Link to='/insights/groups' className='si-org-overview-category'>
            <i className='fas fa-users' />
            <h2>Teams ({this.props.rootStore.insightsStore.groups.length})</h2>
            {/* <div className='si-org-overview-subtitle'>{this.props.rootStore.insightsStore.groups.length}</div> */}
          </Link>
          <Link to='/insights/organization' className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>Viewers ({this.props.rootStore.insightsStore.groupOwners.length})</h2>
            {/* <div className='si-org-overview-subtitle'>{this.props.rootStore.insightsStore.groupOwners.length}</div> */}
          </Link>
        </div>
      </div>
    )
  }
}

OrgOverview.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default OrgOverview
