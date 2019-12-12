import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import SkSelect from '../../../components/SkSelect'
import moment from 'moment'
import InputField from './InputField'

@inject('rootStore') @observer
class ExtrasForm extends React.Component {
  constructor (props) {
    super(props)

    let profile = this.props.rootStore.studentJobsStore.profile

    this.state = {
      form: {
        played_sports: profile.played_sports === true ? 'Yes' : 'No',
        club_activities: profile.club_activities,
        sat_score: profile.sat_score,
        act_score: profile.act_score,
        achievements_activities: profile.achievements_activities
      },
      clubInput: '',
      achievementInput: {
        name: '',
        start_date: ''
      },
      skills: profile.skills ? profile.skills : ''
    }
  }

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      played_sports: this.state.form.played_sports === 'Yes',
      sat_score: this.state.form.sat_score,
      act_score: this.state.form.act_score,
      skills: this.state.skills
    }
    console.log(form)
    actions.jobs.editJobsProfile(form)
      .then(() => {
        this.props.onSubmit(false)
      })
  }

  renderStudentAthleteOptions () {
    let options = [
      'Yes',
      'No'
    ]
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              let form = this.state.form
              form.played_sports = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  onSubmitClub () {
    let form = {
      job_profile_id: this.props.rootStore.studentJobsStore.profile.id,
      name: this.state.clubInput,
      career_activity_type_id: 200,
      organization_name: this.state.clubInput,
      start_date: moment().toISOString()
    }
    actions.jobs.addCareerActivity(form)
      .then(() => {
        this.props.onSubmit(true)
        this.setState({clubInput: ''})
      })
  }

  onSubmitAchievement () {
    let form = {
      job_profile_id: this.props.rootStore.studentJobsStore.profile.id,
      name: this.state.achievementInput.name,
      career_activity_type_id: 300,
      organization_name: this.state.achievementInput.name,
      start_date: moment(this.state.achievementInput.start_date, 'MM/YYYY').toISOString()
    }
    actions.jobs.addCareerActivity(form)
      .then(() => {
        this.props.onSubmit(true)
        this.setState({achievementInput: {
          name: '',
          start_date: ''
        }})
      })
  }

  handleStartDate (value, prevValue) {
    if (value === '') {
      return ''
    }

    if (value.split('').length > 7) {
      return prevValue
    }

    if (value.split('').length === 3 && value.charAt(2) !== '/') {
      value = value.split('')[0] + value.split('')[1] + '/' + value.split('')[2]
    }

    let slashCount = 0
    value.split('').forEach(c => {
      if (c === '/') {
        slashCount += 1
      }
    })
    if (slashCount > 1) {
      return prevValue
    }

    let splitValue = value.split('/')
    if (isNaN(value)) {
      if (splitValue[0] > 12) {
        return prevValue
      }
      if (isNaN(splitValue[1]) || splitValue[1].includes('.')) {
        return prevValue
      }
      if (value.charAt(2) === '/' && !isNaN(splitValue[0])) {
        return value
      } else {
        return prevValue
      }
    } else {
      return value
    }
  }

  renderAchievements () {
    return (
      <div className='jobs-form-row'>
        <div className='jobs-form-label'>Your achievements</div>
        <p>
          {this.props.rootStore.studentJobsStore.profile.achievement_activities.length !== 0
            ? this.props.rootStore.studentJobsStore.profile.achievement_activities.map(club => {
              let index = this.props.rootStore.studentJobsStore.profile.achievement_activities.indexOf(club)
              let lastOne = index === this.props.rootStore.studentJobsStore.profile.achievement_activities.length - 1
              let moreThanOne = this.props.rootStore.studentJobsStore.profile.achievement_activities.length > 1
              let moreThanTwo = this.props.rootStore.studentJobsStore.profile.achievement_activities.length > 2
              return (
                <span
                  key={index}
                  style={{color: '#4ADD58', cursor: 'pointer'}}
                  onClick={() => {
                    actions.jobs.deleteActivity(club.id, this.props.rootStore.studentJobsStore.profile.id)
                      .then(() => {
                        this.props.onSubmit(true)
                      })
                  }}
                >
                  {lastOne && moreThanOne ? 'and ' : ''}{club.name}{' ('}{moment(club.start_date).format('MM/YYYY')}{')'}{lastOne ? moreThanOne ? '.' : '' : moreThanTwo ? ', ' : ' '}
                </span>
              )
            })
            : null
          }
        </p>
        <InputField
          value={this.state.achievementInput.name}
          placeholder={'Achievement name'}
          updateValue={(v) => {
            let achievementInput = this.state.achievementInput
            achievementInput.name = v
            this.setState({achievementInput})
          }}
        />
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <InputField
            value={this.state.achievementInput.start_date}
            placeholder={'Achievement date (MM/YYYY)'}
            updateValue={(v) => {
              let achievementInput = this.state.achievementInput
              achievementInput.start_date = this.handleStartDate(v, this.state.achievementInput.start_date)
              this.setState({achievementInput})
            }}
          />
          <div className='jobs-form-button' style={{marginLeft: '4px'}}>
            <p style={{height: '36px', paddingTop: '12px'}} onClick={() => this.onSubmitAchievement()}>Save</p>
          </div>
        </div>
      </div>
    )
  }

  renderClubs () {
    return (
      <div className='jobs-form-row'>
        <div className='jobs-form-label'>Your clubs and organizations</div>
        <p>
          {this.props.rootStore.studentJobsStore.profile.club_activities.length !== 0
            ? this.props.rootStore.studentJobsStore.profile.club_activities.map(club => {
              let index = this.props.rootStore.studentJobsStore.profile.club_activities.indexOf(club)
              let lastOne = index === this.props.rootStore.studentJobsStore.profile.club_activities.length - 1
              let moreThanOne = this.props.rootStore.studentJobsStore.profile.club_activities.length > 1
              let moreThanTwo = this.props.rootStore.studentJobsStore.profile.club_activities.length > 2
              return (
                <span
                  key={index}
                  style={{color: '#4ADD58', cursor: 'pointer'}}
                  onClick={() => {
                    actions.jobs.deleteActivity(club.id, this.props.rootStore.studentJobsStore.profile.id)
                      .then(() => {
                        this.props.onSubmit(true)
                      })
                  }}
                >
                  {lastOne && moreThanOne ? 'and ' : ''}{club.name}{lastOne ? moreThanOne ? '.' : '' : moreThanTwo ? ', ' : ' '}
                </span>
              )
            })
            : null
          }
        </p>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <InputField
            value={this.state.clubInput}
            placeholder={'Add a club or organization'}
            updateValue={(v) => this.setState({clubInput: v})}
          />
          <div className='jobs-form-button' style={{marginLeft: '4px'}}>
            <p style={{height: '36px', paddingTop: '12px'}} onClick={() => this.onSubmitClub()}>Save</p>
          </div>
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='jobs-form-container' style={{maxWidth: '380px'}}>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Were you a student athlete?</div>
          <SkSelect
            optionsMap={() => this.renderStudentAthleteOptions()}
            selection={this.state.form.played_sports}
            className='jobs-form-select'
          />
        </div>
        {this.renderClubs()}
        {this.renderAchievements()}
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>SAT score</div>
          <InputField
            value={this.state.form.sat_score}
            updateValue={(v) => {
              let form = this.state.form
              form.sat_score = v
              this.setState({form})
            }}
          />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>ACT score</div>
          <InputField
            value={this.state.form.act_score}
            updateValue={(v) => {
              let form = this.state.form
              form.act_score = v
              this.setState({form})
            }}
          />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Your skills</div>
          <InputField
            value={this.state.skills}
            updateValue={(v) => {
              this.setState({skills: v})
            }}
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className={'jobs-form-save'}>
            <p
              onClick={() =>
                this.onSubmit()
              }
            >
              Save
            </p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

ExtrasForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default ExtrasForm
