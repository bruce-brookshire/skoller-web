import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {Cookies} from 'react-cookie'
import actions from '../../../../actions'
import { withRouter } from 'react-router-dom'
import SkLoader from '../../../../assets/sk-icons/SkLoader'
import Layout from '../Layout'
import EnrollSignUp from './EnrollSignUp'
import EnrollVerify from './EnrollVerify'
import EnrollLogin from './EnrollLogin'
import moment from 'moment'
import EnrollDownload from './EnrollDownload'
import live from '../../../../assets/images/class_status/todolist_gif.gif'
import AppStore from '../../../../assets/images/app_download/app-store-badge.svg'
import GooglePlay from '../../../../assets/images/app_download/google-play-badge.png'

@inject('rootStore') @observer
class EnrollLink extends React.Component {
  constructor (props) {
    super(props)

    this.loginStudent()

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

    this.props.rootStore.navStore.setActivePage('calendar')
  }

  async componentWillMount () {
    await actions.classes.getClassByLink(this.props.params.link).then((linkDetail) => {
      this.setState({linkDetail})
    }).catch(() => {
      this.setState({loading: false, classNotFound: true, formState: 'sign-up'})
      this.loginStudent()
    })
  }

  componentDidMount () {
    this.loginStudent()
  }

  async loginStudent () {
    if (this.cookie) {
      if (this.cookie.get('skollerToken')) {
        await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
        this.setState({user: this.props.rootStore.userStore.user, loading: false, userNotFound: false, formState: 'enroll'})
      } else {
        if (this.state.user) {
          this.setState({loading: false, userNotFound: false, formState: 'login'})
        } else {
          this.setState({loading: false, userNotFound: true, formState: 'sign-up'})
        }
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

  className () {
    const {linkDetail} = this.state
    if (linkDetail && linkDetail.student_class.name) {
      return linkDetail.student_class.name
    } else {
      return 'Skoller'
    }
  }

  onSubmitSignUpForm = (form) => {
    this.setState({formState: 'verify', signUpData: form, newUser: true})
  }

  renderSignUpForm () {
    return (
      <div>
        <EnrollSignUp enrollmentLink={this.props.params.link} onSubmit={this.onSubmitSignUpForm} />
        <p>Already have an account? <span className='sk-enroll-link-switch' onClick={() => this.setState({formState: 'login'})}>Login.</span></p>
      </div>
    )
  }

  onSubmitVerifyForm = () => {
    if (this.state.classNotFound) {
      this.props.history.push('/o')
    } else {
      this.onEnroll()
    }
  }

  renderVerificationForm () {
    return (
      <EnrollVerify
        onSubmit={this.onSubmitVerifyForm}
        phone={this.state.loginPhone ? this.state.loginPhone : this.state.signUpData.student.phone}
      />
    )
  }

  async onEnroll () {
    this.setState({loading: true})
    const user = this.props.rootStore.userStore.user
    await actions.students.setStudentPrimaryPeriod(user.id, user.student.id, this.state.linkDetail.student_class.class_period.id)
    await actions.students.setStudentPrimarySchool(user.id, user.student.id, this.state.linkDetail.student_class.school.id)
    await this.loginStudent()
    actions.classes.enrollByLink(this.props.params.link)
      .then(() => {
        if (this.state.newUser) {
          if (this.state.linkDetail.student_class.status.id === 1400) {
            this.setState({formState: 'downloadComplete'})
          } else {
            this.setState({formState: 'download'})
          }
        } else {
          if (this.state.linkDetail.student_class.status.id === 1400) {
            this.setState({formState: 'complete'})
          } else {
            this.props.history.push('/student/home')
          }
        }
      })
      .catch(() => {
        if (this.state.newUser) {
          this.setState({formState: 'download'})
        } else {
          this.props.history.push('/student/home')
        }
      })
  }

  renderEnrollForm () {
    const cl = this.state.linkDetail.student_class
    return (
      <div className='sk-enroll-link-enroll-form'>
        <div className='sk-enroll-link-class-container'>
          <div className='sk-enroll-link-class-header'>
            <div className='sk-enroll-link-class-header-item'>
              <h2>{cl.name}</h2>
            </div>
            <div className='sk-enroll-link-class-header-item'>
              <p>{cl.subject + ' ' + cl.code + '.' + cl.section}</p>
              <p><i className='fas fa-user' style={{fontSize: '12px'}}/> {cl.enrollment}</p>
            </div>
          </div>
          <hr />
          <div className='sk-enroll-link-class-row'>
            <div className='sk-enroll-link-class-item el-left'>
              <p className='sk-enroll-link-class-label'>
                Meet time
              </p>
              <p>
                {cl.meet_days} {cl.meet_start_time ? moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA') : ''}
              </p>
            </div>
            <div className='sk-enroll-link-class-item el-right'>
              <p className='sk-enroll-link-class-label'>
                Professor
              </p>
              <p>
                {cl.professor
                  ? cl.professor.name_first + ' ' + cl.professor.name_last
                  : '--'
                }
              </p>
            </div>
          </div>
          <div className='sk-enroll-link-class-row'>
            <div className='sk-enroll-link-class-item el-left'>
              <p className='sk-enroll-link-class-label'>
                School
              </p>
              <p>
                {cl.school.name}
              </p>
            </div>
            <div className='sk-enroll-link-class-item el-right'>
              <p className='sk-enroll-link-class-label'>
                Term
              </p>
              <p>
                {cl.class_period.name}
              </p>
            </div>
          </div>
        </div>
        <div
          className='sk-enroll-link-enroll-form-button'
          onClick={() => this.onEnroll()}
        >
          <p>Join Class</p>
        </div>
      </div>
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

  renderDownload () {
    return (
      <EnrollDownload onNext={() => this.props.history.push('/student/home')} />
    )
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    } else {
      return false
    }
  }

  renderDownloadCompleteDownload () {
    const operatingSystem = this.getMobileOperatingSystem()
    if (this.getMobileOperatingSystem()) {
      return (
        <div style={{textAlign: 'center'}}>
          <div>Skoller works best on the app.</div>
          <div className='sk-enroll-download-badge'>
            {operatingSystem === 'Android' &&
              <a
                href='http://play.google.com/store/apps/details?id=com.skoller'
              >
                <img src={GooglePlay} />
              </a>
            }
            {operatingSystem === 'iOS' &&
              <a
                href='http://appstore.com/skoller'
              >
                <img src={AppStore} />
              </a>
            }
          </div>
        </div>
      )
    }
  }

  renderDownloadCompleteContent () {
    return (
      <div className='sk-enroll-link-container'>
        <h1>Welcome to <b>{this.state.linkDetail.student_class.name}</b>!</h1>
        <div style={{display: 'flex', width: '100%', height: '280px', maxHeight: '300px', flexDirection: 'row', justifyContent: 'center', backgroundImage: `url(${live})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>The syllabus for this class is <b>ALREADY ORGANIZED</b> on Skoller 🙌</div>
        {this.renderDownloadCompleteDownload()}
        <div className='sk-enroll-link-enroll-form'>
          <div
            className='sk-enroll-link-enroll-form-button'
            onClick={() => this.props.history.push('/student/home')}
          >
            <p>Continue</p>
          </div>
        </div>
      </div>
    )
  }

  renderCompleteContent () {
    return (
      <div className='sk-enroll-link-container'>
        <h1>Welcome to {this.state.linkDetail.student_class.name}!</h1>
        <div style={{display: 'flex', width: '100%', height: '280px', maxHeight: '300px', flexDirection: 'row', justifyContent: 'center', backgroundImage: `url(${live})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>The syllabus for this class is <b>ALREADY ORGANIZED</b> on Skoller 🙌</div>
        <div className='sk-enroll-link-enroll-form'>
          <div
            className='sk-enroll-link-enroll-form-button'
            onClick={() => this.props.history.push('/student/home')}
          >
            <p>Continue</p>
          </div>
        </div>
      </div>
    )
  }

  renderEnrollContent () {
    return (
      <div className='sk-enroll-link-container'>
        {((this.state.formState !== 'complete') && (this.state.formState !== 'downloadComplete')) &&
          <div>
            <h1>Your classmates are waiting on you! 🎉🎊</h1>
            <div className='sk-enroll-link-call-out'>
              <div className='sk-enroll-link-img-container'>
                <img src={this.userImage()} className='sk-enroll-link-img' />
              </div>
              <p><b>{this.userName()}</b> invites you to join <b>{this.className()}</b></p>
            </div>
          </div>
        }
        {(this.state.formState === 'sign-up') &&
          this.renderSignUpForm()
        }
        {(this.state.formState === 'login') &&
          this.renderLoginForm()
        }
        {(this.state.formState === 'verify') &&
          this.renderVerificationForm()
        }
        {(this.state.formState === 'enroll') &&
          this.renderEnrollForm()
        }
        {(this.state.formState === 'complete') &&
          this.renderCompleteContent()
        }
        {(this.state.formState === 'downloadComplete') &&
          this.renderDownloadCompleteContent()
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
        : <Layout id='enroll-layout' hideModal={this.state.step === 'verify'} loggedIn={!this.state.userNotFound} >
          {(this.state.formState === 'download')
            ? this.renderDownload()
            : this.renderEnrollContent()
          }
        </Layout>
    )
  }
}

EnrollLink.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(EnrollLink)
