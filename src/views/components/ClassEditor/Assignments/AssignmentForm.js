import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment-timezone'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {convertLocalDateToUTC, convertUTCDatetimeToDateString} from '../../../../utilities/time'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'due': {
    type: 'required'
  }
}

class AssignmentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights to populate weight select.
  */
  componentWillMount () {
    const {cl, disabled} = this.props
    if (!disabled) {
      actions.weights.getClassWeights(cl).then((weights) => {
        this.setState({weights})
      }).then(() => false)
    }
  }

  /*
  * If new assignment is received, update form.
  */
  componentWillReceiveProps (nextProps) {
    if (nextProps.assignment && this.state.form.id !== nextProps.assignment.id) {
      this.setState({form: this.initializeFormData(nextProps.assignment)})
    }
  }


  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false,
      weights: []
    }
  }

  /*
  * Method for intializing form data.
  * Assignment form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, name, weight_id, due} = formData
    const {cl} = this.props

    return ({
      id: id || null,
      name: name || '',
      weight_id: weight_id || '',
      due: due ? convertUTCDatetimeToDateString(due, cl.school.timezone) : ''
    })
  }

  /*
  * Determine whether the user is submiting updated assignment or a new assignment.
  *
  */
  onSubmit () {
    if (this.state.weights.length > 0) {
      requiredFields.weight_id = {
        type: 'required'
      }
    }
    if (this.props.validateForm(this.state.form, requiredFields)) {
      const form = this.mapForm(this.state.form)
      !form.id ? this.onCreateAssignment(form) : this.onUpdateAssignment(form)
    }
  }

  /*
  * Create a new assignment
  */
  onCreateAssignment (form) {
    this.setState({loading: true})
    actions.assignments.createAssignment(this.props.cl, form).then((assignment) => {
      this.props.onCreateAssignment(assignment)
      this.setState({form: this.initializeFormData(), loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update an existing assignment
  */
  onUpdateAssignment (form) {
    this.setState({loading: true})
    actions.assignments.updateAssignment(this.props.cl, form).then((assignment) => {
      this.props.onUpdateAssignment(assignment)
      this.setState({form: this.initializeFormData(), loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Map the form
  */
  mapForm () {
    const {cl} = this.props
    let newForm = {...this.state.form}
    newForm.due = convertLocalDateToUTC(this.state.form.due, cl.school.timezone)
    return newForm
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    return (
      <div id='class-editor-assignment-form'>
        <div className='row'>
          <div className='col-xs-12'>
            <SelectField
              containerClassName='margin-top'
              error={formErrors.weight_id}
              label='Grading category'
              name='weight_id'
              onChange={updateProperty}
              options={this.state.weights}
              placeholder='Select grading category'
              value={form.weight_id}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              style={{marginTop: '0em'}}
              containerClassName='margin-top'
              error={formErrors.name}
              label='Assignment name'
              name='name'
              onChange={updateProperty}
              placeholder='Assignment name, i.e. Exam 1'
              value={form.name}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              style={{marginTop: '0.25em'}}
              containerClassName='margin-top'
              error={formErrors.due}
              label='Due Date'

              name='due'
              onChange={updateProperty}
              placeholder='Assignment due date'
              type='date'
              value={form.due}
            />
          </div>
        </div>
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          Submit assignment
          {this.state.loading ? <Loading style={{color: 'white', marginLeft: '0.5em'}} /> : null}
        </button>
      </div>
    )
  }
}

AssignmentForm.propTypes = {
  assignment: PropTypes.object,
  cl: PropTypes.object,
  disabled: PropTypes.bool,
  formErrors: PropTypes.object,
  onCreateAssignment: PropTypes.func.isRequired,
  onUpdateAssignment: PropTypes.func.isRequired,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(AssignmentForm, 'form'))
