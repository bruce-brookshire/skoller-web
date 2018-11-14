import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import SignupLinks from '../../Cards/SignupLinks'
import FourDoorOverrides from './FourDoorOverrides'
import {browserHistory} from 'react-router'
import Card from '../../../components/Card'
import OrganizationsCard from '../../Cards/Organizations'
import SendNotifications from '../../Cards/SendNotifications'
import AutoUpdateSettings from '../../Cards/AutoUpdateSettings'
import FieldOfStudyCSV from '../../Cards/FieldOfStudyCSV'
import SchoolCSV from '../../Cards/SchoolCSV'
import MinVersionSettings from '../../Cards/MinVersionSettings'
import FourDoorStatus from '../../Cards/FourDoorStatus'
import EmailSettings from '../../Cards/EmailSettings'
import NotificationHistory from '../../Cards/NotificationHistory'
import AssignmentReminders from '../../Cards/AssignmentReminders'

@inject('rootStore') @observer
class Switchboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      loading: false,
      fourDoorOverrides: []
    }
  }

  initializeComponent () {
    this.setState({loading: true})
    this.getLogs()
    this.getOverrides()
  }

  componentWillMount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Switchboard'
    this.initializeComponent()
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
  }

  getLogs () {
    actions.notifications.getNotificationLogs().then((logs) => {
      this.setState({logs})
    }).catch(() => false)
  }

  getOverrides () {
    actions.fourdoor.getFourDoorOverrides().then((fourDoorOverrides) => {
      this.setState({fourDoorOverrides, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  onDeleteOverride (item) {
    actions.fourdoor.deleteOverride(item.id).then(() => {
      this.getOverrides()
    }).catch(() => false)
  }

  /*
  * On school select.
  */
  onSchoolSelect (school) {
    browserHistory.push({pathname: '/hub/schools/school/info', state: {school}})
  }

  renderFourDoorOverrides () {
    return (
      <Card
        title='Four Door Overrides'
        content={this.state.loading ? <div className='center-text'><Loading /></div>
          : <FourDoorOverrides
            schools={this.state.fourDoorOverrides}
            onDelete={() => this.onDeleteOverride.bind(this)}
            onSelect={() => this.onSchoolSelect.bind(this)}
          />
        }
      />
    )
  }

  render () {
    const {fourDoorOverrides} = this.state
    return (
      <div className='cn-switchboard-container'>
        <div className='horizontal-align-row center-text'>
          <div className='cn-switchboard-section-small'>
            <SendNotifications
              onSendNotification={this.getLogs.bind(this)}
            />
            <div className="cn-switchboard-section-item margin-top">
              <AutoUpdateSettings />
            </div>
            <div className='cn-switchboard-section-item margin-top'>
              <FieldOfStudyCSV />
            </div>
            <div className='cn-switchboard-section-item margin-top'>
              <SchoolCSV />
            </div>
            <div className="cn-switchboard-section-item margin-top">
              <MinVersionSettings />
            </div>
            <div className="cn-switchboard-section-item margin-top">
              <FourDoorStatus />
            </div>
            <div className="cn-switchboard-section-item margin-top">
              <EmailSettings />
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            <NotificationHistory logs={this.state.logs} />
            <div className='margin-top'>
              <AssignmentReminders />
            </div>
            <div className='margin-top'>
              <SignupLinks />
            </div>
            <div className='margin-top'>
              {fourDoorOverrides && this.renderFourDoorOverrides()}
            </div>
            <div className='margin-top'>
              <OrganizationsCard />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Switchboard.propTypes = {
  rootStore: PropTypes.object
}

export default Switchboard
