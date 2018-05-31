import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal'
import CustomNotificationForm from './CustomNotificationForm'
import AutoUpdate from './AutoUpdate'
import MinVerUpdate from './MinVerUpdate'
import {inject, observer} from 'mobx-react'
import NotificationHistory from './NotificationHistory'
import AssignmentReminders from './AssignmentReminders'
import AssignmentReminderForm from './AssignmentReminderForm'
import UploadHistory from '../../../components/UploadHistory'
import FOSUploadInfo from './FOSUploadInfo'
import SignupLinks from './SignupLinks'

@inject('rootStore') @observer
class Switchboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      loading: false,
      openCustomNotificationModal: false,
      openAutoUpdateModal: false,
      openVersionUpdateModal: false,
      autoUpdateData: [],
      minAppVersionData: [],
      reminders: [],
      completedFOSCount: 0,
      erroredFOS: [],
      openFOSModal: false,
      links: []
    }
  }

  initializeComponent () {
    this.setState({loading: true})
    actions.notifications.getNotificationLogs().then((logs) => {
      this.setState({logs})
    }).catch(() => false)
    actions.settings.getMinVersionInfo().then((minAppVersionData) => {
      this.setState({minAppVersionData})
    }).catch(() => false)
    actions.notifications.getAssignmentReminders().then((reminders) => {
      this.setState({reminders})
    }).catch(() => false)
    actions.signupLinks.getCustomLinks().then((links) => {
      this.setState({links})
    }).catch(() => false)
    actions.settings.getAutoUpdateInfo().then((autoUpdateData) => {
      this.setState({autoUpdateData, loading: false})
    }).catch(() => false)
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

  send () {
    actions.notifications.sendNeedsSyllabusNotification((r) => console.log(r))
    this.initializeComponent()
  }

  onSubmitReminder () {
    actions.notifications.getAssignmentReminders().then((reminders) => {
      this.setState({reminders})
    }).catch(() => false)
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

  /*
  * Render the version update modal.
  */
  renderVersionUpdateModal () {
    return (
      <Modal
        open={this.state.openVersionUpdateModal}
        onClose={() => this.setState({openVersionUpdateModal: false})}
      >
        <MinVerUpdate
          data={this.state.minAppVersionData}
          onSubmit={this.initializeComponent.bind(this)}
          onClose={() => this.setState({openVersionUpdateModal: false})}
        />
      </Modal>
    )
  }

  findAutoUpdateSetting (key) {
    return this.state.autoUpdateData.settings.find(x => x.name === key).value
  }

  findMinVerSetting (key) {
    return this.state.minAppVersionData.find(x => x.name === key).value
  }

  renderAutoUpdateSettings () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue'>Auto Updates</h3>
          <p>Enrollment is {this.findAutoUpdateSetting('auto_upd_enroll_thresh')} or more</p>
          <p>{Math.round(this.findAutoUpdateSetting('auto_upd_response_thresh') * 100)}% or more responded to the update</p>
          <p>{Math.round(this.findAutoUpdateSetting('auto_upd_approval_thresh') * 100)}% or more responses were copies</p>
          <a className="cn-blue" onClick={() => this.setState({openAutoUpdateModal: true})}>See details</a>
        </div>
      </div>
    )
  }

  renderMinVersionSettings () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='min-ver cn-shadow-box-content'>
          <div className='min-ver-header'>
            <h3 className='cn-blue'>Minimum App Version </h3><a className="margin-left" onClick={() => this.setState({openVersionUpdateModal: true})}>Edit</a>
          </div>
          <div>
            <p>iOS Version: {this.findMinVerSetting('min_ios_version')}</p>
            <p>Android Version: {this.findMinVerSetting('min_android_version')}</p>
          </div>
        </div>
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

  /*
  * On upload class fos, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadFOS (file) {
    actions.fieldsofstudy.uploadFOSCsv(file).then((fos) => {
      const erroredFOS = fos.filter(f => {
        let error = f.errors
        if (error && f.errors.school_field) {
          error = f.errors.school_field.findIndex(e =>
            e.toLowerCase() === 'has already been taken') === -1
        }
        return error
      })
      const completedFOSCount = fos.length - erroredFOS.length
      this.setState({ erroredFOS, completedFOSCount, openFOSModal: true })
    })
  }

  /*
  * Toggle fos modal.
  */
  toggleFOSUploadModal () {
    this.setState({openFOSModal: !this.state.openFOSModal})
  }

  /*
  * Render the fos upload modal
  */
  renderFOSUploadModal () {
    const {openFOSModal, erroredFOS, completedFOSCount} = this.state
    return (
      <Modal
        open={openFOSModal}
        onClose={this.toggleFOSUploadModal.bind(this)}
      >
        <div>
          <FOSUploadInfo
            erroredFOS={erroredFOS}
            completedFOSCount={completedFOSCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleFOSUploadModal.bind(this)}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  renderNotifications () {
    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
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
        </div>
      </div>
    )
  }

  renderFieldOfStudy () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Import fields of study</h3>
          <UploadHistory
            allow='text/csv'
            disabled={false}
            files={[]}
            info='Upload fields of study csv.'
            onUpload={(file) => { this.onUploadFOS(file) }}
            title='Fields of Study'
          />
        </div>
      </div>
    )
  }

  renderNotificationHistory () {
    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>History</h3>
          {this.state.loading
            ? <div className='center-text'><Loading /></div>
            : <NotificationHistory logs={this.state.logs} />}
        </div>
      </div>
    )
  }

  renderAssignmentReminders () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Assignment Reminders</h3>
          {this.state.loading ? <div className='center-text'><Loading /></div>
            : <AssignmentReminders
              reminders={this.state.reminders}
              onDelete={() => this.onDeleteReminder.bind(this)}
            />
          }
          <AssignmentReminderForm
            onSubmit={this.onSubmitReminder.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderSignupLinks () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Signup Links</h3>
          {this.state.loading ? <div className='center-text'><Loading /></div>
            : <SignupLinks
              links={this.state.links}
            />
          }
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='cn-switchboard-container'>
        <div className='horizontal-align-row center-text'>
          <div className='cn-switchboard-section-small'>
            {this.renderNotifications()}
            <div className="cn-switchboard-section-item">
              {this.state.loading ? <div className='center-text'><Loading /></div>
                : this.renderAutoUpdateSettings()}
            </div>
            <div className='cn-switchboard-section-item'>
              {this.renderFieldOfStudy()}
            </div>
            <div className="cn-switchboard-section-item">
              {this.state.loading ? <div className='center-text'><Loading /></div>
                : this.renderMinVersionSettings()}
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            {this.renderNotificationHistory()}
            {this.renderAssignmentReminders()}
            {this.renderSignupLinks()}
          </div>
        </div>
        {this.renderCustomNotificationModal()}
        {this.renderAutoUpdateModal()}
        {this.renderVersionUpdateModal()}
        {this.renderFOSUploadModal()}
      </div>
    )
  }
}

Switchboard.propTypes = {
  rootStore: PropTypes.object
}

export default Switchboard
