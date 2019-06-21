import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import moment from 'moment'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import Agenda from '../../../assets/sk-icons/calendar/Agenda'
import CalendarSmall from '../../../assets/sk-icons/calendar/CalendarSmall'
import CalendarBody from './CalendarBody'
import actions from '../../../actions'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    let thisMonth = new Date(moment().startOf('month'))
    let thisWeek = new Date(moment().startOf('week'))

    this.state = {
      loading: false,
      thisMonth: thisMonth,
      thisWeek: thisWeek,
      assignments: this.props.rootStore.studentAssignmentsStore.assignments,
      classColors: {},
      isWeek: this.checkForMobile() // force calendar into week mode if viewed from mobile device
    }

    this.getAssignments()
  }

  checkForMobile () {
    if (window.innerWidth <= 720) {
      return true
    } else {
      return false
    }
  }

  getClassColors () {
    const {
      user: { student }
    } = this.props.rootStore.userStore

    actions.classes
      .getStudentClassesById(student.id)
      .then(classes => {
        const classColors = {}
        classes.forEach(function (element) {
          classColors[element.id] = element.getColor()
        })
        this.setState({
          classColors: classColors
        })
      })
      .catch(() => false)
  }

  getAssignments () {
    const {
      user: { student }
    } = this.props.rootStore.userStore
    this.getClassColors()

    actions.assignments
      .getAllStudentAssignments(student.id)
      .then(data => {
        this.setState({ assignments: data })
      })
      .catch(() => false)
  }

  nextMonth () {
    const thisMonth = moment(this.state.thisMonth)
    const thisWeek = moment(this.state.thisWeek)

    if (this.state.isWeek) {
      this.setState({
        thisWeek: new Date(thisWeek.add(7, 'days')),
        thisMonth: new Date(thisWeek.add(7, 'days').startOf('month'))
      })
    } else {
      this.setState({
        thisMonth: new Date(thisMonth.add(1, 'M'))
      })
    }
  }

  prevMonth () {
    const thisMonth = moment(this.state.thisMonth)
    const thisWeek = moment(this.state.thisWeek)

    if (this.state.isWeek) {
      this.setState({
        thisWeek: new Date(thisWeek.subtract(7, 'days')),
        thisMonth: new Date(thisWeek.subtract(7, 'days').startOf('month'))
      })
    } else {
      this.setState({
        thisMonth: new Date(thisMonth.subtract(1, 'M'))
      })
    }
  }

  toggleWeekView () {
    this.setState({ isWeek: !this.state.isWeek })
  }

  jumpToToday () {
    this.setState({
      thisMonth: new Date(moment().startOf('month')),
      thisWeek: new Date(moment().startOf('week'))
    })
  }

  render () {
    let isCurrentYear = true

    if (moment().year() !== moment(this.state.thisMonth).year()) {
      isCurrentYear = false
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <h1>
            { this.state.isWeek
              ? isCurrentYear
                ? 'Week of ' + moment(this.state.thisWeek).format('MMMM D')
                : 'Week of ' + moment(this.state.thisWeek).format('MMMM D, YYYY')
              : isCurrentYear
                ? moment(this.state.thisMonth).format('MMMM')
                : moment(this.state.thisMonth).format('MMMM YYYY')
            }
          </h1>
          <div className="calendar-controls">
            <div className="calendar-controls-right">
              <div
                className="calendar-nav-item"
                onClick={() => this.prevMonth()}
              >
                <BackArrow />
              </div>
            </div>
            <div className="calendar-controls-right">
              <div
                className="calendar-nav-item calendar-agenda"
                onClick={() => this.toggleWeekView()}
              >
                {this.state.isWeek ? (
                  <CalendarSmall height="26" width="26" />
                ) : (
                  <Agenda fill="white" height="26" width="22" />
                )}
              </div>
              <div
                className="calendar-nav-item calendar-today"
                onClick={() => this.jumpToToday()}
              >
                <p>Today</p>
              </div>
              <div
                className="calendar-nav-item"
                onClick={() => this.nextMonth()}
              >
                <ForwardArrow />
              </div>
            </div>
          </div>
        </div>
        {this.state.isWeek ? (
          ''
        ) : (
          <div className="calendar-week-row">
            <div className="calendar-week-day">Sun</div>
            <div className="calendar-week-day">Mon</div>
            <div className="calendar-week-day">Tue</div>
            <div className="calendar-week-day">Wed</div>
            <div className="calendar-week-day">Thu</div>
            <div className="calendar-week-day">Fri</div>
            <div className="calendar-week-day">Sat</div>
          </div>
        )}
        <CalendarBody
          isWeek={this.state.isWeek}
          thisWeek={this.state.thisWeek}
          thisMonth={this.state.thisMonth}
          classColors={this.state.classColors}
          assignments={this.state.assignments}
        />
      </div>
    )
  }
}

Calendar.propTypes = {
  rootStore: propTypes.object
}

export default Calendar
