import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class OrgOverview extends React.Component {
  render () {
    return (
      <div className='si-org-overview'>
        <h1><i className='fas fa-globe'/> Skoller University Athletics</h1>
        <div className='si-org-overview-content'>
          <Link to='/insights/students' className='si-org-overview-category'>
            <i className='fas fa-user' />
            <h2>Students</h2>
          </Link>
          <Link to='/insights/students' className='si-org-overview-category'>
            <i className='fas fa-users' />
            <h2>Teams</h2>
          </Link>
          <Link to='/insights/students' className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>Viewers</h2>
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
