import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {SliderField} from '../../../components/Form'

class MeetingTimeModal extends React.Component {
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
      loading: false
    }
  }

  initializeFormData () {
    return {
      is_online: false
    }
  }

  render () {
    const {form, universityError} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='cn-meeting-time-container'>
        <div className='cn-meeting-time-header'>
          Pick meeting times
        </div>
        <SliderField
          name='is_online'
          onChange={updateProperty}
          value={form.is_online}
        />
      </div>
    )
  }
}

MeetingTimeModal.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ValidateForm(Form(MeetingTimeModal, 'form'))
