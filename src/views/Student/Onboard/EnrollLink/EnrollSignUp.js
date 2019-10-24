import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../../actions'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import NumberFormat from 'react-number-format'

@inject('rootStore') @observer
class SignUpForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      loading: false
    }
  }

  stripPhone (value) {
    let newValue = ''
    for (let i = 0; i < value.length; i++) {
      if (value.charAt(i) !== '-') {
        newValue += value.charAt(i)
      }
    }
    return newValue
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
    return newValue
  }

  onSubmitSignUpForm () {
    this.setState({loading: true})
    let newUser = {
      email: this.state.email,
      student: {
        name_first: this.state.firstName,
        name_last: this.state.lastName,
        phone: this.stripPhone(this.state.phone),
        future_reminder_notification_time: '22:00:00',
        notification_time: '12:00:00',
        enrolled_by: this.props.studentLink ? this.props.studentLink : ''
      }
    }
    console.log(newUser)
    actions.auth
      .registerUser(newUser)
      .then(() => {
        this.props.onSubmit(newUser)
      })
      .catch(error => console.log(error))
  }

  checkPhone (phone) {
    if (phone !== null) {
      if (phone.length === 12) {
        return true
      }
    } else {
      return false
    }
  }

  renderForm () {
    let disableNext = true
    if (
      this.state.firstName !== null &&
      this.state.lastName !== null &&
      this.state.email !== null &&
      this.checkPhone(this.state.phone)
    ) {
      disableNext = false
    }
    return (
      <div className='sk-onboard-sign-up-form-container'>
        <div className='sk-onboard-sign-up-row'>
          <label>First Name</label>
          <input autoFocus={true} type='string' onChange={(e) => this.setState({firstName: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Last Name</label>
          <input type='string' onChange={(e) => this.setState({lastName: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Email</label>
          <input type='email' onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Phone</label>
          <NumberFormat
            format="+1 (###) ###-####"
            mask=" "
            onValueChange={(values) => {
              const {value} = values
              this.setState({
                phone: this.validatePhone(value)
              })
            }}
            type="tel"
          />
        </div>
        <div
          className={'onboard-next' + (disableNext ? ' disabled' : '')}
          onClick={(disableNext ? null : () => this.onSubmitSignUpForm())}
        >
          <p>Sign Up</p>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderForm()
    )
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object,
  studentLink: PropTypes.string
}

export default SignUpForm
