import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import SkSelect from '../../../components/SkSelect'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class EqualOpportunityEmploymentForm extends React.Component {
  constructor (props) {
    super(props)

    let profile = this.props.rootStore.studentJobsStore.profile

    this.state = {
      form: {
        gender: profile.gender ? profile.gender : '',
        ethnicity_type: profile.ethnicity_type ? profile.ethnicity_type.id : '',
        veteran: profile.veteran === true ? 'Yes' : 'No',
        disability: profile.disability === true ? 'Yes' : 'No',
        first_gen_college: profile.first_gen_college === true ? 'Yes' : 'No',
        fin_aid: profile.fin_aid === true ? 'Yes' : 'No',
        pell_grant: profile.pell_grant === true ? 'Yes' : 'No'
      },
      ethnicityTypes: [],
      loading: true
    }

    this.getFormData()
  }

  async getFormData () {
    await actions.jobs.getEthnicityTypes()
      .then((data) => {
        this.setState({ethnicityTypes: data})
      })
      .catch((e) => {
        console.log(e)
      })
    this.setState({loading: false})
  }

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      gender: this.state.form.gender,
      veteran: this.state.form.veteran === 'Yes',
      disability: this.state.form.disability === 'Yes',
      first_gen_college: this.state.form.first_gen_college === 'Yes',
      fin_aid: this.state.form.fin_aid === 'Yes',
      pell_grant: this.state.form.pell_grant === 'Yes',
      ethnicity_type_id: this.state.form.ethnicity_type
    }
    actions.jobs.editJobsProfile(form)
      .then(() => {
        this.props.onSubmit()
      })
  }

  renderEthnicityOptions () {
    let options = this.state.ethnicityTypes
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              let form = this.state.form
              form.ethnicity_type = o.id
              this.setState({form})
            }}
          >
            {o.name}
          </div>
        )
      })
    )
  }

  renderGenderOptions () {
    let options = [
      'Female',
      'Male',
      'Other',
      'Prefer not to say'
    ]
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='jobs-autocomplete-option'
            onClick={() => {
              let form = this.state.form
              form.gender = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderVeteranOptions () {
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
              form.veteran = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderDisabilityOptions () {
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
              form.disability = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderFirstGenCollegeOptions () {
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
              form.first_gen_college = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderFinAidOptions () {
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
              form.fin_aid = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderPellGrantOptions () {
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
              form.pell_grant = o
              this.setState({form})
            }}
          >
            {o}
          </div>
        )
      })
    )
  }

  renderContent () {
    let ethnicityTypes = this.state.ethnicityTypes
    let disabled = true
    if (
      this.state.form.gender &&
      this.state.form.ethnicity_type &&
      this.state.form.veteran &&
      this.state.form.disability &&
      this.state.form.first_gen_college &&
      this.state.form.fin_aid &&
      this.state.form.pell_grant
    ) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Ethnicity</div>
          <SkSelect
            optionsMap={() => this.renderEthnicityOptions()}
            selection={this.state.form.ethnicity_type !== '' ? ethnicityTypes.filter(o => o.id === this.state.form.ethnicity_type)[0].name : ''}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Gender</div>
          <SkSelect
            optionsMap={() => this.renderGenderOptions()}
            selection={this.state.form.gender}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Are you a veteran?</div>
          <SkSelect
            optionsMap={() => this.renderVeteranOptions()}
            selection={this.state.form.veteran}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Do you have a disability?</div>
          <SkSelect
            optionsMap={() => this.renderDisabilityOptions()}
            selection={this.state.form.disability}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Are you a first generation college student?</div>
          <SkSelect
            optionsMap={() => this.renderFirstGenCollegeOptions()}
            selection={this.state.form.first_gen_college}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Are you eligible for financial aid?</div>
          <SkSelect
            optionsMap={() => this.renderFinAidOptions()}
            selection={this.state.form.fin_aid}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row margin-bottom'>
          <div className='jobs-form-label'>Are you eligible for a Pell Grant?</div>
          <SkSelect
            optionsMap={() => this.renderPellGrantOptions()}
            selection={this.state.form.pell_grant}
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

EqualOpportunityEmploymentForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default EqualOpportunityEmploymentForm
