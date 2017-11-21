import React from 'react'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'

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
    return {
      name_first: '',
      name_last: '',
      email: '',
      password: '',
      phone_number: '',
      majors: ''

    }
  }

  onSubmit () {

  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <form>
        <h1>Sign up</h1>
        <div className='row'>
          <div className='col-xs-6'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.first_name}
              label=''
              name='first_name'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='First name'
              value={form.first_name}
            />
          </div>
          <div className='col-xs-6'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.last_name}
              label=''
              name='last_name'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='Last name'
              value={form.last_name}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.email}
              label=''
              name='email'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='Email'
              value={form.email}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.password}
              label=''
              name='password'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='Password'
              type='password'
              value={form.password}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.phone_number}
              label=''
              name='phone_number'
              onBlur={() => console.log('onBlur')}
              onChange={updateProperty}
              onFocus={() => console.log('onFocus')}
              placeholder='Phone number'
              value={form.phone_number}
            />
          </div>
          <div className='col-xs-12'>
            <button
              className='button full-width margin-top margin-bottom'
              onClick={this.onSubmit.bind(this)}
            >Take me there, baby.</button>
          </div>
        </div>
      </form>
    )
  }
}

export default ValidateForm(Form(SignUpForm, 'form'))
