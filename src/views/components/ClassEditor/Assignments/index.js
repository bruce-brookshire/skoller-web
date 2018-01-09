import React from 'react'
import PropTypes from 'prop-types'
import AssignmentForm from './AssignmentForm'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {convertUTCDatetimeToDateString} from '../../../../utilities/time'

class Assignments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    const {cl, disabled} = this.props
    if (!disabled) {
      this.setState({loadingAssignments: true})
      actions.assignments.getClassAssignments(cl).then((assignments) => {
        this.setState({assignments, loadingAssignments: false})
      }).then(() => { this.setState({loadingAssignments: false}) })

      this.setState({loadingWeights: true})
      actions.weights.getClassWeights(cl).then((weights) => {
        this.setState({weights, loadingWeights: false})
      }).then(() => { this.setState({loadingWeights: false}) })
    }
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {isReview, assignments, weights} = this.props
    return {
      assignments: assignments || [],
      currentAssignment: null,
      loadingAssignments: false,
      loadingWeights: false,
      viewOnly: isReview,
      weights: weights || []
    }
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments () {
    const assignments = this.state.assignments
    if (assignments.length === 0) {
      return (
        <div className='center-text margin-top'>
          <span>There are currently no assignments for this class.</span>
        </div>
      )
    }
    //sort by due date.
    return assignments.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((assignment, index) =>
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
    const {currentAssignment, viewOnly} = this.state
    const {disabled} = this.props

    const activeClass = (currentAssignment && currentAssignment.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`assignment-${index}`}
        onClick={() => {
          if (viewOnly || disabled) return
          this.onSelectAssignment(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                if (disabled) return
                this.onDeleteAssignment(item)
              }}><i className='fa fa-times' />
            </div>
          </div>
        }
        <div className={!viewOnly ? 'col-xs-9' : 'col-xs-10'}>
          <div className='bold'><span>{name}</span></div>
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
        disabled={this.props.disabled}
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
    const {cl} = this.props
    const datePretty = convertUTCDatetimeToDateString(date, cl.school.timezone)
    const dateParts = datePretty.split('-')
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
    this.setState({assignments: newAssignments, currentAssignment: null})
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
    this.setState({assignments: newAssignments, currentAssignment: null})
  }

  /*
  * Delete assignment.
  *
  * @param [Object] assignment. The assignment to be deleted.
  */
  onDeleteAssignment (assignment) {
    actions.assignments.deleteAssignment(assignment).then(() => {
      const newAssignments = this.state.assignments.filter(a => a.id !== assignment.id)
      this.setState({assignments: newAssignments})
    }).catch(() => false)
  }

  render () {
    const {viewOnly, loadingAssignments, loadingWeights} = this.state
    if (loadingAssignments || loadingWeights) return <Loading />
    return (
      <div className='space-between-vertical'>
        <h5 style={{marginTop: '0.25em', marginBottom: '0.5em'}}>Edit Assignments</h5>
        {viewOnly && <a className='right-text' style={{marginBottom: '5px'}} onClick={() => this.setState({viewOnly: false}) }>edit</a>}
        <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`} >
          <div id='class-editor-assignments-table'>
            {this.renderAssignments()}
          </div>
        </div>
        {!viewOnly && this.renderAssignmentForm()}
      </div>
    )
  }
}

Assignments.propTypes = {
  assignments: PropTypes.array,
  cl: PropTypes.object,
  disabled: PropTypes.bool,
  isReview: PropTypes.bool,
  weights: PropTypes.array
}

export default Assignments
