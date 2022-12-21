import React from 'react'
import PropTypes from 'prop-types'
import AssignmentCategories from './AssignmentCategories'
import AssignmentForm from './AssignmentForm'
import AssignmentTable from './AssignmentTable'
import SkipCategoryModal from './SkipCategoryModal'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { showSnackbar } from '../../../../utilities/snackbar'
import ProgressModal from '../progressModel'
import { ProgressBar, Step } from "react-step-progress-bar";
import ReactTooltip from "react-tooltip";

class Assignments extends React.Component {
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
            openSkipCategoryModal: false,
            addAssignment: false,
            lastAssignmentDate: Date.now(),
            addingAssignment: false,
            openProgressModal: false,
            formIsEmpty: true,
            submitClicked: false,
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
        assignment.due ? this.updateLastAssignmentDate(moment(assignment.due).format('MM/DD/YYYY')) :
            this.updateLastAssignmentDate(moment().format('MM/DD/YYYY'))

        const newAssignments = this.state.assignments
        newAssignments.push(assignment)
        this.setState({ assignments: newAssignments, currentAssignment: null })
    }

    onCopyAssignment(assignment) {
        assignment.due ? this.updateLastAssignmentDate(moment(assignment.due).format('MM/DD/YYYY')) :
            this.updateLastAssignmentDate(moment().format('MM/DD/YYYY'))

        const newAssignments = this.state.assignments
        newAssignments.push(assignment)
        this.setState({ assignments: newAssignments, currentAssignment: assignment })
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
                this.setState({ currentAssignment: null })
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

    /*
     * Toggle the problems modal.
     */
    toggleSkipCategoryModal() {
        this.setState({ openSkipCategoryModal: !this.state.openSkipCategoryModal })
    }

    /*
     * Toggle the problems modal.
     */
    toggleAddingAssignment(bool = !this.state.addingAssignment) {
        this.setState({ addingAssignment: bool })
    }

    /*
     * Render the having issues modal.
     */

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
                currentIndex={1}
                assignments={assignments}
                weights={weights}
            />
        )
    }

    toAssignmentForm(weight) {
        this.setState({ addAssignment: true, currentWeight: weight, currentWeightIndex: this.state.weights.indexOf(weight) })
    }

    updateLastAssignmentDate(date) {
        if (date)
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

    async handleSubmit() {
        this.props.onSubmit()
    }

    handleEmptyForm(isEmpty) {
        this.setState({formIsEmpty: isEmpty})
        if(isEmpty){
            this.handleSubmitClicked(false)
        }
    }

    handleSubmitClicked(clicked){
        this.setState({submitClicked: clicked})
    }

    onSubmitSingleWeight() {
        this.submitAssignments()
        this.handleSubmit()
        this.props.history.push('/student/class/' + this.props.cl.id.toString())
    }

    renderProgressBar() {
        return <div className='cn-section-progress-outer' >
            <img alt="Skoller"
                className='logo'
                src='/src/assets/images/sammi/Smile.png'
                height="40" />
            <span className="cn-section-progress-title" > Add Assignment & Dates
                <div className="infodiv">
                    <i class="far fa-question-circle" data-tip data-for="infoTip"></i>

                    <ReactTooltip id="infoTip" place="right" effect="solid" type="light" border="true" textColor="white"
                        backgroundColor="white" arrowColor="transparent">
                        <div className="tooltipBox">
                            Add all graded assignments for this class <br></br><br></br>
                            Tip 1: If the due date is unknown but the assignment is sure to happen, go ahead and add it<br></br><br></br>
                            Tip 2: You can always add and edit assignments during the semester
                        </div>
                    </ReactTooltip>
                </div>
            </span >
            <div className="cn-pull-right" >
                <span> 2/2 </span> <span className='cn-section-progressbar' > < ProgressBar percent={(2 / 2) * 100} /></span>
                <a className="cn-section-icons" onClick={() => this.onUpdateCurrentIndex({ currentIndex: 0 })}><i class="fas fa-angle-left"></i></a>
                <a className="cn-section-icons" onClick={() => this.onUpdateCurrentIndex({ currentIndex: 0 })}><i className="fas fa-angle-right"></i></a>

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
            loadingAssignments || loadingWeights ?
                <SkLoader />
                :
                <div id='cn-assignment-window' >
                    {!viewOnly &&
                        <div id='class-editor-assignment-form' > {this.renderBackButton()}
                            {this.renderProgressBar()}
                            <AssignmentForm
                                assignment={currentAssignment}
                                cl={cl}
                                onCreateAssignment={this.onCreateAssignment.bind(this)}
                                onCopyAssignment={this.onCopyAssignment.bind(this)}
                                onUpdateAssignment={this.onUpdateAssignment.bind(this)}
                                onDeleteAssignment={this.onDeleteAssignment.bind(this)}
                                currentWeight={currentWeight}
                                updateLastAssignmentDate={
                                    (date) => this.updateLastAssignmentDate(date)
                                }
                                lastAssignmentDate={this.state.lastAssignmentDate}
                                toggleAddingAssignment={
                                    (bool) => this.toggleAddingAssignment(bool)
                                }
                                weights={weights}
                                assignments={assignments}
                                formIsEmpty={this.state.formIsEmpty}
                                handleEmptyForm={this.handleEmptyForm.bind(this)}
                            />
                            {!this.state.formIsEmpty && this.state.submitClicked &&
                                <span>This assignment is not saved. Save or delete to continue.</span>
                            }
                        </div>
                    }
                    
                    {
                        assignments.length === 0 &&
                        <div id='cn-assignment-table-new' >
                            <div className="cn-assignment-notadded">
                                <div className="center-text ">
                                    <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="80" />
                                    <h2>Add all assignments that will count towards your final grade in this class!</h2>
                                    <h4>Note: leave due dates empty if assignments don't have specific due dates at this time.</h4>
                                </div>
                            </div>
                        </div>
                    }
                    {/* {
                        // (assignments.length !== 0 && !viewOnly && addAssignment) &&
                        (assignments.length !== 0 && !viewOnly) &&

                        <div id='cn-assignment-table-new' >
                            <AssignmentTable
                                viewOnly={viewOnly}
                                addingAssignment={this.state.addingAssignment}
                                assignments={assignments}
                                currentAssignment={currentAssignment}
                                onSelectAssignment={this.onSelectAssignment.bind(this)}
                                weights={weights}
                                cl={cl}
                                currentWeight={weights[currentWeightIndex]}
                                onEdit={
                                    () => this.props.onEdit()
                                }
                                onSubmit={
                                    () => {
                                        this.setState({ addAssignment: false, currentAssignment: null })
                                        this.updateAssignments()
                                        this.submitAssignments()
                                    }
                                }
                                onSubmitSingleWeight={
                                    this.props.singleWeight ?
                                        () => this.onSubmitSingleWeight() : null
                                }
                            />
                        </div >
                    } */}
                    {
                        assignments.length !== 0 && !viewOnly && !addAssignment &&
                        <button
                            onClick={
                                () => {
                                    this.handleSubmitClicked(true)
                                    if(this.state.formIsEmpty) {
                                        this.handleSubmit()
                                    }
                                }
                            }
                            className='button full-width margin-top margin-bottom' >
                            Save Assignments ({assignments.length}) </button>
                    } </div>}
            {this.renderProgressModal()}
        </div >
        )
    }
}

Assignments.propTypes = {
    cl: PropTypes.object,
    isReview: PropTypes.bool,
    onSubmit: PropTypes.func,
    onEdit: PropTypes.func,
    onBack: PropTypes.func,
    singleWeight: PropTypes.number,
    onUpdateCurrentIndex: PropTypes.func,
}

export default withRouter(Assignments)