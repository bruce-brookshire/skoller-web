import React from 'react'
import PropTypes from 'prop-types'
import {InputField} from '../../../components/Form'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {convertLocalDateToUTC} from '../../../utilities/time'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'link': {
    type: 'required'
  }
}

class SignupLinkForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    return {
      name: '',
      link: '',
      start: '',
      end: ''
    }
  }

  /*
  * On submit post notification
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      this.addLink(this.state.form)
      this.setState({form: this.initializeFormData()})
    }
  }

  mapForm (form) {
    let newForm = {...this.state.form}
    if (newForm.start) newForm.start = convertLocalDateToUTC(newForm.start, 'CST')
    if (newForm.end) newForm.end = convertLocalDateToUTC(newForm.end, 'CST')
    return newForm
  }

  /*
  * Send notification.
  */
  addLink (form) {
    let newForm = this.mapForm(form)
    actions.signupLinks.createCustomLink(newForm).then((link) => {
      this.props.onSubmit()
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='row align-center'>
          <div className='col-xs-12 col-md-3'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name}
              name="name"
              onChange={updateProperty}
              placeholder="description of link usage"
              value={form.name}
            />
          </div>
          <div className='col-xs-12 col-md-3'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.link}
              name="link"
              onChange={updateProperty}
              placeholder="the link ending"
              value={form.link}
            />
          </div>
          <div className='col-xs-12 col-md-2'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.start}
              name="start"
              onChange={updateProperty}
              value={form.start}
              type='date'
            />
          </div>
          <div className='col-xs-12 col-md-2'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.end}
              name="end"
              onChange={updateProperty}
              value={form.end}
              type='date'
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

SignupLinkForm.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onSubmit: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(SignupLinkForm, 'form'))
