import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
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
  },
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
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
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
        gender: ''
      }
    }
  }

  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.auth.registerUser(this.state.form).then(() => {
        this.props.resetValidation()
        browserHistory.push('/onboard')
      }).catch(() => false)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div>
        <form>
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
                error={formErrors.email}
                label=''
                name='email'
                onChange={updateProperty}
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
        <div className='col-xs-12'>
          <button
            className='button full-width margin-top margin-bottom'
            onClick={this.onSubmit.bind(this)}
          >Take me there, baby.</button>
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
