import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import Loading from '../../components/Loading'
import actions from '../../actions'

const requiredFields = {
  'notes': {
    type: 'required'
  }
}

class NoteForm extends React.Component {
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
      form: this.initializeFormData(),
      loading: false
    }
  }

  /*
  * Method for intializing form data.
  * Weight form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData () {
    return ({
      notes: ''
    })
  }

  onSubmit () {
    const {form} = this.state

    if (this.props.validateForm(form, requiredFields)) {
      this.onCreateNote()
    }
  }

  /*
  * Create a new note
  */
  onCreateNote () {
    this.setState({loading: true})
    actions.classes.addNote(this.props.cl, this.state.form).then((cl) => {
      this.setState({loading: false})
      this.props.onCreateNote(cl)
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div id='cn-note-form'>
        <InputField
          containerClassName='margin-top'
          error={formErrors.name}
          label="Note"
          name="notes"
          onChange={updateProperty}
          value={form.notes}
        />
        <button
          className='button full-width margin-top margin-bottom'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          Add Note
          {this.state.loading ? <Loading /> : null}
        </button>
      </div>
    )
  }
}

NoteForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onCreateNote: PropTypes.func.isRequired,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(NoteForm, 'form'))
