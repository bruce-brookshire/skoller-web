import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import SpectrumField from './SpectrumField'

@inject('rootStore') @observer
class CompanyValuesForm extends React.Component {
  constructor (props) {
    super(props)

    let values = this.props.rootStore.studentJobsStore.profile.company_values

    this.state = {
      values: {
        compensation: this.getValue('compensation'),
        prestige: this.getValue('prestige'),
        impact: this.getValue('impact'),
        development: this.getValue('development'),
        community: this.getValue('community'),
        balance: this.getValue('balance'),
        mobility: this.getValue('mobility'),
        stability: this.getValue('stability')
      },
      options: [
        'Not that important',
        'Somewhat important',
        'Very important'
      ]
    }
  }

  getValue (v) {
    if (this.props.rootStore.studentJobsStore.profile.company_values) {
      if (this.props.rootStore.studentJobsStore.profile.company_values[v]) {
        return this.props.rootStore.studentJobsStore.profile.company_values[v]
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      company_values: this.state.values
    }

    actions.jobs.editJobsProfile(form)
      .then(() => {
        this.props.onSubmit()
      })
  }

  getSelection (v) {
    if (typeof v === 'string') {
      return this.state.options.indexOf(v)
    } else if (typeof v === 'number') {
      return this.state.options[v]
    } else {
      return null
    }
  }

  updateValue (v, category) {
    let values = this.state.values
    values[category] = v
    this.setState({values})
  }

  validateForm () {
    let validated = true
    Object.keys(this.state.values).forEach(key => {
      if (this.state.values[key] === null) {
        validated = false
      }
    })
    return validated
  }

  renderContent () {
    let disabled = true
    if (this.validateForm()) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          Please indicate how important each of the following are to you.
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Compensation</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.compensation)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'compensation')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Company Prestige</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.prestige)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'prestige')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Social Impact</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.impact)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'impact')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Professional Development</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.development)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'development')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Strong Sense of Community</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.community)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'community')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Work-Life Balance</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.balance)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'balance')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Upward Mobility</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.mobility)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'mobility')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Job Stability</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.values.stability)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'stability')} />
        </div>
        <div className='jobs-form-row'>
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

CompanyValuesForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default CompanyValuesForm
