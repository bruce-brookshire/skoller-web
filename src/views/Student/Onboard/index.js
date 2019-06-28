import React from 'react'
import calendarData from './calendarData'
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
// import SkProgressBar from '../../components/SkProgressBar'
import SelectSchool from './SelectSchool'
import FindAClass from './FindAClass'
import FirstClass from './FirstClass'
// import {browserHistory} from 'react-router'

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

    this.state = {
      step: this.props.params.step,
      calendarData: this.generateCalendarData(),
      loading: true
    }

    this.cookie = new Cookies()

    this.props.rootStore.studentNavStore.setActivePage('calendar')
  }

  componentDidMount () {
    this.loginStudent()
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

  loginStudent () {
    if (this.cookie.get('skollerToken')) {
      actions.auth.getUserByToken(this.cookie.get('skollerToken')).then(() => {
        this.setState({loading: false})
      }).catch((r) => console.log(r))
    } else {
      this.setState({loading: false})
    }
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

  renderSelectSchool () {
    return (
      this.renderOnboardContent(
        <SelectSchool onSubmit={() => this.setState({step: 'find-a-class'})}/>
      )
    )
  }

  renderFindAClass () {
    return (
      this.renderOnboardContent(
        <FindAClass onSubmit={() => this.setState({step: 'first-class'})}/>
      )
    )
  }

  renderFirstClass () {
    return (
      this.renderOnboardContent(
        <FirstClass onSubmit={() => this.setState({step: 'select-school'})} />
      )
    )
  }

  render () {
    return (
      (this.state.loading)
        ? null
        : <div className='onboard-container'>
          <NavBar />
          <TopNav />
          <div className='layout'>
            {this.state.step === 'verify'
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
