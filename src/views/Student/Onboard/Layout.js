import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import moment from 'moment'
import calendarData from './calendarData'
import NavBar from '../../../components/NavBar'
import Calendar from '../Calendar'
import { mobileCheck } from '../../../utilities/display'

@inject('rootStore') @observer
class Layout extends React.Component {
  state = {
    calendarData: this.generateCalendarData()
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

  renderContent () {
    return (
      <div className='onboard-content'>
        {this.props.children}
      </div>
    )
  }

  render () {
    return (
      <div className='onboard-container'>
        <NavBar onboard={this.props.loggedIn ? !this.props.loggedIn : true} />
        {mobileCheck() || this.props.loggedIn
          ? null
          : <div className='onboard-logo-text'>Keep Up With Classes, Together</div>
        }
        <div className='layout' style={{top: '64px', zIndex: '5'}}>
          {this.props.hideModal
            ? this.renderContent()
            : <SkModal>
              {this.renderContent()}
            </SkModal>
          }
        </div>
        <Calendar onboardData={this.state.calendarData} />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.object,
  hideModal: PropTypes.bool,
  loggedIn: PropTypes.bool
}

export default Layout
