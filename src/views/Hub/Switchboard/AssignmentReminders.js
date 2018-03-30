import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'

const headers = [
  {
    field: 'message',
    display: 'Message'
  },
  {
    field: 'is_plural',
    display: 'Plural?'
  },
  {
    field: 'is_today',
    display: 'Today?'
  }
]

class AssignmentReminders extends React.Component {
  mapRow (item, index) {
    const {message, is_plural, is_today} = item

    const row = {
      message: message,
      is_plural: is_plural ? 'Yes' : 'No',
      is_today: is_today ? 'Yes' : 'No'
    }
    return row
  }

  getRows () {
    const {reminders} = this.props
    return reminders.map((item, index) =>
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
          emptyMessage={'No reminder messages exist yet.'}
        />
      </div>
    )
  }
}
AssignmentReminders.PropTypes = {
  reminders: PropTypes.array.isRequired
}

export default AssignmentReminders
