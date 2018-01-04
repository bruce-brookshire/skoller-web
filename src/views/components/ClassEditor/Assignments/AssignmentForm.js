import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment-timezone'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {convertLocalDateToUTC, convertUTCDatetimeToDateString} from '../../../../utilities/time'
import {maskDate} from '../../../../utilities/mask'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'due_day': {
    type: 'required'
  },
  'due_month': {
    type: 'required'
  },
  'due_year': {
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
    const full_due = due ? convertUTCDatetimeToDateString(due, cl.school.timezone) : ''
    const parsed_date = full_due.split('-')

    return ({
      id: id || null,
      name: name || '',
      weight_id: weight_id || '',
      due: full_due,
      due_year: parsed_date.length == 3 ? parsed_date[0] : (new Date().getFullYear()),
      due_month: parsed_date.length == 3 ? parsed_date[1] : '',
      due_day: parsed_date.length == 3 ? parsed_date[2] : '',
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
  * Format months/day numbers to have leading zeros where needed and not exceed limit
  */
  formatNum (num,limit) {
    if(parseInt(num) > limit || parseInt(num) < 1){
      return ''
    }else if(num.length > 2 && num[0] == '0'){
      return num.substr(1)
    }else if(num.length < 2 && num[0] != '0' && num != ''){
      return '0'+num
    }else{
      return num
    }
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
          <InputField
            onChange={(name, value) => {}}
            name='form.due'
            type='hidden'
            value={form.due}
          />
          <div className='col-xs-4'>
            <InputField
              containerClassName='margin-top'
              info={'Be sure not to add assignments that are missing precise due dates. Those assignments can be added through the app when the due date has been set.'}
              error={formErrors.due_month}
              label='Due Date'
              name='form.due_month'
              onChange={(name, value) => {
                var newForm = this.state.form
                newForm['due_month'] = this.formatNum(value,12)
                this.setState({form:newForm})
                updateProperty('due', maskDate(form.due_year,form.due_month,form.due_day))
              }}
              placeholder='Month'
              type='number'
              value={form.due_month}
              min={1}
              max={12}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              containerClassName='margin-top--large'
              info={'Be sure not to add assignments that are missing precise due dates. Those assignments can be added through the app when the due date has been set.'}
              error={formErrors.due_day}
              name='form.due_day'
              onChange={(name, value) => {
                var newForm = this.state.form
                newForm['due_day'] = this.formatNum(value,31)
                this.setState({form:newForm})
                updateProperty('due', maskDate(form.due_year,form.due_month,form.due_day))
              }}
              placeholder='Day'
              type='number'
              value={form.due_day}
              min={1}
              max={31}
            />
          </div>
          <div className='col-xs-4'>
            <InputField
              containerClassName='margin-top--large'
              error={formErrors.due_year}
              name='form.due_year'
              onChange={(name, value) => {
                var newForm = this.state.form
                newForm['due_year'] = value
                this.setState({form:newForm})
                updateProperty('due', maskDate(form.due_year,form.due_month,form.due_day))
              }}
              placeholder='Year'
              type='number'
              value={this.state.form.due_year}
              max={2050}
              min={2000}
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
