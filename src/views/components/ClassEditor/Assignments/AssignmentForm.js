import React from 'react'
import PropTypes from 'prop-types'
import { Form, ValidateForm } from 'react-form-library'
import { InputField, SelectField } from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import { convertLocalDateToUTC, convertUTCDatetimeToDateString } from '../../../../utilities/time'
import DatePicker from '../../../components/DatePicker/index'
import moment from 'moment'

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
            showDatePicker: false
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
    onSubmit(e) {
        e.preventDefault();
        if (this.state.showDatePicker) this.setState({ showDatePicker: false })
        // console.log('here', this.state.form)
        if (this.state.due_null) {
            requiredFields.due = {}
        }
        if (this.props.validateForm(this.state.form, requiredFields)) {
            const form = this.mapForm(this.state.form)
            !form.id ? this.onCreateAssignment(form) : this.onUpdateAssignment(form)
        }
        if (this.props.updateLastAssignmentDate && this.state.form.due) {
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

    onDeleteExisting(assignment) {
        this.props.onDeleteAssignment(assignment)
      }

    /*
     * copy assignment
     */
    onCopyAssignment(form) {
        this.setState({ loading: true })
        actions.assignments.createAssignment(this.props.cl, form).then((assignment) => {
            this.setState({ loading: false })
            this.props.onCopyAssignment(assignment)
        }).catch(() => { this.setState({ loading: false }) })
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

    mapCopyForm(form) {
        const { cl } = this.props
        if (!this.state.due_null && this.state.form.due) {
            let newForm = form
            let d = newForm.due.slice(4)
            let due = d.split('/')
            due = `${newForm.year_due}-${due[0]}-${due[1]}`
            newForm.due = convertLocalDateToUTC(due, cl.school.timezone)
            return newForm
        } else {
            let newForm = form
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

    copyFormData(data, name) {
        let formData = data || {}
        const { due, year_due } = formData

        return ({
            id: null,
            name: name,
            due: due,
            year_due: year_due,
            created_on: 'Web'
        })
    }

    copyAssignment(assignment) {

        const assignmentForm = {
            id: assignment.id,
            name: assignment.name,
            due: assignment.due
        }

        var regex = /\d+/g;
        var matches = assignment.name.match(regex);
        let newForm = { ...this.state.form }
        if (matches && matches.length) {
            let numb = matches[matches.length - 1]
            let newnumb = Number(numb) + 1
            let name = this.state.form.name.replace(numb, newnumb);
            newForm.name = name
            this.setState({ form: this.copyFormData(this.state.form, name) })
            console.log(newForm)
        } else {
            newForm.name = newForm.name + ' 1'
        }
        const form = this.mapCopyForm(newForm)
        this.onCopyAssignment(form)
    }

    onNext() {

    }

    mapAssignmentDate(date) {
        const { cl } = this.props
        const today = moment.tz(Date.now(), cl.school.timezone)
        const due = moment.tz(date, cl.school.timezone)
        return today.format('YYYY-MM-DD') === due.format('YYYY-MM-DD') ? 'Today'
          : `${due.format('ddd')}, ${due.format('MMM')} ${due.format('Do')}`
      }

      assignmentDate(date) {
        const { cl } = this.props
        return moment.tz(date, cl.school.timezone)
      }

      

    render() {
        const { form } = this.state
        const { formErrors, updateProperty, weights, assignments } = this.props
        const disableButton = !this.verifyData(form)

        //this matchtes the weights and assignments in the 3rd step
      for (let assignment of assignments) {
          for(let weight of weights) {
              if (weight.name.substring(0, 3).toUpperCase() === assignment.name.substring(0, 3).toUpperCase()) {
                assignment.weight_id = weight.id
          }
        }
      }

        return (<div id='cn-assignment-form' >
            <div>
                <div className='cn-section-name-header txt-gray' >
                    Name </div>
                <div className='cn-section-value-header txt-gray' >
                    Weight </div>
                <div className='cn-section-value-header txt-gray' >
                    Due Date </div>
                
            </div> <hr className="txt-gray" />
            <button onClick={() => console.log(assignments)}>click</button>

            {
                assignments.map(assignment => (
                    <div className='' >
                        <div className="cn-delete-icon" >
                            <a onClick={() => this.onDeleteExisting(assignment)}>
                                <i class="far fa-trash-alt"> </i>
                            </a>
                        </div>
                        <div className='cn-input-assignment-name' >
                            {/* <form onSubmit={this.onSubmit.bind(this)}> */}
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
                                        value={assignment.name}
                                    />
                                </div >
                            </div>
                    {/* </form> */}
                </div >
                <div className='cn-input-assignment-date' > {!this.state.due_null &&
                    <div >
                        {/* <form onSubmit={this.onSubmit.bind(this)}> */}
                            <div 
                                // onClick={
                                // () => this.setState({ showDatePicker: true })
                            // } 
                            >
                                {/* <InputField
                                    containerClassName='margin-top'
                                    error={formErrors.due}
                                    name='due'
                                    value={this.mapAssignmentDate(assignment.due)}
                                    // disabled={true}
                                    onFocus={() => this.setState({ showDatePicker: true })}
                                /> */}
                                <div className='cn-input-assignment-month'>
                                    <div className='cn-input-container margin-top'>
                                        <input className='cn-form-input'
                                                autoFocus={true}
                                                onChange={
                                                    (e) => {
                                                        form.name = e.target.value
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={this.assignmentDate(assignment.due).month()}/>
                                    </div>
                                </div>
                                <div className='cn-input-assignment-day'>
                                    <div className='cn-input-container margin-top'>
                                        <input className='cn-form-input'
                                                autoFocus={true}
                                                onChange={
                                                    (e) => {
                                                        form.name = e.target.value
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={this.assignmentDate(assignment.due).day()}/>
                                    </div>
                                </div>
                                <div className="cn-delete-icon" >
                                    <a onClick={() => this.setState({ showDatePicker: true })}>
                                        <i class="far fa-calendar" > </i>
                                    </a>
                                </div>
                            </div > 
                            {/* {
                                this.state.showDatePicker &&
                                <DatePicker
                                    givenDate={this.props.lastAssignmentDate ? moment(this.props.lastAssignmentDate) : Date.now()}
                                    returnSelectedDay={
                                        (day) => {
                                            assignment.due = moment(day).format('ddd MM/DD')
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
                            } */}
                        {/* </form> */}
                    </div>
                } </div>
                
                <div className='cn-input-assignment-weight'>
                    <div className='cn-input-container margin-top'>
                        <select className="cn-form-input"
                            name='weight_id'
                            value={assignment.weight_id}
                            options={weights}
                            onChange={(val) => { this.onChange({ id: id, weight_id: val.target.value }) }}>
                            <option key="option 0" value="" className="option_no_weight" selected="selected"></option>
                            <option key="option 1" value="No Weight" className="option_no_weight">No Weight</option>
                            {weights.map(weight => {
                            return (
                                <option key={`option${weight.id}`} value={weight.id}>{weight.name}</option>
                            )
                            })}
                        </select>
                    </div>
                </div>

                <div className="cn-files-icon" >
                    <a onClick={() => this.copyAssignment(assignment)}>
                        <i class="far fa-clone" > </i>
                    </a>
                </div >

            </div >

            

                ))
            }

            <div className='' >
                <div className="cn-delete-icon" >
                    <a onClick={this.onDelete.bind(this)}>
                        <i class="far fa-trash-alt" > </i>
                    </a>
                </div>
                <div className='cn-input-assignment-name' >
                    <form onSubmit={this.onSubmit.bind(this)}>
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
                    </form>
                </div >
                <div className='cn-input-assignment-date' > {!this.state.due_null &&
                    <div >
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div>
                                {/* <InputField
                                    containerClassName='margin-top'
                                    error={formErrors.due}
                                    name='due'
                                    value={form.due ? form.due : ''}
                                    // disabled={true}
                                    onFocus={() => this.setState({ showDatePicker: true })}
                                /> */}
                                <div className='cn-input-assignment-month'>
                                    <div className='cn-input-container margin-top'>
                                        <input className='cn-form-input'
                                                autoFocus={true}
                                                onChange={
                                                    (e) => {
                                                        form.name = e.target.value
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={form.due ? this.assignmentDate(form.due).month() : ''}/>
                                    </div>
                                </div>
                                <div className='cn-input-assignment-day'>
                                    <div className='cn-input-container margin-top'>
                                        <input className='cn-form-input'
                                                autoFocus={true}
                                                onChange={
                                                    (e) => {
                                                        form.name = e.target.value
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={form.due ? this.assignmentDate(form.due).day(): ''}/>
                                    </div>
                                </div>
                                <div className="cn-delete-icon" >
                                    <a onClick={() => this.setState({ showDatePicker: true })}>
                                        <i class="far fa-calendar" > </i>
                                    </a>
                                </div>
                            </div > 
                            {
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
                            }
                        </form>
                    </div>
                }
                </div>

                <div className='cn-input-assignment-weight'>
                    <div className='cn-input-container margin-top'>
                        <select className="cn-form-input"
                            name='weight_id'
                            value={form.weight_id}
                            options={weights}
                            onChange={(val) => { this.onChange({ id: id, weight_id: val.target.value }) }}>
                            <option key="option 0" value="" className="option_no_weight" selected="selected"></option>
                            <option key="option 1" value="No Weight" className="option_no_weight">No Weight</option>
                            {weights.map(weight => {
                            return (
                                <option key={`option${weight.id}`} value={weight.id}>{weight.name}</option>
                            )
                            })}
                        </select>
                    </div>
                </div>
                
                <div className="cn-files-icon" >
                    <a onClick={() => this.copyAssignment()}>
                        <i class="far fa-clone" > </i>
                    </a>
                </div >
            </div >
            {/* <div className='addbtndiv'>
                <a className={`${disableButton ? 'disabled' : ''}`}
                    disabled={this.state.loading || disableButton}
                    onClick={this.onSubmit.bind(this)} > {this.props.assignment ? ' Update ' : ' Save '}
                    {this.state.loading ? < Loading /> : null} </a>
            </div> */}
        </div >
        )
    }
}

AssignmentForm.propTypes = {
    assignment: PropTypes.object,
    cl: PropTypes.object.isRequired,
    formErrors: PropTypes.object,
    onCreateAssignment: PropTypes.func,
    onCopyAssignment: PropTypes.func,
    onUpdateAssignment: PropTypes.func.isRequired,
    updateProperty: PropTypes.func,
    validateForm: PropTypes.func,
    // currentWeight: PropTypes.object,
    resetValidation: PropTypes.func,
    isAdmin: PropTypes.bool,
    weights: PropTypes.array,
    assignments: PropTypes.array,
    lastAssignmentDate: PropTypes.string,
    updateLastAssignmentDate: PropTypes.func,
    onDeleteAssignment: PropTypes.func,
    toggleAddingAssignment: PropTypes.function
}

export default ValidateForm(Form(AssignmentForm, 'form'))