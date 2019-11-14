import React from './node_modules/react'
import PropTypes from './node_modules/prop-types'
import {browserHistory} from './node_modules/react-router'
import {Cookies} from './node_modules/react-cookie'
import {Form, ValidateForm} from './node_modules/react-form-library'
import {InputField} from '../Form'
import actions from '../../actions'
import {checkIfFirstKey} from '../../utilities/object'

const requiredFields = {
  'email': {
    type: 'required'
  },
  'password': {
    type: 'required'
  }
}

class AdminLogin extends React.Component {
  static propTypes = {
    formErrors: PropTypes.object,
    resetValidation: PropTypes.func,
    rootStore: PropTypes.object,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
    onSubmit: PropTypes.func
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
      console.log(this.state.form)
      actions.auth.authenticateUser(this.state.form).then(() => {
        this.props.resetValidation()

        const { userStore: { authToken } } = this.props.rootStore
        this.cookie.remove('skollerToken', { path: '/' })
        this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 270, path: '/' })
        if (this.props.onSubmit) {
          this.props.onSubmit()
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
            placeholder='Email'
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

export default ValidateForm(Form(AdminLogin, 'form'))
