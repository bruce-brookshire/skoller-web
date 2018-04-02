import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'

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

class NotificationHistory extends React.Component {
  mapRow (item, index) {
    const {notification_category, affected_users, inserted_at, msg} = item

    const row = {
      notification_category: notification_category || 'N/A',
      affected_users: affected_users || 0,
      inserted_at: inserted_at
        ? convertUTCDatetimeToDateTimeString(inserted_at, 'CST') : '',
      msg: msg || ''
    }
    return row
  }

  getRows () {
    const {logs} = this.props
    return logs.sort((a, b) => {
      return a.inserted_at < b.inserted_at ? 1 : -1
    }).map((item, index) =>
      this.mapRow(item, index)
    )
  }

  render () {
    return (
      <div className='cn-log-table'>
        <Grid
          className='striped'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={false}
          canSelect={false}
          emptyMessage={'No notifications have been sent.'}
        />
      </div>
    )
  }
}
NotificationHistory.PropTypes = {
  logs: PropTypes.array.isRequired
}

export default NotificationHistory
