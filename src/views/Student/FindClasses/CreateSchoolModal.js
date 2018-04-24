import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'adr_locality': {
    type: 'required'
  },
  'adr_region': {
    type: 'required'
  }
}

class CreateSchoolModal extends React.Component {
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
      universityError: false
    }
  }

  initializeFormData () {
    return {
      is_university: true,
      is_highschool: false,
      name: this.props.name || '',
      adr_locality: '',
      adr_region: ''
    }
  }

  /*
  * On submit, create school.
  */
  onSubmit (event) {
    event.preventDefault()

    if (!this.state.form.is_university && !this.state.form.is_highschool) {
      this.setState({universityError: true})
    } else {
      this.setState({universityError: false})
      if (this.props.validateForm(this.state.form, requiredFields)) {
        this.onCreateSchool(this.state.form)
      }
    }
  }

  onCreateSchool (form) {
    this.setState({loading: true})
    actions.classes.createSchool(form).then((school) => {
      this.props.onSubmit(school)
      this.props.onClose()
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form, universityError} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='cn-create-school-container'>
        <div className='cn-create-school-header'>
          Create a new school
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='is-university'>
            <CheckboxField
              containerClassName='margin-top margin-right'
              error={universityError}
              label='College'
              name='is_university'
              onChange={(name, value) => {
                let form = this.state.form
                form.is_university = value
                form.is_highschool = !value
                this.setState({form})
              }}
              value={form.is_university}
            />
            <small className='sub-header'>or</small>
            <CheckboxField
              containerClassName='margin-top margin-left'
              error={universityError}
              label='High school'
              name='is_highschool'
              onChange={(name, value) => {
                let form = this.state.form
                form.is_university = !value
                form.is_highschool = value
                this.setState({form})
              }}
              value={form.is_highschool}
            />
          </div>
          <InputField
            containerClassName='margin-top'
            error={formErrors.name}
            label='School name'
            name='name'
            onChange={updateProperty}
            placeholder='School name'
            value={form.name}
          />
        </form>
      </div>
    )
  }
}

CreateSchoolModal.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default ValidateForm(Form(CreateSchoolModal, 'form'))
