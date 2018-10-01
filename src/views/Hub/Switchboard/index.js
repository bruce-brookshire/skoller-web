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
import CSVUploadInfo from './CSVUploadInfo'
import SignupLinks from './SignupLinks'
import SignupLinkForm from './SignupLinkForm'
import LinkDetail from './LinkDetail'
import FourDoor from '../../components/FourDoor'
import FourDoorOverrides from './FourDoorOverrides'
import {browserHistory} from 'react-router'
import EmailType from './EmailType'

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
      completedItemCount: 0,
      erroredItem: [],
      openCSVModal: false,
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
    actions.notifications.getNotificationLogs().then((logs) => {
      this.setState({logs})
    }).catch(() => false)
    actions.settings.getMinVersionInfo().then((minAppVersionData) => {
      this.setState({minAppVersionData})
    }).catch(() => false)
    this.getReminders()
    this.getCustomLinks()
    actions.fourdoor.getFourDoor().then((fourDoor) => {
      this.setState({fourDoor})
    })
    this.getOverrides()
    this.getEmailSwitches()
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
      this.setState({emailTypes})
    }).catch(() => false)
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

  onSelectLink (item) {
    this.setState({currentLink: item, openLinkModal: true})
  }

  handleCSVErrors (items, mapErrors) {
    const erroredItem = items.filter(f => {
      let error = f.error || f.errors
      return error
    }).map((item, index) => { return mapErrors(item, index) })
    console.log(erroredItem)
    const completedItemCount = items.length - erroredItem.length
    this.setState({ erroredItem, completedItemCount, openCSVModal: true })
  }

  mapFOSErrors (item, index) {
    if (item.errors) {
      item.name = item.field
    }
    return item
  }

  /*
  * On upload class fos, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadFOS (file) {
    actions.fieldsofstudy.uploadFOSCsv(file).then((fos) => {
      this.handleCSVErrors(fos, this.mapFOSErrors)
    })
  }

  /*
  * On upload school, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadSchools (file) {
    actions.schools.uploadSchoolCsv(file).then((school) => {
      this.handleCSVErrors(school, (item, index) => { return item })
    })
  }

  /*
  * Toggle fos modal.
  */
  toggleCSVModal () {
    this.setState({openCSVModal: !this.state.openCSVModal})
  }

  /*
  * Render the fos upload modal
  */
  renderFOSUploadModal () {
    const {openCSVModal, erroredItem, completedItemCount} = this.state
    return (
      <Modal
        open={openCSVModal}
        onClose={this.toggleCSVModal.bind(this)}
      >
        <div>
          <CSVUploadInfo
            erroredItem={erroredItem}
            completedItemCount={completedItemCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleCSVModal.bind(this)}
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
            onSubmit={this.getReminders.bind(this)}
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
              onSelect={this.onSelectLink.bind(this)}
            />
          }
          <SignupLinkForm
            onSubmit={this.getCustomLinks.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderFourDoorOverrides () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Four Door Overrides</h3>
          {this.state.loading ? <div className='center-text'><Loading /></div>
            : <FourDoorOverrides
              schools={this.state.fourDoorOverrides}
              onDelete={() => this.onDeleteOverride.bind(this)}
              onSelect={() => this.onSchoolSelect.bind(this)}
            />
          }
        </div>
      </div>
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
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Four Door Status</h3>
          <FourDoor
            currentValues={fourDoor}
            onChange={this.onFourDoorChange.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderSchoolUpload () {
    return (
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Import schools</h3>
          <UploadHistory
            allow='text/csv'
            disabled={false}
            files={[]}
            info='Upload school csv.'
            onUpload={(file) => { this.onUploadSchools(file) }}
            title='Schools'
          />
        </div>
      </div>
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
      <div className='cn-shadow-box margin-top'>
        <div className='cn-shadow-box-content'>
          <h3 className='cn-blue center-text'>Auto-Messaging</h3>
          {this.renderEmailSwitchItems()}
        </div>
      </div>
    )
  }

  render () {
    const {fourDoorOverrides, currentLink} = this.state
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
            <div className='cn-switchboard-section-item'>
              {this.renderSchoolUpload()}
            </div>
            <div className="cn-switchboard-section-item">
              {this.state.loading ? <div className='center-text'><Loading /></div>
                : this.renderMinVersionSettings()}
            </div>
            <div className="cn-switchboard-section-item">
              {this.renderFourDoor()}
            </div>
            <div className="cn-switchboard-section-item">
              {this.renderEmailSwitches()}
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            {this.renderNotificationHistory()}
            {this.renderAssignmentReminders()}
            {this.renderSignupLinks()}
            {fourDoorOverrides && this.renderFourDoorOverrides()}
          </div>
        </div>
        {this.renderCustomNotificationModal()}
        {this.renderAutoUpdateModal()}
        {this.renderVersionUpdateModal()}
        {this.renderFOSUploadModal()}
        {currentLink && this.renderLinkModal()}
      </div>
    )
  }
}

Switchboard.propTypes = {
  rootStore: PropTypes.object
}

export default Switchboard
