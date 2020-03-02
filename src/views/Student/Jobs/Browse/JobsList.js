import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import JobCell from './JobCell'
// import JobsDisclaimer from './JobsDisclaimer'

@inject('rootStore') @observer
class JobsList extends React.Component {
  render () {
    let jobs = this.props.rootStore.studentJobsStore.listings.slice()
    return (
      <div className='jobs-list' style={{marginBottom: '1rem'}}>
        {jobs.slice(0, 3).map(job => {
          return (
            <div key={jobs.indexOf(job)}>
              <JobCell job={job} />
            </div>
          )
        })}
      </div>
    )
  }
}

JobsList.propTypes = {
  rootStore: PropTypes.object,
  maxJobs: PropTypes.number
}

export default JobsList
