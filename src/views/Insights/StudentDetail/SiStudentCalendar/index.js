import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import ForwardArrow from '../../../../assets/sk-icons/navigation/ForwardArrow'
import BackArrow from '../../../../assets/sk-icons/navigation/BackArrow'
import DayCell from './DayCell'
import CalendarSmall from '../../../../assets/sk-icons/calendar/CalendarSmall'

class SiStudentCalendar extends React.Component {

    constructor(props) {
        super(props)

        let now = new Date();
        let currMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        let startDate = new Date(currMonth)
        startDate.setDate(1 - currMonth.getDay())

        this.state = {
            currDay: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            currMonth,
            startDate,
        }
    }
    
    clickedNextMonth = () => this.modifyMonth(1);
    clickedPreviousMonth = () => this.modifyMonth(-1);

    modifyMonth(offset) {
        const { currMonth } = this.state;
        let newMonth = new Date(currMonth.getFullYear(), currMonth.getMonth() + offset, 1);
        let newStartDate = new Date(newMonth)
        newStartDate.setDate(1 - newMonth.getDay())

        this.setState({ currMonth: newMonth, startDate: newStartDate })
    }

    incrementDays(date, days) {
        let newDate = new Date(date);
        newDate.setDate(date.getDate() + days)
        return newDate
    }

    currentMonthName() {
        return this.state.currMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
    
    renderDaysArray() {
        let startDate = moment(this.state.currMonth);

        const days = []
        let lastDay = null
        // this loops 42 times because the calendar will always have 42 cells (6 weeks)
        for (let i = 0; i < 42; i++) {
            let day = moment(startDate).add(i, 'day')
            if (day.format('MM') === startDate.format('MM')) {
                days.push(day)
                lastDay = day
            } else {
                break
            }
        }

        for (let i = 1; i < parseInt(startDate.format('E')) + 1; ++i) {
            let day = moment(startDate).subtract(i, 'd')
            days.splice(0, 0, day)
        }

        while (days.length < 42) {
            let day = moment(lastDay).add(1, 'day')
            lastDay = moment(day)
            days.push(day)
        }

        return days
    }

    renderHeader() {
        return <div className="student-calendar-header">
            <div className="navigator" onClick={this.clickedPreviousMonth}><BackArrow /></div>
            <div style={{ flexGrow: 1 }}/>
            <h2>{this.currentMonthName()}</h2>
            <div style={{ flexGrow: 1 }}/>
            <div className="navigator" onClick={this.clickedNextMonth}><ForwardArrow /></div>
        </div>
    }
    
    render() {
        let thisMonth = moment(this.state.currMonth);
        
        return (
            <div className="si-student-detail-cell calendar-container">
                <div className="calendar" style={{"-webkit-box-shadow": "unset", boxShadow: "unset"}}>
                    <div className="row" style={{alignItems: "center"}}>
                        <div style={{ paddingLeft: '24px', paddingRight: '8px' }}>
                            <CalendarSmall width='24' height='24' fill={"#4a4a4a"} />
                        </div>
                        <h1> Calendar</h1>
                        <div style={{flexGrow: 1}} />
                        {this.renderHeader()}
                    </div>
                    <div className="calendar-body">
                        {this.renderDaysArray().map((item, i) => (
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
