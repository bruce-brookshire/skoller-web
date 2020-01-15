import React from 'react'
import { observer, inject } from 'mobx-react'
import moment from 'moment'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import Agenda from '../../../assets/sk-icons/calendar/Agenda'
import CalendarSmall from '../../../assets/sk-icons/calendar/CalendarSmall'
import CalendarBody from './CalendarBody'
import actions from '../../../actions'
import PropTypes from 'prop-types'
import SecondClassPrompt from '../../components/Sammi/Prompts/SecondClassPrompt'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    let thisMonth = moment().startOf('month')
    let thisWeek = moment().startOf('week')

    console.log(moment.utc().format('MM/DD/YYYY hh:mm:ss'))
    console.log(thisMonth.format('MM/DD/YYYY hh:mm:ss'))
    console.log(parseInt(thisMonth.format('d')))

    let assignments = {}
    if (this.props.rootStore.studentAssignmentsStore.getFormattedAssignments) {
      this.props.rootStore.studentAssignmentsStore.assignments.map((assignment) => {
        assignments[assignment.id] = assignment
      })
    }

    let classColors
    if (this.props.onboardData) {
      classColors = {
        '1': '#DD4A63',
        '2': '#4CD8BD',
        '3': '#57B9E4',
        '4': '#4CCC58',
        '5': '#FFAE42'
      }
    } else {
      classColors = {}
    }

    this.state = {
      loading: false,
      thisMonth: thisMonth,
      thisWeek: thisWeek,
      classColors: classColors,
      classes: [],
      isWeek: this.checkForMobile() // force calendar into week mode if viewed from mobile device
    }

    if (!this.props.onboardData) {
      this.getClassColors()
      this.getAssignments()
    }
  }

  updateClasses () {
    this.getClassColors()
    this.getAssignments()
  }

  async getAssignments () {
    const {
      user: { student }
    } = this.props.rootStore.userStore
    let assignments = {}
    await this.getClassColors()
    assignments = actions.assignments.getAllStudentAssignments(student.id)
    return assignments
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
        this.setState({classes: classes})
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

  nextMonth () {
    let thisMonth = moment(this.state.thisMonth)
    let thisWeek = moment(this.state.thisWeek)

    if (this.state.isWeek) {
      this.setState({
        thisWeek: moment(thisWeek).add(7, 'days'),
        thisMonth: moment(thisWeek).add(7, 'days').startOf('month')
      })
    } else {
      this.setState({
        thisMonth: moment(thisMonth).add(1, 'months'),
        thisWeek: moment(thisMonth).startOf('month').startOf('week')
      })
    }
  }

  prevMonth () {
    let thisMonth = moment(this.state.thisMonth)
    let thisWeek = moment(this.state.thisWeek)

    if (this.state.isWeek) {
      this.setState({
        thisWeek: moment(thisWeek).subtract(7, 'days'),
        thisMonth: moment(thisWeek).subtract(7, 'days').startOf('month')
      })
    } else {
      this.setState({
        thisMonth: moment(thisMonth).subtract(1, 'M'),
        thisWeek: moment(thisMonth).startOf('month').startOf('week')
      })
    }
  }

  toggleWeekView () {
    this.setState({ isWeek: !this.state.isWeek })
  }

  jumpToToday () {
    this.setState({
      thisMonth: moment.utc().startOf('month'),
      thisWeek: moment.utc().startOf('week')
    })
  }

  renderCalendar () {
    let isCurrentYear = true

    let assignments = null
    if (this.props.onboardData) {
      assignments = this.props.onboardData
    } else {
      assignments = this.props.rootStore.studentAssignmentsStore.getFormattedAssignments
    }

    if (moment.utc().year() !== this.state.thisMonth.year()) {
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
          assignments={assignments}
        />
      </div>
    )
  }

  render () {
    return (
      <div className='calendar-component-container'>
        <SecondClassPrompt show={this.state.classes.length === 1} onAddClass={() => this.updateClasses()} />
        {this.renderCalendar()}
      </div>
    )
  }
}

Calendar.propTypes = {
  rootStore: PropTypes.object,
  onboardData: PropTypes.object
}

export default Calendar
