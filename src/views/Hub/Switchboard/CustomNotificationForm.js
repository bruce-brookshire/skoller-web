import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'

const requiredFields = {
  'password': {
    type: 'required'
  },
  'message': {
    type: 'required'
  }
}

class CustomNotificationForm extends React.Component {
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
      chars: 150
    }
  }

  initializeFormData() {
    return {
      password: '',
      message: ''
    }
  }

  /*
  * On submit post notification
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.sendNotification(this.state.form)
    }
  }

  /*
  * Send notification.
  */
  sendNotification (form) {
    this.setState({loading: true})
    actions.notifications.sendCustomNotification(form).then(() => {
      this.props.onSubmit()
      this.props.onClose()
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  updateCharCount (oldMsg, newMsg) {
    if (newMsg.length > 150) {
      return oldMsg;
    }
    else {
      this.setState({chars: 150 - newMsg.length})
      return newMsg
    }
  }

  render () {
    const {form, chars} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='row'>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.message}
              label="Message"
              name="message"
              onChange={(name, value) => {
                updateProperty(name, this.updateCharCount(form.message, value))
              }}
              placeholder="Custom message (max 150 characters)"
              value={form.message}
            />
            <div className='cn-char-count'>{chars}</div>
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.password}
              label="Verify Password"
              name="password"
              onChange={updateProperty}
              placeholder="Enter your admin password"
              type='password'
              value={form.password}
            />
          </div>
          <div className='col-xs-12'>
            <button
              className={`button full-width margin-top margin-bottom`}
              disabled={this.state.loading}
              type="submit"
            >Send</button>
          </div>
        </div>
      </form>
    )
  }
}

CustomNotificationForm.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(CustomNotificationForm, 'form'))