import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../../components/StudentLayout'
import {browserHistory} from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import ProfileBlock from './ProfileBlock'
import ProfileScoreVisual from './ProfileScoreVisual'
import { getEqualOpportunityEmploymentCompletion, calculateExtrasProfileCompleteness } from '../utils';

@inject('rootStore') @observer
class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      student: this.props.rootStore.userStore.user.student
    }

    this.props.rootStore.studentNavStore.setActivePage('jobs/profile')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  pushIfNoProfile () {
    if (!this.props.rootStore.studentJobsStore.hasJobsProfile) {
      browserHistory.push('/student/home')
    }
  }

  renderAvatar () {
    let user = this.props.rootStore.userStore.user
    if (user.avatar) {
      return (
        <div
          className='jobs-profile-header-avatar'
          style={{
            backgroundImage: `url(${user.avatar})`,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            margin: '1rem'
          }}
        />
      )
    } else {
      return (
        <div
          className='jobs-profile-header-avatar'
          style={{
            backgroundColor: `#4add58`,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            margin: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <p
            style={{
              color: 'white',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Upload photo
          </p>
        </div>
      )
    }
  }

  renderHeader () {
    let user = this.props.rootStore.userStore.user
    let student = user.student
    let profile = this.props.rootStore.studentJobsStore.profile
    return (
      <div className='jobs-profile-header'>
        <div className='jobs-profile-header-content'>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            {this.renderAvatar()}
            <div>
              <h1>{student.name_first} {student.name_last}</h1>
              <p>{student.primary_school.name}</p>
              <p><i className='far fa-envelope' /> {user.email}</p>
              <p><i className='fas fa-map-marker-alt' /> Home state</p>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'right'}}>
            <div>
              <p><b>Profile strength</b></p>
              <p>Your profile needs some work.</p>
              <p>Your profile is {profile.job_profile_status.id === 100 ? <b style={{color: '#4add58'}}>ACTIVE.</b> : <b style={{color: 'rgb(255, 65, 89)'}}>INACTIVE.</b>}</p>
            </div>
            <ProfileScoreVisual profile={profile} user={user} />
          </div>
        </div>
      </div>
    )
  }

  renderCareerInterests (profile) {
    if (profile.career_interests) {
      return (
        <ProfileBlock
          title='Career Interests'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Career Interests'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Add Career Interests</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderEducation (profile) {
    let student = this.state.student
    return (
      <ProfileBlock
        title='Education'
        settingsButton={() => {
          console.log('button pushed')
        }}
      >
        <div className='jobs-profile-block-row'>
          I go to <b>{student.primary_school.name}</b>
        </div>
        {profile.gpa &&
          <div className='jobs-profile-block-row'>
            My GPA is <b>{profile.gpa}.</b>
          </div>
        }
        {profile.degree_type && student.grad_year &&
          <div className='jobs-profile-block-row'>
            I&apos;m graduating in <b>{student.grad_year}</b> with a <b>{profile.degree_type.name} degree.</b>
          </div>
        }
        {!(profile.degree_type && student.grad_year && profile.gpa && student.fields_of_study.length > 0) &&
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Fill Out Your Education</p>
            </div>
          </div>
        }
      </ProfileBlock>
    )
  }

  renderWorkExperience (profile) {
    if (profile.experience_activities.length > 0) {
      return (
        <ProfileBlock
          title='Work Experience'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Work Experience'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Add Work Experience</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderDocuments (profile) {
    if (profile.resume_url) {
      return (
        <ProfileBlock
          title='Documents'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Documents'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Upload Documents</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderVolunteerExperience (profile) {
    if (profile.volunteer_activities.length > 0) {
      return (
        <ProfileBlock
          title='Volunteer Experience'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Volunteer Experience'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Add Volunteer Experience</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderCompanyValues (profile) {
    if (profile.company_values) {
      return (
        <ProfileBlock
          title='Company Values'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Company Values'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>What&apos;s Important to You?</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderEqualOpportunityEmployment (profile) {
    let completion = getEqualOpportunityEmploymentCompletion(profile)
    if (completion === 1) {
      return (
        <ProfileBlock
          title='Equal Opportunity Employment'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Equal Opportunity Employment'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Tell Us About Yourself</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderExtras (profile) {
    let completion = calculateExtrasProfileCompleteness(profile)
    if (completion > 0) {
      return (
        <ProfileBlock
          title='Extras'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Extras'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Round Out Your Profile</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderPersonalityProfile (profile) {
    if (profile.personality) {
      return (
        <ProfileBlock
          title='Personality Profile'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Personality Profile'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Take the Personality Quiz</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderOnTheWeb (profile) {
    if (profile.social_links) {
      return (
        <ProfileBlock
          title='On the Web'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>software development and engineering.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in Texas.</b>
          </div>
          <div className='jobs-profile-block-row'>
            I would <b>strongly prefer</b> working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='On the Web'
          settingsButton={() => {
            console.log('button pushed')
          }}
        >
          <div className='jobs-profile-block-row'>
            <div className='jobs-profile-add-button'>
              <p>Show Off Your Other Profiles</p>
            </div>
          </div>
        </ProfileBlock>
      )
    }
  }

  renderContent () {
    let profile = this.props.rootStore.studentJobsStore.profile
    return (
      <div className='jobs-profile'>
        {this.renderHeader()}
        <div className='jobs-profile-column'>
          {this.renderCareerInterests(profile)}
          {this.renderEducation(profile)}
          {this.renderWorkExperience(profile)}
          {this.renderDocuments(profile)}
        </div>
        <div className='jobs-profile-column'>
          {this.renderVolunteerExperience(profile)}
          {this.renderCompanyValues(profile)}
          {this.renderEqualOpportunityEmployment(profile)}
        </div>
        <div className='jobs-profile-column'>
          {this.renderExtras(profile)}
          {this.renderPersonalityProfile(profile)}
          {this.renderOnTheWeb(profile)}
        </div>
      </div>
    )
  }

  render () {
    if (this.props.rootStore.studentJobsStore.loading) {
      return (
        <SkLoader />
      )
    } else {
      this.pushIfNoProfile()
      return (
        <StudentLayout>
          <div className='jobs-profile-container'>
            {this.renderContent()}
          </div>
        </StudentLayout>
      )
    }
  }
}

Profile.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Profile
