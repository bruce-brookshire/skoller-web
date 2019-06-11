import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
import CalendarComponent from './CalendarComponent'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('calendar')
    this.props.rootStore.navbarStore.title = ''
  }

  render () {
    return (
      <StudentLayout>
        <div className="calendar-container">
          <CalendarComponent />
        </div>
      </StudentLayout>
    )
  }
}

Calendar.propTypes = {
  rootStore: propTypes.object
}

export default Calendar
