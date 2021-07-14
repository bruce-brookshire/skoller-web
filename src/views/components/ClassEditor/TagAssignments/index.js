import React from 'react'
import PropTypes from 'prop-types'
import AssignmentTable from './AssignmentTable'
// import SkipCategoryModal from './SkipCategoryModal'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { showSnackbar } from '../../../../utilities/snackbar'
import ProgressModal from '../progressModel'
import { ProgressBar, Step } from "react-step-progress-bar";
import ToolTip from '../../../../views/components/ToolTip'

class TagAssignments extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.initializeState()
    }

    /*
     * Fetch the weights for a given class
     */
    async componentWillMount() {
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

    async updateAssignments() {
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

    getSingleWeightCurrentWeight() {
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
    initializeState() {
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
            // openSkipCategoryModal: false,
            addAssignment: false,
            lastAssignmentDate: Date.now(),
            addingAssignment: false,
            openProgressModal: false
        }
    }

    filterAssignments() {
        const { assignments, currentWeightIndex, weights, viewOnly } = this.state
        return assignments //(!viewOnly && weights.length > 0) ? assignments.filter((assign) => assign.weight_id && assign.weight_id === weights[currentWeightIndex].id) : assignments
    }

    /*
     * Set form value equal to assignment in order to be edited.
     *
     * @param [Object] assignment. Assignment object to be edited.
     */
    onSelectAssignment(assignment) {
        this.setState({ currentAssignment: assignment })
    }

    /*
     * On create assignment, push assignment onto array
     *
     * @param [Object] assignment. Assignment.
     */
    onCreateAssignment(assignment) {
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
    onUpdateAssignment(assignment) {
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

    onTagAssignment(assignment) {
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
    async onDeleteAssignment(assignment) {
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
        this.setState({ assignments: safeAssignments })
    }

    onNext() {
        this.updateAssignments()
        const { currentWeightIndex, weights } = this.state
        if (weights[currentWeightIndex + 1]) {
            this.setState({ currentWeightIndex: currentWeightIndex + 1, currentWeight: weights[currentWeightIndex + 1], addAssignment: true })
        } else {
            this.props.onSubmit()
        }
    }


    async handleSubmit() {
        this.props.onSubmit()
    }

    /*
     * Toggle the problems modal.
     */
    toggleAddingAssignment(bool = !this.state.addingAssignment) {
        this.setState({ addingAssignment: bool })
    }

    toAssignmentForm(weight) {
        this.setState({ addAssignment: true, currentWeight: weight, currentWeightIndex: this.state.weights.indexOf(weight) })
    }

    onUpdateCurrentIndex(form) {
        this.props.onUpdateCurrentIndex(form)
    }

    toggleProgressModal() {
        this.setState({ openProgressModal: !this.state.openProgressModal })
    }

    renderProgressModal() {
        const { openProgressModal, assignments, weights } = this.state
        return (
            <ProgressModal open={openProgressModal}
                onClose={this.toggleProgressModal.bind(this)}
                onConfirm={this.onUpdateCurrentIndex.bind(this)}
                currentIndex={2}
                assignments={assignments}
                weights={weights}
            />
        )
    }

    updateLastAssignmentDate(date) {
        this.setState({ lastAssignmentDate: date })
    }

    getSingleWeight() {
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

    renderBackButton() {
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
        }
    }

    async submitAssignments() {
        this.setState({ loading: true })
        let assignmentCount = 0
        await this.state.assignments.forEach(async form => {
            if (!form.id) {
                assignmentCount += 1
                // await actions.assignments.createAssignment(this.props.cl, form).then(() => {
                this.setState({ form: this.initializeFormData(), due_null: false })
                this.updateAssignments()
                // }).catch(() => {this.setState({ loading: false })})
            }
        })
        showSnackbar(`Created ${assignmentCount} new assignment` + (assignmentCount > 1 ? 's' : ''), 'success')
        this.setState({ loadingAssignments: true })
        await actions.assignments.getClassAssignments(this.props.cl).then((assignments) => {
            this.setState({ assignments, loadingAssignments: false })
        }).then(() => { this.setState({ loadingAssignments: false }) })
        this.setState({ loading: false })
    }

    renderProgressBar() {
        return <div className='cn-section-progress-outer' >
            <img alt="Skoller"
                className='logo'
                src='/src/assets/images/sammi/Smile.png'
                height="40" />
            <span className="cn-section-progress-title" > Tag Assignments
                <div className="infodiv">
                    <ToolTip
                        tip={
                            <div>
                                <p>
                                    Tag assignments to weight categories
                                </p>
                                <p>
                                    why? This associates value for esach individual assignments
                                </p>
                                <p>
                                    Example: 4 assignments tag to exams category worth 20% make each assignment worth 5%
                                </p>
                            </div>
                        }>
                        < i class="far fa-question-circle" > </i>
                    </ToolTip>
                </div>
            </span >
            <div className="cn-pull-right" >
                <span> 3 / 3 </span> <span className='cn-section-progressbar' > <a onClick={() => this.toggleProgressModal()}>< ProgressBar percent={
                    (3 / 3) * 100
                }
                /></a></span>
            </div>
        </div >
    }

    render() {
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

        // console.log(this.state.assignments)

        return (<div id='cn-assignments' > {
            // loadingAssignments || loadingWeights ?
            // <SkLoader />
            // :
            <div id='cn-assignment-window' >
                {this.renderProgressBar()}
                {

                    <div id='cn-assignment-table-new' >
                        <AssignmentTable
                            viewOnly={viewOnly}
                            addingAssignment={this.state.addingAssignment}
                            assignments={assignments}
                            currentAssignment={currentAssignment}
                            onSelectAssignment={this.onSelectAssignment.bind(this)}
                            onTagAssignment={this.onTagAssignment.bind(this)}
                            weights={weights}
                            cl={cl}
                        />
                    </div >
                } {
                    assignments.length !== 0 && !viewOnly && !addAssignment &&
                    <button
                        onClick={
                            () => this.handleSubmit()
                        }
                        className='button full-width margin-top margin-bottom' >
                        Submit Tags </button>
                } {this.renderProgressModal()}</div>} </div >
        )
    }
}

TagAssignments.propTypes = {
    cl: PropTypes.object,
    isReview: PropTypes.bool,
    onSubmit: PropTypes.func,
    onEdit: PropTypes.func,
    onBack: PropTypes.func,
    onUpdateCurrentIndex: PropTypes.func,
    singleWeight: PropTypes.number
}

export default withRouter(TagAssignments)