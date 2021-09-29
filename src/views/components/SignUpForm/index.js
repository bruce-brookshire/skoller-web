import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {wrapTimeHour} from '../../../utilities/time'
import { withRouter } from 'react-router-dom'
import NumberFormat from 'react-number-format'

const requiredFields = {
  'email': {
    type: 'email'
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
      form: this.initializeFormData(),
      phoneFocus: false,
      nameFirstFocus: false,
      nameLastFocus: false,
      emailFocus: false,
      phoneError: false,
      nameFirstError: false,
      nameLastError: false,
      emailError: false
    }
  }

  initializeFormData () {
    const date = new Date()

    return {
      email: '',
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

  onClickTerms () {
    this.props.history.push('useragreement')
  }

  validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  validateForm () {
    if (
      (typeof this.state.form.student.name_first === 'string' || this.state.form.student.name_first === '') &&
      (typeof this.state.form.student.name_last === 'string' || this.state.form.student.name_last === '') &&
      (this.state.form.student.phone ? this.state.form.student.phone.length === 10 : false) &&
      this.validateEmail(this.state.form.email)
    ) {
      return true
    } else {
      if (typeof this.state.form.student.name_first !== 'string' || this.state.form.student.name_first === '') {
        this.setState({nameFirstError: true})
      }
      if (typeof this.state.form.student.name_last !== 'string' || this.state.form.student.name_last === '') {
        this.setState({nameLastError: true})
      }
      if (this.this.state.form.student.phone ? this.this.state.form.student.phone.length !== 10 : true) {
        this.setState({phoneError: true})
      }
      if (!this.validateEmail(this.state.form.email)) {
        this.setState({emailError: true})
      }
      return false
    }
  }

  onSubmit () {
    const form = this.mapForm()
    if (this.validateForm()) {
      this.props.onSubmit(form)
    }
  }

  onSubmitAdmin () {
    const form = this.mapForm()
    if (this.validateForm()) {
      actions.auth.registerUserAdmin(form).then((user) => {
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
    if (this.props.enrollmentLink) {
      newForm.student.enrollment_link = this.props.enrollmentLink
    }
    if (this.props.customLink) {
      newForm.student.custom_link = this.props.customLink
    }
    return newForm
  }

  renderTerms () {
    return (
      <div className='cn-terms-of-use margin-bottom'>
        By signing up, you agree to our <a onClick={this.onClickTerms.bind(this)}>Terms of Use</a>.
      </div>
    )
  }

  render () {
    const {form} = this.state
    const {updateProperty, header, buttonText, isAdmin} = this.props

    return (
      <div className='cn-sign-up-form'>
        <form className='form-padding'>
          <div id='cn-sign-up-form-header'>
            {header && <div>{header}</div>}
          </div>
          <div className='row'>
            <div className='double-input-row'
              style={{
                display: 'flex',
                flexDirection: 'row',
                maxWidth: '100%'
              }}
            >
              <div className='col-xs-6'>
                <div className='cn-input-container margin-top'>
                  <label className={'cn-input-label' + (this.state.nameFirstError ? ' error' : '') + (this.state.nameFirstFocus ? ' active' : '')}>First name</label>
                  <input
                    className='cn-form-input'
                    style={
                      {width: '100%', borderColor: this.state.nameFirstError ? 'red' : 'null'}
                    }
                    id='sign-up.student.name_first'
                    name='student.name_first'
                    autoComplete='first-name'
                    onChange={(e) => {
                      let form = this.state.form
                      form.student.name_first = e.target.value
                      this.setState({
                        form
                      })
                    }}
                    placeholder='First name'
                    value={form.student.name_first}
                    onFocus={() => this.setState({nameFirstFocus: true})}
                    onBlur={() => this.setState({nameFirstFocus: false})}
                  />
                </div>
              </div>
              <div className='col-xs-6'>
                <div className='cn-input-container margin-top'>
                  <label className={'cn-input-label' + (this.state.nameLastError ? ' error' : '') + (this.state.nameLastFocus ? ' active' : '')}>Last name</label>
                  <input
                    className='cn-form-input'
                    style={
                      {width: '100%', borderColor: this.state.nameLastError ? 'red' : 'null'}
                    }
                    id='sign-up.student.name_last'
                    name='student.name_last'
                    autoComplete='family-name'
                    onChange={(e) => {
                      let form = this.state.form
                      form.student.name_last = e.target.value
                      this.setState({
                        form
                      })
                    }}
                    placeholder='Last name'
                    value={form.student.name_last}
                    onFocus={() => this.setState({nameLastFocus: true})}
                    onBlur={() => this.setState({nameLastFocus: false})}
                  />
                </div>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='cn-input-container margin-top'>
                <label className={'cn-input-label' + (this.state.emailError ? ' error' : '') + (this.state.emailFocus ? ' active' : '')}>Email</label>
                <input
                  style={
                    {width: '100%', borderColor: this.state.emailError ? 'red' : 'null'}
                  }
                  className='cn-form-input'
                 error={this.state.emailError}
                  id='sign-up.email'
                  autoComplete='email'
                  name='email'
                  onFocus={() => this.setState({emailFocus: true})}
                  onBlur={() => this.setState({emailFocus: false})}
                  onChange={(e) => {
                    let form = this.state.form
                    form.email = e.target.value
                    this.setState({
                      form
                    })
                  }}
                  placeholder='Email'
                  value={form.email}
                />
              </div>
            </div>
            <div className='col-xs-12 cn-sign-up-form-phone'>
              <label className={'cn-input-label' + (this.state.phoneError ? ' error' : '') + (this.state.phoneFocus ? ' active' : '')}>Phone</label>
              <NumberFormat
                style={
                  {width: '100%', borderColor: this.state.phoneError ? 'red' : 'null'}
                }
                // error={formErrors.student && formErrors.student.phone}
                placeholder='Phone'
                format="+1 (###) ###-####"
                mask=" "
                onFocus={() => this.setState({phoneFocus: true})}
                onBlur={() => this.setState({phoneFocus: false})}
                autoComplete='tel'
                onValueChange={(values) => {
                  let form = this.state.form
                  form.student.phone = values.value
                  this.setState({
                    form
                  })
                }}
                type="tel"
              />
            </div>
          </div>
          <div className='center-text'>
            <button
              className='button margin-top full-width'
              type='button'
              onClick={isAdmin ? this.onSubmitAdmin.bind(this) : this.onSubmit.bind(this)}
            >{buttonText || 'Submit'}</button>
          </div>
          {this.renderTerms()}
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
  customLink: PropTypes.string,
  referralCode: PropTypes.bool,
  enrollmentLink: PropTypes.string
}

export default withRouter(SignUpForm, 'form')
