import React from 'react'
import PropTypes from 'prop-types'
import AssignmentCategories from './AssignmentCategories'
import AssignmentForm from './AssignmentForm'
import AssignmentTable from './AssignmentTable'
import SkipCategoryModal from './SkipCategoryModal'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

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
      currentWeightIndex: 0,
      openSkipCategoryModal: false,
      addAssignment: false
    }
  }

  filterAssignments () {
    const {assignments, currentWeightIndex, weights, viewOnly} = this.state
    return (!viewOnly && weights.length > 0) ? assignments.filter((assign) => assign.weight_id && assign.weight_id === weights[currentWeightIndex].id) : assignments
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

  /*
  * Toggle the problems modal.
  */
  toggleSkipCategoryModal () {
    this.setState({openSkipCategoryModal: !this.state.openSkipCategoryModal})
  }

  /*
  * Render the having issues modal.
  */
  renderSkipCategoryModal () {
    const {openSkipCategoryModal} = this.state
    return (
      <SkipCategoryModal
        open={openSkipCategoryModal}
        onClose={this.toggleSkipCategoryModal.bind(this)}
        onConfirm={this.onNext.bind(this)}
      />
    )
  }

  renderSavedMessage (assignments) {
    const {viewOnly, weights, currentWeightIndex} = this.state
    return (
      <span>
        {!viewOnly && <span>Saved assignments</span>}
        {!viewOnly && weights[currentWeightIndex] && <span> for <i className='cn-blue'>{weights[currentWeightIndex].name}</i></span>}
        {viewOnly && `Assignments (${assignments.length})`}
      </span>
    )
  }

  render () {
    const {viewOnly, loadingAssignments, loadingWeights, currentAssignment,
      currentWeightIndex, weights, addAssignment} = this.state
    const {cl} = this.props

    let assignments = this.filterAssignments()
    // console.log(addAssignment)

    return (
      <div id='cn-assignments'>
        {loadingAssignments || loadingWeights
          ? <Loading />
          : <div id='cn-assignment-window'>
            {!viewOnly && !addAssignment &&
            <AssignmentCategories
              weights={weights}
              noAssignments={this.state.assignments}
              cl={cl}
            />
            }
            {!viewOnly && addAssignment &&
            <div id='class-editor-assignment-form'>
              {/* <div className='cn-section-content-header center-text cn-blue margin-top'>
                {weights[currentWeightIndex] ? weights[currentWeightIndex].name : 'for this class'}
              </div> */}
              <AssignmentForm
                assignment={currentAssignment}
                cl={cl}
                onCreateAssignment={this.onCreateAssignment.bind(this)}
                onUpdateAssignment={this.onUpdateAssignment.bind(this)}
                currentWeight={weights[currentWeightIndex]}
              />
            </div>
            }
            {/* {!viewOnly && assignments.length === 0 &&
              <div className='margin-top margin-bottom center-text'>
                <a onClick={() => this.toggleSkipCategoryModal()}>Skip this category</a>
              </div>
            } */}
            {(assignments.length !== 0 || viewOnly) &&
            <div id='cn-assignment-table'>
              <div id='cn-assignment-table-label'>
                {this.renderSavedMessage(assignments)}
                {viewOnly && <a onClick={() => this.props.onEdit()}>Edit</a>}
              </div>
              <AssignmentTable
                viewOnly={viewOnly}
                assignments={assignments}
                currentAssignment={currentAssignment}
                onSelectAssignment={this.onSelectAssignment.bind(this)}
                onDeleteAssignment={this.onDeleteAssignment.bind(this)}
                weights={weights}
                cl={cl}
                currentWeight={weights[currentWeightIndex]}
                onEdit={() => this.props.onEdit()}
              />
            </div>
            }
            {assignments.length !== 0 && !viewOnly &&
              <button
                onClick={() => this.onNext()}
                className='button full-width margin-top margin-bottom'
              >
                Save and continue
              </button>
            }
            {this.renderSkipCategoryModal()}
          </div>}
      </div>
    )
  }
}

Assignments.propTypes = {
  cl: PropTypes.object,
  isReview: PropTypes.bool,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func
}

export default Assignments
