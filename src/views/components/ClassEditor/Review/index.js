import React from 'react'
import PropTypes from 'prop-types'
import ReviewForm from './ReviewForm'
import ReviewTable from './ReviewTable'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { showSnackbar } from '../../../../utilities/snackbar'

class Review extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
     * Fetch the weights for a given class
     */
  async componentWillMount () {
    const { cl } = this.props
    this.setState({ loadingAssignments: true })
    await actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({ assignments, loadingAssignments: false })
    }).then(() => { this.setState({ loadingAssignments: false }) })

    this.setState({ loadingWeights: true })
    await actions.weights.getClassWeights(cl).then((weights) => {
      weights = weights.sort((a, b) => {
        return a.weight < b.weight
      })
      this.setState({ weights, loadingWeights: false })
    }).then(() => { this.setState({ loadingWeights: false }) })

    this.getSingleWeightCurrentWeight()
  }

  async updateAssignments () {
    const { cl } = this.props
    let unsavedAssignments = []
    this.state.assignments.forEach(a => {
      if (!a.id) {
        unsavedAssignments.push(a)
      }
    })
    this.setState({ loadingAssignments: true })
    await actions.assignments.getClassAssignments(cl).then((assignments) => {
      let allAssignments = assignments.concat(unsavedAssignments)
      this.setState({ assignments: allAssignments, loadingAssignments: false })
    }).then(() => { this.setState({ loadingAssignments: false }) })
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
    this.setState({ addAssignment: addAssignment, currentWeightIndex: currentWeightIndex, currentWeight: currentWeight })
  }

  /*
     * Method for intializing the state.
     *
     * @return [Object]. State object.
     */
  initializeState () {
    const { isReview } = this.props
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
      lastAssignmentDate: Date.now(),
      addingAssignment: false
    }
  }

  filterAssignments () {
    const { assignments, currentWeightIndex, weights, viewOnly } = this.state
    return assignments // (!viewOnly && weights.length > 0) ? assignments.filter((assign) => assign.weight_id && assign.weight_id === weights[currentWeightIndex].id) : assignments
  }

  /*
     * Set form value equal to assignment in order to be edited.
     *
     * @param [Object] assignment. Assignment object to be edited.
     */
  onSelectAssignment (assignment) {
    this.setState({ currentAssignment: assignment })
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
    console.log(newAssignments)
    this.setState({ assignments: newAssignments, currentAssignment: null })
  }

  /*
     * On update assignment, replace existing assignment with the new assignment.
     *
     * @param [Object] assignment. Assignment.
     */
  onUpdateAssignment (assignment) {
    if (assignment.id) {
      actions.assignments.updateAssignment(this.props.cl, assignment)
      this.setState({ currentAssignment: null })
      this.updateAssignments()
    } else {
      const { assignments } = this.state
      const newAssignments = assignments
      const index = assignments.findIndex(a => a === assignment)
      newAssignments[index] = assignment
      this.setState({ assignments: newAssignments, currentAssignment: null })
    }
  }

  onTagAssignment (assignment) {
    const newAssignments = this.state.assignments
    const index = this.state.assignments.findIndex(a => a.id === assignment.id)
    newAssignments[index] = assignment
    this.setState({ assignments: newAssignments })
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
        this.setState({ currentAssignment: null })
        this.updateAssignments()
      }).catch(() => false)
    }
    this.setState({ assignments: safeAssignments })
  }

  onNext () {
    this.updateAssignments()
    const { currentWeightIndex, weights } = this.state
    if (weights[currentWeightIndex + 1]) {
      this.setState({ currentWeightIndex: currentWeightIndex + 1, currentWeight: weights[currentWeightIndex + 1], addAssignment: true })
    } else {
      this.props.onSubmit()
    }
  }

  /*
     * Toggle the problems modal.
     */
  toggleSkipCategoryModal () {
    this.setState({ openSkipCategoryModal: !this.state.openSkipCategoryModal })
  }

  /*
     * Toggle the problems modal.
     */
  toggleAddingAssignment (bool = !this.state.addingAssignment) {
    this.setState({ addingAssignment: bool })
  }

  toAssignmentForm (weight) {
    this.setState({ addAssignment: true, currentWeight: weight, currentWeightIndex: this.state.weights.indexOf(weight) })
  }

  updateLastAssignmentDate (date) {
    this.setState({ lastAssignmentDate: date })
  }

  renderBackButton () {
    if (!this.props.singleWeight && this.state.addAssignment) {
      return (<div onClick={
        () => {
          this.updateAssignments()
          this.setState({ addAssignment: false, currentAssignment: null })
        }
      }
      style={
        { marginTop: '8px', color: '#57B9E4', cursor: 'pointer' }
      } >
                Back to weight categories </div>
      )
    } else if (!this.props.singleWeight && !this.state.addAssignment) {
      // return (
      //   <div
      //     onClick={() => this.props.onBack()}
      //     style={{marginTop: '8px', color: '#57B9E4', cursor: 'pointer'}}
      //   >
      //     Back to weights
      //   </div>
      // )
    }
  }

  async handleSubmit () {
    this.props.onSubmit()
  }

  render () {
    let {
      viewOnly,
      loadingAssignments,
      loadingWeights,
      currentAssignment,
      currentWeightIndex,
      currentWeight,
      weights,
      addAssignment
    } = this.state
    const { cl } = this.props

    let assignments = this.filterAssignments()

    if (this.props.singleWeight) {
      weights = this.getSingleWeight()
    }

    return (<div id='cn-assignments' > {
      loadingAssignments || loadingWeights
        ? <SkLoader />
        : <div id='cn-assignment-window' > {

        } {!viewOnly &&
                    <div id='class-editor-assignment-form' > {this.renderBackButton()}
                      <ReviewForm
                        assignment={currentAssignment}
                        cl={cl}
                        onCreateAssignment={this.onCreateAssignment.bind(this)}
                        onUpdateAssignment={this.onUpdateAssignment.bind(this)}
                        onDeleteAssignment={this.onDeleteAssignment.bind(this)}
                        onTagAssignment={this.onTagAssignment.bind(this)}
                        weights={weights}
                        updateLastAssignmentDate={
                          (date) => this.updateLastAssignmentDate(date)
                        }
                        lastAssignmentDate={this.state.lastAssignmentDate}
                        toggleAddingAssignment={
                          (bool) => this.toggleAddingAssignment(bool)
                        }
                      />
                      {/* {
                            (assignments.length === 0) && !this.props.singleWeight &&
                            <div >
                                No assignments for this weight ? <span style={
                                    { color: '#57B9E4', cursor: 'pointer' }
                                }
                                    onClick={
                                        () => this.setState({ addAssignment: false, currentAssignment: null })
                                    } > Continue to the next one. </span> </div >
                        }  */}
                    </div>
        } {
          /* {!viewOnly && assignments.length === 0 &&
                                      <div className='margin-top margin-bottom center-text'>
                                        <a onClick={() => this.toggleSkipCategoryModal()}>Skip this category</a>
                                      </div>
                                    } */
        } {
          // (assignments.length !== 0 && !viewOnly && addAssignment) &&
          (assignments.length !== 0 && !viewOnly) &&

                        <div id='cn-assignment-table-new' >
                          {/* <div id='cn-assignment-table-label' >
                                Review {
                                    viewOnly && < a onClick={
                                        () => this.props.onEdit()
                                    } > Edit </a>}
                            </div > */}
                          <ReviewTable
                            viewOnly={viewOnly}
                            assignments={assignments}
                            onSelectAssignment={this.onSelectAssignment.bind(this)}
                            cl={cl}
                            weights={weights}
                          />
                        </div >
        } {
          viewOnly &&
                        <div id='cn-assignment-table' >
                          <div id='cn-assignment-table-label' >
                                Review {
                              viewOnly && <a onClick={
                                () => this.props.onEdit()
                              } > Edit </a>}
                          </div >
                          <ReviewTable
                            viewOnly={viewOnly}
                            assignments={this.state.assignments}
                            currentAssignment={currentAssignment}
                            onSelectAssignment={this.onSelectAssignment.bind(this)}
                            onDeleteAssignment={this.onDeleteAssignment.bind(this)}
                            weights={weights}
                            cl={cl}
                            currentWeight={weights[currentWeightIndex]}
                            onEdit={
                              () => this.props.onEdit()
                            }
                            onSubmit={
                              () => this.onNext()
                            }
                          /> </div >
        } {
          assignments.length !== 0 && !viewOnly && !addAssignment &&
                        <button
                          onClick={
                            () => this.handleSubmit()
                          }
                          className='button full-width margin-top margin-bottom' >
                            Submit and Continue </button>
        } </div>} </div >
    )
  }
}

Review.propTypes = {
  cl: PropTypes.object,
  isReview: PropTypes.bool,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func,
  onBack: PropTypes.func,
  singleWeight: PropTypes.number
}

export default withRouter(Review)
