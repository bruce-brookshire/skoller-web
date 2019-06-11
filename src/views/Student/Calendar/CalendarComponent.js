import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import moment from 'moment'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import CalendarBody from './CalendarBody'
import actions from '../../../actions'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    let firstOfMonth = new Date(moment().startOf('month'))

    this.state = {
      loading: false,
      firstOfMonth: firstOfMonth,
      startDate: new Date(
        firstOfMonth.getFullYear(),
        firstOfMonth.getMonth(),
        1
      ),
      assignments: this.props.rootStore.studentAssignmentsStore.assignments,
      classColors: {}
    }
  }

  componentWillMount () {
    this.getAssignments()
  }

  getClassColors () {
    const {user: {student}} = this.props.rootStore.userStore

    actions.classes.getStudentClassesById(student.id).then((classes) => {
      const classColors = {}
      classes.forEach(function (element) {
        classColors[ element.id ] = element.getColor()
      })
      this.setState({
        classColors: classColors
      })
    }).catch(() => false)
  }

  getAssignments () {
    const {user: {student}} = this.props.rootStore.userStore
    this.getClassColors()

    actions.assignments.getAllStudentAssignments(student.id).then((data) => {
      this.setState({assignments: data})
    }).catch(() => false)
  }

  nextMonth () {
    const thisMonth = moment(this.state.firstOfMonth)
    const nextMonth = new Date(thisMonth.add(1, 'M'))

    this.setState({
      firstOfMonth: new Date(nextMonth),
      startDate: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1 - nextMonth.getDay()
      )
    })
  }

  prevMonth () {
    let thisMonth = moment(this.state.firstOfMonth)
    let nextMonth = new Date(thisMonth.subtract(1, 'M'))

    this.setState({
      firstOfMonth: new Date(nextMonth),
      startDate: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1 - nextMonth.getDay()
      )
    })
  }

  render () {
    let isCurrentYear = true

    if (moment().year() !== moment(this.state.firstOfMonth).year()) {
      isCurrentYear = false
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <h1>{(isCurrentYear ? moment(this.state.firstOfMonth).format('MMMM') : moment(this.state.firstOfMonth).format('MMMM YYYY'))}</h1>
          <div className="calendar-controls">
            <div className="calendar-controls-right">
              <div className="calendar-nav-item" onClick={() => this.prevMonth()}>
                <BackArrow />
              </div>
            </div>
            <div className="calendar-controls-right">
              <div className="calendar-nav-item calendar-today" onClick={() => this.setState({firstOfMonth: new Date(moment().startOf('month'))})}>
                <p>Today</p>
              </div>
              <div className="calendar-nav-item" onClick={() => this.nextMonth()}>
                <ForwardArrow />
              </div>
            </div>
          </div>
        </div>
        <div className="calendar-week-row">
          <div className="calendar-week-day">
            Sun
          </div>
          <div className="calendar-week-day">
            Mon
          </div>
          <div className="calendar-week-day">
            Tue
          </div>
          <div className="calendar-week-day">
            Wed
          </div>
          <div className="calendar-week-day">
            Thu
          </div>
          <div className="calendar-week-day">
            Fri
          </div>
          <div className="calendar-week-day">
            Sat
          </div>
        </div>
        <CalendarBody firstOfMonth={this.state.firstOfMonth} classColors={this.state.classColors} assignments={this.state.assignments}/>
      </div>
    )
  }
}

Calendar.propTypes = {
  rootStore: propTypes.object
}

export default Calendar
