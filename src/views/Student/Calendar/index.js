import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'

@inject('rootStore') @observer
class Calendar extends React.Component {
  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('calendar')
  }

  render () {
    return (
      <StudentLayout>
        <div className="calendar-container">
          <h1>calendar</h1>
        </div>
      </StudentLayout>
    )
  }
}

Calendar.propTypes = {
  rootStore: propTypes.object
}

export default Calendar
