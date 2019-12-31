import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import LandingNav from '../../components/LandingNav'
import LoginForm from '../../components/LoginForm'
import SignUpForm from '../../components/SignUpForm'
import {inject, observer} from 'mobx-react'
import Verification from '../../components/Verification'
import {browserHistory} from 'react-router'
import {Cookies} from 'react-cookie'
import DownloadApp from '../../components/DownloadApp'

@inject('rootStore') @observer
class Enroll extends React.Component {
  constructor (props) {
    super(props)
    this.cookie = new Cookies()
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      step: 1,
      newUser: true
    }
  }

  incrementStep () {
    const {step} = this.state
    let newStep = step + 1
    this.setState({step: newStep})
  }

  switchForm () {
    this.setState({newUser: !this.state.newUser})
  }

  onDLNext () {
    browserHistory.push('/student/classes')
  }

  onSubmit () {
    actions.classes.enrollByLink(this.props.location.state.enrollmentLink).then(() => {
      this.incrementStep()
    })
  }

  onSignUp () {
    const { userStore: { authToken } } = this.props.rootStore
    this.cookie.remove('skollerToken', { path: '/' })
    this.cookie.set('skollerToken', authToken, { maxAge: 86400 * 270, path: '/' })
    this.incrementStep()
  }

  renderLogin () {
    return (
      <div className='cn-login-form'>
        <div className='cn-login-header'>
          Login
        </div>
        <LoginForm
          rootStore={this.props.rootStore}
          onSubmit={() => this.onSubmit()}
        />
        <a
          className='cn-create-account-login'
          onClick={() => this.switchForm()}>
          Don&apos;t have an account? Make one.
        </a>
      </div>
    )
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
          enrollmentLink={this.props.location.state.enrollmentLink}
          onSubmit={() => this.onSignUp()}
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
        {!newUser && step === 1 && this.renderLogin()}
        {newUser && step === 1 && this.renderSignup()}
        {newUser && step === 2 && this.renderVerification()}
        {((newUser && step === 3) || (!newUser && step === 2)) && this.renderDownload()}
      </div>
    )
  }

  renderDownload () {
    return (
      <DownloadApp
        onNext={this.onDLNext.bind(this)}
      />
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

Enroll.propTypes = {
  location: PropTypes.object.isRequired,
  rootStore: PropTypes.object
}

export default Enroll
