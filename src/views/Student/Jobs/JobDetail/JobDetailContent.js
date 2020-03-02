import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import {renderLocation, renderSalary, renderWorkHours} from '../JobDetail/utils'

class JobDetailContent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      job: null
    }
  }

  componentDidMount () {
    this.getJobById(this.props.jobId)
  }

  getJobById (id) {
    actions.jobs.getJobBySenderReference(id)
      .then((r) => {
        this.setState({
          job: r,
          loading: false
        })
        this.onLoad(r)
        console.log(r)
      })
  }

  onLoad (job) {
    actions.jobs.sendJobAction(false, job.sender_reference)
      .then((r) => {
        console.log(r)
      })
  }

  onApply () {
    actions.jobs.sendJobAction(true, this.state.job.sender_reference)
      .then(() => {
        window.location = this.state.job.application_url
      })
  }

  render () {
    if (this.state.loading) {
      return <SkLoader />
    } else {
      let job = this.state.job
      return (
        <div className='job-detail'>
          <div className='job-detail-header'>
            <h1>{job.position}</h1>
            <h2>{job.job_source}</h2>
          </div>
          {renderLocation(job)}
          {renderWorkHours(job)}
          {renderSalary(job)}
          <p>Salary type: {job.salary_period}</p>
          <div className='job-detail-description' dangerouslySetInnerHTML={{__html: job.description_html}}></div>
          <div className='job-detail-apply'><p onClick={() => this.onApply()}>APPLY NOW</p></div>
        </div>
      )
    }
  }
}

JobDetailContent.propTypes = {
  jobId: PropTypes.number
}

export default JobDetailContent
