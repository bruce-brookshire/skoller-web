import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import SpectrumField from './SpectrumField'
import SkSelect from '../../../components/SkSelect'

@inject('rootStore') @observer
class PersonalityProfileForm extends React.Component {
  constructor (props) {
    super(props)

    let personality = this.props.rootStore.studentJobsStore.profile.personality

    this.state = {
      personality: {
        extroverted_vs_introverted: personality ? personality.extroverted_vs_introverted : null,
        client_facing: personality ? personality.client_facing : null,
        team_vs_individual: personality ? personality.team_vs_individual : null,
        competitive: personality ? personality.competitive : null,
        creative_vs_analytical: personality ? personality.creative_vs_analytical : null,
        challenge_status_quo: personality ? personality.challenge_status_quo : null,
        myers_briggs: personality ? personality.myers_briggs : 'ENTP',
        enneagram: personality ? personality.enneagram : '1'
      },
      options: [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree'
      ]
    }
  }

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      personality: this.state.personality
    }

    console.log(form)

    actions.jobs.editJobsProfile(form)
      .then((r) => {
        console.log(r)
        this.props.onSubmit()
      })
  }

  getSelection (v) {
    if (isNaN(parseInt(v))) {
      return this.state.options.indexOf(v).toString()
    } else {
      return this.state.options[v]
    }
  }

  updateValue (v, category) {
    let personality = this.state.personality
    personality[category] = v
    this.setState({personality})
  }

  validateForm () {
    let validated = true
    Object.keys(this.state.personality).forEach(key => {
      if (this.state.personality[key] === null) {
        validated = false
      }
    })
    return validated
  }

  renderMyersBriggsOptions () {
    let options = [
      'INTJ',
      'INTP',
      'ENTJ',
      'ENTP',
      'INFJ',
      'INFP',
      'ENFJ',
      'ENFP',
      'ISTJ',
      'ISTP',
      'ESTJ',
      'ESTP',
      'ISFJ',
      'ISFP',
      'ESFJ',
      'ESFP'
    ]
    return (
      options.map(o => {
        return (
          <div key={options.indexOf(o)} className='jobs-autocomplete-option' onClick={() => this.setState({myers_briggs: o})}>
            {o}
          </div>
        )
      })
    )
  }

  renderEnneagramOptions () {
    let options = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9'
    ]
    return (
      options.map(o => {
        return (
          <div key={options.indexOf(o)} className='jobs-autocomplete-option' onClick={() => this.setState({enneagram: o})}>
            {o}
          </div>
        )
      })
    )
  }

  renderContent () {
    let disabled = true
    if (this.validateForm()) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I am extroverted more than introverted.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.extroverted_vs_introverted)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'extroverted_vs_introverted')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I prefer working in client-facing roles.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.client_facing)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'client_facing')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I prefer team over individual work.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.team_vs_individual)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'team_vs_individual')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I am very competitive.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.competitive)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'competitive')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I more often think creatively rather than analytically.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.creative_vs_analytical)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'creative_vs_analytical')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>I like to challenge the status quo.</div>
          <SpectrumField options={this.state.options} selection={this.getSelection(this.state.personality.challenge_status_quo)} updateData={(d) => this.updateValue(this.getSelection(d[0]), 'challenge_status_quo')} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>My Myers-Briggs type is...</div>
          <SkSelect
            optionsMap={() => this.renderMyersBriggsOptions()}
            selection={this.state.personality.myers_briggs}
            className='jobs-form-select'
          />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>My Enneagram type is...</div>
          <SkSelect
            optionsMap={() => this.renderEnneagramOptions()}
            selection={this.state.personality.enneagram}
            className='jobs-form-select'
          />
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
    return (
      this.renderContent()
    )
  }
}

PersonalityProfileForm.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default PersonalityProfileForm
