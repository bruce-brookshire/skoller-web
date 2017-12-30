import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import actions from '../../../actions'
import {timezoneOptions} from '../../../utilities/time'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'adr_zip': {
    type: 'required'
  },
  'adr_state': {
    type: 'required'
  },
  'adr_line_1': {
    type: 'required'
  },
  'adr_city': {
    type: 'required'
  },
  'timezone': {
    type: 'required'
  },
  'student_email': {
    type: 'required'
  }
}

class SchoolDetailsForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      form: this.initializeFormData(this.props.school),
      loading: false
    }
  }

  /*
  * Method for intializing form data.
  * SchoolDetails form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, name, adr_zip, adr_state, adr_line_1, adr_city, timezone, email_domains} = formData

    const student_email = (email_domains && email_domains
      .filter(e => !e.is_professor_only).map(e => e.email_domain ).join(', ')) || ''
    const professor_email = (email_domains && email_domains
      .filter(e => e.is_professor_only).map(e => e.email_domain ).join(', ')) || ''
    return ({
      id: id || '',
      name: name || '',
      adr_zip: adr_zip || '',
      adr_state: adr_state || '',
      adr_line_1: adr_line_1 || '',
      adr_city: adr_city || '',
      timezone: timezone || '',
      student_email: student_email || '',
      professor_email: professor_email || ''
    })
  }

  /*
  * Determine whether the user is submiting updated school or a new school.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateSchool() : this.onUpdateSchool()
    }
  }

  /*
  * Create a new school
  */
  onCreateSchool () {
    this.setState({loading: true})
    actions.schools.createSchool(this.mapForm(this.state.form)).then((school) => {
      this.props.onSubmit(school)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update an existing school
  */
  onUpdateSchool () {
    this.setState({loading: true})
    actions.schools.updateSchool(this.mapForm(this.state.form)).then((school) => {
      this.props.onSubmit(school)
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  mapForm (f) {
    const form = {...f}
    form.email_domains = []
    form.email_domains.push({email_domain: form.student_email, is_professor_only: false})
    if (form.professor_email) form.email_domains.push({email_domain: form.professor_email, is_professor_only: true})
    delete form.student_email
    delete form.professor_email
    return form
  }

  render () {
    const {form, loading} = this.state
    const {formErrors, updateProperty} = this.props

    const disabledClass = loading ? 'disabled' : ''

    return (
      <div>
        <div className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.name}
                label="School name"
                name="name"
                onChange={updateProperty}
                placeholder="School name"
                value={form.name}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_line_1}
                label="School address"
                name="adr_line_1"
                onChange={updateProperty}
                placeholder="School address"
                value={form.adr_line_1}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_city}
                label="School city"
                name="adr_city"
                onChange={updateProperty}
                placeholder="School city"
                value={form.adr_city}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_state}
                label="School state"
                name="adr_state"
                onChange={updateProperty}
                placeholder="School state"
                value={form.adr_state}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_zip}
                label="School zip"
                name="adr_zip"
                onChange={updateProperty}
                placeholder="School zip code"
                value={form.adr_zip}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.student_email}
                label="Student email"
                name="student_email"
                onChange={updateProperty}
                placeholder="Student email"
                value={form.student_email}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.professor_email}
                label="Professor email"
                name="professor_email"
                onChange={updateProperty}
                placeholder="Professor email"
                value={form.professor_email}
              />
            </div>
            <div className='col-xs-12'>
              <SelectField
                containerClassName='margin-top'
                error={formErrors.timezone}
                label="School timezone"
                name="timezone"
                onChange={updateProperty}
                options={timezoneOptions}
                placeholder="Select timezone"
                value={form.timezone}
              />
            </div>
          </div>
          <button
            className={`button full-width margin-top ${disabledClass}`}
            disabled={this.state.loading}
            onClick={this.onSubmit.bind(this)}>Submit school</button>
          <button className='button-invert full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
        </div>
      </div>
    )
  }
}

SchoolDetailsForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(SchoolDetailsForm, 'form'))
