import React from 'react'
import PropTypes from 'prop-types'
import SearchField from './SearchField'
import SkSelectDropDown from '../../../components/SkSelectDropDown'

class CareerInterestForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interests: [],
      regions: [],
      careerInterestOptions: [],
      showCareerInterestAutocomplete: false,
      careerInterestSelections: [],
      careerInterestSearchQuery: ''
    }
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

  render () {
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
          <input className='jobs-form-input'></input>
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>How interested are you in working for a startup?</div>
          <input className='jobs-form-input'></input>
        </div>
      </div>
    )
  }
}

CareerInterestForm.propTypes = {
  none: PropTypes.bool
}

export default CareerInterestForm
