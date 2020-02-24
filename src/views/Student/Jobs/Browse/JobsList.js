import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import JobCell from './JobCell'
import JobsDisclaimer from './JobsDisclaimer'

@inject('rootStore') @observer
class JobsList extends React.Component {
  render () {
    const job = {
      position: 'Intern',
      job_source: 'Google',
      region: 'California',
      locality: 'Palo Alto',
      work_hours: 'Full time',
      salary_minimum: '$25',
      salary_maximum: '$30'
    }
    const job1 = {
      position: 'Market Analyst',
      job_source: 'Facebook',
      region: 'California',
      locality: 'Palo Alto',
      work_hours: 'Full time',
      salary_minimum: '$48',
      salary_maximum: '$60'
    }
    const job2 = {
      position: 'Geological Consultant',
      job_source: 'National Instruments',
      region: 'Texas',
      locality: 'Austin',
      work_hours: 'Full time',
      salary_minimum: '$50,000',
      salary_maximum: '$60,000'
    }
    return (
      <div className='jobs-list'>
        <JobCell
          job={job}
        />
        <JobCell
          job={job1}
        />
        <JobCell
          job={job2}
        />
        <div>
          <JobsDisclaimer />
        </div>
      </div>
    )
  }
}

JobsList.propTypes = {
  rootStore: PropTypes.object,
  maxJobs: PropTypes.number
}

export default JobsList
