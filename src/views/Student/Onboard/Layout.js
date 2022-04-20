import React from 'react'
import { inject, observer } from 'mobx-react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import moment from 'moment'
import calendarData from './calendarData'
import NavBar from '../../../components/NavBar'
import Calendar from '../Calendar'

@inject('rootStore') @observer
class Layout extends React.Component {
  state = {
    calendarData: this.generateCalendarData(),
    ios: this.getMobileOperatingSystem() === 'iOS'
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }
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
        <div className='onboard-layout' id={(this.props.id)} style={{zIndex: '4'}}>
          <NavBar onboard={true} />
          {this.props.hideModal
            ? this.renderContent()
            : <SkModal style={this.props.isAcceptInvitation ? {
              maxWidth: '600px',
              width: '100%'
            } : {}}>
              {this.renderContent()}
            </SkModal>
          }
        </div>
        {!this.state.ios &&
          <Calendar onboardData={this.state.calendarData} />
        }
      </div>
    )
  }
}

Layout.defaultProps = {
  isAcceptInvitation: false
}
Layout.propTypes = {
  children: PropTypes.object,
  hideModal: PropTypes.bool,
  loggedIn: PropTypes.bool,
  id: PropTypes.string,
  isAcceptInvitation: PropTypes.bool
}

export default Layout
