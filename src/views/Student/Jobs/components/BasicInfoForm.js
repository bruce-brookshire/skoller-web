import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import SkSelect from '../../../components/SkSelect'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class BasicInfoForm extends React.Component {
  constructor (props) {
    super(props)

    let profile = this.props.rootStore.studentJobsStore.profile

    this.state = {
      work_auth: profile.work_auth !== null ? profile.work_auth ? 'Yes' : 'No' : '',
      sponsorship_required: profile.sponsorship_required !== null ? profile.sponsorship_required ? 'Yes' : 'No' : '',
      state_code: profile.state_code !== null ? profile.state_code : '',
      visibility: profile.job_profile_status.id === 100 ? 'Active' : 'Hidden'
    }
  }

  states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
    'American Samoa',
    'Guam',
    'Marshall Islands',
    'Northern Mariana Islands',
    'Puerto Rico',
    'U.S. Virgin Islands',
    'Virgin Islands',
    'Outside of U.S.'
  ]

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      work_auth: this.state.work_auth === 'Yes',
      sponsorship_required: this.state.sponsorship_required === 'Yes',
      state_code: this.state.state_code,
      job_profile_status_id: this.state.visibility === 'Active' ? 100 : 200
    }
    console.log(form)
    actions.jobs.editJobsProfile(form)
      .then(() => {
        this.props.onSubmit()
      })
  }

  renderStateOptions () {
    let options = this.states
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              this.setState({state_code: o})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderWorkAuthOptions () {
    let options = ['Yes', 'No']
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              this.setState({work_auth: o})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderSponsorshipRequiredOptions () {
    let options = ['Yes', 'No']
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              this.setState({sponsorship_required: o})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderVisibilityOptions () {
    let options = ['Active', 'Hidden']
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              this.setState({visibility: o})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderContent () {
    let disabled = true
    if (
      this.state.state_code !== '' &&
      this.state.sponsorship_required !== '' &&
      this.state.work_auth !== ''
    ) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Are you authorized to work in the United States?</div>
          <SkSelect
            optionsMap={() => this.renderWorkAuthOptions()}
            selection={this.state.work_auth}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Will you need employer sponsorship to work in the United States?</div>
          <SkSelect
            optionsMap={() => this.renderSponsorshipRequiredOptions()}
            selection={this.state.sponsorship_required}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>What is your home state?</div>
          <SkSelect
            optionsMap={() => this.renderStateOptions()}
            selection={this.state.state_code}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Skoller Jobs Profile visibility</div>
          <SkSelect
            optionsMap={() => this.renderVisibilityOptions()}
            selection={this.state.visibility}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className={'jobs-form-save ' + (disabled ? 'disabled' : '')}>
            <p
              onClick={() =>
                disabled ? null : this.onSubmit()
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
    if (this.state.loading) {
      return (
        <SkLoader />
      )
    } else {
      return (
        this.renderContent()
      )
    }
  }
}

BasicInfoForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default BasicInfoForm
