import React from 'react'
import calendarData from './calendarData'
import NavBar from '../../../components/NavBar'
import TopNav from '../../../components/TopNav'
import SkModal from '../../components/SkModal/SkModal'
import Calendar from '../../Student/Calendar'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

@inject('rootStore') @observer
class OnboardLayout extends React.Component {
  render () {
    return (
      <div>
        {/* <NavBar /> */}
        <NavBar onboard={true} name='Test Name' initials='TN'/>
        <TopNav onboard={true} />
        <div className='layout'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

OnboardLayout.propTypes = {
  children: PropTypes.object
}

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      step: this.props.params.step,
      calendarData: this.generateCalendarData()
    }

    this.props.rootStore.studentNavStore.setActivePage('calendar')
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

  render () {
    return (
      <OnboardLayout>
        <SkModal>
          <div className='onboard-container'>
            {this.state.step === 'verify'
              ? <div>
                <h1>verify</h1>
                <div onClick={() => this.setState({step: 'find school'})}>
                  next
                </div>
              </div>
              : <div onClick={() => this.setState({step: 'verify'})}>
                <h1>{this.state.step}</h1>
              </div>
            }
          </div>
        </SkModal>
        <Calendar onboardData={this.state.calendarData} />
      </OnboardLayout>
    )
  }
}

Onboard.propTypes = {
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default Onboard
