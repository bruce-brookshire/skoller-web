import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import CreateSchoolModal from '../FindClasses/CreateSchoolModal'
import SkModal from '../../components/SkModal/SkModal'
import moment from 'moment'
import SkLoader from '../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      loading: true,
      loadingAutocomplete: true,
      schoolChoice: null,
      termChoice: null,
      showCreateSchoolModal: false,
      input: null,
      foundSchools: null,
      showSchoolOptions: false,
      showTermOptions: false,
      sammiMessage: null,
      activeTerm: null
    }
  }

  componentDidMount () {
    const userEmailDomain = this.props.rootStore.userStore.user.email.split(`@`).slice(-1)[0]
    actions.schools.getSchoolsByEmailDomain(userEmailDomain).then(response => {
      let sammiMessage
      if (response.length === 0) {
        sammiMessage = 'Search for your school!'
      } else if (response.length === 1) {
        sammiMessage = 'I found your school!'
      } else {
        sammiMessage = 'Looks like you might be at one of these schools. Select the right one!'
      }
      this.setState({
        foundSchools: response,
        sammiMessage: sammiMessage,
        loading: false,
        schoolChoice: (response.length === 1) ? response[0] : null,
        activeTerm: (response.length === 1) ? this.findActiveTerm(response[0]) : null,
        showSchoolOptions: (response.length > 1)
      })
    })
  }

  searchSchools (value) {
    this.setState({loadingAutocomplete: true})
    if (value) {
      this.setState({loadingAutocomplete: true, value})
      actions.schools.searchSchools(value).then((schools) => {
        this.setState({schools, loadingAutocomplete: false})
      }).catch(() => { this.setState({loadingAutocomplete: false}) })
    } else {
      this.setState({schools: [], loadingAutocomplete: false})
    }
  }

  renderAutoComplete (school) {
    let schoolFieldWidth = this.schoolField.offsetWidth
    return (
      ((this.state.loadingAutocomplete)
        ? null
        : <div
          style={{
            width: (schoolFieldWidth - 10).toString() + 'px'
          }}
        >
          {this.state.schools.map((school) => {
            return (
              <div
                key={school.id}
                className='sk-select-school-choice'
                style={{
                  width: (schoolFieldWidth - 10).toString() + 'px'
                }}
                onClick={() => {
                  this.setState({
                    schools: [],
                    input: null
                  })
                  this.setSchoolChoice(school)
                  this.schoolField.innerHTML = null
                }}
              >
                <h3
                  style={{
                    color: school.color ? '#' + school.color : null
                  }}
                >
                  {school.name}
                </h3>
                <p>{`${school.adr_locality}, ${school.adr_region}`}</p>
              </div>
            )
          }
          )}
          <div
            style={{width: (schoolFieldWidth - 10).toString() + 'px'}}
            className='sk-select-school-create-new'
            onClick={() => this.setState({showCreateSchoolModal: true})}
          >
            Create a new school called <b>{this.state.input}</b>
          </div>
        </div>
      )
    )
  }

  renderSchool () {
    return (
      <div className='sk-select-school'>
        <div className='sk-select-school-label'>School</div>
        {this.state.schoolChoice
          ? <div className='sk-select-school-field' onClick={() => this.setState({schoolChoice: null, activeTerm: null, termChoice: null, showTermOptions: false})}>
            {this.renderSchoolChoice()}
          </div>
          : <div
            className='sk-select-school-field'
            ref={schoolField => { this.schoolField = schoolField } }
            contentEditable={true}
            onInput={e => {
              this.searchSchools(e.currentTarget.textContent)
              this.setState({input: e.currentTarget.textContent})
            }}
          />
        }
        {((this.state.schools.length > 0 || this.state.input) && !this.state.loadingAutocomplete)
          ? <div className='sk-select-school-autocomplete-container' contentEditable={false}>
            {this.renderAutoComplete()}
          </div>
          : null
        }
        {(this.state.schoolChoice) ? this.renderTermField() : null}
      </div>
    )
  }

  renderSchoolOptions () {
    return (
      <div className='sk-select-school'>
        <div className='sk-select-school-field'>
          {this.state.foundSchools.map((school) =>
            <div
              key={school.id}
              className='sk-select-school-selected-school sk-select-school-option'
              onClick={() => {
                this.setSchoolChoice(school)
                this.setState({
                  showSchoolOptions: false
                })
              }}
            >
              <h3 className='sk-select-school-selected-school-name' style={{color: school.color ? ('#' + school.color) : null}}>
                {school.name}
              </h3>
              <div className='sk-select-school-selected-school-location'>
                {school.adr_locality}, {school.adr_region}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderSchoolChoice () {
    return (
      <div className='sk-select-school-selected-school'>
        <h3 className='sk-select-school-selected-school-name' style={{color: this.state.schoolChoice.color ? ('#' + this.state.schoolChoice.color) : null}}>
          {this.state.schoolChoice.name}
        </h3>
        <div className='sk-select-school-selected-school-location'>
          {this.state.schoolChoice.adr_locality}, {this.state.schoolChoice.adr_region}
        </div>
      </div>
    )
  }

  findActiveTerm = (school) => {
    let activeTerm = null
    school.periods.forEach(term => {
      if (term.class_period_status.name === 'Active') {
        activeTerm = term
      }
    })
    return activeTerm
  }

  setSchoolChoice = (school) => {
    this.setState({schoolChoice: school, activeTerm: this.findActiveTerm(school)})
  }

  renderTermField () {
    return (
      <div className='sk-select-school-term'>
        <div className='sk-select-school-term-label'>
          Select Term
        </div>
        {this.state.termChoice
          ? <div
            className='sk-select-school-term-field'
            onClick={() => this.setState({showTermOptions: !this.state.showTermOptions})}
            ref={termField => { this.termField = termField } }
          >
            <div key={this.state.termChoice.id} className='sk-select-school-term-choice'>
              <h3>{this.state.termChoice.name}</h3>
              <div className='sk-select-school-term-dates'>
                {moment(this.state.termChoice.start_date).format('MMMM')} - {moment(this.state.termChoice.end_date).format('MMMM')}
              </div>
            </div>
          </div>
          : <div
            className='sk-select-school-term-field'
            onClick={() => this.setState({showTermOptions: !this.state.showTermOptions})}
            ref={termField => { this.termField = termField } }
          >
            <div key={this.state.activeTerm.id} className='sk-select-school-term-choice'>
              <h3>{this.state.activeTerm.name}</h3>
              <div className='sk-select-school-term-dates'>
                {moment(this.state.activeTerm.start_date).format('MMMM')} - {moment(this.state.activeTerm.end_date).format('MMMM')}
              </div>
            </div>
          </div>
        }
        {this.state.showTermOptions
          ? this.renderTermOptions()
          : null
        }
      </div>
    )
  }

  renderTermOptions () {
    let terms = this.state.schoolChoice.periods
    let termFieldWidth = this.termField.offsetWidth
    return (
      <div
        className='sk-select-school-term-options'
      >
        {terms.map(term => {
          if (term.class_period_status.name !== 'Past') {
            return (
              <div
                key={term.id}
                className='sk-select-school-term-option'
                style={{
                  width: (termFieldWidth - 10).toString() + 'px'
                }}
                onClick={() => {
                  this.setState({
                    termChoice: term,
                    showTermOptions: false
                  })
                }}
              >
                <h3>{term.name}</h3>
                <div className='sk-select-school-term-dates'>
                  {moment(term.start_date).format('MMMM')} - {moment(term.end_date).format('MMMM')}
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  onSubmitSchool () {
    actions.students.setStudentPrimarySchool(this.props.rootStore.userStore.user.id, this.props.rootStore.userStore.user.student.id, this.state.schoolChoice.id)
      .then(() => {
        if (!this.state.termChoice) {
          this.setState({termChoice: this.state.activeTerm})
        }
        this.props.onSubmit(this.state)
        console.log(this.state)
      })
  }

  render () {
    let disableNext = false
    if ((!this.state.termChoice || !this.state.activeTerm) && (!this.state.schoolChoice)) {
      disableNext = true
    }
    return (
      <div>
        {this.state.loading
          ? <SkLoader />
          : <SkProgressBar progress={0.25} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        }
        {this.state.loading
          ? null
          : <div>
            <div className='onboard-select-school'>
              <h1>Meet Sammi 👋</h1>
              <div className="onboard-select-school-sammi-container">
                <div className="sammi-message">
                  <p>{this.state.sammiMessage}</p>
                </div>
                <img src='/src/assets/images/sammi/Smile@3x.png' />
              </div>
            </div>
            {(this.state.showSchoolOptions)
              ? this.renderSchoolOptions()
              : this.renderSchool()
            }
            <div
              className={'onboard-next' + (disableNext ? ' disabled' : '')}
              onClick={(disableNext ? null : () => this.onSubmitSchool())}
            >
              <p>Next</p>
            </div>
            {this.state.showCreateSchoolModal
              ? <SkModal closeModal={() => this.setState({showCreateSchoolModal: false})}>
                <CreateSchoolModal
                  name={this.state.input}
                />
              </SkModal>
              : null
            }
          </div>
        }
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default SelectSchool
