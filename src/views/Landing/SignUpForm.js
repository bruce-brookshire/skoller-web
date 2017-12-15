import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import {inject, observer} from 'mobx-react'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'

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
      schools: [],
      emailError: null,
      loadingSchools: false
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
        major: '',
        phone: '',
        birthday: '',
        gender: '',
        notification_time: `${7 + date.getTimeZoneOffset()}:00:00`
      }
    }
  }

  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields) && !this.state.emailError) {
      actions.auth.registerUser(this.state.form).then(() => {
        this.props.resetValidation()
        const { userStore: { authToken } } = this.props.rootStore
        this.cookie.set('skollerToken', authToken)
        browserHistory.push('/onboard')
      }).catch(() => false)
    }
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
            <div className='margin-top'><span onClick={this.onSeeSchools.bind(this)} style={{borderBottom: '1px solid white', cursor: 'pointer'}}>See supported schools</span></div>
          </div>
        )
        this.setState({ emailError: {type: 'info', message: emailInfo} })
      } else {
        this.setSchoolId(school)
        this.setState({emailError: null})
      }
    } else {
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
    newForm.student.school_id = school.id
    this.setState({form: newForm})
  }

  onAddMyUniversity () {

  }

  onSeeSchools () {

  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    //TODO Put university name on top of the email once school if chose fa fa-building
    return (
      <div id='sign-up-form'>
        <form className='form-padding'>
          <h1>Sign up</h1>
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
              <InputField
                containerClassName='margin-top'
                error={formErrors.email || (this.state.emailError && this.state.emailError.message)}
                label=''
                name='email'
                onBlur={this.onVerifyEmail.bind(this)}
                onChange={updateProperty}
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
          </div>
        </form>
        <div className='col-xs-12 center-text'>
          <button
            className='button margin-top margin-bottom form-button'
            onClick={this.onSubmit.bind(this)}
          >Take me there.</button>
        </div>
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
