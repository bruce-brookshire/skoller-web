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
    const {cl} = this.props
    this.setState({loadingAssignments: true})
    actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({assignments, loadingAssignments: false})
    }).then(() => { this.setState({loadingAssignments: false}) })

    this.setState({loadingWeights: true})
    actions.weights.getClassWeights(cl).then((weights) => {
      weights = weights.sort((a, b) => {
        return a.weight < b.weight
      })
      this.setState({weights, loadingWeights: false})
    }).then(() => { this.setState({loadingWeights: false}) })
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {isReview} = this.props
    return {
      assignments: [],
      currentAssignment: null,
      loadingAssignments: false,
      loadingWeights: false,
      viewOnly: isReview,
      weights: [],
      currentWeightIndex: 0
    }
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments () {
    const {assignments} = this.state
    if (assignments.length === 0) {
      return (
        <div className='center-text margin-top'>
          <span>There are currently no assignments for this class.</span>
        </div>
      )
    }
    // sort by due date.
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

    const activeClass = (currentAssignment && currentAssignment.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`assignment-${index}`}
        onClick={() => {
          if (viewOnly) return
          this.onSelectAssignment(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                // if (disabled) return
                this.onDeleteAssignment(item)
              }}><i className='fa fa-times' />
            </div>
          </div>
        }
        <div className={!viewOnly ? 'col-xs-9' : 'col-xs-10'}>
          <div className='bold'><span>{name}</span></div>
          <div>
            <span className='desctiption'>{(weight_id && this.state.weights &&
              this.state.weights.find(w => w.id === weight_id).name) || 'N/A'}
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
    const {currentAssignment, currentWeightIndex, weights} = this.state
    const {cl} = this.props
    return (
      <AssignmentForm
        assignment={currentAssignment}
        cl={cl}
        onCreateAssignment={this.onCreateAssignment.bind(this)}
        onUpdateAssignment={this.onUpdateAssignment.bind(this)}
        currentWeight={weights[currentWeightIndex]}
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
    this.sectionControl.scrollTop = this.sectionControl.scrollHeight
  }

  /*
  * On update assignment, replace existing assignment with the new assignment.
  *
  * @param [Object] assignment. Assignment.
  */
  onUpdateAssignment (assignment) {
    const {assignments} = this.state
    const newAssignments = assignments
    const index = assignments.findIndex(a => a.id === assignment.id)
    newAssignments[index] = assignment
    this.setState({assignments: newAssignments, currentAssignment: null})
  }

  /*
  * Delete assignment.
  *
  * @param [Object] assignment. The assignment to be deleted.
  */
  onDeleteAssignment (assignment) {
    const {assignments} = this.state
    actions.assignments.deleteAssignment(assignment).then(() => {
      const newAssignments = assignments.filter(a => a.id !== assignment.id)
      this.setState({assignments: newAssignments})
    }).catch(() => false)
  }

  onNext () {
    const {currentWeightIndex, weights} = this.state
    if (weights[currentWeightIndex + 1]) {
      this.setState({currentWeightIndex: currentWeightIndex + 1})
    } else {
      this.props.onSubmit()
    }
  }

  render () {
    const {viewOnly, loadingAssignments, loadingWeights} = this.state
    if (loadingAssignments || loadingWeights) return <Loading />
    return (
      <div id='cn-assignments'>
        {!viewOnly && this.renderAssignmentForm()}
        {!viewOnly &&
          <a onClick={() => this.onNext()}>Skip this category</a>
        }
        {/* {viewOnly && <a className='right-text' onClick={() => this.setState({viewOnly: false}) }>edit</a>}
        <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`} >
          <div id='class-editor-assignments-table' ref={(field) => { this.sectionControl = field }}>
            {this.renderAssignments()}
          </div>
        </div> */}
      </div>
    )
  }
}

Assignments.propTypes = {
  cl: PropTypes.object,
  isReview: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default Assignments
