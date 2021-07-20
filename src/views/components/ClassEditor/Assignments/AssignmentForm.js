import React from 'react'
import PropTypes from 'prop-types'
import { Form, ValidateForm } from 'react-form-library'
import { InputField, SelectField } from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import { convertLocalDateToUTC, convertUTCDatetimeToDateString } from '../../../../utilities/time'
import DatePicker from '../../../components/DatePicker/index'
import moment from 'moment'
import CopyAssignmentModal from './CopyAssignmentModal'

const requiredFields = {
    'name': {
        type: ' '
    },
    // 'due': {
    //     validate: (value) => {
    //         return value.length === 9
    //     }
    // },
    // 'year_due': {
    //   validate: (value) => { return `${value}`.length === 4 }
    // }
}

const switchDate = () => {
    var today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)
}

const date = switchDate()

const yearOpts = [{
    name: date.getFullYear(),
    value: date.getFullYear()
},
{
    name: date.getFullYear() + 1,
    value: date.getFullYear() + 1
}
]

class AssignmentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.initializeState()
    }

    toggleAddingAssignment() {
        let formEmpty = (this.state.form.name === '')
        this.props.toggleAddingAssignment(!formEmpty)
    }

    /*
     * If new assignment is received, update form.
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.assignment && (this.state.form.id !== nextProps.assignment.id)) {
            this.setState({ form: this.initializeFormData(nextProps.assignment) })
        }

        // if (nextProps.currentWeight && (nextProps.currentWeight.id !== this.props.currentWeight.id)) {
        // let newForm = this.initializeFormData()
        // // newForm.weight_id = nextProps.currentWeight.id
        // this.setState({ form: newForm })
        // }
    }

    /*
     * Method for intializing the state.
     *
     * @return [Object]. State object.
     */
    initializeState() {
        const { assignment } = this.props
        return {
            form: this.initializeFormData(assignment),
            due_null: false,
            loading: false,
            showDatePicker: false,
            openCopyAssignmentModal: false,
        }
    }

    /*
     * Method for intializing form data.
     * Assignment form data.
     *
     * @param [Object] data. initial data
     * @return [Object]. Form object.
     */
    initializeFormData(data) {
        let formData = data || {}
        const { id, name, due } = formData
        const { cl } = this.props
        const dueDate = due ?
            convertUTCDatetimeToDateString(due, cl.school.timezone) : ''

        return ({
            id: id || null,
            name: name || '',
            due: dueDate ? this.mapAssignmentDate(dueDate) : '',
            year_due: dueDate ? dueDate.split('-')[0] : date.getFullYear(),
            created_on: 'Web'
        })
    }

    /*
     * Determine whether the user is submitting updated assignment or a new assignment.
     *
     */
    onSubmit() {
        console.log('here', this.state.form)
        if (this.state.due_null) {
            requiredFields.due = {}
        }
        if (this.props.validateForm(this.state.form, requiredFields)) {
            const form = this.mapForm(this.state.form)
            !form.id ? this.onCreateAssignment(form) : this.onUpdateAssignment(form)
        }
        if (this.props.updateLastAssignmentDate) {
            const date = this.state.form.due + '/' + this.state.form.year_due
            this.props.updateLastAssignmentDate(date)
        }
        this.props.toggleAddingAssignment(false)
    }

    /*
     * Create a new assignment
     */
    onCreateAssignment(form) {
        this.setState({ loading: true })
        actions.assignments.createAssignment(this.props.cl, form).then((assignment) => {
            this.setState({ form: this.initializeFormData(), loading: false, due_null: false })
            this.props.onCreateAssignment(assignment)
        }).catch(() => { this.setState({ loading: false }) })
    }

    /*
     * Update an existing assignment
     */
    onUpdateAssignment(form) {
        this.setState({ loading: true })
        actions.assignments.updateAssignment(this.props.cl, form).then((assignment) => {
            this.props.onUpdateAssignment(assignment)
            this.setState({ form: this.initializeFormData(), loading: false, due_null: false })
        }).catch(() => { this.setState({ loading: false }) })
    }


    onDelete() {
        this.setState({ loading: true })
        const { assignment } = this.props
        this.props.onDeleteAssignment(assignment)
        this.setState({ form: this.initializeFormData(), loading: false, due_null: false })
    }
    /*
     * Map the form
     */
    mapForm() {
        const { cl } = this.props
        if (!this.state.due_null && this.state.form.due) {
            let newForm = { ...this.state.form }
            let d = newForm.due.slice(4)
            let due = d.split('/')
            due = `${newForm.year_due}-${due[0]}-${due[1]}`
            newForm.due = convertLocalDateToUTC(due, cl.school.timezone)
            return newForm
        } else {
            let newForm = { ...this.state.form }
            newForm.due = null
            return newForm
        }
    }

    /*
     * Map the assignment dateParts
     *
     * @param [String] date. YYYY-MM-DD
     * @return [String]. MM/DD
     */
    mapAssignmentDate(date) {
        // const dateParts = date.split('-')
        // return `${dateParts[1]}/${dateParts[2]}`
        return moment(date).format('ddd MM/DD')
    }

    validateDate(d) {
        if (Object.prototype.toString.call(d) === '[object Date]') {
            if (isNaN(d.getTime())) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    verifyData(form) {
        const nameCheck = form.name.trim() !== ''
        const dateCheck = (form.due !== null) && (this.validateDate(new Date(form.due + '/' + form.year_due)))
        return nameCheck && (this.state.due_null ? true : dateCheck)
    }


    toggleCopyAssignmentModal() {
        this.setState({ openCopyAssignmentModal: !this.state.openCopyAssignmentModal })
    }

    renderCopyAssignmentModal() {
        const { openCopyAssignmentModal, assignment } = this.state
        return (
            <CopyAssignmentModal open={openCopyAssignmentModal}
                onClose={this.toggleCopyAssignmentModal.bind(this)}
                onConfirm={this.onNext.bind(this)}
                assignment={assignment}
            />
        )
    }

    onNext() {

    }


    render() {
        const { form } = this.state
        const { formErrors, updateProperty } = this.props
        const disableButton = !this.verifyData(form)
        return (<div id='cn-assignment-form' >
            <div>
                <div className='cn-section-name-header txt-gray' >
                    Name </div>
                <div className='cn-section-value-header txt-gray' >
                    Due Date </div>
            </div> <hr className="txt-gray" />
            <div className='' >
                <div className="cn-delete-icon" >
                    <a onClick={this.onDelete.bind(this)}>
                        <i class="far fa-trash-alt" > </i>
                    </a>
                </div> <div className='cn-input-assignment-name' >
                    <div class="form-element relative" >
                        <div className='cn-input-container margin-top' >
                            <input className='cn-form-input'
                                autoFocus={true}
                                onChange={
                                    (e) => {
                                        form.name = e.target.value
                                        this.toggleAddingAssignment()
                                    }
                                }
                                value={form.name}
                            />
                        </div >
                    </div>
                </div >
                <div className='cn-input-assignment-date' > {!this.state.due_null &&
                    <div >
                        <div onClick={
                            () => this.setState({ showDatePicker: true })
                        } >
                            <InputField
                                containerClassName='margin-top'
                                error={formErrors.due}
                                name='due'
                                value={form.due ? form.due : ''}
                                disabled={true}
                            />
                        </div > {
                            this.state.showDatePicker &&
                            <DatePicker
                                givenDate={this.props.lastAssignmentDate ? moment(this.props.lastAssignmentDate) : Date.now()}
                                returnSelectedDay={
                                    (day) => {
                                        form.due = moment(day).format('ddd MM/DD')
                                        this.setState({ showDatePicker: false })
                                        this.toggleAddingAssignment()
                                    }
                                }
                                close={
                                    () => {
                                        this.setState({ showDatePicker: false })
                                        this.toggleAddingAssignment()
                                    }
                                }
                            />
                        } </div>
                } </div>
                <div className="cn-files-icon" >
                    <a onClick={() => this.toggleCopyAssignmentModal()}>
                        <i class="far fa-clone" > </i>
                    </a>
                </div >
            </div >
            <div className='addbtndiv'>
                <a className={`${disableButton ? 'disabled' : ''}`}
                    disabled={this.state.loading || disableButton}
                    onClick={this.onSubmit.bind(this)} > {this.props.assignment ? ' Update ' : ' Save '}
                    {this.state.loading ? < Loading /> : null} </a>
            </div >
            {this.renderCopyAssignmentModal()}
        </div >
        )
    }
}

AssignmentForm.propTypes = {
    assignment: PropTypes.object,
    cl: PropTypes.object.isRequired,
    formErrors: PropTypes.object,
    onCreateAssignment: PropTypes.func,
    onUpdateAssignment: PropTypes.func.isRequired,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
    // currentWeight: PropTypes.object,
    resetValidation: PropTypes.func,
    isAdmin: PropTypes.bool,
    weights: PropTypes.array,
    lastAssignmentDate: PropTypes.string,
    updateLastAssignmentDate: PropTypes.func,
    onDeleteAssignment: PropTypes.func,
    toggleAddingAssignment: PropTypes.function
}

export default ValidateForm(Form(AssignmentForm, 'form'))