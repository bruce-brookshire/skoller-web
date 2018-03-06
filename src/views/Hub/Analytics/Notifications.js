import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import {convertUTCTimeToTimeString} from '../../../utilities/time'
import Grid from '../../../components/Grid/index'

const headers = [
  {
    field: 'time',
    display: 'Time'
  },
  {
    field: 'timezone',
    display: 'Timezone'
  },
  {
    field: 'count',
    display: 'Count'
  }
]

@inject('rootStore') @observer
class Notifications extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  componentWillMount () {
  }

  componentWillUnmount () {
  }

  /*
  * Initialize state
  */
  initializeState () {
    return {
      loading: false,
    }
  }

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  getRows () {
    return this.props.data.notifications.common_times.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const { timezone, notification_time, count } = item

    const row = {
      notification_time: convertUTCTimeToTimeString(notification_time, timezone),
      timezone: timezone || '',
      count: count || 0
    }

    return row
  }

  render () {
    const {notifications} = this.props.data
    return (
      <div>
        <div className="cn-analytics-list">
          <div>
            <span className="cn-analytics-label"><strong>Notifications Enabled: </strong></span>
            <span>{notifications.notifications_enabled} ({notifications.notifications_enabled / notifications.students * 100}%)</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Average times: </strong></span>
            <div className="cn-analytics-sub-label">
              <Grid
                headers={headers}
                rows={this.getRows()}
                disabled={true}
              />
            </div>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Average days out: </strong></span>
            <span>{notifications.avg_days_out} days before</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Semester projection (this period): </strong></span>
            <span>{notifications.estimated_reminders_period}</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Semester projection (this semester): </strong></span>
            <span>{notifications.estimated_reminders}</span>
          </div>
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  data: PropTypes.object.isRequired
}

export default Notifications
