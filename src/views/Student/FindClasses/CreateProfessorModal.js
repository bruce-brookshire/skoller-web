import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import Loading from '../../../components/Loading'

class CreateProfessorModal extends React.Component {
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

    }
  }

  render () {
    return (
      <div>Hello it is me</div>
    )
  }
}

CreateProfessorModal.propTypes = {
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  formErrors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default ValidateForm(Form(CreateProfessorModal, 'form'))
