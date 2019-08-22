import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import CreateSchoolModal from '../FindClasses/CreateSchoolModal'
import SkModal from '../../components/SkModal/SkModal'
import moment from 'moment'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Sammi from '../../components/Sammi'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      loading: true,
      loadingAutocomplete: true,
      schoolChoice: this.props.backData ? this.props.backData.schoolChoice : null,
      termChoice: this.props.backData ? this.props.backData.schoolChoice : null,
      showCreateSchoolModal: false,
      input: null,
      foundSchools: null,
      showSchoolOptions: false,
      showTermOptions: false,
      sammiMessage: null,
      activeTerm: null
    }

    if (this.props.backData) {
      this.setState({
        schoolChoice: this.props.backData.schoolChoice,
        termChoice: this.props.backData.termChoice
      })
    }
  }

  checkBackData () {
    if (this.props.backData) {
      this.setState({
        schoolChoice: this.props.backData.schoolChoice,
        termChoice: this.props.backData.termChoice
      })
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
      this.checkBackData()
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
        <div className='sk-select-school-row'>
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
        </div>
        {((this.state.schools.length > 0 || this.state.input) && !this.state.loadingAutocomplete)
          ? <div className='sk-select-school-autocomplete-container' style={{width: this.schoolField.offsetWidth.toString() + 'px'}} contentEditable={false}>
            {this.renderAutoComplete()}
          </div>
          : null
        }
        {(this.state.schoolChoice)
          ? <div className='sk-select-school-row'>
            {this.renderTermField()}
          </div>
          : null
        }
      </div>
    )
  }

  renderSchoolOptions () {
    return (
      <div className='sk-select-school'>
        <div className='sk-select-school-row'>
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
    let terms = this.sortTerms(school.periods)
    let activeTerm
    terms.forEach(term => {
      let startDate = moment(term.start_date)
      let endDate = moment(term.end_date)
      if (endDate.isAfter(moment())) {
        if (activeTerm ? startDate.isBefore(activeTerm.startDate) : true) {
          activeTerm = term
        }
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
          : this.state.activeTerm
            ? <div
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
            : <div
              className='sk-select-school-term-field'
              onClick={() => this.setState({showTermOptions: !this.state.showTermOptions})}
              ref={termField => { this.termField = termField } }
            >
              <div className='sk-select-school-term-choice'>
                <h3>Select Term</h3>
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

  getUnixDate (dateString) {
    const unixDate = moment(dateString).format('x')
    return parseInt(unixDate)
  }

  sortTerms (terms) {
    return terms.sort((a, b) => {
      if (a.start_date !== null && b.start_date !== null) {
        return this.getUnixDate(a.start_date) - this.getUnixDate(b.start_date)
      } else {
        return a.name === b.name ? 1 : -1
      }
    })
  }

  renderTermOptions () {
    let terms = this.state.schoolChoice.periods
    terms = this.sortTerms(terms)
    let currentTerms = []
    terms.forEach(term => {
      if (moment(term.end_date).isAfter(moment())) {
        currentTerms.push(term)
      }
    })
    console.log(currentTerms)
    let termFieldWidth = this.termField.offsetWidth
    return (
      <div
        className='sk-select-school-term-options'
      >
        {currentTerms.map(term => {
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
        })}
      </div>
    )
  }

  async onSubmitSchool () {
    const userId = this.props.rootStore.userStore.user.id
    const studentId = this.props.rootStore.userStore.user.student.id
    let termChoice = this.state.termChoice
    if (this.state.termChoice === null) {
      termChoice = this.state.activeTerm
      this.setState({termChoice: termChoice})
    }
    this.setState({loading: true})
    await actions.students.setStudentPrimarySchool(userId, studentId, this.state.schoolChoice.id)
      .catch(e => console.log('stuck on setting primary school', e))
    await actions.students.setStudentPrimaryPeriod(userId, studentId, termChoice.id)
      .catch(e => console.log('stuck on setting primary period', e))
    this.props.onSubmit(this.state)
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
          : <div>
            {this.props.renderPartner()}
          </div>
        }
        {this.state.loading
          ? null
          : <div>
            <div className='onboard-select-school'>
              <h1>Meet Sammi 👋</h1>
              <Sammi
                message={this.props.customMessage ? this.props.customMessage : this.state.sammiMessage}
                emotion='happy'
                position='right'
                align='right'
              />
              <SkProgressBar
                progress={0.25}
                width={'100%'}
                backgroundColor={'$cn-color-blue'}
              />
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
                  onSubmit={(school) => {
                    this.setState({schoolChoice: school, input: null})
                  }}
                  onClose={() => this.setState({showCreateSchoolModal: false})}
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
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  backData: PropTypes.object,
  customMessage: PropTypes.string
}

export default SelectSchool
