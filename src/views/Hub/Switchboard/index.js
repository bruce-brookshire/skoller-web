import React from 'react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'
import Loading from '../../../components/Loading'
import Grid from '../../../components/Grid'
import Modal from '../../../components/Modal'
import CustomNotificationForm from './CustomNotificationForm'

const headers = [
  {
    field: 'notification_category',
    display: 'Category'
  },
  {
    field: 'affected_users',
    display: 'Num. Users'
  },
  {
    field: 'inserted_at',
    display: 'Sent'
  },
  {
    field: 'msg',
    display: 'Message'
  }
]

class Switchboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      loading: false,
      openCustomNotificationModal: false,
    }
  }

  initializeComponent() {
    this.setState({loading: true})
    actions.notifications.getNotificationLogs().then((logs) => {
      this.setState({logs, loading: false})
    }).catch(() => false)
  }

  componentWillMount () {
    this.initializeComponent()
  }

  send() {
    actions.notifications.sendNeedsSyllabusNotification((r) => console.log(r))
    this.initializeComponent()
  }

  mapRow (item, index) {
    const {notification_category, affected_users, inserted_at, msg} = item

    const row = {
      notification_category: notification_category || 'N/A',
      affected_users: affected_users || 0,
      inserted_at: inserted_at ?
        convertUTCDatetimeToDateTimeString(inserted_at, 'CST') : '',
      msg: msg || ''
    }
    return row
  }

  getRows () {
    return this.state.logs.sort((a, b) => {
      return a.inserted_at < b.inserted_at ? 1 : -1
    }).map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Toggle the custom notification modal.
  */
  toggleCustomNotificationModal () {
    this.setState({openCustomNotificationModal: !this.state.openCustomNotificationModal})
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


  render () {
    return (
      <div className='cn-switchboard-container'>
        <h2 className='center-text'>Switchboard</h2>
        <div className='horizontal-align-row center-text'>
          <div className='cn-switchboard-section-small'>
            <h3 className='cn-blue'>Notifications</h3>
            <div>
              <button className='button' onClick={() => this.send()}>
                Send 'Needs Syllabus' Notification
              </button>
            </div>
            <div>
              <button className='button margin-top' onClick={() => this.setState({openCustomNotificationModal: true}) }>
                Send Custom Notification
              </button>
            </div>
          </div>
          <div className='cn-switchboard-section-large'>
            <h3 className='cn-blue center-text'>History</h3>
            {this.state.loading ? <div className='center-text'><Loading /></div> :
              <Grid
                className='striped'
                headers={headers}
                rows={this.getRows()}
                disabled={true}
                canDelete={false}
                canSelect={false}
                emptyMessage={'No notifications have been sent.'}
              />
            }
          </div>
        </div>
        {this.renderCustomNotificationModal()}
      </div>
    )
  }
}

export default Switchboard
