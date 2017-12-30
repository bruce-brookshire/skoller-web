import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../components/Form'
import Modal from '../../components/Modal'
import actions from '../../actions'

const requiredFields = {
  'name': {
    type: 'required'
  },
  'number': {
    type: 'required'
  },
  'campus': {
    type: 'required'
  },
  'meet_start_time': {
    type: 'required'
  },
  'meet_end_time': {
    type: 'required'
  },
  'meet_days': {
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
      meet_start_time,
      meet_end_time,
      meet_days
    }} = this.props

    return {
      id: id || '',
      name: name || '',
      number: number || '',
      campus: campus || '',
      meet_start_time: meet_start_time || '',
      meet_end_time: meet_end_time || '',
      meet_days: meet_days || ''
    }
  }

  /*
  * On submit determine if user should create class or update it.
  */
  onSubmit (event) {
    event.preventDefault()
    
    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateClass() : this.onUpdateClass()
    }
  }

  /*
  * Create class.
  */
  onCreateClass () {
    this.setState({loading: true})
    actions.classes.createClass(this.state.form).then((cl) => {
      this.props.onSubmit(cl)
      this.props.onClose()
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Update class.
  */
  onUpdateClass () {
    this.setState({loading: true})
    actions.classes.updateClass(this.state.form).then((cl) => {
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
            <InputField
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
            <InputField
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
