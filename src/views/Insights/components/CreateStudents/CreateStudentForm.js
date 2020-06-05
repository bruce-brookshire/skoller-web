import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import actions from '../../../../actions'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
export class CreateStudentForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false
      },
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      loading: false
    }
  }

  updateProperty (name, value) {
    let form = this.state.form
    form[name] = value
    this.setState({form})
  }

  updateError (name, value) {
    let error = this.state.error
    error[name] = value
    this.setState({error})
  }

  validateEmail (email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  validatePhone (value) {
    let newValue = ''
    let dashNumber = 0
    for (let i = 0; i < value.length; i++) {
      if (value.charAt(i) === '-') {
        dashNumber += 1
      }
    }
    for (let i = 0; i < value.length; i++) {
      newValue += value.charAt(i)
      if (dashNumber < 2) {
        if (i === 2 && value.charAt(i + 1) !== '-' && value.charAt(i) !== '-') {
          newValue += '-'
        } else if (i === 6 && value.charAt(i + 1) !== '-' && value.charAt(i) !== '-') {
          newValue += '-'
        }
      }
    }

    this.updateError('phone', this.stripPhone(newValue).length < 10)

    return newValue
  }

  stripPhone (value) {
    let newValue = ''
    if (value) {
      for (let i = 0; i < value.length; i++) {
        if (value.charAt(i) !== '-') {
          newValue += value.charAt(i)
        }
      }
    }
    return newValue
  }

  onSubmit (e) {
    let insightsStore = this.props.rootStore.insightsStore
    e.preventDefault()

    let validated = true

    if (this.state.form.firstName !== '') {
      this.updateError('firstName', false)
    } else {
      this.updateError('firstName', true)
      validated = false
    }

    if (this.state.form.lastName !== '') {
      this.updateError('lastName', false)
    } else {
      this.updateError('lastName', true)
      validated = false
    }

    if (this.state.form.phone) {
      if (this.stripPhone(this.state.form.phone).length < 10) {
        console.log(this.stripPhone(this.state.form.phone))
        this.updateError('phone', true)
        validated = false
      } else {
        this.updateError('phone', false)
      }
    } else {
      validated = false
      this.updateError('phone', true)
    }

    if (this.validateEmail(this.state.form.email)) {
      this.updateError('email', false)
    } else {
      this.updateError('email', true)
      validated = false
    }

    let form = {
      name_first: this.state.form.firstName,
      name_last: this.state.form.lastName,
      email: this.state.form.email,
      phone: this.stripPhone(this.state.form.phone)
    }

    if (this.props.group) {
      form.org_group_id = this.props.group.id
    }

    if (validated) {
      this.setState({loading: true})
      actions.insights.invitations.createStudentInvitation(insightsStore.org.id, form)
        .then(() => {
          insightsStore.updateData(['invitations'])
          this.props.onSubmit && this.props.onSubmit()
        })
        .catch(() => {
          this.setState({loading: false})
        })
    }
  }

  renderForm () {
    let {error} = this.state

    return (
      <form className='si-form' onSubmit={(e) => this.onSubmit(e)}>
        <div className='si-form-row'>
          <div className='si-form-item'>
            <label>First name</label>
            <input
              className={error.firstName ? 'error' : ''}
              onChange={(e) => {
                this.setState({error: {...this.state.error, firstName: false}})
                this.updateProperty('firstName', e.target.value)
              }}
            />
          </div>
          <div className='si-form-item'>
            <label>Last name</label>
            <input
              className={error.lastName ? 'error' : ''}
              onChange={(e) => {
                this.setState({error: {...this.state.error, lastName: false}})
                this.updateProperty('lastName', e.target.value)
              }}
            />
          </div>
        </div>
        <div className='si-form-row'>
          <div className='si-form-item'>
            <label>Email</label>
            <input
              className={error.email ? 'error' : ''}
              onChange={(e) => {
                let err = !this.validateEmail(e.target.value)
                this.setState({
                  error: {...this.state.error, email: err}
                })
                this.updateProperty('email', e.target.value)
              }}
            />
          </div>
        </div>
        <div className='si-form-row'>
          <div className='si-form-item'>
            <label>Phone</label>
            <NumberFormat
              className={error.phone ? 'error' : ''}
              value={this.state.phone}
              format="+1 (###) ###-####"
              mask=" "
              onValueChange={(values) => {
                const {value} = values
                this.updateProperty('phone', this.validatePhone(value))
              }}
              type="tel"
            />
          </div>
        </div>
        <div className='si-form-row'>
          <div className='si-form-item si-form-submit'>
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    )
  }

  render () {
    return (
      <div className='si-create-student'>
        {this.state.loading
          ? <SkLoader />
          : this.renderForm()
        }
      </div>
    )
  }
}

CreateStudentForm.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func,
  group: PropTypes.object
}

export default CreateStudentForm
