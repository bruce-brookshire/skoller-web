import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {checkIfFirstKey} from '../../../utilities/object'

const requiredFields = {
  'email': {
    type: 'required'
  },
  'password': {
    type: 'required'
  }
}

class LoginForm extends React.Component {
  static propTypes = {
    formErrors: PropTypes.object,
    resetValidation: PropTypes.func,
    rootStore: PropTypes.object,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  /*
  * Initialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    return {
      email: '',
      password: ''
    }
  }

  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.auth.authenticateUser(this.state.form).then(() => {
        this.props.resetValidation()

        const { userStore: { authToken, user } } = this.props.rootStore
        this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 7 })

        if (user.student) {
          if (user.student.is_verified) {
            actions.classes.getStudentClasses().then((classes) => {
              classes.length > 0
                ? browserHistory.push('/student/classes')
                : browserHistory.push('/student/find-classes')
            }).catch(() => false)
          } else {
            browserHistory.push('/student/verify')
          }
        } else {
          browserHistory.push('/hub')
        }
      }).catch(() => false)
    }
  }

  onForgotPassword () {
    browserHistory.push('/forgot_password')
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <form className="form-login" onSubmit={this.onSubmit.bind(this)}>
        <div className='form-control'>
          <InputField
            containerClassName=''
            error={formErrors.email}
            showErrorMessage={checkIfFirstKey(formErrors, 'email') && false}
            label=''
            name='email'
            onChange={updateProperty}
            placeholder='School email'
            value={form.email}
          />
        </div>

        <div className='form-control' >
          <InputField
            containerClassName=''
            error={formErrors.password}
            showErrorMessage={checkIfFirstKey(formErrors, 'password') && false}
            label=''
            name='password'
            onChange={updateProperty}
            placeholder='Password'
            type='password'
            value={form.password}
          />
          <a className='right forgot-password' onClick={this.onForgotPassword.bind(this)}>Forgot password?</a>
        </div>

        <button type="submit" className="button">Login</button>
      </form>
    )
  }
}

export default ValidateForm(Form(LoginForm, 'form'))
