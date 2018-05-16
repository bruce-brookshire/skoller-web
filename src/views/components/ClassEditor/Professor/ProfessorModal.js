import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import actions from '../../../../actions'
import {maskPhoneNumber} from '../../../../utilities/mask'

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

class ProfessorModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false
    }
  }

  initializeFormData () {
    return {
      name_first: '',
      name_last: '',
      email: '',
      phone: '',
      office_location: '',
      office_availability: ''
    }
  }

  onCreateProfessor (form) {
    this.setState({loading: true})
    actions.professors.createProfessor(form, this.props.schoolId).then((professor) => {
      this.props.onSubmit(professor)
      this.setState({loading: false})
      this.props.onClose()
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * On submit, create professor.
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.onCreateProfessor(this.state.form)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, isUniversity} = this.props

    return (
      <div className='cn-create-professor-container'>
        <div className='cn-create-professor-header'>
          Add new {isUniversity ? 'professor' : 'teacher'}
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='cn-create-professor-row'>
            <div className='cn-create-professor-name'>
              <InputField
                error={formErrors.name_first}
                label='First name'
                name='name_first'
                onChange={updateProperty}
                placeholder='First name'
                value={form.name_first}
              />
            </div>
            <div className='cn-create-professor-name'>
              <InputField
                error={formErrors.name_last}
                label='Last name'
                name='name_last'
                onChange={updateProperty}
                placeholder='Last name'
                value={form.name_last}
              />
            </div>
          </div>
          <div className='cn-create-professor-row'>
            <InputField
              error={formErrors.email}
              label='Email address'
              name='email'
              onChange={updateProperty}
              placeholder='Email address'
              value={form.email}
            />
          </div>
          <div className='cn-create-professor-row'>
            <InputField
              error={formErrors.phone}
              label='Phone Number'
              name='phone'
              onChange={(name, value) => {
                updateProperty(name, maskPhoneNumber(form.phone, value))
              }}
              placeholder='Phone Number'
              value={form.phone}
            />
          </div>
          <div className='cn-create-professor-row'>
            <InputField
              error={formErrors.office_location}
              label='Office location'
              name='office_location'
              onChange={updateProperty}
              placeholder='Office location'
              value={form.office_location}
            />
          </div>
          <div className='cn-create-professor-row'>
            <InputField
              error={formErrors.office_availability}
              label='Office hours'
              name='office_availability'
              onChange={updateProperty}
              placeholder='Office hours'
              value={form.office_availability}
            />
          </div>
          <button
            className='button margin-top margin-bottom form-button'
          >Save new {isUniversity ? 'professor' : 'teacher'}</button>
        </form>
        <div className='cn-create-professor-footer'>
          We&apos;ll use this info for the {isUniversity ? 'professor' : 'teacher'}&apos;s other classes.
        </div>
      </div>
    )
  }
}

ProfessorModal.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schoolId: PropTypes.number.isRequired,
  isUniversity: PropTypes.bool
}

export default ValidateForm(Form(ProfessorModal, 'form'))
