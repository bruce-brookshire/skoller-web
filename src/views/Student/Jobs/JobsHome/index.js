import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ProfileScoreVisual from '../Profile/ProfileScoreVisual'
import JobsList from '../Browse/JobsList'

@inject('rootStore') @observer
class JobsHome extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  renderProfileCell () {
    let profile = this.props.rootStore.studentJobsStore.profile
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            onClick={() => this.props.history.push('/student/jobs/profile')}
          >
            Your Profile
          </h1>
        </div>
        <div className='jobs-home-strength'>
          <div>
            <div>Your profile could be better</div>
            <div className='jobs-home-button'>FILL OUT YOUR PROFILE</div>
          </div>
          <ProfileScoreVisual profile={profile} user={this.props.rootStore.userStore.user} />
        </div>
      </div>
    )
  }

  renderResumeCell () {
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            onClick={() => this.props.history.push('/student/jobs/profile')}
          >
            Browse Jobs
          </h1>
        </div>
        <JobsList />
      </div>
    )
  }

  render () {
    return (
      <div className='jobs-home'>
        {this.renderProfileCell()}
        {this.renderResumeCell()}
      </div>
    )
  }
}

JobsHome.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(JobsHome)
