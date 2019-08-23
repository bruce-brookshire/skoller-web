import React from 'react'
import PropTypes from 'prop-types'
import AssignmentCategories from './AssignmentCategories'
import AssignmentForm from './AssignmentForm'
import AssignmentTable from './AssignmentTable'
import SkipCategoryModal from './SkipCategoryModal'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import { browserHistory } from 'react-router'
import {showSnackbar} from '../../../../utilities/snackbar'

class Assignments extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  async componentWillMount () {
    const {cl} = this.props
    this.setState({loadingAssignments: true})
    await actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({assignments, loadingAssignments: false})
    }).then(() => { this.setState({loadingAssignments: false}) })

    this.setState({loadingWeights: true})
    await actions.weights.getClassWeights(cl).then((weights) => {
      weights = weights.sort((a, b) => {
        return a.weight < b.weight
      })
      this.setState({weights, loadingWeights: false})
    }).then(() => { this.setState({loadingWeights: false}) })

    this.getSingleWeightCurrentWeight()
  }

  async updateAssignments () {
    const {cl} = this.props
    let unsavedAssignments = []
    this.state.assignments.forEach(a => {
      if (!a.id) {
        console.log(`pushing ${a.name} to unsaved assignments`)
        unsavedAssignments.push(a)
      }
    })
    this.setState({loadingAssignments: true})
    await actions.assignments.getClassAssignments(cl).then((assignments) => {
      let allAssignments = assignments.concat(unsavedAssignments)
      this.setState({assignments: allAssignments, loadingAssignments: false})
    }).then(() => { this.setState({loadingAssignments: false}) })
  }

  getSingleWeightCurrentWeight () {
    let addAssignment = false
    let currentWeight = null
    let currentWeightIndex = 0
    if (this.props.singleWeight) {
      this.state.weights.forEach(weight => {
        if (weight.id === this.props.singleWeight) {
          currentWeight = weight
        }
      })
      addAssignment = true
      currentWeightIndex = this.state.weights.indexOf(currentWeight)
    }
    this.setState({addAssignment: addAssignment, currentWeightIndex: currentWeightIndex, currentWeight: currentWeight})
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
      currentWeight: null,
      openSkipCategoryModal: false,
      addAssignment: false,
      lastAssignmentDate: Date.now()
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
    this.updateLastAssignmentDate(moment(assignment.due).format('MM/DD/YYYY'))
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
    if (assignment.id) {
      actions.assignments.updateAssignment(this.props.cl, assignment)
      this.setState({currentAssignment: null})
      this.updateAssignments()
    } else {
      const {assignments} = this.state
      const newAssignments = assignments
      const index = assignments.findIndex(a => a === assignment)
      newAssignments[index] = assignment
      this.setState({assignments: newAssignments, currentAssignment: null})
    }
  }

  /*
  * Delete assignment.
  *
  * @param [Object] assignment. The assignment to be deleted.
  */
  async onDeleteAssignment (assignment) {
    let assignments = this.state.assignments
    let safeAssignments = []
    assignments.forEach(a => {
      if (
        a.due !== assignment.due ||
        a.name !== assignment.name ||
        a.weight_id !== assignment.weight_id ||
        a.created_on !== assignment.created_on
      ) {
        safeAssignments.push(a)
      }
    })
    if (assignment.id) {
      await actions.assignments.deleteAssignment(assignment).then(() => {
        this.updateAssignments()
      }).catch(() => false)
    }
    this.setState({assignments: safeAssignments})
    // const newAssignments = assignments.filter(a => a.id !== assignment.id)
    // this.setState({assignments: newAssignments})
    // actions.assignments.deleteAssignment(assignment).then(() => {
    //   const newAssignments = assignments.filter(a => a.id !== assignment.id)
    //   this.setState({assignments: newAssignments})
    // }).catch(() => false)
  }

  onNext () {
    this.updateAssignments()
    const {currentWeightIndex, weights} = this.state
    if (weights[currentWeightIndex + 1]) {
      this.setState({currentWeightIndex: currentWeightIndex + 1, currentWeight: weights[currentWeightIndex + 1], addAssignment: true})
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

  // renderSavedMessage (assignments) {
  //   const {viewOnly} = this.state
  //   return (
  //     <span>
  //       {!viewOnly && <span>Saved assignments</span>}
  //       {viewOnly && `Assignments (${assignments.length})`}
  //     </span>
  //   )
  // }

  toAssignmentForm (weight) {
    this.setState({ addAssignment: true, currentWeight: weight, currentWeightIndex: this.state.weights.indexOf(weight) })
  }

  updateLastAssignmentDate (date) {
    this.setState({lastAssignmentDate: date})
  }

  getSingleWeight () {
    let singleWeight = this.props.singleWeight
    let weights = []
    if (singleWeight) {
      this.state.weights.forEach(weight => {
        if (weight.id === singleWeight) {
          weights.push(weight)
        }
      })
      return weights
    } else {
      return false
    }
  }

  renderBackButton () {
    if (!this.props.singleWeight && this.state.addAssignment) {
      return (
        <div
          onClick={() => {
            this.updateAssignments()
            this.setState({addAssignment: false, currentAssignment: null})
          }}
          style={{marginTop: '8px', color: '#57B9E4', cursor: 'pointer'}}
        >
          Back to weight categories
        </div>
      )
    } else if (!this.props.singleWeight && !this.state.addAssignment) {
      return (
        <div
          onClick={() => this.props.onBack()}
          style={{marginTop: '8px', color: '#57B9E4', cursor: 'pointer'}}
        >
          Back to weights
        </div>
      )
    }
  }

  async submitAssignments () {
    console.log('submit assignments')
    this.setState({loading: true})
    let assignmentCount = 0
    await this.state.assignments.forEach(async form => {
      if (!form.id) {
        console.log('creating: ', form.name)
        assignmentCount += 1
        await actions.assignments.createAssignment(this.props.cl, form).then(() => {
          this.setState({form: this.initializeFormData(), due_null: false})
          this.updateAssignments()
        }).catch(() => { this.setState({loading: false}) })
      }
    })
    showSnackbar(`Created ${assignmentCount} new assignment` + (assignmentCount > 1 ? 's' : ''), 'success')
    this.setState({loadingAssignments: true})
    await actions.assignments.getClassAssignments(this.props.cl).then((assignments) => {
      this.setState({assignments, loadingAssignments: false})
    }).then(() => { this.setState({loadingAssignments: false}) })
    this.setState({loading: false})
  }

  async handleSubmit () {
    this.props.onSubmit()
  }

  onSubmitSingleWeight () {
    this.submitAssignments()
    this.handleSubmit()
    browserHistory.push('/student/class/' + this.props.cl.id.toString())
  }

  render () {
    let {viewOnly, loadingAssignments, loadingWeights, currentAssignment,
      currentWeightIndex, currentWeight, weights, addAssignment} = this.state
    const {cl} = this.props

    let assignments = this.filterAssignments()

    if (this.props.singleWeight) {
      weights = this.getSingleWeight()
    }

    return (
      <div id='cn-assignments'>
        {loadingAssignments || loadingWeights
          ? <SkLoader />
          : <div id='cn-assignment-window'>
            {!viewOnly && !addAssignment &&
              <div>
                {this.renderBackButton()}
                <AssignmentCategories
                  cl={cl}
                  weights={weights}
                  singleWeight={this.props.singleWeight}
                  noAssignments={this.state.assignments}
                  assignments={this.state.assignments}
                  onClick={this.toAssignmentForm.bind(this)}
                  onSubmit={() => this.props.onSubmit()}
                />
              </div>
            }
            {!viewOnly && addAssignment &&
              <div id='class-editor-assignment-form'>
                {this.renderBackButton()}
                <AssignmentForm
                  assignment={currentAssignment}
                  cl={cl}
                  onCreateAssignment={this.onCreateAssignment.bind(this)}
                  onUpdateAssignment={this.onUpdateAssignment.bind(this)}
                  currentWeight={currentWeight}
                  updateLastAssignmentDate={(date) => this.updateLastAssignmentDate(date)}
                  lastAssignmentDate={this.state.lastAssignmentDate}
                />
                {(assignments.length === 0) && !this.props.singleWeight &&
                  <div>
                    No assignments for this weight? <span style={{color: '#57B9E4', cursor: 'pointer'}} onClick={() => this.setState({addAssignment: false, currentAssignment: null})}>Continue to the next one.</span>
                  </div>
                }
              </div>
            }
            {/* {!viewOnly && assignments.length === 0 &&
              <div className='margin-top margin-bottom center-text'>
                <a onClick={() => this.toggleSkipCategoryModal()}>Skip this category</a>
              </div>
            } */}
            {(assignments.length !== 0 && !viewOnly && addAssignment) &&
              <div id='cn-assignment-table'>
                <div id='cn-assignment-table-label'>
                  Assignments
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
                  onSubmit={() => {
                    this.setState({addAssignment: false, currentAssignment: null})
                    this.updateAssignments()
                    this.submitAssignments()
                  }}
                  onSubmitSingleWeight={
                    this.props.singleWeight
                      ? () => this.onSubmitSingleWeight()
                      : null
                  }
                />
              </div>
            }
            {viewOnly &&
              <div id='cn-assignment-table'>
                <div id='cn-assignment-table-label'>
                  Assignments
                  {viewOnly && <a onClick={() => this.props.onEdit()}>Edit</a>}
                </div>
                <AssignmentTable
                  viewOnly={viewOnly}
                  assignments={this.state.assignments}
                  currentAssignment={currentAssignment}
                  onSelectAssignment={this.onSelectAssignment.bind(this)}
                  onDeleteAssignment={this.onDeleteAssignment.bind(this)}
                  weights={weights}
                  cl={cl}
                  currentWeight={weights[currentWeightIndex]}
                  onEdit={() => this.props.onEdit()}
                  onSubmit={() => this.onNext()}
                />
              </div>
            }
            {assignments.length !== 0 && !viewOnly && !addAssignment &&
              <button
                onClick={() => this.handleSubmit()}
                className='button full-width margin-top margin-bottom'
              >
                Submit and Continue
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
  onEdit: PropTypes.func,
  onBack: PropTypes.func,
  singleWeight: PropTypes.number
}

export default Assignments
