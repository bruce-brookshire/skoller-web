import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {wrapTimeHour} from '../../../utilities/time'
import {browserHistory} from 'react-router'
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
      phoneFocus: false
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
    browserHistory.push('useragreement')
  }

  onSubmit () {
    const form = this.mapForm()
    if (this.props.validateForm(form, requiredFields)) {
      this.props.onSubmit(form)
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
    if (this.props.enrollmentLink) {
      newForm.student.enrollment_link = this.props.enrollmentLink
    }
    if (this.props.customLink) {
      newForm.student.custom_link = this.props.customLink
    }
    return newForm
  }

  renderReferralCode () {
    const {formErrors, updateProperty} = this.props
    const {form} = this.state
    return (
      <div id="cn-referral-code">
        <InputField
          error={formErrors.student && formErrors.student.custom_link}
          label='Referral code?'
          name='student.custom_link'
          onChange={updateProperty}
          placeholder='Optional'
          value={form.student.custom_link}
        />
      </div>
    )
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
    const {formErrors, updateProperty, header, buttonText, isAdmin, referralCode} = this.props

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
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.student && formErrors.student.name_first}
                  label='First name'
                  id='sign-up.student.name_first'
                  name='student.name_first'
                  autoComplete='given-name'
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
                  id='sign-up.student.name_last'
                  name='student.name_last'
                  autoComplete='family-name'
                  onChange={updateProperty}
                  placeholder='Last name'
                  value={form.student.name_last}
                />
              </div>
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.email}
                label='Email'
                id='signup.email'
                autoComplete='email'
                name='email'
                onChange={(name, value) => {
                  updateProperty(name, value.trim())
                }}
                placeholder='Email'
                value={form.email}
              />
            </div>
            <div className='col-xs-12 cn-sign-up-form-phone'>
              <label className={'cn-input-label' + (formErrors.student && formErrors.student.phone ? ' error' : '') + (this.state.phoneFocus ? ' active' : '')}>Phone</label>
              <NumberFormat
                style={{width: '100%', borderColor: formErrors.student && formErrors.student.phone ? 'red' : 'null'}}
                error={formErrors.student && formErrors.student.phone}
                placeholder='Phone'
                format="+1 (###) ###-####"
                mask=" "
                onFocus={() => this.setState({phoneFocus: true})}
                onBlur={() => this.setState({phoneFocus: false})}
                autoComplete='tel'
                onValueChange={(values) => {
                  let form = this.state.form
                  form.student.phone = values.value
                  console.log(values.value)
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

export default ValidateForm(Form(SignUpForm, 'form'))
