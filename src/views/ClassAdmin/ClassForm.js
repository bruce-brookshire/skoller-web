import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'
import {convertUTCDatetimeToDateString, convertLocalDateToUTC,
  mapTimeStringToInput} from '../../utilities/time'
import DaySelector from '../components/ClassEditor/MeetingTimes/DaySelector'

const requiredFields = {
  'name': {
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
      this.setState({loading: false})
      this.props.onSubmit(cl)
      this.props.onClose()
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update class.
  */
  onUpdateClass (form) {
    this.setState({loading: true})
    actions.classes.updateClass(form).then((cl) => {
      this.setState({loading: false})
      this.props.onSubmit(cl)
      this.props.onClose()
    }).catch(() => { this.setState({loading: false}) })
  }

  onDaysUpdate (newVal) {
    let newForm = this.state.form
    newForm.meet_days = newVal
    this.setState({form: newForm})
  }

  renderDays () {
    const {form} = this.state
    return (
      <DaySelector
        days={form.meet_days}
        onChange={this.onDaysUpdate.bind(this)}
      />
    )
  }

  renderMeetInfo () {
    return (
      <div>
        <div className='cn-meeting-time-days col-xs-12 margin-top'>
          {this.renderDays()}
        </div>
        {/* {this.state.days !== 'Online' && this.renderTimes()} */}
      </div>
    )
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
          {this.renderMeetInfo()}
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
