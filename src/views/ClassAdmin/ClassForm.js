import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../components/Form'
import actions from '../../actions'
import DaySelector from '../components/ClassEditor/MeetingTimes/DaySelector'
import TimeFields from '../components/ClassEditor/MeetingTimes/TimeFields'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'subject': {
    type: 'required'
  },
  'code': {
    type: 'required'
  },
  'section': {
    type: 'required'
  },
  'meet_start_time': {
    type: 'required'
  },
  'meet_days': {
    type: 'required'
  },
  'class_period_id': {
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
      loading: false,
      periods: []
    }
  }

  componentWillMount () {
    const {classPeriod} = this.props
    actions.schools.getSchoolById(classPeriod.school_id).then(school => {
      this.setState({periods: school.class_periods})
    })
  }

  initializeFormData () {
    const {cl: {
      id,
      name,
      subject,
      code,
      section,
      crn,
      meet_start_time: startTime,
      meet_days: days,
      location,
      type
    }, classPeriod} = this.props

    return {
      id: id || '',
      name: name || '',
      subject: subject || '',
      code: code || '',
      section: section || '',
      crn: crn || '',
      meet_start_time: startTime || '',
      meet_days: days || '',
      location: location || '',
      type: type || '',
      class_period_id: classPeriod.id,
      created_on: 'Web'
    }
  }

  /*
  * On submit determine if user should create class or update it.
  */
  onSubmit (event) {
    event.preventDefault()

    if (!this.props.cl.school.is_university) {
      requiredFields.code = {}
      requiredFields.subject = {}
    }

    if (this.state.form.meet_days === 'Online') {
      requiredFields.meet_start_time = {}
    }

    if (this.props.validateForm(this.state.form, requiredFields)) {
      const form = this.mapForm(this.state.form)
      !form.id ? this.onCreateClass(form) : this.onUpdateClass(form)
    }
  }

  /*
  * Map form
  */
  mapForm () {
    let meetStartTime = this.state.form.meet_days === 'Online' ? 'Online' : this.state.form.meet_start_time
    let form = {...this.state.form, meet_start_time: meetStartTime}
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
    const {formErrors} = this.props
    return (
      <DaySelector
        days={form.meet_days}
        onChange={this.onDaysUpdate.bind(this)}
        error={formErrors.meet_days}
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
        <div className='class-form-field margin-top'>
          <InputField
            error={formErrors.name}
            label="Class name"
            name="name"
            onChange={updateProperty}
            placeholder="i.e. Math 101"
            value={form.name}
          />
        </div>
        <div className='class-form-field margin-top'>
          <InputField
            error={formErrors.subject}
            label="Subject"
            name="subject"
            onChange={updateProperty}
            placeholder="i.e. MTH"
            value={form.subject}
          />
          <InputField
            error={formErrors.code}
            label="Code"
            name="code"
            onChange={updateProperty}
            placeholder="i.e. 1002"
            value={form.code}
          />
          <InputField
            error={formErrors.section}
            label="Section"
            name="section"
            onChange={updateProperty}
            placeholder="i.e. 01"
            value={form.section}
          />
        </div>
        <div className='class-form-field margin-top'>
          <InputField
            error={formErrors.crn}
            label="Class crn"
            name="crn"
            onChange={updateProperty}
            placeholder="i.e. 48427"
            value={form.crn}
          />
          <SelectField
            error={formErrors.class_period_id}
            label="Class Period"
            name="class_period_id"
            onChange={updateProperty}
            options={this.state.periods.map(period => {
              return {value: period.id, name: period.name}
            })}
            placeholder="Select period"
            value={form.class_period_id}
          />
        </div>
        <div id='meeting-info' className='class-form-field margin-top'>
          {this.renderDays()}
        </div>
        <div id='meeting-info' className='class-form-field'>
          {this.state.form.meet_days !== 'Online' && this.renderTimes()}
        </div>
        <div className='class-form-field margin-top'>
          <InputField
            error={formErrors.location}
            label="Location"
            name="location"
            onChange={updateProperty}
            placeholder="Location"
            value={form.location}
          />
        </div>
        <div className='class-form-field margin-top'>
          <InputField
            error={formErrors.type}
            label="Class type"
            name="location"
            onChange={updateProperty}
            placeholder="i.e. Lecture"
            value={form.type}
          />
        </div>
        <div className='class-form-field margin-top'>
          <button
            className={`button full-width margin-bottom ${disabledClass}`}
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
  validateForm: PropTypes.func,
  classPeriod: PropTypes.object
}

export default ValidateForm(Form(ClassForm, 'form'))
