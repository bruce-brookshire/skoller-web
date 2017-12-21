import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'
import {checkIfFirstKey} from '../../utilities/object'

const styles = {
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
}

const requiredFields = {
  'email': {
    type: 'required'
  },
  'password': {
    type: 'required'
  }
}

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  handleEnter (e) {
    if(e.key == 'Enter'){
      this.onSubmit()
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.handleEnter.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleEnter.bind(this));
  }

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

  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.auth.authenticateUser(this.state.form).then(() => {
        this.props.resetValidation()
        const { userStore: { authToken , user } } = this.props.rootStore
        this.cookie.set('skollerToken', authToken)
        user.student ? browserHistory.push('/student/classes') : browserHistory.push('/hub')
      }).catch(() => false)
    }
  }

  onForgotPassword () {

  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div style={styles.row} >
        <div className='col-xs-10'>
          <form>
            <div className='row'>
              <div className='col-xs-6'>
                <InputField
                  containerClassName=''
                  error={formErrors.email}
                  showErrorMessage={checkIfFirstKey(formErrors, 'email')}
                  label=''
                  name='email'
                  onChange={updateProperty}
                  placeholder='School email'
                  value={form.email}
                />
              </div>
              <div className='col-xs-6' >
                <InputField
                  containerClassName=''
                  error={formErrors.password}
                  showErrorMessage={checkIfFirstKey(formErrors, 'password')}
                  label=''
                  name='password'
                  onChange={updateProperty}
                  placeholder='Password'
                  type='password'
                  value={form.password}
                  onKeyDown={(e)=>this.handleEnter(e)}
                  
                />
                <a className='right forgot-password' onClick={this.onForgotPassword.bind(this)}>Forgot password?</a>
              </div>
            </div>
          </form>
        </div>
        <div className='col-xs-2'>
          <a
            onClick={this.onSubmit.bind(this)}
          >Login</a>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  formErrors: PropTypes.object,
  resetValidation: PropTypes.func,
  rootStore: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(LoginForm, 'form'))
