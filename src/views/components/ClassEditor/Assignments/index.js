import React from 'react'
import PropTypes from 'prop-types'
import AssignmentForm from './AssignmentForm'
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


class Assignments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    const {cl} = this.props
    actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({assignments})
    }).then(() => false)

    actions.weights.getClassWeights(cl).then((weights) => {
      this.setState({weights})
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
      currentAssignment: null,
      weights: []
    }
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments () {
    if (this.state.assignments.length === 0) {
      return <span>There are currently no assignments for this class.</span>
    }
    return this.state.assignments.map((assignment, index) =>
      this.getRow(assignment, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight_id, due} = item
    const {currentAssignment} = this.state

    const activeClass = (currentAssignment && currentAssignment.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`assignment-${index}`}
        onClick={() => this.onSelectAssignment(item)}
      >
        <div className='col-xs-1'>
          <div
            className='button-delete-x center-content'
            onClick={(event) => {
              event.stopPropagation()
              this.onDeleteAssignment(item)
            }}><i className='fa fa-times' />
          </div>
        </div>
        <div className='col-xs-9'>
          <div><span>{name}</span></div>
          <div>
            <span className='desctiption'>{weight_id && this.state.weights &&
              this.state.weights.find(w => w.id === weight_id).name || 'N/A'}
            </span>
          </div>
        </div>
        <div className='col-xs-2 right-text'>
          <span>{due ? this.mapAssignmentDate(due) : 'N/A'}</span>
        </div>
      </div>
    )
  }

  /*
  * Render assignment form.
  */
  renderAssignmentForm () {
    return (
      <AssignmentForm
        assignment={this.state.currentAssignment}
        cl={this.props.cl}
        onCreateAssignment={this.onCreateAssignment.bind(this)}
        onUpdateAssignment={this.onUpdateAssignment.bind(this)}
      />
    )
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

  /*
  * Set form value equal to assignment in order to be edited.
  *
  * @param [Object] assignment. Assignment object to be edited.
  */
  onSelectAssignment (assignment) {
    this.setState({currentAssignment: assignment})
  }


  /*
  * On create assignment, push assignment onto array
  *
  * @param [Object] assignment. Assignment.
  */
  onCreateAssignment (assignment) {
    const newAssignments = this.state.assignments
    newAssignments.push(assignment)
    this.setState({assignments: newAssignments})
  }

  /*
  * On update assignment, replace existing assignment with the new assignment.
  *
  * @param [Object] assignment. Assignment.
  */
  onUpdateAssignment (assignment) {
    const newAssignments = this.state.assignments
    const index = this.state.assignments.findIndex(a => a.id === assignment.id)
    newAssignments[index] = assignment
    this.setState({assignments: newAssignments})
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
    return (
      <div className='space-between-vertical'>
        <div className='class-editor-table'>
          <div id='class-editor-assignments-table'>
            {this.renderAssignments()}
          </div>
        </div>
        {this.renderAssignmentForm()}
      </div>
    )
  }
}

Assignments.propTypes = {
  cl: PropTypes.object
}

export default Assignments
