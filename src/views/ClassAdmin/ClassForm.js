import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import actions from '../../actions'
import DaySelector from '../components/ClassEditor/MeetingTimes/DaySelector'
import TimeFields from '../components/ClassEditor/MeetingTimes/TimeFields'

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
      subject,
      code,
      section,
      campus,
      crn,
      meet_start_time: startTime,
      meet_days: days,
      location,
      type
    }} = this.props

    return {
      id: id || '',
      name: name || '',
      subject: subject || '',
      code: code || '',
      section: section || '',
      crn: crn || '',
      campus: campus || '',
      meet_start_time: startTime || '',
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
    let form = {...this.state.form}
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

  onTimeUpdate (newVal) {
    let newForm = this.state.form
    newForm.meet_start_time = newVal
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

  renderTimes () {
    const {form} = this.state
    return (
      <TimeFields
        time={form.meet_start_time}
        onChange={this.onTimeUpdate.bind(this)}
      />
    )
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    const disabledClass = this.state.loading ? 'disabled' : ''

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='class-form-field'>
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
        <div className='class-form-field'>
          <InputField
            containerClassName='margin-top'
            error={formErrors.subject}
            label="Subject"
            name="subject"
            onChange={updateProperty}
            placeholder="i.e. MTH"
            value={form.subject}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.code}
            label="Code"
            name="code"
            onChange={updateProperty}
            placeholder="i.e. 1002"
            value={form.code}
          />
          <InputField
            containerClassName='margin-top'
            error={formErrors.section}
            label="Section"
            name="section"
            onChange={updateProperty}
            placeholder="i.e. 01"
            value={form.section}
          />
        </div>
        <div className='class-form-field'>
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
        <div className='class-form-field'>
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
        <div id='meeting-info' className='class-form-field margin-top'>
          {this.renderDays()}
          {this.state.days !== 'Online' && this.renderTimes()}
        </div>
        <div className='class-form-field'>
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
        <div className='class-form-field'>
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
        <div className='class-form-field'>
          <button
            className={`button full-width margin-top margin-bottom ${disabledClass}`}
            disabled={this.state.loading}
            type="submit"
          >Submit</button>
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
