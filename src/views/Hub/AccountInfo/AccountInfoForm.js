import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, MultiselectField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import actions from '../../../actions'

class AccountInfoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
    this.setState({loadingRoles: true})
    actions.auth.getRoles().then(roles => {
      this.setState({roles, loadingRoles: false})
    }).catch(() => { this.setState({loadingRoles: false}) })
  }

  /*
  * Intialize state
  */
  initializeState () {
    let userRoles = []
    if (this.props.user && this.props.user.roles) userRoles = this.props.user.roles
    return {
      roles: [],
      fieldsOfStudy: [],
      emailError: null,
      loadingFOS: false,
      loadingRoles: false,
      rolesError: '',
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

    let studentId = ''
    let phone = ''
    let nameLast = ''
    let nameFirst = ''
    let fieldsOfStudy = []

    if (formData.student) {
      studentId = formData.student.id
      phone = formData.student.phone
      nameFirst = formData.student.name_first
      nameLast = formData.student.name_last
      fieldsOfStudy = formData.student.fields_of_study.map(f => {
        return {
          value: f.id,
          name: f.field
        }
      })
    }

    return {
      id: id || '',
      email: email || '',
      password: '',
      student: {
        id: studentId || '',
        phone: phone || '',
        name_first: nameFirst || '',
        name_last: nameLast || '',
        fields_of_study: fieldsOfStudy || []
      }
    }
  }

  /*
  * Render list of possible roles user can have.
  */
  renderInputs () {
    return this.state.roles.map((role, index) => {
      return this.renderInput(role, index)
    })
  }

  /*
  * Render role checkbox input.
  */
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

  /*
  * On checkbox input change.
  *
  * @param [Boolean] value. Value idicating if checked.
  * @param [Object] role. Role to add or remove to user.
  */
  onInputChange (value, role) {
    value ? this.onAddRole(role) : this.onRemoveRole(role)
  }

  /*
  * Add role to user.
  */
  onAddRole (role) {
    const newRoles = [...this.state.userRoles, role]
    this.setState({userRoles: newRoles})
  }

  /*
  * Remove role from user.
  */
  onRemoveRole (role) {
    if (role.id === 100 && this.props.user && this.props.user.student) return
    const newRoles = this.state.userRoles.filter(r => r.id !== role.id)
    this.setState({userRoles: newRoles})
  }

  /*
  * Method to determine if user has student role.
  *
  * @return [Boolean]. Boolean indicating if the user has student role.
  */
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

    if (this.state.userRoles.length === 0) {
      this.setState({rolesError: 'User needs at least one role.'})
      return
    } else {
      this.setState({rolesError: ''})
    }

    if (this.props.validateForm(this.state.form, requiredFields) && !this.state.emailError) {
      this.onUpdateUser()
    }
  }

  noNewFieldsOfStudy (a1, a2) {
    if (a1 === a2) return true
    if (a1 == null || a2 == null) return false
    if (a1.length !== a2.length) return false

    let a1Sorted = a1.sort((a, b) => {
      return a > b ? 1 : -1
    })
    let a2Sorted = a1.sort((a, b) => {
      return a > b ? 1 : -1
    })

    return a1Sorted.every((v, i) => v === a2Sorted[i])
  }

  /*
  * Update an existing user
  */
  onUpdateUser () {
    actions.auth.updateAccount(this.mapForm(this.state.form)).then((user) => {
      this.props.onSubmit(user)
    }).catch(() => false)
  }

  /*
  * MAp the account form.
  *
  * @param [Object] f. Account form.
  * @return [Object] form. Mapped account form.
  */
  mapForm (f) {
    let form = JSON.parse(JSON.stringify(f))
    if (!this.hasStudentRole()) {
      delete form.student
      form.roles = this.state.userRoles.map(role => role.id)
    } else {
      form.roles = this.state.userRoles
        .filter(role => role.id !== 100).map(role => role.id)
      form.student.fields_of_study = form.student.fields_of_study.map(f => f.value)
      if (this.noNewFieldsOfStudy(form.student.fields_of_study, this.props.user.student.fields_of_study)) {
        form.student.fields_of_study = null
      }
    }
    return form
  }

  /*
  * Update fields of study.
  *
  * @param [String] value. Autocomplete input value.
  */
  updateFOSOptions (value) {
    if (value.length > 0) {
      this.setState({loadingFOS: true})
      actions.fieldsofstudy.getFieldsOfStudy(value).then((fieldsOfStudy) => {
        this.setState({fieldsOfStudy, loadingFOS: false})
      }).catch(() => { this.setState({loadingFOS: false}) })
    }
  }

  /*
  * Map the Field of study options
  */
  getFOSOptions () {
    const {fieldsOfStudy, form} = this.state
    return fieldsOfStudy.filter(f =>
      form.student.fields_of_study.findIndex(ff => ff.value === f.id) === -1)
      .map(f => { return { value: f.id, name: f.field } })
  }

  render () {
    const {form, roles} = this.state
    const {formErrors, updateProperty} = this.props

    if (this.state.loadingRoles) return <Loading />
    return (
      <div>
        {roles && <div>
          <h3> Account Roles </h3>
          {this.renderInputs()}
          {this.state.rolesError &&
            <div className='cn-red'>
              <i className='fa fa-info-circle' /><span>{this.state.rolesError}</span>
            </div>
          }
        </div>}
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
                error={formErrors.email || (this.state.emailError && this.state.emailError.message)}
                showErrorMessage={this.state.emailError && this.state.emailError.message}
                label='Email'
                name='email'
                onChange={updateProperty}
                placeholder='Email'
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
                  pattern="[0-9]*"
                />
              </div>
            }
            { this.hasStudentRole() &&
              <div className='col-xs-12'>
                <MultiselectField
                  containerClassName='margin-top'
                  label=''
                  loading={this.state.loadingFOS}
                  name='student.fields_of_study'
                  onAdd={(name, value) => {
                    let newValue = form.student.fields_of_study
                    newValue.push(value)
                    updateProperty('student.fields_of_study', newValue)
                    this.setState({fieldsOfStudy: []})
                  }}
                  onDelete={(name, value) => {
                    let newValue = form.student.fields_of_study
                      .filter(f => f.value !== value.value)
                    updateProperty('student.fields_of_study', newValue)
                  }}
                  onUpdateOptions={this.updateFOSOptions.bind(this)}
                  options={this.getFOSOptions()}
                  placeholder={'Select the majors...'}
                  value={form.student.fields_of_study}
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
  validateForm: PropTypes.func,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func
}

export default ValidateForm(Form(AccountInfoForm, 'form'))
