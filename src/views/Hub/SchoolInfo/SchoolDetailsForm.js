import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'adr_zip': {
    type: 'required'
  },
  'adr_region': {
    type: 'required'
  },
  'adr_locality': {
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
    const {id, name, adr_zip: zip, adr_region: region, adr_locality: locality, timezone, short_name: shortName} = formData
    return ({
      id: id || '',
      name: name || '',
      adr_zip: zip || '',
      adr_region: region || '',
      adr_locality: locality || '',
      timezone: timezone || '',
      short_name: shortName || ''
    })
  }

  mapForm (form) {
    let newForm = form
    newForm.adr_country = 'us'
    return newForm
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
                error={formErrors.short_name}
                label="Script Code"
                name="short_name"
                onChange={updateProperty}
                placeholder="Script Code"
                value={form.short_name}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_locality}
                label="School city"
                name="adr_locality"
                onChange={updateProperty}
                placeholder="School city"
                value={form.adr_locality}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.adr_region}
                label="School state"
                name="adr_region"
                onChange={updateProperty}
                placeholder="School state"
                value={form.adr_region}
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
  validateForm: PropTypes.func,
  school: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
}

export default ValidateForm(Form(SchoolDetailsForm, 'form'))

class InfoButton extends React.Component {
  render () {
    return (
      <div className='info-button' style={{fontSize: '10px', paddingLeft: '2px', paddingTop: '5px'}}>
        <i className='fa fa-info-circle' style={{marginRight: '2px'}} />
        <span>{this.props.message}</span>
      </div>
    )
  }
}

InfoButton.propTypes = {
  message: PropTypes.string
}
