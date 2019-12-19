import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {Cookies} from 'react-cookie'
import actions from '../../../../actions'
import { browserHistory } from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import Layout from '../Layout'
import EnrollSignUp from './EnrollSignUp'
import EnrollVerify from './EnrollVerify'
import EnrollLogin from './EnrollLogin'

@inject('rootStore') @observer
class StudentLink extends React.Component {
  constructor (props) {
    super(props)

    this.getLinkDetail()

    this.state = {
      loading: true,
      user: this.props.rootStore.userStore.user !== undefined ? this.props.rootStore.userStore.user : null,
      linkDetail: null,
      userNotFound: true,
      formState: null,
      signUpData: null,
      classNotFound: false,
      loginPhone: null,
      newUser: false
    }

    this.cookie = new Cookies()

    this.props.rootStore.studentNavStore.setActivePage('calendar')
  }

  getLinkDetail () {
    this.setState({loading: true})
    actions.students.getStudentByLink(this.props.params.link).then((linkDetail) => {
      this.setState({
        linkDetail,
        loading: false
      })
    }).catch(() => false)
  }

  componentDidMount () {
    this.loginStudent()
  }

  async loginStudent () {
    if (this.cookie) {
      if (this.cookie.get('skollerToken')) {
        await actions.auth.getUserByToken(this.cookie.get('skollerToken'))
          .then(() => browserHistory.push('/student'))
          .catch(() => {
            this.setState({userNotFound: true, formState: 'sign-up'})
          })
      } else {
        this.setState({userNotFound: true, formState: 'sign-up'})
      }
    }
  }

  userImage () {
    const {linkDetail} = this.state
    if (linkDetail && linkDetail.student_image_path) {
      return linkDetail.student_image_path
    } else {
      return '../src/assets/images/sammi-square.png'
    }
  }

  userName () {
    const {linkDetail} = this.state
    if (linkDetail && linkDetail.student_name_first) {
      return linkDetail.student_name_first
    } else {
      return 'A student'
    }
  }

  onSubmitSignUpForm = (form) => {
    this.setState({formState: 'verify', signUpData: form, newUser: true})
  }

  renderSignUpForm () {
    return (
      <div>
        <EnrollSignUp enrolledBy={this.props.params.link} onSubmit={this.onSubmitSignUpForm} />
        <p>Already have an account? <span className='sk-enroll-link-switch' onClick={() => this.setState({formState: 'login'})}>Login.</span></p>
      </div>
    )
  }

  onSubmitVerifyForm = () => {
    browserHistory.push('/o')
  }

  renderVerificationForm () {
    return (
      <EnrollVerify
        onSubmit={this.onSubmitVerifyForm}
        phone={this.state.loginPhone ? this.state.loginPhone : this.state.signUpData.student.phone}
      />
    )
  }

  onSubmitLogin = (phone) => {
    this.setState({formState: 'verify', loginPhone: phone})
  }

  renderLoginForm () {
    return (
      <div>
        <form>
          <EnrollLogin onSubmit={this.onSubmitLogin} />
        </form>
        <p>Don&apos;t have an account? <span className='sk-enroll-link-switch' onClick={() => this.setState({formState: 'sign-up'})}>Sign up.</span></p>
      </div>
    )
  }

  renderStudentLinkContent () {
    return (
      <div className='sk-enroll-link-container'>
        <div>
          <h1>Your classmates are waiting on you! 🎉🎊</h1>
          <div className='sk-enroll-link-call-out'>
            <div className='sk-enroll-link-img-container'>
              <img src={this.userImage()} className='sk-enroll-link-img' />
            </div>
            <p><b>{this.userName()}</b> invites you to join Skoller.</p>
          </div>
        </div>
        {(this.state.formState === 'sign-up') &&
          this.renderSignUpForm()
        }
        {(this.state.formState === 'login') &&
          this.renderLoginForm()
        }
        {(this.state.formState === 'verify') &&
          this.renderVerificationForm()
        }
      </div>
    )
  }

  render () {
    return (
      (this.state.loading)
        ? <div className='onboard-loading'>
          <SkLoader />
        </div>
        : <Layout hideModal={this.state.step === 'verify'} loggedIn={!this.state.userNotFound} >
          {this.renderStudentLinkContent()}
        </Layout>
    )
  }
}

StudentLink.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object
}

export default StudentLink
