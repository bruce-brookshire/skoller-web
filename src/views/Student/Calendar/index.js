import React from 'react'
import { observer, inject, propTypes } from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
// import moment from 'moment'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import actions from '../../../actions'

@inject('rootStore')
@observer
class Calendar extends React.Component {
  constructor (props) {
    super(props)
    let now = new Date()
    let firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    this.state = {
      loading: false,
      firstOfMonth: firstOfMonth,
      startDate: new Date(
        firstOfMonth.getFullYear(),
        firstOfMonth.getMonth(),
        1
      ),
      assignments: {}
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
      classes.forEach(function (element) {
        element.assignments.forEach(function (element) {
          if (element.name != null) {
            assignmentsObject[ element.id ] = (element)
          }
        })
      })
      this.setState({assignments: assignmentsObject})
    }).catch(() => false)
  }

  dayCell (day) {
    let isCurMonth = this.state.firstOfMonth.getMonth() === day.getMonth()

    // let dayAssignments = this.state.assignments[this.stringDateRep(day)]

    if (isCurMonth) {
      return (
        <div>assignment</div>
      )
    }
  }

  renderBody () {
    const days = Array.apply(null, {length: 42}).map(Number.call, Number) // there should always be 42 cells
    const assignments = this.state.assignments

    return (
      <div className="calendar-body">
        { Object.keys(assignments).map((item, i) => (
          <div className="calendar-assignment" key={i}>
            {assignments[item].name}
          </div>
        )) }
      </div>
    )

    // const renderedDays = []

    // days.forEach(function (element) {
    //   renderedDays.push('ok')
    // })

    // return (
    //   <div className="calendar-body">
    //     {renderedDays.map((value, index) => {
    //       return <div key={index}>{value}</div>
    //     })}
    //   </div>
    // )
  }

  renderContent () {
    return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-nav-item">
            <BackArrow />
          </div>
          <h1>June</h1>
          <div className="calendar-nav-item">
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
