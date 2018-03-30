import React from 'react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import CustomNotificationForm from './CustomNotificationForm'
import AutoUpdate from './AutoUpdate'
import stores from '../../../stores'
import {inject, observer} from 'mobx-react'
import NotificationHistory from './NotificationHistory'
import AssignmentReminders from './AssignmentReminders'

const {navbarStore} = stores

@inject('rootStore') @observer
class Switchboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      loading: false,
      openCustomNotificationModal: false,
      openAutoUpdateModal: false,
      autoUpdateData: [],
      reminders: []
    }
  }

  initializeComponent () {
    this.setState({loading: true})
    actions.notifications.getNotificationLogs().then((logs) => {
      this.setState({logs})
    }).catch(() => false)
    actions.notifications.getAssignmentReminders().then((reminders) => {
      this.setState({reminders})
    }).catch(() => false)
    actions.settings.getAutoUpdateInfo().then((autoUpdateData) => {
      this.setState({autoUpdateData, loading: false})
    }).catch(() => false)
  }

  componentWillMount () {
    navbarStore.title = 'Switchboard'
    this.initializeComponent()
  }

  componentWillUnmount () {
    navbarStore.title = ''
  }

  send () {
    actions.notifications.sendNeedsSyllabusNotification((r) => console.log(r))
    this.initializeComponent()
  }

  /*
  * Render the custom notification modal.
  */
  renderCustomNotificationModal () {
    return (
      <Modal
        open={this.state.openCustomNotificationModal}
        onClose={() => this.setState({openCustomNotificationModal: false})}
      >
        <CustomNotificationForm
          onClose={() => this.setState({openCustomNotificationModal: false})}
          onSubmit={this.initializeComponent.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the auto update modal.
  */
  renderAutoUpdateModal () {
    return (
      <Modal
        open={this.state.openAutoUpdateModal}
        onClose={() => this.setState({openAutoUpdateModal: false})}
      >
        <AutoUpdate
          data={this.state.autoUpdateData}
          onSubmit={this.initializeComponent.bind(this)}
        />
      </Modal>
    )
  }

  findSetting (key) {
    return this.state.autoUpdateData.settings.find(x => x.name === key).value
  }

  renderAutoUpdateSettings () {
    return (
      <div className='auto-update margin-top'>
        <h3 className='cn-blue'>Auto Updates</h3>
        <p>Enrollment is {this.findSetting('auto_upd_enroll_thresh')} or more</p>
        <p>{Math.round(this.findSetting('auto_upd_response_thresh') * 100)}% or more responded to the update</p>
        <p>{Math.round(this.findSetting('auto_upd_approval_thresh') * 100)}% or more responses were copies</p>
        <a className="cn-blue" onClick={() => this.setState({openAutoUpdateModal: true})}>See details</a>
      </div>
    )
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

  render () {
    return (
      <div className='cn-switchboard-container'>
        <div className='horizontal-align-row center-text'>
          <div className='cn-switchboard-section-small'>
            <h3 className='cn-blue'>Notifications</h3>
            <div className="cn-switchboard-section-item">
              <button className='button' onClick={() => this.send()}>
                Send &apos;Needs Syllabus&apos; Notification
              </button>
            </div>
            <div className="cn-switchboard-section-item">
              <button className='button margin-top' onClick={() => this.setState({openCustomNotificationModal: true}) }>
                Send Custom Notification
              </button>
            </div>
            <div className="cn-switchboard-section-item">
              {this.state.loading ? <div className='center-text'><Loading /></div>
                : this.renderAutoUpdateSettings()}
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            <h3 className='cn-blue center-text'>History</h3>
            {this.state.loading ? <div className='center-text'><Loading /></div>
              : <NotificationHistory logs={this.state.logs} />
            }
            <h3 className='cn-blue center-text'>Assignment Reminders</h3>
            {this.state.loading ? <div className='center-text'><Loading /></div>
              : <AssignmentReminders
                reminders={this.state.reminders}
                onDelete={() => this.onDeleteReminder.bind(this)}
              />
            }
          </div>
        </div>
        {this.renderCustomNotificationModal()}
        {this.renderAutoUpdateModal()}
      </div>
    )
  }
}

export default Switchboard
