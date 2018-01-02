import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, MultiselectField, TimePickerField} from '../../components/Form'
import Modal from '../../components/Modal'
import actions from '../../actions'
import {matchText} from '../../utilities/display'

const requiredFields = {
  'email': {
    type: 'email'
  },
  'password': {
    type: 'required'
  },
  'student.name_first': {
    type: 'required'
  },
  'student.name_last': {
    type: 'required'
  },
  // 'student.school_id': {
  //   type: 'required'
  // },
  // 'student.major': {
  //   type: 'required'
  // },
  'student.phone': {
    type: 'phone'
  }
  // 'student.birthday': {
  //   type: 'required'
  // }
  // 'student.gender': {
  //   type: 'required'
  // }
}

class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  componentWillMount () {
    this.setState({loadingSchools: true})
    actions.schools.getActiveSchools().then(data => {
      this.setState({schools: data, loadingSchools: false})
    }).catch(() => this.setState({loadingSchools: false}))
  }

  initializeState () {
    return {
      form: this.initializeFormData(),
      fieldsOfStudy: [],
      schools: [],
      emailError: null,
      loadingSchools: false,
      loadingFOS: false,
      showSupportedSchools: false
    }
  }

  initializeFormData () {
    const date = new Date()

    return {
      email: '',
      password: '',
      student: {
        name_first: '',
        name_last: '',
        school_id: '',
        fields_of_study: [],
        phone: '',
        birthday: '',
        gender: '',
        notification_time: `${7 + (date.getTimezoneOffset()/60)}:00:00`
      }
    }
  }

  onSubmit () {
    const form = this.mapForm()
    if (this.props.validateForm(form, requiredFields) && !this.state.emailError) {
      actions.auth.registerUser(form).then(() => {
        this.props.resetValidation()
        const { userStore: { authToken } } = this.props.rootStore
        this.cookie.set('skollerToken', authToken, { maxAge: 84600 * 7 })
        browserHistory.push('/student/onboard')
      }).catch(() => false)
    }
  }

  mapForm () {
    let newForm = JSON.parse(JSON.stringify(this.state.form))
    newForm.student.fields_of_study = newForm.student.fields_of_study.map(f => f.value || f.id)
    return newForm
  }

  onVerifyEmail () {
    const {email} = this.state.form

    if (email && this.testEmailFormat(email)) {
      const school = this.getSchoolFromDomain(email)
      if (!school) {
        const emailInfo = (
          <div>
            <div>{'Oop! Looks like the email you entered was not a school email.'}</div>
            <div className='margin-top'><span onClick={this.onAddMyUniversity.bind(this)} style={{borderBottom: '1px solid white', cursor: 'pointer'}}>Add my university</span></div>
            <div className='margin-top'><span onClick={this.toggleSupportedSchoolModal.bind(this)} style={{borderBottom: '1px solid white', cursor: 'pointer'}}>See supported schools</span></div>
          </div>
        )

        this.setState({ emailError: {type: 'info', message: emailInfo} })
      } else {
        this.setState({emailError: null})
      }
      this.setSchoolId(school)
    } else {
      this.setSchoolId()
      this.setState({emailError: null})
    }
  }

  testEmailFormat (email) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regEx.test(email)
  }

  getSchoolFromDomain (email) {
    let schoolFromDomain = null
    const domain = email.split('@')[1].toLowerCase()
    for (let i = 0; i < this.state.schools.length; i++) {
      const emailDomainIndex = this.state.schools[i].email_domains
        .findIndex(email => email.email_domain.replace('@', '').toLowerCase() === domain.toLowerCase())

      if (emailDomainIndex > -1) {
        if (this.state.schools[i].email_domains[emailDomainIndex].is_professor_only) {
          this.setState({
            emailError: {
              type: 'error',
              message: 'Oops! Looks like you are using a professor email. Skoller is for students only.'
            }
          })
        } else {
          schoolFromDomain = this.state.schools[i]
        }
        i = this.state.schools.length
      }
    }
    return schoolFromDomain
  }

  setSchoolId (school) {
    let newForm = {...this.state.form}
    newForm.student.school_id = (school && school.id) || ''
    this.setState({form: newForm})
  }

  onAddMyUniversity () {
    window.location.href = 'mailto:support@skoller.co?Subject=Add My School'
  }

  onSeeSchools () {
    return (
      <Modal
        open={this.state.showSupportedSchools}
        onClose={this.toggleSupportedSchoolModal.bind(this)}
      >
        <h3 className='center-text'>Supported Schools</h3>
        <p className='center-text'>These are the current universities Skoller supports.<br/>If your school is not on here, <a className='non-styled-link' href="mailto:support@skoller.co?Subject=Add My School">let us know</a>!</p>
        <ul className='non-styled-list'>
          {this.state.schools.map(function (school) {
            return <li key={school.name}>{school.name}</li>
          })
          }
        </ul>
      </Modal>
    )
  }

  toggleSupportedSchoolModal () {
    this.setState({showSupportedSchools: !this.state.showSupportedSchools})
  }

  renderSchool () {
    const {form: {student: {school_id}}} = this.state
    if (school_id) {
      return (
        <div className='school-info cn-blue' style={{marginTop: '0.5em'}}>
          <span>{this.state.schools.find(school => school.id === school_id).name}</span>
        </div>
      )
    }
  }

  /*
  * Update fields of study.
  *
  * @param [String] value. Autocomplete input value.
  */
  updateFOSOptions (value) {
    if (value.length > 0) {
      const {form: {student: {school_id}}} = this.state
      if (school_id) {
        this.setState({loadingFOS: true})
        actions.schools.getFieldsOfStudy(school_id, value).then((fieldsOfStudy) => {
          this.setState({fieldsOfStudy, loadingFOS: false})
        }).catch(() => { this.setState({loadingFOS: false}) })
      }
    } else {
      this.setState({fieldsOfStudy: [ ]})
    }
  }

  /*
  * Map the Field of study options
  */
  getFOSOptions () {
    const {fieldsOfStudy, form} = this.state
    return fieldsOfStudy.filter(f =>
      form.student.fields_of_study.findIndex((ff) => ff.value === f.id) === -1)
      .map((f) => { return { value: f.id, name: f.field } })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div id='sign-up-form'>
        <form className='form-padding'>
          <h2>Sign up</h2>
          <div className='row'>
            <div className='col-xs-6'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.student && formErrors.student.name_first}
                label=''
                name='student.name_first'
                onChange={updateProperty}
                placeholder='First name'
                value={form.student.name_first}
              />
            </div>
            <div className='col-xs-6'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.student && formErrors.student.name_last}
                label=''
                name='student.name_last'
                onChange={updateProperty}
                placeholder='Last name'
                value={form.student.name_last}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'>
              {this.renderSchool()}
              <InputField
                containerClassName={!form.student.school_id ? 'margin-top' : ''}
                error={formErrors.email || (this.state.emailError && this.state.emailError.message)}
                showErrorMessage={this.state.emailError && this.state.emailError.message}
                label=''
                name='email'
                onBlur={this.onVerifyEmail.bind(this)}
                onChange={(name, value) => {
                  // Have to reset fields of study.
                  const form = {...this.state.form}
                  form.email = value
                  form.student.fields_of_study = []
                  this.setState({form, fieldsOfStudy: []})
                }}
                placeholder='School email address'
                value={form.email}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.password}
                label=''
                name='password'
                onChange={updateProperty}
                placeholder='Password'
                type='password'
                value={form.password}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.student && formErrors.student.phone}
                label=''
                name='student.phone'
                onChange={updateProperty}
                placeholder='Phone number'
                value={form.student.phone}
              />
            </div>
            <div className='col-xs-12'>
              <MultiselectField
                containerClassName='margin-top'
                label=''
                loading={this.state.loadingFOS}
                name='student.fields_of_study'
                onAdd={(name, value) => {
                  let newValue = form.student.fields_of_study
                  newValue.push(value)
                  updateProperty('student.fields_of_study', newValue)
                  this.setState({fieldsOfStudy: []})
                }}
                onDelete={(name, value) => {
                  let newValue = form.student.fields_of_study
                    .filter(f => f.value !== value.value)
                  updateProperty('student.fields_of_study', newValue)
                }}
                onUpdateOptions={this.updateFOSOptions.bind(this)}
                options={this.getFOSOptions()}
                placeholder={'Select your majors...'}
                value={form.student.fields_of_study}
              />
            </div>
          </div>
        </form>
        <div className='col-xs-12 center-text'>
          <button
            className='button margin-top margin-bottom form-button'
            onClick={this.onSubmit.bind(this)}
          >Take me there.</button>
        </div>
        {this.onSeeSchools()}
      </div>
    )
  }
}

SignUpForm.propTypes = {
  formErrors: PropTypes.object,
  resetValidation: PropTypes.func,
  rootStore: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(SignUpForm, 'form'))
