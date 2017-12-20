import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import actions from '../../../../actions'

const headers = [
  {
    field: 'delete',
    display: ''
  },
  {
    field: 'name',
    display: 'Assignment'
  },
  {
    field: 'weight',
    display: 'Category'
  },
  {
    field: 'due',
    display: 'Due Date'
  }
]

const requiredFields = {
  'name': {
    type: 'required'
  },
  'weight_id': {
    type: 'required'
  },
  'due': {
    type: 'required'
  }
}

class Assignments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    this.getClassWeights()
    this.getClassAssignments()
  }

  getClassWeights () {
    const {cl} = this.props
    actions.weights.getClassWeights(cl).then((weights) => {
      this.setState({weights})
    }).then(() => false)
  }

  getClassAssignments () {
    const {cl} = this.props
    actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({assignments})
    }).then(() => false)
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      assignments: [],
      form: this.initializeFormData(),
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

    return ({
      id: id || null,
      name: name || '',
      weight_id: weight_id || '',
      due: due || ''
    })
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.assignments.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, name, weight_id, due} = item

    const row = {
      id: id || '',
      delete: <div className='button-delete-x center-content' onClick={(event) => { event.stopPropagation(); this.onDeleteAssignment(item) }}><i className='fa fa-times' /></div>,
      name,
      weight: weight_id && this.state.weights && this.state.weights.find(w => w.id === weight_id).name,
      due: due ? this.mapDateToDisplay(due) : 'N/A'
    }

    return row
  }

  /*
  * Map date to display
  *
  * @param [String] date. Date the assignment is due.
  * @return [String]. mapped date to diplay.
  */
  mapDateToDisplay (date) {
    // const d = date.substring(0, 10).split('-')
    // return `${d[1]}/${d[2]}/${d[0]}`
    return date
  }

  /*
  * Set form value equal to assignment in order to be edited.
  *
  * @param [Object] assignment. Assignment object to be edited.
  */
  setAssignment (assignment) {
    this.setState({form: this.initializeFormData(this.state.assignments.find(a => a.id === assignment.id))})
  }

  /*
  * Determine whether the user is submiting updated assignment or a new assignment.
  *
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateAssignment() : this.onUpdateAssignment()
    }
  }

  /*
  * Create a new assignment
  */
  onCreateAssignment () {
    actions.assignments.createAssignment(this.props.cl, this.state.form).then((assignment) => {
      const newAssignments = this.state.assignments
      newAssignments.push(assignment)
      this.setState({assignments: newAssignments, form: this.initializeFormData()})
    }).catch(() => false)
  }

  /*
  * Update an existing assignment
  */
  onUpdateAssignment () {
    actions.assignments.updateAssignment(this.props.cl, this.state.form).then((assignment) => {
      const newAssignments = this.state.assignments
      const index = this.state.assignments.findIndex(a => a.id === assignment.id)
      newAssignments[index] = assignment
      this.setState({assignments: newAssignments, form: this.initializeFormData()})
    }).catch(() => false)
  }

  /*
  * Delete assignment.
  *
  * @param [Object] assignment. The assignment to be deleted.
  */
  onDeleteAssignment (assignment) {
    actions.assignments.deleteAssignment(assignment).then(() => {
      const newAssignments = this.state.assignments.filter(a => a.id !== assignment.id)
      this.setState({assignments: newAssignments, form: this.initializeFormData()})
    }).catch(() => false)
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='space-between-vertical'>
        <div id='class-editor-assignments-table' className='margin-top'>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
            canSelect={true}
            onSelect={this.setAssignment.bind(this)}
          />
        </div>

        <div id='class-editor-assignment-form' className='margin-top'>
          <div className='row'>
            <div className='col-xs-12'>
              <SelectField
                containerClassName='margin-top'
                error={formErrors.weight_id}
                label="Grading category"
                name="weight_id"
                onChange={updateProperty}
                options={this.state.weights}
                placeholder="Select grading category"
                value={form.weight_id}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.name}
                label="Assignment name"
                name="name"
                onChange={updateProperty}
                placeholder="Assignment name, i.e. Exam 1"
                value={form.name}
              />
            </div>
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.due}
                label="Due Date"
                name="due"
                onChange={updateProperty}
                placeholder="Assignment due date"
                type='date'
                value={form.due}
              />
            </div>
          </div>
          <button className='button full-width margin-top margin-bottom' onClick={this.onSubmit.bind(this)}>Submit assignment</button>
        </div>
      </div>
    )
  }
}

Assignments.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(Assignments, 'form'))
