import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'name_first': {
    type: 'required'
  },
  'name_last': {
    type: 'required'
  },
  'email': {
    type: 'email'
  }
}

class AddProfessor extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state.
  */
  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  /*
  * Intitialize form data.
  * Professor form data.
  */
  initializeFormData () {
    return {
      name_first: '',
      name_last: '',
      email: ''
    }
  }

  /*
  * Create a new professor.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      const {userStore: {user: {student: {school}}}} = this.props.rootStore

      actions.professors.createProfessor(this.state.form, school.periods[0].id).then((professor) => {
        this.props.onSubmit(professor)
      }).catch(() => false)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='margin-top'>
        <h5>Who teaches this class?</h5>
        <div className='row'>
          <div className='col-xs-12 col-md-3 col-lg-3'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name_first}
              label='First name'
              name='name_first'
              onChange={updateProperty}
              placeholder='First name'
              value={form.name_first}
            />
          </div>
          <div className='col-xs-12 col-md-3 col-lg-3'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name_last}
              label='Last name'
              name='name_last'
              onChange={updateProperty}
              placeholder='Last name'
              value={form.name_last}
            />
          </div>
          <div className='col-xs-12 col-md-3 col-lg-3'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.email}
              label='Email'
              name='email'
              onChange={updateProperty}
              placeholder='University Email'
              value={form.email}
            />
          </div>
          <div className='col-xs-12 col-md-3 col-lg-3' style={{alignSelf: 'flex-end'}}>
            <button className='button full-width margin-top' style={{height: '32px', padding: 0}} onClick={this.onSubmit.bind(this)}>Add</button>
          </div>
        </div>
      </div>
    )
  }
}

AddProfessor.propTypes = {
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(AddProfessor, 'form'))
