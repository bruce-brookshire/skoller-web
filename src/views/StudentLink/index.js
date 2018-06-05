import React from 'react'
import PropTypes from 'prop-types'
import LandingNav from '../components/LandingNav'
import SignUpForm from '../components/SignUpForm'
import {inject, observer} from 'mobx-react'
import Verification from '../components/Verification'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'

@inject('rootStore') @observer
class StudentLink extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      step: 1
    }
  }

  incrementStep () {
    const {step} = this.state
    let newStep = step + 1
    this.setState({step: newStep})
  }

  onSubmit () {
    browserHistory.push('/student/classes')
  }

  onSignUp () {
    const { userStore: { authToken } } = this.props.rootStore
    this.cookie.remove('skollerToken', { path: '/' })
    this.cookie.set('skollerToken', authToken, { maxAge: 84600 * 7, path: '/' })
    this.incrementStep()
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
          onSubmit={() => this.onSignUp()}
          link={this.props.params.link}
          customLink={this.props.params.customLink}
        />
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
    const {step} = this.state
    return (
      <div className='cn-enrollment-link-content'>
        {step === 1 && this.renderSignup()}
        {step === 2 && this.renderVerification()}
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

StudentLink.propTypes = {
  location: PropTypes.object.isRequired,
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default StudentLink
