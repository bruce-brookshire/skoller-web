import React from 'react'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'

const styles = {
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
}

class LoginForm extends React.Component {
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
    return {
      username: '',
      password: ''
    }
  }

  onSubmit () {

  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <form>
        <div className='row' style={styles.row}>
          <div className='col-xs-4'>
            <InputField
              containerClassName=''
              error={formErrors.username}
              label=''
              name='username'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='username'
              value={form.username}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              containerClassName=''
              error={formErrors.password}
              label=''
              name='password'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='Password'
              value={form.password}
            />
          </div>
          <div className='col-xs-4'>
            <a
              onClick={this.onSubmit.bind(this)}
            >Login</a>
          </div>
        </div>
      </form>
    )
  }
}

export default ValidateForm(Form(LoginForm, 'form'))
