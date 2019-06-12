import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import CalendarAssignment from './CalendarAssignment'
import moment from 'moment'
import SkModal from '../../components/SkModal/SkModal'

@inject('rootStore')
@observer
class DayCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isHover: false,
      showAddAssignmentModal: false
    }
  }

  setHoverStateTrue () {
    this.setState({ isHover: true })
  }

  setHoverStateFalse () {
    this.setState({ isHover: false })
  }

  launchModal () {
    this.setState({ isHover: false })
    this.setState({showAddAssignmentModal: true})
  }

  callbackFromParent = (showModal) => {
    this.setState({showAddAssignmentModal: showModal})
    this.setState({ isHover: false })
  }

  // return the rendered calendar day cell
  render () {
    // grab assignments from state and create array of their keys
    const assignments = this.props.assignments
    const assignmentsKeys = []
    const day = this.props.day
    Object.keys(this.props.assignments).forEach(function (element) {
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
    if (day.month() === moment(this.props.thisMonth).month()) {
      isCurrentMonth = true
    }

    // check to see if date is current day for purposes of formatting the date
    let isCurrentDay = false
    if (day.isSame(moment(), 'month') && day.isSame(moment(), 'day') && day.isSame(moment(), 'year')) {
      isCurrentDay = true
    }

    return (
      <div className="calendar-day-cell-wrapper" onMouseEnter={() => this.setHoverStateTrue()} onMouseLeave={() => this.setHoverStateFalse()}>
        { this.state.showAddAssignmentModal
          ? <SkModal title='Example Form' callbackFromParent={this.callbackFromParent}>
            <form>
              <p>field</p>
              <input type="text" />
              <p>date</p>
              <input type="text" value={moment(this.props.day).format('MMMM DD, YYYY')} />
              <p>field</p>
              <input type="text" />
              <p>field</p>
              <input type="text" /> <br />
              <input type="submit" value="Submit" />
            </form>
          </SkModal>
          : null
        }
        <div className={'calendar-date ' + (isCurrentMonth ? 'current-month ' : '') + (isCurrentDay ? 'current-day' : '')}>
          <p>
            {this.props.day.format('D')}
          </p>
        </div>
        <div className={'calendar-day-cell ' + (isCurrentDay ? 'current-day-cell' : '')}>
          {dayAssignments.map((item, i) => {
            return (
              <div key={i} className="calendar-assignment-container">
                <CalendarAssignment classColors={this.props.classColors} assignment={item} />
              </div>
            )
          })}
          { this.state.isHover
            ? <div className="calendar-assignment-container add-new-assignment">
              <div key={this.state.isHover} className="calendar-assignment add-new " onClick={() =>
                this.launchModal()
              }>
                +
              </div>
            </div>
            : ''}
        </div>
      </div>
    )
  }
}

DayCell.propTypes = {
  day: propTypes.object,
  classColors: propTypes.object,
  thisMonth: propTypes.object,
  assignments: propTypes.object
}

export default DayCell
