import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import CreateSchoolModal from '../FindClasses/CreateSchoolModal'
import SkModal from '../../components/SkModal/SkModal'
import moment from 'moment'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import SignUpForm from '../../components/SignUpForm'
import Cloud from '../../../assets/sk-icons/Cloud'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null
    }
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
    console.log(newValue)
    return newValue
  }

  render () {
    let disableNext = true
    return (
      <div>
        <div>
          <Cloud fill={this.props.partner.primaryColor} width="100px" height="80px" />
        </div>
        <div>
          <h1>Welcome to Skoller!</h1>
          <p>Follow these easy steps and ${this.props.partner.donationAmount} will be donated to {this.props.partner.philanthropy}!</p>
        </div>
        <div>
          <label>First Name {this.state.firstName}</label>
          <input type='string' value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
        </div>
        <div>
          <label>Last Name {this.state.lastName}</label>
          <input type='string' value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
        </div>
        <div>
          <label>Email {this.state.email}</label>
          <input type='email' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div>
          <label>Phone</label>
          <input
            value={this.state.phone}
            maxLength="12"
            onChange={(e) => {
              this.setState({
                phone: this.validatePhone(e.target.value)
              })
            }}
          />
        </div>
        <div
          className={'onboard-next' + (disableNext ? ' disabled' : '')}
          onClick={(disableNext ? null : () => this.onSubmitSignUp())}
        >
          <p>Next</p>
        </div>
        {this.props.renderPartner()}
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  renderPartner: PropTypes.func,
  partner: PropTypes.object
}

export default SelectSchool
