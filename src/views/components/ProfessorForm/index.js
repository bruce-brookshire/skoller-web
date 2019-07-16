import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import {maskPhoneNumber} from '../../../utilities/mask'

const requiredFields = {
  'name_first': {
    type: 'required'
  },
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
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false,
      editMode: this.props.professor ? true : false // eslint-disable-line no-unneeded-ternary
    }
  }

  initializeFormData () {
    const {professor} = this.props
    return {
      id: (professor && professor.id) || null,
      name_first: (professor && professor.name_first) || '',
      name_last: (professor && professor.name_last) || '',
      email: (professor && professor.email) || '',
      phone: (professor && professor.phone) || '',
      office_location: (professor && professor.office_location) || '',
      office_availability: (professor && professor.office_availability) || ''
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

  onUpdateProfessor (form) {
    this.setState({loading: true})
    actions.professors.updateProfessor(form).then((professor) => {
      this.props.onSubmit(professor)
      this.setState({loading: false})
      this.props.onClose()
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * On submit, create professor.
  */
  onSubmit (event) {
    const {professor} = this.props
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      professor && professor.id
        ? this.onUpdateProfessor(this.state.form)
        : this.onCreateProfessor(this.state.form)
    }
  }

  exportProfessor (professor) {
    if (this.props.exportProfessor) {
      this.props.exportProfessor(professor)
    }
  }

  render () {
    const {form, editMode} = this.state
    const {formErrors, updateProperty, isUniversity} = this.props

    return (
      <div className='cn-create-professor-container'>
        <div className='cn-create-professor-header'>
          {!editMode ? 'Add new ' : 'Edit '}{isUniversity ? 'professor' : 'teacher'}
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
          >{!editMode ? 'Save new ' : 'Update '}{isUniversity ? 'professor' : 'teacher'}</button>
        </form>
        <div className='cn-create-professor-footer'>
          {!editMode && `We'll use this info for the ${isUniversity ? 'professor' : 'teacher'}'s other classes.`}
        </div>
      </div>
    )
  }
}

ProfessorForm.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  schoolId: PropTypes.number.isRequired,
  isUniversity: PropTypes.bool,
  professor: PropTypes.object,
  exportProfessor: PropTypes.func
}

export default ValidateForm(Form(ProfessorForm, 'form'))
