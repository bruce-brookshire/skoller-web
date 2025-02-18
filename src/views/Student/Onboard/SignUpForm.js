import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
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
        custom_link: this.props.partner ? ('http://localhost:8080/c/' + this.props.partner.slug) : null
      }
    }
    actions.auth
      .registerUser(newUser)
      .then(() => {
        this.props.onSubmit()
      })
      .catch(error => console.log(error))
  }

  render () {
    let disableNext = true
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.email &&
      (this.state.phone ? this.state.phone.length === 12 : false)
    ) {
      disableNext = false
    }
    return (
      <div className='sk-onboard-sign-up-form-container'>
        <div className='sk-onboard-sign-up-row'>
          <h1>Welcome to Skoller!</h1>
          <p>Follow these easy steps and <b>${this.props.partner.donationAmount} will be donated</b> to {this.props.partner.philanthropy}!</p>
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>First Name</label>
          <input type='string' value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Last Name</label>
          <input type='string' value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Email</label>
          <input type='email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className='sk-onboard-sign-up-row'>
          <label>Phone</label>
          <NumberFormat
            value={this.state.phone}
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
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object
}

export default SignUpForm
