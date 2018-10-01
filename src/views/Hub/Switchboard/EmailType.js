import React from 'react'
import PropTypes from 'prop-types'
import {CheckboxField} from '../../../components/Form'
import actions from '../../../actions'

class EmailType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: this.initializeForm()
    }
  }

  initializeForm () {
    const {emailType} = this.props

    return {
      is_active_email: emailType.is_active_email,
      is_active_notification: emailType.is_active_notification,
      send_time: emailType.send_time
    }
  }

  onUpdate (form) {
    const {emailType, onUpdate} = this.props
    actions.emailTypes.updateEmailType(form, emailType.id).then(type => {
      onUpdate()
    }).catch(() => false)
  }

  render () {
    return (
      <div>
        {this.props.emailType.name}
        <CheckboxField
          onChange={(name, value) => {
            let newForm = this.state.form
            newForm.is_active_email = value
            this.onUpdate(newForm)
          }}
          name='is_active_email'
          value={this.state.form.is_active_email}
        />
      </div>
    )
  }
}

EmailType.propTypes = {
  emailType: PropTypes.object,
  onUpdate: PropTypes.func
}

export default EmailType
