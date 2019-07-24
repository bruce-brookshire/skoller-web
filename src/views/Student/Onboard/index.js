import React from 'react'
import calendarData from './calendarData'
import partners from './partners'
import NavBar from '../../../components/NavBar'
import TopNav from '../../../components/TopNav'
import SkModal from '../../components/SkModal/SkModal'
import Calendar from '../../Student/Calendar'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import LoginVerificationModal from '../../components/LoginForm/LoginVerificationModal'
import {Cookies} from 'react-cookie'
import actions from '../../../actions'
import SignUp from './SignUp'
import SelectSchool from './SelectSchool'
import FindAClass from './FindAClass'
import FirstClass from './FirstClass'
import { browserHistory } from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import SharePartner from './SharePartner'
import { mobileCheck } from '../../../utilities/display'

@inject('rootStore') @observer
class OnboardLayout extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <TopNav />
        <div className='layout'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

OnboardLayout.propTypes = {
  children: PropTypes.object,
  rootStore: PropTypes.object
}

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)

    this.loginStudent()

    this.state = {
      step: 'sign-up',
      calendarData: this.generateCalendarData(),
      partner: this.getPartner(),
      loading: true,
      user: this.props.rootStore.userStore.user !== undefined ? this.props.rootStore.userStore.user : null
    }

    this.cookie = new Cookies()

    this.props.rootStore.studentNavStore.setActivePage('calendar')
  }

  componentDidMount () {
    this.loginStudent()
  }

  async loginStudent () {
    if (this.cookie.get('skollerToken')) {
      await actions.auth.getUserByToken(this.cookie.get('skollerToken')).catch((r) => console.log(r))
      this.setState({user: this.props.rootStore.userStore.user})
      this.getStep()
      console.log('has token')
    } else {
      if (this.state.user) {
        this.setState({step: 'verify', loading: false})
      } else if (this.state.partner !== null) {
        this.setState({step: 'sign-up', loading: false})
      } else {
        browserHistory.push('/landing')
      }
      console.log('does not have token')
    }
  }

  async getStep () {
    const user = this.state.user
    let classNumber = 0
    if (user) {
      await actions.classes.getStudentClassesById(user.student.id).then(classes => {
        classNumber = classes.length
      }).catch(r => console.log(r))
      if (classNumber > 1) {
        browserHistory.push('/student')
      }
      if (!user.student.primary_school) {
        this.setState({step: 'select-school'})
      } else if (classNumber === 0) {
        this.setState({step: 'select-school'})
      } else if (classNumber === 1) {
        this.setState({step: 'first-class'})
      } else {
        this.setState({step: 'share-partner'})
        // remove after testing ^^
        // browserHistory.push('/student')
      }
    } else {
      browserHistory.push('/student')
    }
    this.setState({loading: false})
  }

  getPartner () {
    let partner = null
    Object.keys(partners).forEach(partnerKey => {
      if (partners[partnerKey].slug === this.props.params.partner) {
        partner = partners[partnerKey]
      }
    })
    return partner
  }

  randomDate (start, end) {
    let randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return randomDate
  }

  generateCalendarData () {
    let onboardData = {}
    let start = new Date(moment().startOf('month').subtract(5, 'days'))
    let end = new Date(moment().startOf('month').add(37, 'days'))
    Object.keys(calendarData).forEach(function (assignmentKey) {
      let generatedAssignment = calendarData[assignmentKey]
      generatedAssignment.due = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      onboardData[assignmentKey] = generatedAssignment
    })
    return onboardData
  }

  onVerificationSubmit = () => {
    this.setState({step: 'select-school'})
  }

  renderVerify () {
    return (
      <LoginVerificationModal phone={this.props.rootStore.userStore.user.student.phone} closeModal={null} onSubmit={this.onVerificationSubmit}/>
    )
  }

  renderOnboardContent (children) {
    return (
      <SkModal>
        <div className='onboard-content'>
          {children}
        </div>
      </SkModal>
    )
  }

  renderPartner = () => {
    if (this.state.partner) {
      return (
        <div className='onboard-partner'>
          <p>in partnership with</p> <img src={this.state.partner.logo} />
        </div>
      )
    }
  }

  renderSignUp () {
    return (
      this.renderOnboardContent(
        <SignUp
          onSubmit={() => {
            this.setState({
              step: 'verify'
            })
          }}
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  renderSelectSchool () {
    return (
      this.renderOnboardContent(
        <SelectSchool
          onSubmit={(data) => {
            this.setState({
              step: 'find-a-class',
              selectSchoolData: data
            })
          }}
          renderPartner={this.renderPartner}
        />
      )
    )
  }

  renderFindAClass () {
    return (
      this.renderOnboardContent(
        <FindAClass
          onSubmit={() => this.setState({step: 'first-class'})}
          params={this.state.selectSchoolData}
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  renderFirstClass () {
    return (
      this.renderOnboardContent(
        <FirstClass
          onSubmit={
            (this.state.partner)
              ? () => {
                this.setState({step: 'share-partner'})
              }
              : () => {
                browserHistory.push('/student')
              }
          }
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  renderSharePartner () {
    return (
      this.renderOnboardContent(
        <SharePartner
          onSubmit={() => {
            browserHistory.push('/student')
          }}
          renderPartner={this.renderPartner}
          partner={this.state.partner}
        />
      )
    )
  }

  render () {
    return (
      (this.state.loading)
        ? <div className='onboard-loading'>
          <SkLoader />
        </div>
        : <div className='onboard-container'>
          {mobileCheck() && this.state.step !== 'sign-up'
            ? null
            : <div className='onboard-logo-text'>Keep Up With Classes, Together</div>
          }
          {this.state.step === 'sign-up'
            ? <NavBar onboard={true} />
            : <NavBar />
          }
          <div className='layout' style={{top: '64px'}}>
            {(this.state.step === 'sign-up')
              ? this.renderSignUp()
              : null
            }
            {(this.state.step === 'verify')
              ? this.renderVerify()
              : null
            }
            {this.state.step === 'select-school'
              ? this.renderSelectSchool()
              : null
            }
            {this.state.step === 'find-a-class'
              ? this.renderFindAClass()
              : null
            }
            {this.state.step === 'first-class'
              ? this.renderFirstClass()
              : null
            }
            {this.state.step === 'share-partner'
              ? this.renderSharePartner()
              : null
            }
            <Calendar onboardData={this.state.calendarData} />
          </div>
        </div>
    )
  }
}

Onboard.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default Onboard
