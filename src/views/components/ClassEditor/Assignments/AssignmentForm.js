import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, CheckboxField, SelectField} from '../../../../components/Form'
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

const date = new Date()

const yearOpts = [
  {
    name: date.getFullYear(),
    value: date.getFullYear()
  },
  {
    name: date.getFullYear() + 1,
    value: date.getFullYear() + 1
  }
]

class AssignmentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * If new assignment is received, update form.
  */
  componentWillReceiveProps (nextProps) {
    if (nextProps.assignment && (this.state.form.id !== nextProps.assignment.id)) {
      this.setState({form: this.initializeFormData(nextProps.assignment)})
    }

    if (nextProps.currentWeight && (nextProps.currentWeight.id !== this.props.currentWeight.id)) {
      let newForm = this.initializeFormData()
      newForm.weight_id = nextProps.currentWeight.id
      this.setState({form: newForm})
    }
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {assignment} = this.props
    return {
      form: this.initializeFormData(assignment),
      due_null: false,
      loading: false
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
    const {id, name, weight_id: weightId, due} = formData
    const {cl, currentWeight} = this.props

    const dueDate = due
      ? convertUTCDatetimeToDateString(due, cl.school.timezone) : ''

    return ({
      id: id || null,
      name: name || '',
      weight_id: weightId || (currentWeight && currentWeight.id) || '',
      due: dueDate ? this.mapAssignmentDate(dueDate) : '',
      year_due: dueDate ? dueDate.split('-')[0] : date.getFullYear(),
      created_on: 'Web'
    })
  }

  /*
  * Determine whether the user is submiting updated assignment or a new assignment.
  *
  */
  onSubmit () {
    if (this.state.due_null) {
      requiredFields.due = {}
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
      this.setState({form: this.initializeFormData(), loading: false, due_null: false})
      if (this.props.onCreateAssignment) this.props.onCreateAssignment(assignment)
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update an existing assignment
  */
  onUpdateAssignment (form) {
    this.setState({loading: true})
    actions.assignments.updateAssignment(this.props.cl, form).then((assignment) => {
      this.props.onUpdateAssignment(assignment)
      this.setState({form: this.initializeFormData(), loading: false, due_null: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Map the form
  */
  mapForm () {
    const {cl} = this.props
    if (!this.state.due_null) {
      let newForm = {...this.state.form}
      let due = newForm.due.split('/')
      due = `${newForm.year_due}-${due[0]}-${due[1]}`
      newForm.due = convertLocalDateToUTC(due, cl.school.timezone)
      return newForm
    } else {
      let newForm = {...this.state.form}
      newForm.due = null
      return newForm
    }
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
    const {formErrors, updateProperty, isAdmin, weights} = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name}
              info={'Be sure to add the assignment name exactly how it appears in the syllabus. Hint: use copy and paste to minimize typ-o\'s'}
              label='Assignment name'
              name='name'
              onChange={updateProperty}
              placeholder='e.g. Exam 1'
              value={form.name}
            />
          </div>
          {isAdmin && <div className='col-xs-12'>
            <SelectField
              containerClassName='margin-top'
              error={formErrors.weight_id}
              label='Weight'
              name='weight_id'
              onChange={updateProperty}
              options={weights}
              value={form.weight_id}
            />
          </div>}
          <div className='col-xs-4'>
            {!this.state.due_null && <InputField
              containerClassName='margin-top'
              error={formErrors.due}
              info={`Due date unknown for an assignment? No worries-you can always add one later. Go ahead and create the assignment for everyone in your class.`}
              label='Due date'
              name='due'
              onChange={(name, value) => {
                updateProperty(name, maskAssignmentDate(form.due, value))
              }}
              placeholder='MM/DD'
              value={form.due}
              disabled={this.state.due_null === true}
            />}
          </div>
          <div className='col-xs-4'>
            {!this.state.due_null && <SelectField
              containerClassName='margin-top'
              error={formErrors.year_due}
              label='Year'
              name='year_due'
              onChange={updateProperty}
              placeholder='Year'
              type='number'
              options={yearOpts}
              value={form.year_due}
              disabled={this.state.due_null === true}
            />}
          </div>
          <div className='col-xs-4'>
            <div className='cn-input-container margin-top center-xs'>
              <label htmlFor="due_null" className='cn-input-label'>Unknown?</label>
              <CheckboxField
                inputClassName='cn-big-checkbox'
                tabIndex="-1"
                type="checkbox"
                name="due_null"
                value={this.state.due_null}
                onChange={(name, value) => {
                  this.setState({due_null: value})
                }}
              />
            </div>
          </div>
        </div>
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={this.onSubmit.bind(this)}
        >
          {this.state.form.id ? 'Edit assignment' : 'Add assignment'}
          {this.state.loading ? <Loading /> : null}
        </button>
      </div>
    )
  }
}

AssignmentForm.propTypes = {
  assignment: PropTypes.object,
  cl: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  onCreateAssignment: PropTypes.func,
  onUpdateAssignment: PropTypes.func.isRequired,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func,
  currentWeight: PropTypes.object,
  resetValidation: PropTypes.func,
  isAdmin: PropTypes.bool,
  weights: PropTypes.array
}

export default ValidateForm(Form(AssignmentForm, 'form'))
