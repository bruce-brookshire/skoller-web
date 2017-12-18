import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import actions from '../../../../actions'

const requiredFields = {
  'name_last': {
    type: 'required'
  }
}

class ProfessorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Method for initializing the state.
  */
  initializeState () {
    return {
      form: this.initializeFormData(this.props.cl.professor)
    }
  }

  /*
  * Method for intializing form data.
  * Professor form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, name_first, name_last, email, phone, office_location, office_availability} = formData

    return ({
      id: id || '',
      name_first: name_first || '',
      name_last: name_last || '',
      email: email || '',
      phone: phone || '',
      office_location: office_location || '',
      office_availability: office_availability || ''
    })
  }

  /*
  * Determine whether the user is submiting updated professor or a new professor.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateProfessor() : this.onUpdateProfessor()
    }
  }

  /*
  * Create a new professor
  */
  onCreateProfessor () {
    actions.professors.createProfessor(this.state.form).then((professor) => {
      this.props.onSubmit(professor)
    }).catch(() => false)
  }

  /*
  * Update an existing professor
  */
  onUpdateProfessor () {
    actions.professors.updateProfessor(this.state.form).then((professor) => {
      this.props.onSubmit(professor)
      this.setState({form: this.initializeFormData(professor)})
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='col-xs-12'>
        <InputField
          containerClassName='margin-top'
          error={formErrors.name_first}
          label='First Name'
          name='name_first'
          onChange={updateProperty}
          placeholder='First Name'
          value={form.name_first}
        />
        <InputField
          containerClassName='margin-top'
          error={formErrors.name_last}
          label='Last Name'
          name='name_last'
          onChange={updateProperty}
          placeholder='Last Name'
          value={form.name_last}
        />
        <InputField
          containerClassName='margin-top'
          error={formErrors.email}
          label='Email'
          name='email'
          onChange={updateProperty}
          placeholder='Email'
          value={form.email}
        />
        <InputField
          containerClassName='margin-top'
          error={formErrors.phone}
          label='Phone Number'
          name='phone'
          onChange={updateProperty}
          placeholder='Phone Number'
          type='number'
          value={form.phone}
        />
        <InputField
          containerClassName='margin-top'
          error={formErrors.office_location}
          label='Office'
          name='office_location'
          onChange={updateProperty}
          placeholder='Office'
          value={form.office_location}
        />
        <InputField
          containerClassName='margin-top'
          error={formErrors.office_availability}
          label='Office hours'
          name='office_availability'
          onChange={updateProperty}
          placeholder='Office hours'
          value={form.office_availability}
        />
        <button
          className='button full-width margin-top margin-bottom'
          onClick={this.onSubmit.bind(this)}>Submit professor</button>
      </div>
    )
  }
}

ProfessorForm.propTypes = {
  cl: PropTypes.object,
  form: PropTypes.object,
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(ProfessorForm, 'form'))
