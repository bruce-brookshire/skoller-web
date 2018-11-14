import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import {inject, observer} from 'mobx-react'
import NotificationHistory from './NotificationHistory'
import AssignmentReminders from './AssignmentReminders'
import AssignmentReminderForm from './AssignmentReminderForm'
import SignupLinks from './SignupLinks'
import SignupLinkForm from './SignupLinkForm'
import LinkDetail from './LinkDetail'
import FourDoor from '../../components/FourDoor'
import FourDoorOverrides from './FourDoorOverrides'
import {browserHistory} from 'react-router'
import EmailType from './EmailType'
import Card from '../../../components/Card'
import OrganizationsCard from '../../Cards/Organizations'
import SendNotifications from '../../Cards/SendNotifications'
import AutoUpdateSettings from '../../Cards/AutoUpdateSettings'
import FieldOfStudyCSV from '../../Cards/FieldOfStudyCSV'
import SchoolCSV from '../../Cards/SchoolCSV'
import MinVersionSettings from '../../Cards/MinVersionSettings'

@inject('rootStore') @observer
class Switchboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      loading: false,
      openVersionUpdateModal: false,
      autoUpdateData: [],
      minAppVersionData: [],
      reminders: [],
      links: [],
      currentLink: null,
      openLinkModal: false,
      fourDoor: {},
      fourDoorOverrides: [],
      emailTypes: []
    }
  }

  initializeComponent () {
    this.setState({loading: true})
    this.getLogs()
    this.getReminders()
    this.getCustomLinks()
    actions.fourdoor.getFourDoor().then((fourDoor) => {
      this.setState({fourDoor})
    })
    this.getOverrides()
    this.getEmailSwitches()
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

  getReminders () {
    actions.notifications.getAssignmentReminders().then((reminders) => {
      this.setState({reminders})
    }).catch(() => false)
  }

  getOverrides () {
    actions.fourdoor.getFourDoorOverrides().then((fourDoorOverrides) => {
      this.setState({fourDoorOverrides})
    }).catch(() => false)
  }

  getEmailSwitches () {
    actions.emailTypes.getEmailTypes().then((emailTypes) => {
      this.setState({loading: false, emailTypes})
    }).catch(() => this.setState({loading: false}))
  }

  getCustomLinks () {
    actions.signupLinks.getCustomLinks().then((links) => {
      this.setState({links})
    }).catch(() => false)
  }

  onFourDoorChange (form) {
    actions.fourdoor.updateFourDoor(form).then((fourDoor) => {
      this.setState({fourDoor})
    })
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

  /*
  * Method for deleting a message.
  *
  * @param [Object] message
  * @return [Object] null.
  */
  onDeleteReminder (item) {
    actions.notifications.deleteAssignmentReminders(item).then(() => {
      const newReminders = this.state.reminders.filter(cc => cc.id !== item.id)
      this.setState({reminders: newReminders})
    }).catch(() => false)
  }

  onSelectLink (item) {
    this.setState({currentLink: item, openLinkModal: true})
  }

  renderNotificationHistory () {
    return (
      <Card
        title='History'
        content={this.state.loading
          ? <div className='center-text'><Loading /></div>
          : <NotificationHistory logs={this.state.logs} />}
      />
    )
  }

  renderAssignmentRemindersContent () {
    return (
      <div>
        {this.state.loading
          ? <div className='center-text'><Loading /></div>
          : <AssignmentReminders
            reminders={this.state.reminders}
            onDelete={() => this.onDeleteReminder.bind(this)}
          />
        }
        <AssignmentReminderForm
          onSubmit={this.getReminders.bind(this)}
        />
      </div>
    )
  }

  renderAssignmentReminders () {
    return (
      <Card
        title='Assignment Reminders'
        content={this.renderAssignmentRemindersContent()}
      />
    )
  }

  renderSignupLinksContent () {
    return (
      <div>
        {this.state.loading
          ? <div className='center-text'><Loading /></div>
          : <SignupLinks
            links={this.state.links}
            onSelect={this.onSelectLink.bind(this)}
          />
        }
        <SignupLinkForm
          onSubmit={this.getCustomLinks.bind(this)}
        />
      </div>
    )
  }

  renderSignupLinks () {
    return (
      <Card
        title='Signup Links'
        content={this.renderSignupLinksContent()}
      />
    )
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

  renderLinkModal () {
    const {openLinkModal, currentLink} = this.state
    return (
      <Modal
        open={openLinkModal}
        onClose={() => this.setState({openLinkModal: false, currentLink: null})}
      >
        <div>
          <LinkDetail
            link={currentLink}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={() => this.setState({openLinkModal: false, currentLink: null})}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  renderFourDoor () {
    const {fourDoor} = this.state
    return (
      <Card
        title='Four Door Status'
        content={
          <FourDoor
            currentValues={fourDoor}
            onChange={this.onFourDoorChange.bind(this)}
          />
        }
      />
    )
  }

  renderEmailSwitchItems () {
    const {emailTypes} = this.state

    return emailTypes.map(type => {
      return (
        <div key={type.id} className='margin-bottom'>
          <EmailType
            emailType={type}
            onUpdate={this.getEmailSwitches.bind(this)}
          />
        </div>
      )
    })
  }

  renderEmailSwitches () {
    return (
      <Card
        title='Auto-Messaging'
        content={<div>{this.renderEmailSwitchItems()}</div>}
      />
    )
  }

  render () {
    const {fourDoorOverrides, currentLink} = this.state
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
              {this.renderFourDoor()}
            </div>
            <div className="cn-switchboard-section-item margin-top">
              {this.renderEmailSwitches()}
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            {this.renderNotificationHistory()}
            <div className='margin-top'>
              {this.renderAssignmentReminders()}
            </div>
            <div className='margin-top'>
              {this.renderSignupLinks()}
            </div>
            <div className='margin-top'>
              {fourDoorOverrides && this.renderFourDoorOverrides()}
            </div>
            <div className='margin-top'>
              <OrganizationsCard />
            </div>
          </div>
        </div>
        {currentLink && this.renderLinkModal()}
      </div>
    )
  }
}

Switchboard.propTypes = {
  rootStore: PropTypes.object
}

export default Switchboard
