import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {CheckboxField, InputField} from '../../components/Form'
import actions from '../../actions'

const requiredFields = {
  'email': {
    type: 'required'
  }
}

class Unsubscribe extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      emailPreferences: null,
      userUnsubscribed: false,
      successful: false,
      emailTypes: [],
      loading: false,
      form: this.initializeForm()
    }
  }

  componentWillMount () {
    const {params} = this.props
    this.setState({loading: true})
    actions.users.getEmailPreferences(params.id).then(results => {
      this.setState({emailPreferences: results.emailPreferences, userUnsubscribed: results.user_unsubscribed})
    })
    actions.users.getEmailTypes().then(emailTypes => {
      this.setState({emailTypes, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  initializeForm () {
    return {
      email: '',
      updates: [],
      unsubscribeAll: false
    }
  }

  /*
  * On submit forgot password.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      if (this.state.emailPreferences) {
        actions.users.updateEmailPreferences(this.state.form).then(() => {
          this.setState({successful: true})
        }).catch(() => false)
      } else {
        actions.users.createEmailPreferences(this.state.form).then(() => {
          this.setState({successful: true})
        }).catch(() => false)
      }
    }
  }

  renderFields () {
    const {form} = this.state
    const {updateProperty} = this.props
    return this.state.emailTypes.map((type) => {
      return (
        <div className='margin-top' key={type.id}>
          <div>
            {type.name}
          </div>
          <CheckboxField
            name={type.name}
            value={form.updates.find(upd => upd.id === type.id)}
            onChange={updateProperty}
          />
        </div>
      )
    })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='cn-forgot-password-container'>
        <div className='content-landing'>
          <div>
            <h1>
              <img src='../../../src/assets/images/logo-wide-blue@1x.png' style={{height: '5rem'}} />
              <span style={{display: 'block'}}>Email Preferences</span>
            </h1>
            <span>
              Enter the email address associated with your Skoller account.
            </span>
            <div className='margin-top'>
              <InputField
                className=""
                placeholder="Email Address"
                name="email"
                value={form.email}
                error={formErrors.email}
                onChange={updateProperty}
              />
            </div>
          </div>
          <div className='margin-top'>
            Unsubscribe from all marketing emails
          </div>
          <CheckboxField
            name='unsubscribeAll'
            value={form.unsubscribeAll}
            onChange={updateProperty}
          />
          {this.renderFields()}
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    )
  }
}

Unsubscribe.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  params: PropTypes.object
}

export default ValidateForm(Form(Unsubscribe, 'form'))
