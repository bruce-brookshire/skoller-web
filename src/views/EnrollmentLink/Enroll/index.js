import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import SignUpForm from '../../components/SignUpForm'
import {inject, observer} from 'mobx-react'
import Verification from '../../components/Verification'
import {browserHistory} from 'react-router'

@inject('rootStore') @observer
class Enroll extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      step: 1,
      newUser: true
    }
  }

  componentWillMount () {
  }

  incrementStep () {
    const {step} = this.state
    let newStep = step + 1
    this.setState({step: newStep})
  }

  switchForm () {
    this.setState({newUser: !this.state.newUser})
  }

  onSubmit () {
    actions.classes.enrollByLink(this.props.location.state.enrollmentLink)
      .then(() => {
        browserHistory.push('/student/classes')
      })
  }

  renderSignup () {
    return (
      <div className='cn-create-account-form'>
        <div className='cn-create-account-header'>
          Create your account
        </div>
        <div className='cn-create-account-subheader'>
          This information will help your classmates identify you.
        </div>
        <SignUpForm
          rootStore={this.props.rootStore}
          onSubmit={() => this.incrementStep()}
        />
        <a
          className='cn-create-account-login'
          onClick={() => this.switchForm()}>
          Already have an account? Log in.
        </a>
      </div>
    )
  }

  renderVerification () {
    return (
      <Verification
        onSubmit={() => this.onSubmit()}
      />
    )
  }

  renderContent () {
    const {newUser, step} = this.state
    return (
      <div className='cn-enrollment-link-content'>
        {newUser && step === 1 && this.renderSignup()}
        {newUser && step === 2 && this.renderVerification()}
      </div>
    )
  }

  render () {
    return (
      <div className='cn-enrollment-link-container'>
        <LandingNav
          noLogin={true}
          imgPath='../src/assets/images/logo-wide-blue@1x.png'
        />
        {this.renderContent()}
      </div>
    )
  }
}

Enroll.PropTypes = {
  location: PropTypes.object.isRequired
}

export default Enroll
