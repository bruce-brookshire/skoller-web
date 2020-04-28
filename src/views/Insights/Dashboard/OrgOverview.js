import React from 'react'
import PropTypes from 'prop-types'

class OrgOverview extends React.Component {
  render () {
    return (
      <div className='si-org-overview'>
        <h1>Skoller University Athletics</h1>
        <div className='si-org-overview-content'>
          <div className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>Students</h2>
          </div>
          <div className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>Teams</h2>
          </div>
          <div className='si-org-overview-category'>
            <i className='fas fa-eye' />
            <h2>Viewers</h2>
          </div>
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
