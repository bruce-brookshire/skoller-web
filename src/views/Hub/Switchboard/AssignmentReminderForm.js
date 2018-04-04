import React from 'react'
import PropTypes from 'prop-types'
import {InputField, CheckboxField, SelectField} from '../../../components/Form'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'

const requiredFields = {
  'message': {
    type: 'required'
  },
  'assignment_reminder_notification_topic_id': {
    type: 'required'
  }
}

class AssignmentReminderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      topics: [],
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    return {
      message: '',
      assignment_reminder_notification_topic_id: this.state && this.state.form ? this.state.form.assignment_reminder_notification_topic_id : null,
      is_plural: false
    }
  }

  componentWillMount () {
    actions.notifications.getAssignmentReminderTopics().then((topics) => {
      this.setState({topics})
    }).catch(() => false)
  }

  /*
  * On submit post notification
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.addReminderNotification(this.state.form)
      this.setState({form: this.initializeFormData()})
    }
  }

  /*
  * Send notification.
  */
  addReminderNotification (form) {
    actions.notifications.addReminderNotification(form).then((reminder) => {
      this.props.onSubmit()
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='row align-center'>
          <div className='col-xs-12 col-md-6'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.message}
              name="message"
              onChange={updateProperty}
              placeholder="Custom message. Use [num] to insert assign number and [days] for future reminders."
              value={form.message}
            />
          </div>
          <div className='col-xs-4 col-md-2'>
            <SelectField
              containerClassName='margin-top'
              error={formErrors.assignment_reminder_notification_topic_id}
              placeholder="Tell me when?"
              name="assignment_reminder_notification_topic_id"
              onChange={updateProperty}
              value={form.assignment_reminder_notification_topic_id}
              options={this.state.topics}
            />
          </div>
          <div className='col-xs-4 col-md-2'>
            <CheckboxField
              containerClassName='margin-top'
              error={formErrors.is_plural}
              label="Plural?"
              name="is_plural"
              onChange={updateProperty}
              value={form.is_plural}
            />
          </div>
          <div className='col-xs-4 col-md-2'>
            <button
              className={`button full-width margin-top margin-bottom`}
              type="submit"
            >Add</button>
          </div>
        </div>
      </form>
    )
  }
}

AssignmentReminderForm.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onSubmit: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(AssignmentReminderForm, 'form'))
