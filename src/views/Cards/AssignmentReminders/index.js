import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Grid from '../../../components/Grid'
import AssignmentReminderForm from './AssignmentReminderForm'

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
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      reminders: []
    }
  }

  componentWillMount () {
    this.getReminders()
  }

  getReminders () {
    this.setState({loading: true})
    actions.notifications.getAssignmentReminders().then((reminders) => {
      this.setState({reminders, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  mapRow (item) {
    const {message, is_plural: plural, topic, id} = item

    const row = {
      id: id,
      message: message,
      is_plural: plural ? 'Yes' : 'No',
      type: topic && topic.name ? topic.name : ''
    }
    return row
  }

  getRows () {
    const {reminders} = this.state
    return reminders.map((item, index) =>
      this.mapRow(item, index)
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

  renderAssignmentRemindersContent () {
    return (
      <div>
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
            onDelete={this.onDeleteReminder.bind(this)}
          />
        </div>
        <AssignmentReminderForm
          onSubmit={this.getReminders.bind(this)}
        />
      </div>
    )
  }

  render () {
    return (
      <Card
        title='Assignment Reminders'
        content={this.state.loading ? <Loading /> : this.renderAssignmentRemindersContent()}
      />
    )
  }
}

export default AssignmentReminders
