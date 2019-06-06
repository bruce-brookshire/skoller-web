import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
// import moment from 'moment'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import actions from '../../../actions'
import moment from 'moment'

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
      assignments: {},
      classColors: {}
    }
  }

  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('calendar')
    this.getAssignments()
  }

  getAssignments () {
    const {user: {student}} = this.props.rootStore.userStore
    actions.classes.getStudentClassesById(student.id).then((classes) => {
      const assignmentsObject = {}
      const classColors = {}
      classes.forEach(function (element) {
        classColors[ element.id ] = element.getColor()
        element.assignments.forEach(function (element) {
          if (element.name != null) {
            assignmentsObject[ element.id ] = (element)
          }
        })
      })
      this.setState({
        assignments: assignmentsObject,
        classColors: classColors
      })
    }).catch(() => false)
  }

  renderAssignment (assignment) {
    const assignmentStyle = {
      backgroundColor: this.state.classColors[assignment.class_id]
    }
    return (
      <div className="calendar-assignment" style={assignmentStyle}>
        {assignment.name}
      </div>
    )
  }

  dayCell (day) {
    // const isCurMonth = this.state.firstOfMonth.getMonth() === new Date(day).getMonth()
    // const isCurDay = isCurMonth && new Date().getDate() === new Date(day).getDate()

    // grab assignments from state and create array of their keys
    const assignments = this.state.assignments
    const assignmentsKeys = []
    Object.keys(this.state.assignments).forEach(function (element) {
      assignmentsKeys.push(element)
    })

    // push assignment objects into dayAssignments array
    const dayAssignments = []
    assignmentsKeys.forEach(function (element) {
      if (
        new Date(Date.parse(assignments[element].due)).getDate() === new Date(day).getDate() &&
        new Date(Date.parse(assignments[element].due)).getMonth() === new Date(day).getMonth() &&
        new Date(Date.parse(assignments[element].due)).getYear() === new Date(day).getYear()
      ) {
        dayAssignments.push(assignments[element])
      }
    })

    // check to see if date is in month for purposes of formatting the date
    let isCurrentMonth = false
    if (day.month() === moment(this.state.firstOfMonth).month()) {
      isCurrentMonth = true
    }

    // check to see if date is current day for purposes of formatting the date
    let isCurrentDay = false
    if (day.isSame(moment(), 'month') && day.isSame(moment(), 'day') && day.isSame(moment(), 'year')) {
      isCurrentDay = true
    }

    // return the rendered calendar day cell
    return (
      <div className="calendar-day-cell-wrapper">
        <div className={'calendar-date ' + (isCurrentMonth ? 'current-month ' : '') + (isCurrentDay ? 'current-day' : '')}>
          <p>
            {day.format('D')}
          </p>
        </div>
        <div className="calendar-day-cell">
          {dayAssignments.map((item, i) => {
            return (
              <div key={i} className="calendar-assignment-container">
                {this.renderAssignment(item)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderBody () {
    const renderedDays = []
    let lastDay = null
    // this loops 42 times because the calendar will always have 42 cells (6 weeks)
    for (let i = 0; i < 42; i++) {
      let day = moment(this.state.firstOfMonth).add(i, 'd')
      if (day.month() === this.state.firstOfMonth.getMonth()) {
        renderedDays.push(this.dayCell(day))
        lastDay = day
      } else {
        break
      }
    }

    for (let i = 1; i < this.state.firstOfMonth.getDay() + 1; ++i) {
      let day = moment(this.state.firstOfMonth).subtract(i, 'd')
      renderedDays.splice(0, 0, this.dayCell(day))
    }

    while (renderedDays.length < 42) {
      let day = moment(lastDay).add(1, 'd')
      lastDay = day
      renderedDays.push(this.dayCell(day))
    }

    return (
      <div className="calendar-body">
        { renderedDays.map((item, i) => (
          <div className="calendar-day-cell-container" key={i}>
            {item}
          </div>
        )) }
      </div>
    )
  }

  nextMonth () {
    const thisMonth = this.state.firstOfMonth
    const nextMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() + 1,
      1
    )

    this.setState({
      firstOfMonth: nextMonth,
      startDate: new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1 - nextMonth.getDay()
      )
    })
  }

  prevMonth () {
    console.log('button pushed')
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
    console.log(moment(this.state.firstOfMonth).format('MMMM'))
  }

  renderContent () {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-nav-item" onClick={() => this.prevMonth()}>
            <BackArrow />
          </div>
          <h1>{moment(this.state.firstOfMonth).format('MMMM YYYY')}</h1>
          <div className="calendar-nav-item" onClick={() => this.nextMonth()}>
            <ForwardArrow />
          </div>
        </div>
        {this.renderBody()}
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        <div className="calendar-container">{this.renderContent()}</div>
      </StudentLayout>
    )
  }
}

Calendar.propTypes = {
  rootStore: propTypes.object,
  classes: propTypes.object
}

export default Calendar
