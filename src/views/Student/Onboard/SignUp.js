import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Cloud from '../../../assets/sk-icons/Cloud'
import NumberFormat from 'react-number-format'

@inject('rootStore') @observer
class SignUp extends React.Component {
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

  onSubmitSignUp () {
    this.setState({loading: true})
    let newUser = {
      email: this.state.email,
      student: {
        name_first: this.state.firstName,
        name_last: this.state.lastName,
        phone: this.stripPhone(this.state.phone),
        future_reminder_notification_time: '22:00:00',
        notification_time: '12:00:00',
        custom_link: this.props.partner.slug
      }
    }
    console.log(newUser)
    actions.auth
      .registerUser(newUser)
      .then(() => {
        // actions.auth.verifyStudentPhoneNumber({phone: newUser.student.phone}).then(() => {
        this.props.onSubmit()
        // })
      })
      .catch(error => console.log(error))
  }

  render () {
    let disableNext = true
    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.email &&
      this.state.phone.length === 12
    ) {
      disableNext = false
    }
    return (
      (this.state.loading
        ? <SkLoader />
        : <div className='sk-onboard-sign-up'>
          <div className='sk-onboard-sign-up-cloud-container'>
            <div className='sk-onboard-sign-up-cloud-1'>
              <Cloud fill={this.props.partner.primaryColor} width="70" height="60" />
            </div>
            <div className='sk-onboard-sign-up-cloud-2'>
              <Cloud width="120" height="90" />
              <div className='sk-onboard-sign-up-cloud-content'>
                <img className='sk-onboard-skoller-logo' src='/src/assets/images/logo-wide-blue@1x.png' />
                <p>+</p>
                <img className='sk-onboard-partner-logo' src={this.props.partner.logo} />
              </div>
            </div>
            <div className='sk-onboard-sign-up-cloud-3'>
              <Cloud fill={this.props.partner.secondaryColor} width="80" height="65" />
            </div>
          </div>
          <div className='sk-onboard-sign-up-row'>
            <h1>Welcome to Skoller!</h1>
            {this.props.partner.philanthropy
              ? <p>Follow these easy steps to RAISE THOUSANDS for {this.props.partner.philanthropy}!</p>
              : <p>Follow these easy steps to sign up for Skoller through {this.props.partner.name}!</p>
            }
          </div>
          <div className='sk-onboard-sign-up-row'>
            <label>First Name</label>
            <input autoFocus={true} type='string' value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
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
            onClick={(disableNext ? null : () => this.onSubmitSignUp())}
          >
            <p>Sign Up</p>
          </div>
        </div>
      )
    )
  }
}

SignUp.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object
}

export default SignUp
