import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../../components/StudentLayout'
import {browserHistory} from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import ProfileBlock from './ProfileBlock'
import ProfileScoreVisual from './ProfileScoreVisual'
import { getEqualOpportunityEmploymentCompletion, calculateExtrasProfileCompleteness } from '../utils'
import ModalRouter from './ModalRouter'
import moment from 'moment'
import ExperienceCard from '../components/ExperienceCard'
import SeeMore from '../../../components/SeeMore/SeeMore'

@inject('rootStore') @observer
class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      student: this.props.rootStore.userStore.user.student,
      form: null,
      width: 0
    }

    window.addEventListener('resize', () => this.updateWidth())
    this.props.rootStore.studentNavStore.setActivePage('jobs/profile')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  componentDidMount () {
    this.updateWidth()

    if (this.props.rootStore.studentJobsStore.profile.resume_url === null) {
      this.setState({form: 'getResume'})
    } else if (this.props.rootStore.userStore.user.avatar === null) {
      this.setState({form: 'welcome'})
    }
  }

  updateWidth = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  updateForm (formName) {
    this.setState({form: formName})
  }

  renderButton (text, form) {
    return (
      <div className='jobs-profile-block-row'>
        <div className='jobs-profile-add-button'>
          <p
            onClick={() => this.updateForm(form)}
          >
            {text}
          </p>
        </div>
      </div>
    )
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
            backgroundColor: `#6ED6AE`,
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

  renderBasicInfoButton (profile) {
    return (
      (profile.work_auth === null || profile.sponsorship_required === null || profile.state_code === null) &&
        <div className='jobs-profile-header-add-button'>
          <p
            onClick={() => this.updateForm('basicInfo')}
          >
            Complete Your Basic Info
          </p>
        </div>
    )
  }

  formatPhone (string) {
    let match = string.match(/^(\d{3})(\d{3})(\d{4})$/)
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }

  renderHeader () {
    let user = this.props.rootStore.userStore.user
    let student = user.student
    let profile = this.props.rootStore.studentJobsStore.profile

    let strength
    let color = '#6ED6AE'
    if (this.props.rootStore.studentJobsStore.score <= 50) {
      strength = 'needs some work.'
      color = '#FF4159'
    } else if (this.props.rootStore.studentJobsStore.score <= 75) {
      strength = 'could be better!'
      color = '#F7D300'
    } else if (this.props.rootStore.studentJobsStore.score <= 90) {
      strength = 'very strong! '
    } else if (this.props.rootStore.studentJobsStore.score >= 100) {
      strength = 'fantastic. Nice work!'
    }

    return (
      <div className='jobs-profile-header'>
        <div className='jobs-profile-header-content'>
          <div className='jobs-profile-header-row'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              {/* {this.renderAvatar()} */}
              <div style={{marginLeft: '2rem'}}>
                <h1>{student.name_first} {student.name_last}</h1>
                <p>{student.primary_school.name} | {student.primary_school.adr_locality}, {student.primary_school.adr_region}</p>
                <p><i className='far fa-envelope' /> {user.email}</p>
                <p><i className='fas fa-phone' /> {this.formatPhone(user.student.phone)}</p>
              </div>
            </div>
            <div className='jobs-profile-header-score-container'>
              <div className='jobs-profile-header-score-text'>
                <p><b style={{color: '#4a4a4a'}}>Your profile</b></p>
                <p>Strength: <span style={{fontWeight: '600', color: color}}>{strength}</span></p>
                <p>Status: {profile.job_profile_status.id === 100 ? <b style={{color: '#6ED6AE'}}>ACTIVE.</b> : <b style={{color: 'rgb(255, 65, 89)'}}>INACTIVE.</b>}</p>
              </div>
              {!this.props.rootStore.studentJobsStore.backgroundLoading
                ? <ProfileScoreVisual profile={profile} user={user} />
                : <div style={{height: '124px', width: '124px', margin: '1rem', fontWeight: '600'}} />
              }
            </div>
          </div>
          {this.renderBasicInfoButton(profile)}
          <div className='jobs-profile-header-settings' onClick={() => this.updateForm('basicInfo')}>...</div>
        </div>
      </div>
    )
  }

  getStartupInterest (index) {
    let options = ['not interested', 'somewhat interested', 'very interested']
    return options[index]
  }

  getCompanyValues (index) {
    let options = ['Not that important', 'Somewhat important', 'Very important']
    return options[index]
  }

  getPersonalityProfile (index) {
    let options = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
    return options[index]
  }

  renderCareerInterests (profile) {
    if (profile.career_interests && profile.regions && (profile.startup_interest !== null)) {
      return (
        <ProfileBlock
          title='Career Interests'
          settingsButton={() => {
            this.updateForm('careerInterests')
          }}
        >
          <div className='jobs-profile-block-row'>
            I’m looking for work in <b>{profile.career_interests.split('|').map(i => {
              let index = profile.career_interests.split('|').indexOf(i)
              let last = index === profile.career_interests.split('|').length - 1
              return (
                <span key={index}>{(last && profile.career_interests.split('|').length > 1) ? 'and ' : ''}{i}{last ? '.' : ', '}</span>
              )
            })}</b>
          </div>
          <div className='jobs-profile-block-row'>
            I want to work <b>in the {profile.regions.split('|').map(r => {
              let index = profile.regions.split('|').indexOf(r)
              let last = index === profile.regions.split('|').length - 1
              return (
                <span key={index}>{last ? profile.regions.split('|').length > 1 ? 'or ' : '' : ''}{r}{last ? '.' : ', '}</span>
              )
            })}</b>
          </div>
          <div className='jobs-profile-block-row'>
            I am <b>{this.getStartupInterest(profile.startup_interest)}</b> in working for a startup.
          </div>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Career Interests'
          settingsButton={() => {
            this.updateForm('careerInterests')
          }}
        >
          {this.renderButton('Add Career Interests', 'careerInterests')}
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
          this.updateForm('education')
        }}
      >
        <div className='jobs-profile-block-row'>
          I go to <b>{student.primary_school.name}.</b>
        </div>
        {profile.gpa &&
          <div className='jobs-profile-block-row'>
            My GPA is <b>{profile.gpa}.</b>
          </div>
        }
        {student.degree_type && profile.graduation_date &&
          <div className='jobs-profile-block-row'>
            I&apos;m graduating <b>{moment(profile.graduation_date).format('MMMM YYYY')}</b> with a <b>{student.degree_type.name} degree.</b>
          </div>
        }
        {student.fields_of_study.length > 0 &&
          <div className='jobs-profile-block-row'>
            <p>I&apos;m majoring in <b>{student.fields_of_study.map(f => {
              let last = student.fields_of_study.indexOf(f) === student.fields_of_study.length - 1
              return (
                <span key={f.id}>{last ? 'and ' : ''}{f.field}{last ? '.' : student.fields_of_study.length > 2 ? ', ' : ' '}</span>
              )
            })}</b></p>
          </div>
        }
        {!(student.degree_type && student.grad_year && profile.gpa && student.fields_of_study.length > 0) &&
          this.renderButton('Add Your GPA', 'education')
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
            this.updateForm('workExperience')
          }}
        >
          <SeeMore hideHeight={'256px'} customText={'View all'}>
            {profile.experience_activities.map(e => {
              return (
                <div key={profile.experience_activities.indexOf(e)}>
                  <ExperienceCard
                    title={e.name}
                    organization={e.organization_name}
                    startDate={e.start_date}
                    endDate={e.end_date}
                    description={e.description}
                  />
                </div>
              )
            })}
          </SeeMore>
          {this.renderButton('Add Experience', 'addWorkExperience')}
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Work Experience'
          settingsButton={() => {
            this.updateForm('workExperience')
          }}
        >
          {this.renderButton('Add Work Experience', 'addWorkExperience')}
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
            this.updateForm('documents')
          }}
        >
          {profile.resume_url &&
            <div className='jobs-profile-block-row'>
              <a href={profile.resume_url}>Résumé</a>
            </div>
          }
          {profile.transcript_url &&
            <div className='jobs-profile-block-row'>
              <a href={profile.resume_url}>Transcript</a>
            </div>
          }
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Documents'
          settingsButton={() => {
            this.updateForm('documents')
          }}
        >
          {this.renderButton('Upload Documents', 'documents')}
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
            this.updateForm('volunteerExperience')
          }}
        >
          <SeeMore disable={profile.volunteer_activities.length === 1} hideHeight={'256px'} customText={'View all'}>
            {profile.volunteer_activities.map(v => {
              return (
                <div key={profile.volunteer_activities.indexOf(v)}>
                  <ExperienceCard
                    title={v.name}
                    organization={v.organization_name}
                    startDate={v.start_date}
                    endDate={v.end_date}
                    description={v.description}
                  />
                </div>
              )
            })}
          </SeeMore>
          {this.renderButton('Add Experience', 'addVolunteerExperience')}
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Volunteer Experience'
          settingsButton={() => {
            this.updateForm('volunteerExperience')
          }}
        >
          {this.renderButton('Add Experience', 'addVolunteerExperience')}
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
            this.updateForm('companyValues')
          }}
        >
          <SeeMore hideHeight='192px' customText='View all'>
            <div className='jobs-profile-block-row'>
              <p>Compensation</p>
              <b>{this.getCompanyValues(profile.company_values.compensation)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Company Prestige</p>
              <b>{this.getCompanyValues(profile.company_values.prestige)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Social Impact</p>
              <b>{this.getCompanyValues(profile.company_values.impact)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Professional Development</p>
              <b>{this.getCompanyValues(profile.company_values.development)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Strong Sense of Community</p>
              <b>{this.getCompanyValues(profile.company_values.community)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Work-Life Balance</p>
              <b>{this.getCompanyValues(profile.company_values.balance)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Upward Mobility</p>
              <b>{this.getCompanyValues(profile.company_values.mobility)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Job Stability</p>
              <b>{this.getCompanyValues(profile.company_values.stability)}</b>
            </div>
          </SeeMore>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Company Values'
          settingsButton={() => {
            this.updateForm('companyValues')
          }}
        >
          {this.renderButton("What's Important to You?", 'companyValues')}
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
            this.updateForm('equalOpportunityEmployment')
          }}
        >
          <SeeMore hideHeight='192px' customText='View all'>
            <div className='jobs-profile-block-row'>
              <p>Gender</p>
              <b>{profile.gender}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Ethnicity</p>
              <b>{profile.ethnicity_type.name}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Veteran</p>
              <b>{profile.veteran ? 'Yes' : 'No'}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Disability</p>
              <b>{profile.disability ? 'Yes' : 'No'}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>First-Generation College Student</p>
              <b>{profile.first_gen_college ? 'Yes' : 'No'}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Eligible for financial aid</p>
              <b>{profile.fin_aid ? 'Yes' : 'No'}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>Eligible for Pell Grant</p>
              <b>{profile.pell_grant ? 'Yes' : 'No'}</b>
            </div>
          </SeeMore>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Equal Opportunity Employment'
          settingsButton={() => {
            this.updateForm('equalOpportunityEmployment')
          }}
        >
          {this.renderButton('Tell Us About Yourself', 'equalOpportunityEmployment')}
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
            this.updateForm('extras')
          }}
        >
          {profile.played_sports &&
            <div className='jobs-profile-block-row'>
              I was a <b>student athlete.</b>
            </div>
          }
          {profile.achievement_activities.length > 0 &&
            <div className='jobs-profile-block-row'>
              I achieved <b>
                {this.props.rootStore.studentJobsStore.profile.achievement_activities.map(club => {
                  let index = this.props.rootStore.studentJobsStore.profile.achievement_activities.indexOf(club)
                  let lastOne = index === this.props.rootStore.studentJobsStore.profile.achievement_activities.length - 1
                  let moreThanOne = this.props.rootStore.studentJobsStore.profile.achievement_activities.length > 1
                  let moreThanTwo = this.props.rootStore.studentJobsStore.profile.achievement_activities.length > 2
                  return (
                    <span key={index}>
                      {lastOne && moreThanOne ? 'and ' : ''}{club.name}{' ('}{moment(club.start_date).format('MM/YYYY')}{')'}{lastOne ? moreThanOne ? '.' : '' : moreThanTwo ? ', ' : ' '}
                    </span>
                  )
                })}
              </b>
            </div>
          }
          {profile.achievement_activities.length > 0 &&
            <div className='jobs-profile-block-row'>
              I was a part of <b>
                {this.props.rootStore.studentJobsStore.profile.club_activities.map(club => {
                  let index = this.props.rootStore.studentJobsStore.profile.club_activities.indexOf(club)
                  let lastOne = index === this.props.rootStore.studentJobsStore.profile.club_activities.length - 1
                  let moreThanOne = this.props.rootStore.studentJobsStore.profile.club_activities.length > 1
                  let moreThanTwo = this.props.rootStore.studentJobsStore.profile.club_activities.length > 2
                  return (
                    <span key={index}>
                      {lastOne && moreThanOne ? 'and ' : ''}{club.name}{lastOne ? moreThanOne ? '.' : '' : moreThanTwo ? ', ' : ' '}
                    </span>
                  )
                })}
              </b>
            </div>
          }
          {profile.skills &&
            <div className='jobs-profile-block-row'>
              My skills are <b>{profile.skills}.</b>
            </div>
          }
          {profile.sat_score &&
            <div className='jobs-profile-block-row'>
              My SAT score is <b>{profile.sat_score}.</b>
            </div>
          }
          {profile.act_score &&
            <div className='jobs-profile-block-row'>
              My ACT score is <b>{profile.act_score}.</b>
            </div>
          }
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Extras'
          settingsButton={() => {
            this.updateForm('extras')
          }}
        >
          {this.renderButton('Round Out Your Profile', 'extras')}
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
            this.updateForm('personalityProfile')
          }}
        >
          <SeeMore hideHeight='192px' customText='View all'>
            <div className='jobs-profile-block-row'>
              <p>I am extroverted more than introverted.</p>
              <b>{this.getPersonalityProfile(profile.personality.extroverted_vs_introverted)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>I prefer working in client-facing roles.</p>
              <b>{this.getPersonalityProfile(profile.personality.client_facing)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>I prefer team over individual work.</p>
              <b>{this.getPersonalityProfile(profile.personality.team_vs_individual)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>I am very competitive.</p>
              <b>{this.getPersonalityProfile(profile.personality.competitive)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>I more often think creatively rather than analytically.</p>
              <b>{this.getPersonalityProfile(profile.personality.creative_vs_analytical)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              <p>I like to challenge the status quo.</p>
              <b>{this.getPersonalityProfile(profile.personality.challenge_status_quo)}</b>
            </div>
            <div className='jobs-profile-block-row'>
              My Myers Briggs type is <b>{profile.personality.myers_briggs}.</b>
            </div>
            <div className='jobs-profile-block-row'>
              My Enneagram type is <b>{profile.personality.enneagram}.</b>
            </div>
          </SeeMore>
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='Personality Profile'
          settingsButton={() => {
            this.updateForm('personalityProfile')
          }}
        >
          {this.renderButton('Take the Personality Quiz', 'personalityProfile')}
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
            this.updateForm('onTheWeb')
          }}
        >
          {profile.social_links.linkedin &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.linkedin} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.linkedin}</a>
            </div>
          }
          {profile.social_links.facebook &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.facebook} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.facebook}</a>
            </div>
          }
          {profile.social_links.twitter &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.twitter} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.twitter}</a>
            </div>
          }
          {profile.social_links.instagram &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.instagram} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.instagram}</a>
            </div>
          }
          {profile.social_links.github &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.github} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.github}</a>
            </div>
          }
          {profile.social_links.personal &&
            <div className='jobs-profile-block-row'>
              <a href={profile.social_links.personal} rel='noopener noreferrer' target='_blank' className='jobs-profile-social-link'>{profile.social_links.personal}</a>
            </div>
          }
        </ProfileBlock>
      )
    } else {
      return (
        <ProfileBlock
          title='On the Web'
          settingsButton={() => {
            this.updateForm('onTheWeb')
          }}
        >
          {this.renderButton('Add Your Other Profiles', 'onTheWeb')}
        </ProfileBlock>
      )
    }
  }

  renderContent () {
    let profile = this.props.rootStore.studentJobsStore.profile
    if (this.state.width > 995) {
      return (
        <div className='jobs-profile'>
          {this.renderHeader(profile)}
          <div className='jobs-profile-column'>
            {this.renderCareerInterests(profile)}
            {this.renderEducation(profile)}
            {this.renderWorkExperience(profile)}
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
            {this.renderDocuments(profile)}
          </div>
        </div>
      )
    } else {
      return (
        <div className='jobs-profile'>
          {this.renderHeader(profile)}
          <div className='jobs-profile-column'>
            {this.renderCareerInterests(profile)}
            {this.renderEducation(profile)}
            {this.renderWorkExperience(profile)}
            {this.renderVolunteerExperience(profile)}
            {this.renderCompanyValues(profile)}
          </div>
          <div className='jobs-profile-column'>
            {this.renderEqualOpportunityEmployment(profile)}
            {this.renderExtras(profile)}
            {this.renderPersonalityProfile(profile)}
            {this.renderOnTheWeb(profile)}
            {this.renderDocuments(profile)}
          </div>
        </div>
      )
    }
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
            <ModalRouter form={this.state.form} onClose={() => this.setState({form: null})} />
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
