import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {maskPhoneNumber} from '../../../utilities/mask'
import {wrapTimeHour} from '../../../utilities/time'

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
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      form: this.initializeFormData()
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
        phone: '',
        birthday: '',
        gender: '',
        notification_time: `${wrapTimeHour(date, 7)}:00:00`,
        future_reminder_notification_time: `${wrapTimeHour(date, 17)}:00:00`
      }
    }
  }

  onSubmit () {
    const form = this.mapForm()
    if (this.props.validateForm(form, requiredFields)) {
      actions.auth.registerUser(form).then(() => {
        this.props.resetValidation()
        this.props.onSubmit()
      }).catch(() => false)
    }
  }

  onSubmitAdmin () {
    const form = this.mapForm()
    if (this.props.validateForm(form, requiredFields)) {
      actions.auth.registerUserAdmin(form).then((user) => {
        this.props.resetValidation()
        this.props.onSubmit(user)
      }).catch(() => false)
    }
  }

  mapForm () {
    let newForm = JSON.parse(JSON.stringify(this.state.form))
    newForm.student.phone = newForm.student.phone.replace(/-/g, '')
    if (this.props.link) {
      newForm.student.link = this.props.link
    }
    if (this.props.customLink) {
      newForm.student.custom_link = this.props.customLink
    }
    return newForm
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, header, buttonText, isAdmin} = this.props

    return (
      <div className='cn-sign-up-form'>
        <form className='form-padding'>
          {header && <h2>{header}</h2>}
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
                error={formErrors.email}
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
          <div className='center-text'>
            <button
              className='button margin-top margin-bottom full-width'
              type='button'
              onClick={isAdmin ? this.onSubmitAdmin.bind(this) : this.onSubmit.bind(this)}
            >{buttonText || 'Submit'}</button>
          </div>
        </form>
      </div>
    )
  }
}

SignUpForm.propTypes = {
  formErrors: PropTypes.object,
  resetValidation: PropTypes.func,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  isAdmin: PropTypes.bool,
  link: PropTypes.string,
  customLink: PropTypes.string
}

export default ValidateForm(Form(SignUpForm, 'form'))
