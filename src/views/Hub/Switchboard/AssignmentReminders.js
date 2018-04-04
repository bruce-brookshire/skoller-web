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
    field: 'type',
    display: 'Type'
  }
]

class AssignmentReminders extends React.Component {
  mapRow (item, index) {
    const {message, is_plural, topic, id} = item

    const row = {
      id: id,
      message: message,
      is_plural: is_plural ? 'Yes' : 'No',
      type: topic && topic.name ? topic.name : ''
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
          canDelete={true}
          canSelect={false}
          emptyMessage={'No reminder messages exist yet.'}
          deleteMessage={''}
          onDelete={this.props.onDelete ? this.props.onDelete() : null}
        />
      </div>
    )
  }
}
AssignmentReminders.PropTypes = {
  reminders: PropTypes.array.isRequired,
  onDelete: PropTypes.func
}

export default AssignmentReminders
