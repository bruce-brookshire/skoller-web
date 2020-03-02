import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ProfileScoreVisual from '../Profile/ProfileScoreVisual'
import JobsList from '../Browse/JobsList'
import SearchField from '../components/SearchField'
import JobsDisclaimer from '../Browse/JobsDisclaimer'

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
    let strength
    let color = '#6ED6AE'
    if (profile.profile_score <= 0.4999) {
      strength = 'needs some work.'
      color = '#FF4159'
    } else if (profile.profile_score <= 0.75) {
      strength = 'could be better!'
      color = '#F7D300'
    } else if (profile.profile_score <= 1) {
      strength = 'is very strong! '
    } else if (profile.profile_score >= 1) {
      strength = 'is fantastic. Nice work!'
    }
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            onClick={() => this.props.history.push('/student/jobs/profile')}
          >
            Profile Strength
          </h1>
        </div>
        <div className='jobs-home-strength'>
          <div>
            <div style={{color: color}}>Your profile {strength}</div>
          </div>
          <ProfileScoreVisual profile={profile} user={this.props.rootStore.userStore.user} />
        </div>
        <div className='jobs-home-button'>
          <p
            onClick={() => this.props.history.push('/student/jobs/profile/')}
          >
            {profile.profile_score < 1 ? 'get it to 100%' : 'check out your profile'}
          </p>
        </div>
      </div>
    )
  }

  renderBrowseJobsCell () {
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            onClick={() => this.props.history.push('/student/jobs/browse')}
          >
            Browse Jobs
          </h1>
          <div className='jobs-home-cell-subheading'>
            <JobsDisclaimer />
          </div>
        </div>
        <JobsList />
        <div className='jobs-home-button'>
          <p onClick={() => this.props.history.push('/student/jobs/browse/')}>
            BROWSE ALL JOBS
          </p>
        </div>
      </div>
    )
  }

  renderMatchesCell () {
    let profile = this.props.rootStore.studentJobsStore.profile

    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            // onClick={() => this.props.history.push('/student/jobs/profile')}
            style={{cursor: 'default'}}
          >
            Your Job Matches
          </h1>
        </div>
        {profile.profile_score < 1
          ? <div>We&apos;re already working to match you with specific jobs that are perfect for you. In the meantime, you can keep working on your profile and browse job listings. Matches will appear here!</div>
          : <div>No matches yet.</div>
        }
      </div>
    )
  }

  renderSearchCell () {
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1
            onClick={() => this.props.history.push('/student/jobs/profile')}
          >
            Search for a Job
          </h1>
        </div>
        <div className='jobs-form-container'>
          <div className='jobs-form-row'>
            <SearchField updateValue={(f) => console.log(f)} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='jobs-home'>
        <div className='jobs-home-column'>
          {this.renderProfileCell()}
          {/* {this.renderSearchCell()} */}
          {this.renderMatchesCell()}
        </div>
        <div className='jobs-home-column'>
          {this.renderBrowseJobsCell()}
        </div>
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
