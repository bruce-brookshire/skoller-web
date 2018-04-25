import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField, SelectField} from '../../../components/Form'
import actions from '../../../actions'
import Loading from '../../../components/Loading'

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
      statesLoading: false,
      universityError: false,
      states: []
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

  componentWillMount () {
    this.setState({statesLoading: true})
    actions.schools.getStates().then((states) => {
      this.setState({states, statesLoading: false})
    }).catch(() => { this.setState({statesLoading: false}) })
  }

  mapForm (form) {
    let newForm = form
    newForm.adr_country = 'us'
    return newForm
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
        const form = this.mapForm(this.state.form)
        this.onCreateSchool(form)
      }
    }
  }

  onCreateSchool (form) {
    this.setState({loading: true})
    actions.schools.createSchool(form).then((school) => {
      this.props.onSubmit(school)
      this.setState({loading: false})
      this.props.onClose()
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
          <InputField
            containerClassName='margin-top'
            error={formErrors.adr_locality}
            label='School city'
            name='adr_locality'
            onChange={updateProperty}
            placeholder='School city'
            value={form.adr_locality}
          />
          {this.state.statesLoading ? <Loading /> : <SelectField
            containerClassName='margin-top'
            error={formErrors.adr_region}
            label='School state'
            name='adr_region'
            onChange={updateProperty}
            placeholder='Select state'
            value={form.adr_region}
            options={this.state.states}
          />}
          <button
            className='button margin-top margin-bottom form-button'
          >Save new school</button>
        </form>
        <div className='cn-create-school-footer'>
          We&apos;ll use this info for all classes at this school
        </div>
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
