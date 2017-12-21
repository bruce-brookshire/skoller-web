import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../../../components/FlexTable'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import Modal from '../../../components/Modal'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class AccountInfoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.intializeState()
  }

  componentWillMount () {
    actions.auth.getRoles().then(roles => {
      this.setState({roles})
    }).catch(() => false)
  }

  intializeState () {
    let userRoles = []
    if (this.props.user && this.props.user.roles) userRoles = this.props.user.roles
    return {
      roles: [],
      userRoles,
      form: this.initializeFormData(this.props.user)
    }
  }

  /*
  * Method for intializing form data.
  * User form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}

    const {id, email} = formData

    let phone = ''
    let name_last = ''
    let name_first

    if (formData.student) {
      phone = formData.student.phone
      name_first = formData.student.name_first
      name_last = formData.student.name_last
    }

    return {
      id: id || '',
      email: email || '',
      password: '',
      student: {
        phone: phone || '',
        name_first: name_first || '',
        name_last: name_last || ''
      }
    }
  }

  renderInputs () {
    return this.state.roles.map((role, index) => {
      return this.renderInput(role, index)
    })
  }

  renderInput (role, index) {
    const isChecked = this.state.userRoles.findIndex(r => r.id === role.id) >= 0

    return (
      <div key={index}>
        <label>
          <input type='checkbox' onChange={(event) => this.onInputChange(event.target.checked, role)} checked={isChecked} />
          {role.name}
        </label>
      </div>
    )
  }

  onInputChange (value, role) {
    value ? this.onAddRole(role) : this.onRemoveRole(role)
  }

  onAddRole (role) {
    const newRoles = [...this.state.userRoles, role]
    this.setState({userRoles: newRoles})
  }

  onRemoveRole (role) {
    const newRoles = this.state.userRoles.filter(r => r.id !== role.id)
    this.setState({userRoles: newRoles})
  }

  hasStudentRole () {
    return this.state.userRoles.findIndex(role => role.name === 'Student') >= 0
  }

  /*
  * Determine whether the new user or existing user
  *
  */
  onSubmit () {
    let requiredFields = {
      'email': {
        type: 'email'
      }
    }

    if (this.hasStudentRole()) {
      requiredFields = {
        ...requiredFields,
        'student.name_first': {
          type: 'required'
        },
        'student.name_last': {
          type: 'required'
        },
        'student.phone': {
          type: 'phone'
        }
      }
    }

    if (!this.state.form.id) {
      requiredFields = {
        ...requiredFields,
        'password': {
          type: 'password'
        }
      }
    }

    if (this.props.validateForm(this.state.form, requiredFields)) {
      !this.state.form.id ? this.onCreateUser() : this.onUpdateUser()
    }
  }

  /*
  * Create a new user
  */
  onCreateUser () {
    actions.auth.createAccount(this.mapForm(this.state.form)).then((user) => {
      this.props.onSubmit(user)
    }).catch(() => false)
  }

  /*
  * Update an existing user
  */
  onUpdateUser () {
    actions.periods.updateAccount(this.mapForm(this.state.form)).then((user) => {
      this.props.onSubmit(user)
    }).catch(() => false)
  }

  mapForm (f) {
    let form = {...f}
    if (this.hasStudentRole()) delete form.student
    form.roles = userRoles.map(role => role.id)
    return form
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div>
        <h3> Account Roles </h3>
        {this.renderInputs()}
        <h3> Account Information </h3>
        <div>
          <div className='row'>
            { this.hasStudentRole() &&
              <div className='col-xs-12'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.student && formErrors.student.name_first}
                  label="First Name"
                  name="student.name_first"
                  onChange={updateProperty}
                  placeholder="First name"
                  value={form.student.name_first}
                />
              </div>
            }
            { this.hasStudentRole() &&
              <div className='col-xs-12'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.student && formErrors.student.name_last}
                  label="Last Name"
                  name="student.name_last"
                  onChange={updateProperty}
                  placeholder="Last name"
                  value={form.student.name_last}
                />
              </div>
            }
            <div className='col-xs-12'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.email}
                label="Email"
                name="email"
                onChange={updateProperty}
                placeholder="Email"
                value={form.email}
              />
            </div>
            { !form.id &&
              <div className='col-xs-12'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.password}
                  label="Password"
                  name="password"
                  onChange={updateProperty}
                  placeholder="Password"
                  type="password"
                  value={form.password}
                />
              </div>
            }
            { this.hasStudentRole() &&
              <div className='col-xs-12'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.student && formErrors.student.phone}
                  label="Phone Number"
                  name="student.phone"
                  onChange={updateProperty}
                  placeholder="Phone number"
                  value={form.student.phone}
                />
              </div>
            }
          </div>
        </div>
        <button className='button full-width margin-top' onClick={this.onSubmit.bind(this)}>Submit Account</button>
        <button className='button-invert full-width margin-top margin-bottom' onClick={() => this.props.onClose()}>Close</button>
      </div>
    )
  }
}

AccountInfoForm.propTypes = {
  formErrors: PropTypes.object,
  user: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(AccountInfoForm, 'form'))
