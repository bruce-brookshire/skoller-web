import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import InputField from './InputField'
import SkSelect from '../../../components/SkSelect'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class EducationForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gpa: this.props.rootStore.studentJobsStore.profile.gpa ? this.props.rootStore.studentJobsStore.profile.gpa : '',
      user: this.props.rootStore.userStore.user,
      profile: this.props.rootStore.studentJobsStore.profile,
      majors: [],
      beginningMajors: [],
      gradMonthChoice: 'May',
      gradYearChoice: '2020',
      gradDegreeChoice: null,
      degreeTypes: [],
      loading: true,
      loadingFieldsOfStudy: false,
      addMajor: false,
      options: [],
      error: null
    }

    this.getFormData()
  }

  async getFormData () {
    await actions.jobs.getDegreeTypes()
      .then((data) => {
        this.setState({degreeTypes: data})
      })
      .catch((e) => {
        console.log(e)
      })
    let majors = []
    let beginningMajors = []
    majors = this.props.rootStore.userStore.user.student.fields_of_study.sort()
    beginningMajors = this.props.rootStore.userStore.user.student.fields_of_study.sort()
    let gradDegreeChoice = this.state.degreeTypes[0]
    this.setState({loading: false, gradDegreeChoice, majors, beginningMajors})
  }

  async queryFieldsOfStudy (query) {
    this.setState({loadingFieldsOfStudy: true})
    actions.fieldsofstudy.getFieldsOfStudy(query).then((r) => {
      this.setState({options: r})
    })
    this.setState({loadingFieldsOfStudy: false})
  }

  async onSubmit () {
    let user = this.props.rootStore.userStore.user
    let form = {
      id: this.state.profile.id,
      graduation_date: new Date(this.state.gradMonthChoice + ' ' + this.state.gradYearChoice).toISOString(),
      gpa: this.state.gpa,
      degree_type_id: this.state.gradDegreeChoice.id
    }
    let userForm = {
      degree_type_id: this.state.gradDegreeChoice.id
    }
    // update student's grad year
    await actions.students.updateStudent(user.id, user.student.id, userForm)
      .catch(() => {
        throw new Error('Error saving grad year. Try again later.')
      })
    actions.jobs.editJobsProfile(form)
      .then(() => {
        this.props.onSubmit()
      })
  }

  handleGpaChange (v) {
    if (v === '') {
      this.setState({gpa: ''})
      return
    }
    if (isNaN(parseInt(v))) {
      this.setState({gpa: this.state.gpa})
      return
    }
    v = v.toString()
    if (v.split('').length > 4) {
      this.setState({gpa: this.state.gpa})
    } else if (v > 4.0) {
      if (v.split('')[0] > 4) {
        this.setState({gpa: this.state.gpa + '0.' + v.split('')[v.split('').length - 1]})
      } else if (v.split('')[0] !== '4') {
        this.setState({gpa: this.state.gpa + '.' + v.split('')[v.split('').length - 1]})
      } else {
        this.setState({gpa: this.state.gpa})
      }
    } else {
      this.setState({gpa: v})
    }
  }

  renderMonthsOptions () {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      months.map(month => {
        return (
          <div
            key={months.indexOf(month)}
            onClick={() => {
              this.setState({gradMonthChoice: month})
            }}
            className='jobs-autocomplete-option'
          >
            {month}
          </div>
        )
      })
    )
  }

  renderYearOptions () {
    let years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025']
    return (
      years.map(year => {
        return (
          <div
            key={years.indexOf(year)}
            onClick={() => {
              this.setState({gradYearChoice: year})
            }}
            className='jobs-autocomplete-option'
          >
            {year}
          </div>
        )
      })
    )
  }

  renderDegreeOptions () {
    let degrees = this.state.degreeTypes
    return (
      degrees.map(degree => {
        return (
          <div
            key={degrees.indexOf(degree)}
            onClick={() => {
              this.setState({gradDegreeChoice: degree})
            }}
            className='jobs-autocomplete-option'
          >
            {degree.name}
          </div>
        )
      })
    )
  }

  renderContent () {
    let disabled = true
    if (this.state.gpa && this.state.gradMonthChoice && this.state.gradYearChoice && this.state.gradDegreeChoice) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Your School</div>
          <div className='jobs-form-sub-label'>You can change your school on your Skoller profile.</div>
          <InputField updateValue={(value) => this.handleGpaChange(value)} value={this.state.user.student.primary_school.name} readOnly={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>What is your cumulative GPA?</div>
          <InputField updateValue={(value) => this.handleGpaChange(value)} value={this.state.gpa} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>What is your graduation date?</div>
          <div className='jobs-form-select-row'>
            <SkSelect
              optionsMap={() => this.renderMonthsOptions()}
              selection={this.state.gradMonthChoice}
              className='jobs-form-select'
            />
            <SkSelect
              optionsMap={() => this.renderYearOptions()}
              selection={this.state.gradYearChoice}
              className='jobs-form-select'
            />
          </div>
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>What type of degree will you receive?</div>
          <SkSelect
            optionsMap={() => this.renderDegreeOptions()}
            selection={this.state.gradDegreeChoice.name}
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

EducationForm.propTypes = {
  none: PropTypes.bool,
  updateData: PropTypes.func,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default EducationForm
