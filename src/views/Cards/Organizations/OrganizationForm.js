import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'custom_signup_link_id': {
    type: 'required'
  }
}

class OrganizationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: this.initializeForm(),
      customLinks: [],
      loading: false
    }
  }

  componentWillMount () {
    this.setState({loading: true})
    actions.signupLinks.getCustomLinks().then(customLinks => {
      this.setState({customLinks, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  initializeForm () {
    const {organization} = this.props
    return {
      name: organization ? organization.name : '',
      custom_signup_link_id: organization ?  organization.custom_signup_link_id : null
    }
  }

  onCreateOrganization (form) {
    actions.organizations.createOrganization(form).then(organization => {
      this.props.onSubmit(organization)
    }).catch(() => false)
  }

  onUpdateOrganization (form) {
    actions.organizations.updateOrganization(this.props.organization.id, form).then(organization => {
      this.props.onSubmit(organization)
    }).catch(() => false)
  }

  /*
  * On submit determine if user should create class or update it.
  */
  onSubmit (event) {
    const {form} = this.state
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      !(this.props.organization && this.props.organization.id) ? this.onCreateOrganization(form) : this.onUpdateOrganization(form)
    }
  }

  render () {
    const {formErrors, updateProperty} = this.props
    const {form, customLinks, loading} = this.state

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='row'>
          <div className='col-xs-5'>
            <InputField
              error={formErrors.name}
              label="Organization Name"
              name="name"
              onChange={updateProperty}
              placeholder="Enter the organization name"
              value={form.name}
            />
          </div>
          <div className='col-xs-5'>
            <SelectField
              error={formErrors.custom_signup_link_id}
              label="Organization Custom Link"
              name="custom_signup_link_id"
              onChange={updateProperty}
              options={customLinks.map(customLink => {
                return {value: customLink.id, name: customLink.name}
              })}
              placeholder="Select link"
              value={form.custom_signup_link_id}
            />
          </div>
          <div className='col-xs-2'>
            <button
              className={`button full-width margin-top margin-bottom`}
              disabled={loading}
              type="submit"
            >Send</button>
          </div>
        </div>
      </form>
    )
  }
}

OrganizationForm.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  validateForm: PropTypes.func,
  organization: PropTypes.object
}

export default ValidateForm(Form(OrganizationForm, 'form'))
