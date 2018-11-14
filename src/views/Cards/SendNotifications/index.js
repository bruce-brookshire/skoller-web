import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import CustomNotificationForm from './CustomNotificationForm'

class SendNotifications extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openCustomNotificationModal: false
    }
  }

  onSendNotification () {
    if (this.props.onSendNotification) this.props.onSendNotification()
  }

  sendNeedsSyllabusNotification () {
    actions.notifications.sendNeedsSyllabusNotification().then(() => {
      this.onSendNotification()
    })
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
          onSubmit={() => this.onSendNotification()}
        />
      </Modal>
    )
  }

  renderNotificationsContent () {
    return (
      <div>
        <div className="cn-switchboard-section-item">
          <button className='button' onClick={() => this.sendNeedsSyllabusNotification()}>
            Send &apos;Needs Syllabus&apos; Notification
          </button>
        </div>
        <div className="cn-switchboard-section-item">
          <button className='button margin-top' onClick={() => this.setState({openCustomNotificationModal: true}) }>
            Send Custom Notification
          </button>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <Card
          title='Notifications'
          content={this.renderNotificationsContent()}
        />
        {this.renderCustomNotificationModal()}
      </div>
    )
  }
}

SendNotifications.propTypes = {
  onSendNotification: PropTypes.func
}

export default SendNotifications
