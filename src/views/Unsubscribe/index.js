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
      this.setState({emailPreferences: results.email_preferences, userUnsubscribed: results.user_unsubscribed})
    })
    actions.emailTypes.getMinEmailTypes().then(emailTypes => {
      this.setState({emailTypes, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  initializeForm () {
    return {
      email: ''
    }
  }

  /*
  * On submit forgot password.
  */
  onSubmit () {
    const {form, emailPreferences, userUnsubscribed} = this.state
    const {params} = this.props
    if (this.props.validateForm(this.state.form, requiredFields)) {
      let newForm = {
        email: form.email,
        email_preferences: emailPreferences,
        user_unsubscribed: userUnsubscribed
      }
      actions.users.updateEmailPreferences(params.id, newForm).then(() => {
        this.setState({successful: true})
      }).catch(() => false)
    }
  }

  renderFields () {
    const {emailPreferences, emailTypes} = this.state
    return emailTypes.map((type) => {
      return (
        <div className='margin-top' key={type.id}>
          <div>
            {type.name}
          </div>
          <CheckboxField
            name={type.name}
            value={emailPreferences && emailPreferences.find(pref => pref.email_type_id === type.id) ? emailPreferences.find(pref => pref.email_type_id === type.id).is_unsubscribed : false}
            onChange={(name, value) => {
              let emailPreferencesNew = emailPreferences
              let index = emailPreferences.findIndex(pref => pref.email_type_id === type.id)
              let newPreference = {email_type_id: type.id, is_unsubscribed: value}
              if (index > -1) {
                emailPreferencesNew.splice(index, 1, newPreference)
              } else {
                emailPreferencesNew.push(newPreference)
              }
              this.setState({emailPreferences: emailPreferencesNew})
            }}
          />
        </div>
      )
    })
  }

  render () {
    const {form, loading, userUnsubscribed, successful} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div className='cn-unsubscribe-container'>
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
            name='userUnsubscribed'
            value={userUnsubscribed}
            onChange={(name, value) => {
              this.setState({userUnsubscribed: value})
            }}
          />
          {!loading && !userUnsubscribed && this.renderFields()}
          <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Unsubscribe</button>
          {successful && <span>
              Your settings have been updated!
          </span>}
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
