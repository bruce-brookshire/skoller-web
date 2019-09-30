import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {convertLocalDateToUTC, convertUTCDatetimeToDateString} from '../../../../utilities/time'
import DatePicker from '../../../components/DatePicker/index'
import moment from 'moment'

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

const switchDate = () => {
  var today = new Date()
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)
}

const date = switchDate()

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

class AdminAssignmentForm extends React.Component {
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
      loading: false,
      showDatePicker: false
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
    const {cl} = this.props

    const dueDate = due
      ? convertUTCDatetimeToDateString(due, cl.school.timezone) : ''

    return ({
      id: id || null,
      name: name || '',
      weight_id: this.props.weights[0].id,
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
    console.log(this.state.form)
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

  verifyData (form) {
    const nameCheck = form.name.trim() !== ''
    const dateCheck = form.due !== null
    return nameCheck && (this.state.due_null ? true : dateCheck)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty, isAdmin, weights, currentWeight} = this.props
    const disableButton = !this.verifyData(form)

    return (
      <div id='hub-assignment-form'>
        <div className='hub-section-content-header'>
          Add assignments
        </div>
        <hr />
        <div className='row'>
          <div className='col-xs-12'>
            <select
              name='weight'
              onChange={(e) => {
                let form = this.state.form
                form.weight_id = e.target.value
                this.setState({form})
              }}
              value={form.weight_id}
            >
              {this.props.weights.map(weight => {
                return (
                  <option key={weight.id} value={weight.id}>{weight.name}</option>
                )
              })}
            </select>
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name}
              label='Assignment name'
              name='name'
              onChange={updateProperty}
              value={form.name}
            />
          </div>
          <div className='col-xs-4'>
            {!this.state.due_null &&
              <div>
                <div onClick={() => this.setState({showDatePicker: true})} >
                  <InputField
                    containerClassName='margin-top'
                    error={formErrors.due}
                    label='Due date'
                    name='due'
                    placeholder='MM/DD'
                    value={form.due ? moment(form.due).format('MM/DD') : 'Select date'}
                    disabled={true}
                  />
                </div>
                {this.state.showDatePicker &&
                  <DatePicker
                    givenDate={Date.now()}
                    returnSelectedDay={(day) => {
                      form.due = day.format('MM/DD')
                      this.setState({showDatePicker: false})
                    }}
                  />
                }
              </div>
            }
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
            <div className='hub-input-container margin-top unknown-due'>
              <label htmlFor="due_null" className='hub-input-label'>Unknown?</label>
              <div className="checkbox-appearance"
                style={{ backgroundColor: this.state.due_null ? '#57b9e4' : 'transparent' }}
                onClick={() => {
                  this.state.due_null ? this.setState({ due_null: false }) : this.setState({ due_null: true })
                }}
              />
            </div>
          </div>
        </div>
        <div id='button-container'>
          <button
            className={`button ${disableButton ? 'disabled' : ''}`}
            disabled={this.state.loading || disableButton}
            onClick={this.onSubmit.bind(this)}
          >
            Add assignment
            {this.state.loading ? <Loading /> : null}
          </button>
        </div>
      </div>
    )
  }
}

AdminAssignmentForm.propTypes = {
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

export default ValidateForm(Form(AdminAssignmentForm, 'form'))
