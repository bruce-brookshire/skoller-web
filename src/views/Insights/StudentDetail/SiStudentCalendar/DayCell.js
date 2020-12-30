import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class DayCell extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isHover: false
        }
    }


    goToAssignment(assignment) {
        const slug = this.props.invitationId ? ('/insights/invitations/' + this.props.invitationId) : ('/insights/students/' + this.props.studentId)
        this.props.history.push({ pathname: slug + '/classes/' + assignment.class_id })
    }

    // return the rendered calendar day cell
    renderAssignment(assignment) {
        const assignmentStyle = {
            backgroundColor: this.props.classColors[assignment.class_id]
        }

        return <div key={assignment.id} className="calendar-assignment-container">
            <div className="calendar-assignment" style={assignmentStyle} onClick={() => this.goToAssignment(assignment)}>
                {assignment.name}
            </div>
        </div>
    }


    // return the rendered calendar day cell
    render() {
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
            if (moment.utc(assignments[element].due).format('MMDDYYYY') === day.format('MMDDYYYY')) {
                dayAssignments.push(assignments[element])
            }
        })

        // check to see if date is in month for purposes of formatting the date
        let isCurrentMonth = false
        if (day.month() === this.props.thisMonth.month()) {
            isCurrentMonth = true
        }

        // check to see if date is current day for purposes of formatting the date
        let isCurrentDay = false
        if (day.format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')) {
            isCurrentDay = true
        }

        return (
            <div className="calendar-day-cell-wrapper">
                <div className={'calendar-date ' + (isCurrentMonth ? 'current-month ' : '') + (isCurrentDay ? 'current-day' : '')}>
                    <p>{this.props.day.format('D')}</p>
                </div>
                <div className={'calendar-day-cell ' + (isCurrentDay ? 'current-day-cell' : '')}>
                    {dayAssignments.map(this.renderAssignment.bind(this))}
                </div>
            </div>
        )
    }
}

DayCell.propTypes = {
    day: PropTypes.object,
    classColors: PropTypes.object,
    thisMonth: PropTypes.object,
    assignments: PropTypes.object,
    rootStore: PropTypes.object
}

export default withRouter(DayCell)
