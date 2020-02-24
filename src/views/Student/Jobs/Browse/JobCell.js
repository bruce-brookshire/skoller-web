import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'

class JobCell extends React.Component {
  render () {
    const job = this.props.job
    return (
      <div className='job-cell'>
        <div className='job-cell-header'>
          <h2>{job.position}</h2>
          <h3>{job.job_source}</h3>
        </div>
        <div className='job-cell-details'>
          <p>{job.locality}, {job.region}</p>
          <p>{job.work_hours} | {job.salary_minimum} - {job.salary_maximum}</p>
        </div>
      </div>
    )
  }
}

JobCell.propTypes = {
  job: PropTypes.object.isRequired
}

export default JobCell
