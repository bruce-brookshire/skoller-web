import React from 'react'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'
import Card from '../../../components/Card'
import PropTypes from 'prop-types'

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
    const {notification_category: category, affected_users: users, inserted_at: insertedAt, msg} = item

    const row = {
      notification_category: category || 'N/A',
      affected_users: users || 0,
      inserted_at: insertedAt
        ? convertUTCDatetimeToDateTimeString(insertedAt, 'America/Chicago') : '',
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

  renderContent () {
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

  render () {
    return (
      <Card
        title='History'
        content={this.renderContent()}
      />
    )
  }
}

NotificationHistory.propTypes = {
  logs: PropTypes.array.isRequired
}

export default NotificationHistory
