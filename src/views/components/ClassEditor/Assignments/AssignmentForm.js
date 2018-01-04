import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment-timezone'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {convertLocalDateToUTC, convertUTCDatetimeToDateString} from '../../../../utilities/time'
import {maskAssignmentDate} from '../../../../utilities/mask'
const requiredFields = {
  'name': {
    type: 'required'
  },
  'due': {
    validate: (value) => { return value.length === 5 }
  },
  'year_due': {
    validate: (value) => { return `${value}`.length === 4 }
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

    const due_date = due ?
      convertUTCDatetimeToDateString(due, cl.school.timezone) : ''

    const date = new Date()

    return ({
      id: id || null,
      name: name || '',
      weight_id: weight_id || '',
      due: due_date ? this.mapAssignmentDate(due_date) : '',
      year_due: due_date ? due_date.split('-')[0] : date.getFullYear()
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
      this.props.resetValidation()
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
      this.props.resetValidation()
      this.setState({form: this.initializeFormData(), loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Map the form
  */
  mapForm () {
    const {cl} = this.props
    let newForm = {...this.state.form}
    let due = newForm.due.split('/')
    due = `${newForm.year_due}-${due[0]}-${due[1]}`
    newForm.due = convertLocalDateToUTC(due, cl.school.timezone)
    return newForm
  }

  /*
  * Map the assignment dateParts
  *
  * @param [String] date. YYYY-MM-DD
  * @return [String]. MM/DD
  */
  mapAssignmentDate (date) {
    const dateParts = date.split('-')
    return `${dateParts[1]}/${dateParts[2]}`
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
              info={'The assignments added will appear for everyone in the class. Be sure to only add graded assignments that apply to all classmates.'}
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
              info={'Be sure to add the assignment name exactly how it appears in the syllabus. Hint: use copy and paste to minimize typ-o\'s'}
              label='Assignment name'
              name='name'
              onChange={updateProperty}
              placeholder='Assignment name, i.e. Exam 1'
              value={form.name}
            />
          </div>
          <div className='col-xs-8'>
            <InputField
              style={{marginTop: '0.25em'}}
              containerClassName='margin-top'
              error={formErrors.due}
              info={'Be sure not to add assignments that are missing precise due dates. Those assignments can be added through the app when the due date has been set.'}
              label='Due Date'
              name='due'
              onChange={(name, value) => {
                updateProperty(name, maskAssignmentDate(form.due, value))
              }}
              placeholder='MM/DD'
              value={form.due}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.year_due}
              label='Year due'
              name='year_due'
              onChange={updateProperty}
              placeholder='Year'
              type='number'
              value={form.year_due}
            />
          </div>
        </div>
        <button
          className='button full-width margin-top'
          style={{marginBottom: '0.5em'}}
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
