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

  /*
  * On submit, create meeting times.
  */
  onSubmit (event) {
    event.preventDefault()

    // if (this.props.validateForm(this.state.form, requiredFields)) {
    //   const form = this.mapForm(this.state.form)
    //   this.onCreateSchool(form)
    // }
  }

  render () {
    const {form, universityError} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='cn-meeting-time-container'>
        <div className='cn-meeting-time-header'>
          Pick meeting times
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='cn-meeting-time-slider'>
            This is an online class
            <SliderField
              name='is_online'
              onChange={updateProperty}
              value={form.is_online}
            />
          </div>
        </form>
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
