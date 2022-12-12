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
            showDatePicker: false,
            datePickerId: 0
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

    submitForm(event) {
        if(event.key === 'Enter') {
            this.onSubmit(event)
        }
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

    copyName(name) {
        return name.match(new RegExp(/\d$/))
            ? `${name.slice(0, -1)}${parseInt(name.slice(-1)) + 1}`
            : `${name} 1`
    }

    copyExistingAssignment(assignment) {
        console.log(assignment.name)
        console.log(this.copyName(assignment.name))

        const copy = {
            ...assignment,
            name: this.copyName(assignment.name),
            id:null
        }
        this.onCreateAssignmentFromUpdate(copy)
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
        } else {
            newForm.name = newForm.name + ' 1'
        }
        const form = this.mapCopyForm(newForm)
        this.onCopyAssignment(form)
    }

    onNext() {

    }

    onModifyNameField(event, assignment){
        const { assignments } = this.props
        const index = assignments.findIndex( a => a.id === assignment.id)
        assignments[index].name = event.target.value
        this.setState({assignments: assignments})
      }

      onSubmitUpdatedAssignment(assignment){
        const form = {
          id: assignment.id || null,
          name: assignment.name|| '',
          due: assignment.due || '',
          created_on: 'Web',
          year_due: assignment.due || '',
        }
        assignment.id ? this.onUpdateAssignmentFromUpdate(form) : this.onCreateAssignmentFromUpdate(form)
      }

      onCreateAssignmentFromUpdate(assignment) {
        this.setState({ loading: true })
        actions.assignments.createAssignment(this.props.cl, assignment).then((a) => {
          this.setState({ form: this.initializeFormData(), loading: false })
          this.props.onCreateAssignment(a)
        }).catch(() => { this.setState({ loading: false }) })
      }

      onUpdateAssignmentFromUpdate(assignment) {
        this.setState({ loading: true })
        actions.assignments.updateAssignment(this.props.cl, assignment).then((a) => {
          this.setState({ form: this.initializeFormData(), loading: false })
          this.props.onUpdateWeight(a)
        }).catch(() => { this.setState({ loading: false }) })
      }

    mapAssignmentDate(date) {
        const { cl } = this.props
        const today = moment.tz(Date.now(), cl.school.timezone)
        const due = moment.tz(date, cl.school.timezone)
        return today.format('YYYY-MM-DD') === due.format('YYYY-MM-DD') ? 'Today'
          : `${due.format('ddd')}, ${due.format('MMM')} ${due.format('Do')}`
      }

      showMonth(date) {
          return moment(date).month() + 1
      }
      showDay(date) {
        return moment(date).date()
      }

      handleKeyDown(event, assignment) {
        if(event.key === 'Enter' || event.key === 'Tab') {
          this.setState({ loading: true })
          this.onSubmitUpdatedAssignment(assignment)
          this.setState({ loading: false })
        }
      }

      onSelectUpdate(event, assignment) {
        const { assignments } = this.props
        const index = assignments.findIndex( a => a.id === assignment.id)
        assignments[index].weight_id = event.target.value
        this.setState({assignments: assignments})
        const form = {
            id: assignments[index].id || null,
            name: assignments[index].name || '',
            weight_id: assignments[index].weight_id || '',
        }
        this.onTagAssignment(form)
      }

      onTagAssignment(form) {
        this.setState({ loading: true })
        actions.assignments.tagAssignment(this.props.cl, form).then((assignment) => {
          this.props.onTagAssignment(assignment)
        }).catch(() => { this.setState({ loading: false }) })
      }

      onFormMonthChange(event) {
        const { form } = this.state
        form.due = form.due ? moment(form.due).set('month', +event.target.value - 1).format('ddd MM/DD') : moment().set('month', +event.target.value - 1).format('ddd MM/DD') 
      }
      onMonthChange(event, assignment) {
        const { assignments } = this.props
        const index = assignments.findIndex( a => a.id === assignment.id)
        assignments[index].due = moment(assignments[index].due).set('month', event.target.value)
        this.setState({assignments: assignments})
      }

      onFormDayChange(event) {
        const { form } = this.state
        form.due = form.due? moment(form.due).set('date', +event.target.value).format('ddd MM/DD')  : moment().set('date', +event.target.value).format('ddd MM/DD')  
      }
      onDayChange(event, assignment) {
        const { assignments } = this.props
        const index = assignments.findIndex( a => a.id === assignment.id)
        assignments[index].due = moment(assignments[index].due).set('date', event.target.value)
        this.setState({assignments: assignments})
      }

      openDatePicker(pickerId) {
        this.setState({ datePickerId: pickerId})
        this.setState({ showDatePicker: true })
      }

      submitFormFromDatePicker(){
          const { form } = this.state
          if(form.name){
            const sendForm = {
                id: null,
                name: form.name|| '',
                due: moment(form.due) || '',
                created_on: 'Web',
                year_due: date.getFullYear() || '',
              }
            form.id ? this.onUpdateAssignmentFromUpdate(sendForm) : this.onCreateAssignmentFromUpdate(sendForm)
          }
      }

      submitFormFromWeightTag(event){
        event.persist()
        const { form } = this.state
        if(form.name){
          const sendForm = {
              id: null,
              name: form.name|| '',
              due: moment(form.due) || '',
              created_on: 'Web',
              year_due: date.getFullYear() || '',
            }
            actions.assignments.createAssignment(this.props.cl, sendForm).then((a) => {
                const sendAssingment = {
                    ...a,
                    weight_id: event.target.value
                }
                this.setState({ form: this.initializeFormData(), loading: false })
                this.props.onCreateAssignment(sendAssingment)
                const tag = {
                    id: sendAssingment.id || null,
                    name: sendAssingment.name || '',
                    weight_id: sendAssingment.weight_id || '',
                }
                this.onTagAssignment(tag)
              }).catch(() => { this.setState({ loading: false }) })

      }
    }

    render() {
        const { form } = this.state
        const { formErrors, updateProperty, weights, assignments } = this.props
        const disableButton = !this.verifyData(form)

        //this matchtes the weights and assignments in the 3rd step
      for (let assignment of assignments) {
          if (!assignment.weight_id){
              for(let weight of weights) {
                  if (weight.name.substring(0, 3).toUpperCase() === assignment.name.substring(0, 3).toUpperCase()) {
                    assignment.weight_id = weight.id
                    const tag = {
                        id: assignment.id || null,
                        name: assignment.name || '',
                        weight_id: assignment.weight_id || '',
                    }
                    this.onTagAssignment(tag)
              }
          }
        }
      }

        return (
        <div id='cn-assignment-form' >
            <div>
                <div className='cn-section-name-header txt-gray' >
                    Name </div>
                <div className='cn-section-value-header txt-gray' >
                    {' '}</div>
                <div className='cn-section-value-header txt-gray' >
                    Weight </div>
                <div className='cn-section-value-header txt-gray' >
                    Due Date </div>
                
            </div> <hr className="txt-gray" />

            {
                assignments.map(assignment => (
                    <div className='' >
                        <div className="cn-delete-icon" >
                            <a onClick={() => this.onDeleteExisting(assignment)}>
                                <i class="far fa-trash-alt"></i>
                            </a>
                        </div>
                        <div className='cn-input-assignment-name' >
                            {/* <form onSubmit={this.onSubmit.bind(this)}> */}
                            <div class="form-element relative" >
                                <div className='cn-input-container margin-top' >
                                    <input className='cn-form-input'
                                        autoFocus={true}
                                        onChange={e => this.onModifyNameField(e, assignment)}
                                        value={assignment.name}
                                        onKeyDown={e => this.handleKeyDown(e, assignment)}
                                        key={`name${assignment.id}`}
                                    />
                                </div >
                            </div>
                    {/* </form> */}
                </div >
                <div className='cn-input-assignment-date' > {!this.state.due_null &&
                    <div >
                            <div>
                                <div className='cn-input-assignment-month'>
                                    <div className='cn-input-container margin-top hide-spinner'>
                                        <input className='cn-form-input'
                                                type={'number'}
                                                onChange={(e) => this.onMonthChange(e, assignment)}
                                                value={this.showMonth(assignment.due)}
                                                onKeyDown={e => this.handleKeyDown(e, assignment)}
                                                key={`month${assignment.id}`}/>
                                    </div>
                                </div>
                                <div className='cn-input-assignment-day'>
                                    <div className='cn-input-container margin-top hide-spinner'>
                                        <input className='cn-form-input'
                                                type={'number'}
                                                onChange={(e) => this.onDayChange(e, assignment)}
                                                value={this.showDay(assignment.due)}
                                                onKeyDown={e => this.handleKeyDown(e, assignment)}
                                                key={`day${assignment.id}`}/>
                                    </div>
                                </div>
                                <div className="cn-delete-icon" >
                                    <a onClick={() => this.openDatePicker(assignment.id)}>
                                        <i class="far fa-calendar" > </i>
                                    </a>
                                </div>
                            </div > 
                            {
                                this.state.showDatePicker && this.state.datePickerId === assignment.id &&
                                <DatePicker
                                    key={`datePicker-${assignment.id}`}
                                    givenDate={assignment.due ? moment(assignment.due) : Date.now()}
                                    returnSelectedDay={
                                        (day) => {
                                            assignment.due = moment(day)
                                            this.onSubmitUpdatedAssignment(assignment)
                                            this.setState({ showDatePicker: false })
                                        }
                                    }
                                    close={
                                        () => {
                                            this.setState({ showDatePicker: false })
                                        }
                                    }
                                />
                            }
                    </div>
                } </div>
                
                <div className='cn-input-assignment-weight'>
                    <div className='cn-input-container margin-top'>
                        <select className="cn-form-input"
                            name='weight_id'
                            value={assignment.weight_id}
                            options={weights}
                            onChange={(e) => { this.onSelectUpdate(e, assignment) }}>
                            <option key="option 0" value="" className="option_no_weight" selected="selected"></option>
                            <option key="option 1" value="0" className="option_no_weight">No Weight</option>
                            {weights.map(weight => {
                            return (
                                <option key={`option${weight.id}`} value={weight.id}>{weight.name}</option>
                            )
                            })}
                        </select>
                    </div>
                </div>

                <div className="cn-files-icon" >
                    <a onClick={() => this.copyExistingAssignment(assignment)}>
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
                                <div className='cn-input-assignment-month'>
                                    <div className='cn-input-container margin-top hide-spinner'>
                                        <input className='cn-form-input'
                                                type={'number'}
                                                onChange={
                                                    (e) => {
                                                        this.onFormMonthChange(e)
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={form.due ? this.showMonth(form.due) : ''}
                                                onKeyDown={(e) => this.submitForm(e)}
                                                />
                                    </div>
                                </div>
                                <div className='cn-input-assignment-day'>
                                    <div className='cn-input-container margin-top hide-spinner'>
                                        <input className='cn-form-input'
                                                type={'number'}
                                                onChange={
                                                    (e) => {
                                                        this.onFormDayChange(e)
                                                        this.toggleAddingAssignment()
                                                    }
                                                }
                                                value={form.due ? this.showDay(form.due): ''}
                                                onKeyDown={(e) => this.submitForm(e)}
                                                />
                                    </div>
                                </div>
                                <div className="cn-delete-icon" >
                                    <a onClick={() => this.openDatePicker(0)}>
                                        <i class="far fa-calendar" > </i>
                                    </a>
                                </div>
                            </div > 
                            {
                                this.state.showDatePicker && this.state.datePickerId === 0 &&
                                <DatePicker
                                    onChange={e => console.log('changed')}
                                    key={'datePicker-0'}
                                    givenDate={this.props.lastAssignmentDate ? moment(this.props.lastAssignmentDate) : Date.now()}
                                    returnSelectedDay={
                                        (day) => {
                                            form.due = moment(day).format('ddd MM/DD')
                                            this.submitFormFromDatePicker()
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
                            options={weights}
                            onChange={(e) => { this.submitFormFromWeightTag(e) }}>
                            <option key="option 0" value="" className="option_no_weight" selected="selected"></option>
                            <option key="option 1" value="0" className="option_no_weight">No Weight</option>
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