import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import Loading from '../../components/Loading'
import {SelectField} from '../../components/Form'
import actions from '../../actions'

const requiredFields = {
  class_status_id: {
    type: 'required'
  }
}

class StatusForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the statuses
  */
  componentWillMount () {
    this.setState({loading: true})
    actions.hub.getStatuses().then(statuses => {
      this.setState({statuses: statuses.statuses, loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false,
      statuses: []
    }
  }

  /*
  * Intitialize form data.
  * Status form data.
  */
  initializeFormData () {
    const {cl} = this.props
    return {
      class_status_id: (cl.status && cl.status.id) || ''
    }
  }

  /*
  * On submit.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      const form = {...this.state.form}
      form.class_status_id = parseInt(form.class_status_id)
      actions.classes.updateClassStatus(this.props.cl, form).then((cl) => {
      }).catch(() => false)
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    if (this.state.loading) return <Loading />
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-6 margin-top'>
          <SelectField
            error={formErrors.class_status_id}
            label="Class Status"
            name="class_status_id"
            onChange={updateProperty}
            options={this.state.statuses.map(status => {
              return {value: status.id, name: status.name}
            })}
            placeholder="Select status"
            value={form.class_status_id}
          />
        </div>
        <div className='col-xs-12 col-md-6 margin-top' style={{alignSelf: 'flex-end'}}>
          <button
            className='button full-width'
            onClick={this.onSubmit.bind(this)}
          >Update</button>
        </div>
      </div>
    )
  }
}

StatusForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  validateForm: PropTypes.func,
  updateProperty: PropTypes.func
}

export default ValidateForm(Form(StatusForm, 'form'))
