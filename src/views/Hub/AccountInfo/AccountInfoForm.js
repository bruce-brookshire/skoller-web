import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../../../components/FlexTable'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class AccountInfoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.intializeState()
  }

  componentWillMount () {
    this.setState({loadingRoles: true})
    actions.auth.getRoles().then(roles => {
      this.setState({roles, loadingRoles: false})
    }).catch(() => { this.setState({loadingRoles: false}) })

    this.setState({loadingSchools: true})
    actions.schools.getActiveSchools().then(schools => {
      this.setState({schools, loadingSchools: false})
    }).catch(() => { this.setState({loadingSchools: false}) })
  }

  /*
  * Intialize state
  */
  intializeState () {
    let userRoles = []
    if (this.props.user && this.props.user.roles) userRoles = this.props.user.roles
    if (this.props.user && this.props.user.student) userRoles.push({id: 100, name: 'Student'})
    return {
      roles: [],
      schools: [],
      emailError: null,
      loadingSchools: false,
      loadingRoles: false,
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
    const date = new Date()
    let formData = data || {}

    const {id, email} = formData

    let studentId = ''
    let phone = ''
    let name_last = ''
    let name_first = ''
    let school_id = ''

    if (formData.student) {
      studentId = formData.student.id
      phone = formData.student.phone
      name_first = formData.student.name_first
      name_last = formData.student.name_last,
      school_id = formData.student.school.id
    }

    return {
      id: id || '',
      email: email || '',
      password: '',
      student: {
        id: studentId || '',
        phone: phone || '',
        name_first: name_first || '',
        name_last: name_last || '',
        school_id: school_id || '',
        notification_time: `${7 + (date.getTimezoneOffset()/60)}:00:00`
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
    if (role.id === 100 && this.props.user.student) return
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
  * Render the school if a school email.
  */
  renderSchool () {
    const {form: {student: {school_id}}} = this.state
    if (school_id) {
      return (
        <div className='margin-top school-info' style={{fontSize: 11}}>
          <span>{this.state.schools.find(school => school.id === school_id).name}</span>
        </div>
      )
    }
  }

  /*
  * Verify the school email address if student role.
  */
  onVerifyEmail () {
    if (this.hasStudentRole()) {
      const {email} = this.state.form

      if (email && this.testEmailFormat(email)) {
        const school = this.getSchoolFromDomain(email)
        if (!school) {
          const emailInfo = (
            <div>
              <div>{'Oop! Looks like the email you entered was not a school email.'}</div>
            </div>
          )

          this.setState({ emailError: {type: 'info', message: emailInfo} })
        } else {
          this.setState({emailError: null})
        }
        this.setSchoolId(school)
      } else {
        this.setSchoolId()
        this.setState({emailError: null})
      }
    }
  }

  /*
  * Test to see if the email has a valid format.
  */
  testEmailFormat (email) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regEx.test(email)
  }

  /*
  * Get the school from the email domain.
  */
  getSchoolFromDomain (email) {
    let schoolFromDomain = null
    const domain = email.split('@')[1].toLowerCase()
    for (let i = 0; i < this.state.schools.length; i++) {
      const emailDomainIndex = this.state.schools[i].email_domains
        .findIndex(email => email.email_domain.replace('@', '').toLowerCase() === domain.toLowerCase())

      if (emailDomainIndex > -1) {
        if (this.state.schools[i].email_domains[emailDomainIndex].is_professor_only) {
          this.setState({
            emailError: {
              type: 'error',
              message: 'Oops! Looks like you are using a professor email. Skoller is for students only.'
            }
          })
        } else {
          schoolFromDomain = this.state.schools[i]
        }
        i = this.state.schools.length
      }
    }
    return schoolFromDomain
  }

  /*
  * Set the school id for the user in state from the email address.
  */
  setSchoolId (school) {
    let newForm = {...this.state.form}
    newForm.student.school_id = (school && school.id) || ''
    this.setState({form: newForm})
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
        'student.school_id': {
          tyoe: 'required'
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

    if (this.props.validateForm(this.state.form, requiredFields) && !this.state.emailError) {
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
    let form = {...f}
    if (!this.hasStudentRole()) {
      delete form.student
      form.roles = this.state.userRoles.map(role => role.id)
    } else {
      form.roles = this.state.userRoles
        .filter(role=> role.id !== 100).map(role => role.id)
    }
    return form
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    if (this.state.loadingRoles || this.state.loadingSchools) return <Loading />
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
              {this.renderSchool()}
              <InputField
                containerClassName={!form.student.school_id ? 'margin-top' : ''}
                error={formErrors.email || (this.state.emailError && this.state.emailError.message)}
                showErrorMessage={this.state.emailError && this.state.emailError.message}
                label={!form.student.school_id ? 'Email' : ''}
                name='email'
                onBlur={this.onVerifyEmail.bind(this)}
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
