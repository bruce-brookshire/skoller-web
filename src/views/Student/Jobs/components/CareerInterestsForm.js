import React from 'react'
import PropTypes from 'prop-types'
import SearchField from './SearchField'
import SkSelectDropDown from '../../../components/SkSelectDropDown'
import CheckboxField from './CheckboxField'
import SpectrumField from './SpectrumField'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'

@inject('rootStore') @observer
class CareerInterestForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interests: [],
      regions: this.getRegionsArray(this.props.rootStore.studentJobsStore.profile.regions),
      careerInterestOptions: [],
      showCareerInterestAutocomplete: false,
      careerInterestSelections: this.getCareerInterests(this.props.rootStore.studentJobsStore.profile.career_interests),
      careerInterestSearchQuery: '',
      startup: this.getStartupSelection(this.props.rootStore.studentJobsStore.profile.startup_interest)
    }

    console.log(this.state)
  }

  careerInterests = [
    'Science',
    'Math',
    'History',
    'Finance',
    'Computer Science',
    'Engineering',
    'Actuary',
    'Beep',
    'Bop',
    'Eee',
    'Eeee',
    'Eeeee',
    'Eeeeee',
    'Week',
    'Reek',
    'Gleek'
  ]

  careerInterestOptionsMap = () => {
    return (
      this.state.careerInterestOptions.map(option => {
        return (
          <div
            className='jobs-autocomplete-option'
            key={this.careerInterests.indexOf(option)}
            onClick={() => {
              console.log(this.state.careerInterestSelections.filter(s => s === option))
              console.log(this.state.careerInterestSelections.length)
              if (this.state.careerInterestSelections.filter(s => s === option).length > 0 || this.state.careerInterestSelections.length > 4) {
                return null
              } else {
                let selections = this.state.careerInterestSelections
                selections.push(option)
                this.setState({careerInterestSelections: selections, careerInterestSearchQuery: ''})
              }
            }}
          >
            {option}
          </div>
        )
      })
    )
  }

  handleCareerInterestValue (value) {
    let careerInterestOptions = this.careerInterests.filter(o => o.toLowerCase().includes(value.toLowerCase()))
    let show = false
    if (careerInterestOptions.length > 0 && value !== null) {
      show = true
    }
    this.setState({careerInterestOptions, showCareerInterestAutocomplete: show, careerInterestSearchQuery: value})
  }

  renderCareerInterestSelections () {
    return (
      <p className='jobs-form-selections'>
        {this.state.careerInterestSelections.map(selection => {
          let index = this.state.careerInterestSelections.indexOf(selection)
          return (
            <span
              key={index}
              onClick={() => {
                let selections = this.state.careerInterestSelections
                selections.splice(index, 1)
                this.setState({careerInterestSelections: selections})
              }}
            >
              {selection}{this.state.careerInterestSelections.length > 1 && index !== this.state.careerInterestSelections.length - 1 ? ', ' : ''}
            </span>
          )
        })}
      </p>
    )
  }

  updateRegionsData = (data) => {
    this.setState({regions: data})
  }

  updateStartupData = (data) => {
    this.setState({startup: data[0]})
  }

  getStartupSelection (v) {
    let d
    let options = ['Not Interested', 'Somewhat Interested', 'Very Interested']
    if (typeof v === 'number') {
      d = options[v]
    } else {
      d = options.indexOf(v)
    }
    return d
  }

  getCareerInterests (v) {
    console.log(v)
    console.log(typeof v)
    if (v === null) {
      return []
    } else if (typeof v === 'object') {
      return v.join('|')
    } else if (typeof v === 'string') {
      return v.split('|')
    }
  }

  getRegionsArray (string) {
    let array = []
    if (string !== null) {
      array = string.split('|')
    }
    return array
  }

  async onSubmit () {
    let regions = this.state.regions.join('|')
    let careerInterests = this.state.careerInterestSelections.join('|')
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      regions: regions,
      startup_interest: this.getStartupSelection(this.state.startup),
      career_interests: careerInterests
    }
    console.log(form)
    await actions.jobs.editJobsProfile(form)
      .then(r => {
        console.log(r)
      })
      .catch(e => {
        console.log(e)
        showSnackbar('Error saving information. Try again later.')
      })
    this.props.onSubmit()
  }

  render () {
    console.log('state', this.state)
    let disabled = true
    if (this.state.careerInterestSelections.length > 0 && this.state.regions.length > 0 && this.state.startup) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>What are your career interests?</div>
          <div className='jobs-form-sub-label'>Select up to five</div>
          {this.renderCareerInterestSelections()}
          <SearchField updateValue={(value) => this.handleCareerInterestValue(value)} searchQuery={this.state.careerInterestSearchQuery} />
          <div style={{margin: this.state.showCareerInterestAutocomplete ? '-9px 0 13px 0' : '0'}}>
            <SkSelectDropDown
              optionsMap={() => this.careerInterestOptionsMap(this.state.careerInterestSearchQuery)}
              show={this.state.showCareerInterestAutocomplete && this.state.careerInterestSearchQuery !== ''}
              toggle={() => {
                return null
              }}
            />
          </div>
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>In which regions are you willing to work?</div>
          <CheckboxField options={['Southwest', 'Southeast', 'Midwest', 'West', 'Northeast']} selections={this.getRegionsArray(this.props.rootStore.studentJobsStore.profile.regions)} updateData={(data) => this.updateRegionsData(data)} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>How interested are you in working for a startup?</div>
          <SpectrumField options={['Not Interested', 'Somewhat Interested', 'Very Interested']} selection={this.getStartupSelection(this.props.rootStore.studentJobsStore.profile.startup_interest)} updateData={(data) => this.updateStartupData(data)} />
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
}

CareerInterestForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default CareerInterestForm
