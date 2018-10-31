import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'email_domain': {
    type: 'required'
  }
}

class EmailDomainForm extends React.Component {
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
      form: this.initializeFormData()
    }
  }

  /*
  * Method for intializing form data.
  * School email domain form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData () {
    return ({
      email_domain: ''
    })
  }

  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.onCreateEmailDomain(this.state.form)
    }
  }

  /*
  * Create a new email domain
  */
  onCreateEmailDomain (form) {
    actions.schools.createEmailDomains(this.props.school.id, form).then(() => {
      this.props.onSubmit()
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div>
        <div className='margin-top'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='row align-center justify-center margin-top'>
              <div className='col-xs-12 col-md-8'>
                <InputField
                  error={formErrors.email_domain}
                  name="email_domain"
                  onChange={updateProperty}
                  placeholder="Email domain after the @ sign"
                  value={form.email_domain}
                />
              </div>
              <div className='col-xs-12 col-md-4'>
                <button
                  className={`button full-width`}
                  type="submit"
                >Add</button>
              </div>
            </div>
          </form>
          <button className='button-invert full-width margin-top' onClick={() => this.props.onClose()}>Close</button>
        </div>
      </div>
    )
  }
}

EmailDomainForm.propTypes = {
  formErrors: PropTypes.object,
  school: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

export default ValidateForm(Form(EmailDomainForm, 'form'))
