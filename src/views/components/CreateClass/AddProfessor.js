import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'

class AddProfessor extends React.Component {
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
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  onSubmit () {
    this.props.onSubmit(this.state.form)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='margin-top'>
        <form>
          <h5>Who teaches this class?</h5>
          <div className='row'>
            <div className='col-xs-12 col-md-3 col-lg-3'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.first_name}
                label='First name'
                name='first_name'
                onBlur={() => console.log('onBlur')}
                onChange={updateProperty}
                onFocus={() => console.log('onFocus')}
                placeholder='First name'
                value={form.first_name}
              />
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.last_name}
                label='Last name'
                name='last_name'
                onBlur={() => console.log('onBlur')}
                onChange={updateProperty}
                onFocus={() => console.log('onFocus')}
                placeholder='Last name'
                value={form.last_name}
              />
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.email}
                label='Email'
                name='email'
                onBlur={() => console.log('onBlur')}
                onChange={updateProperty}
                onFocus={() => console.log('onFocus')}
                placeholder='University Email'
                value={form.email}
              />
            </div>
            <div className='col-xs-12 col-md-3 col-lg-3' style={{alignSelf: 'flex-end'}}>
              <button className='button full-width margin-top' style={{height: '32px', padding: 0}} onClick={this.onSubmit.bind(this)}>Add</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

AddProfessor.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func
}

export default ValidateForm(Form(AddProfessor, 'form'))
