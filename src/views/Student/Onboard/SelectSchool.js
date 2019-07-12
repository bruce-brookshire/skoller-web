import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import CreateSchoolModal from '../FindClasses/CreateSchoolModal'
import SkModal from '../../components/SkModal/SkModal'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      loading: true,
      loadingAutocomplete: true,
      schoolChoice: null,
      showCreateSchoolModal: false,
      input: null,
      foundSchools: null,
      showSchoolOptions: false,
      sammiMessage: null
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
                    schoolChoice: school,
                    input: null
                  })
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
          ? <div className='sk-select-school-field' onClick={() => this.setState({schoolChoice: null})}>
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
              onClick={() => this.setState({
                schoolChoice: school,
                showSchoolOptions: false
              })}
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

  renderTermField () {
    return (
      <div className='sk-select-school-term'>
        <div>
          Select Term
        </div>
        <div className='sk-select-school-selected-school'>
          thing
        </div>
      </div>
    )
  }

  onSubmitSchool () {
    actions.students.setStudentPrimarySchool(this.props.rootStore.userStore.user.id, this.state.schoolChoice.id)
    // this.props.onSubmit()
  }

  render () {
    return (
      <div>
        <SkProgressBar progress={0.25} width={'100%'} backgroundColor={'$cn-color-blue'}/>
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
            <div className='onboard-next' onClick={() => this.onSubmitSchool()}>
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
