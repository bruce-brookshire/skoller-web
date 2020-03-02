import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import {renderLocation, renderSalary, renderWorkHours} from '../JobDetail/utils'
class JobCell extends React.Component {
  renderWorkHours (job) {
    if (job.work_hours !== 'Not Specified') {
      return (
        <p>{job.work_hours}</p>
      )
    } else {
      return null
    }
  }

  renderSalary (job) {
    if (job.salary_minimum && job.salary_maximum) {
      return (
        <p>
          | <NumberFormat value={job.salary_minimum} displayType={'text'} thousandSeparator={true} prefix={'$'} /> - <NumberFormat value={job.salary_maximum} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </p>
      )
    } else {
      return null
    }
  }

  renderLocation (job) {
    if (job.locality !== 'Not Specified' && job.region !== 'Not Specified') {
      return (
        <p>{job.locality}, {job.region}</p>
      )
    } else if (job.region !== 'Not Specified') {
      return (
        <p>{job.region}</p>
      )
    } else {
      return null
    }
  }

  render () {
    const job = this.props.job
    return (
      <Link to={`/student/jobs/job-details/${this.props.job.sender_reference}`} target='_blank'>
        <div className='job-cell'>
          <div className='job-cell-header'>
            <h2>{job.position}</h2>
            <h3>{job.advertiser_name}</h3>
          </div>
          <div className='job-cell-details'>
            {renderLocation(job)}
            {renderSalary(job)}
            {renderWorkHours(job)}
          </div>
        </div>
      </Link>
    )
  }
}

JobCell.propTypes = {
  job: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default withRouter(JobCell)
