import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import DayCell from './DayCell'
import CalendarSmall from '../../../../assets/sk-icons/calendar/CalendarSmall'

class SiStudentCalendar extends React.Component {
    renderDaysArray(thisMonth) {
        const days = []
        let lastDay = null
        // this loops 42 times because the calendar will always have 42 cells (6 weeks)
        for (let i = 0; i < 42; i++) {
            let day = moment(thisMonth).add(i, 'day')
            if (day.format('MM') === thisMonth.format('MM')) {
                days.push(day)
                lastDay = day
            } else {
                break
            }
        }

        for (let i = 1; i < parseInt(thisMonth.format('E')) + 1; ++i) {
            let day = moment(thisMonth).subtract(i, 'd')
            days.splice(0, 0, day)
        }

        while (days.length < 42) {
            let day = moment(lastDay).add(1, 'day')
            lastDay = moment(day)
            days.push(day)
        }

        return days
    }

    render() {
        let thisMonth = moment().startOf('month')
        const days = this.renderDaysArray(thisMonth)

        return (
            <div className="calendar-container">
                <div className="calendar">
                    
                    <div className="row">
                        <div style={{ paddingLeft: '24px', paddingRight: '8px', paddingTop: '24px' }}><CalendarSmall width='24' height='24' fill={"#4a4a4a"} /></div> <h1> Calendar</h1>
                    </div>

                    <div className="calendar-body">
                        {days.map((item, i) => (
                            <div className="calendar-day-cell-container" key={i}>
                                <DayCell invitationId={this.props.invitationId} studentId={this.props.studentId} day={item} classColors={this.props.classColors} thisMonth={thisMonth} assignments={this.props.assignments} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

SiStudentCalendar.propTypes = {
    thisMonth: PropTypes.object,
    classColors: PropTypes.object,
    assignments: PropTypes.array
}

export default SiStudentCalendar
