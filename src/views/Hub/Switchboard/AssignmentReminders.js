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
  render () {
    return (
      <div className='cn-log-table'>
        <Grid
          className='striped'
          headers={headers}
          rows={this.props.reminders}
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
