import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, TimeInputField} from '../../components/Form'
import actions from '../../actions'
import {convertUTCDatetimeToDateString, convertLocalDateToUTC,
  mapTimeStringToInput} from '../../utilities/time'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'number': {
    type: 'required'
  },
  'class_start': {
    type: 'required'
  },
  'class_end': {
    type: 'required'
  }
}

class ClassForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Intitialize state
  */
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false
    }
  }

  initializeFormData () {
    const {cl: {
      id,
      name,
      number,
      campus,
      class_start: clStart,
      class_end: clEnd,
      crn,
      meet_start_time: startTime,
      meet_end_time: endTime,
      meet_days: days,
      location,
      type,
      school
    }} = this.props

    return {
      id: id || '',
      name: name || '',
      number: number || '',
      class_start: clStart ? convertUTCDatetimeToDateString(clStart, school.timezone) : '',
      class_end: clEnd ? convertUTCDatetimeToDateString(clEnd, school.timezone) : '',
      crn: crn || '',
      campus: campus || '',
      meet_start_time: startTime ? mapTimeStringToInput(startTime) : 'TBA',
      meet_end_time: endTime ? mapTimeStringToInput(endTime) : 'TBA',
      meet_days: days || '',
      location: location || '',
      type: type || ''
    }
  }

  /*
  * On submit determine if user should create class or update it.
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {
      const form = this.mapForm(this.state.form)
      !form.id ? this.onCreateClass(form) : this.onUpdateClass(form)
    }
  }

  /*
  * Map form
  */
  mapForm () {
    const {cl} = this.props
    let form = {...this.state.form}
    form.class_start = convertLocalDateToUTC(this.state.form.class_start, cl.school.timezone)
    form.class_end = convertLocalDateToUTC(this.state.form.class_end, cl.school.timezone)
    return form
  }

  /*
  * Create class.
  */
  onCreateClass (form) {
    this.setState({loading: true})
    actions.classes.createClass(form).then((cl) => {
      this.props.onSubmit(cl)
      this.props.onClose()
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update class.
  */
  onUpdateClass (form) {
    this.setState({loading: true})
    actions.classes.updateClass(form).then((cl) => {
      this.props.onSubmit(cl)
      this.props.onClose()
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    const disabledClass = this.state.loading ? 'disabled' : ''

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='row'>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.name}
              label="Class name"
              name="name"
              onChange={updateProperty}
              placeholder="i.e. Math 101"
              value={form.name}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.number}
              label="Class number"
              name="number"
              onChange={updateProperty}
              placeholder="i.e. MTH 1002.01"
              value={form.number}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.class_start}
              label="Class start"
              name="class_start"
              onChange={updateProperty}
              placeholder="Class start"
              type='date'
              value={form.class_start}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.class_end}
              label="Class end"
              name="class_end"
              onChange={updateProperty}
              placeholder="Class end"
              type='date'
              value={form.class_end}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.crn}
              label="Class crn"
              name="crn"
              onChange={updateProperty}
              placeholder="i.e. 48427"
              value={form.crn}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.campus}
              label="Campus"
              name="campus"
              onChange={updateProperty}
              placeholder="Campus"
              value={form.campus}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.meet_days}
              label="Meet days"
              name="meet_days"
              onChange={updateProperty}
              placeholder="i.e. MWF"
              value={form.meet_days}
            />
          </div>
          <div className='col-xs-12'>
            <TimeInputField
              containerClassName='margin-top'
              error={formErrors.meet_start_time}
              label="Start time"
              name="meet_start_time"
              onChange={updateProperty}
              placeholder="i.e. 8:00am"
              value={form.meet_start_time}
            />
          </div>
          <div className='col-xs-12'>
            <TimeInputField
              containerClassName='margin-top'
              error={formErrors.meet_end_time}
              label="End time"
              name="meet_end_time"
              onChange={updateProperty}
              placeholder="i.e. 9:00am"
              value={form.meet_end_time}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.location}
              label="Location"
              name="location"
              onChange={updateProperty}
              placeholder="Location"
              value={form.location}
            />
          </div>
          <div className='col-xs-12'>
            <InputField
              containerClassName='margin-top'
              error={formErrors.type}
              label="Class type"
              name="location"
              onChange={updateProperty}
              placeholder="i.e. Lecture"
              value={form.type}
            />
          </div>
          <div className='col-xs-12'>
            <button
              className={`button full-width margin-top margin-bottom ${disabledClass}`}
              disabled={this.state.loading}
              type="submit"
            >Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

ClassForm.propTypes = {
  cl: PropTypes.object,
  formErrors: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(ClassForm, 'form'))
