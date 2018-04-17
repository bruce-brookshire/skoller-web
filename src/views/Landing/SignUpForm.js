import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField} from '../../components/Form'
import actions from '../../actions'
import {maskPhoneNumber} from '../../utilities/mask'

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
  'student.phone': {
    type: 'phone'
  }
}

class SignUpForm extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  componentWillMount () {
  }

  initializeState () {
    return {
      form: this.initializeFormData(),
      emailError: null,
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
        phone: '',
        birthday: '',
        gender: '',
        is_university: null,
        is_highschool: null,
        notification_time: `${7 + (date.getTimezoneOffset() / 60)}:00:00`,
        future_reminder_notification_time: `${17 + (date.getTimezoneOffset() / 60)}:00:00`
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
    newForm.student.phone = newForm.student.phone.replace(/-/g, '')
    return newForm
  }

  // testEmailFormat (email) {
  //   const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  //   return regEx.test(email)
  // }

  // onAddMyUniversity () {
  //   window.location.href = 'mailto:support@skoller.co?Subject=Add My School - ' + this.state.form.email
  // }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div id='sign-up-form'>
        <form className='form-padding'>
          <h2>Sign up <small className='sub-header'>(it&apos;s free!)</small></h2>
          <div className='is-university'>
            <CheckboxField
              containerClassName='margin-top margin-right'
              error={formErrors.student && formErrors.student.is_university}
              label='College student'
              name='student.is_university'
              onChange={updateProperty}
              value={form.student.is_university}
            />
            <small className='sub-header'>or</small>
            <CheckboxField
              containerClassName='margin-top margin-left'
              error={formErrors.student && formErrors.student.is_highschool}
              label='High school Student'
              name='student.is_highschool'
              onChange={updateProperty}
              value={form.student.is_highschool}
            />
          </div>
          <div className='row'>
            <div className='col-xs-6'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.student && formErrors.student.name_first}
                label='First name'
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
                label='Last name'
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
                showErrorMessage={this.state.emailError && this.state.emailError.message}
                label='School email'
                name='email'
                onChange={updateProperty}
                placeholder='School email'
                value={form.email}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.password}
                label='Password'
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
                label='Phone'
                name='student.phone'
                onChange={(name, value) => {
                  updateProperty(name, maskPhoneNumber(form.student.phone, value))
                }}
                placeholder='Phone'
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
