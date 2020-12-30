import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import CalendarSmall from '../../../assets/sk-icons/calendar/CalendarSmall'
import moment from 'moment'
import SkModal from '../../components/SkModal/SkModal'
import Avatar from '../components/Avatar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

@inject('rootStore') @observer
export default class OrgCalendar extends Component {
    static propTypes = {
        group: PropTypes.object,
        rootStore: PropTypes.object
    }

    constructor(props) {
        super(props)

        let students = this.props.students
        let studentCount = students.length
        let assignmentDays = students.flatMap(s => {
            let values = s.assignments.reduce((acc, val) => {
                if (val.due) {
                    let dueStr = moment(val.due).format('MMDDYYYY')
                    if (!acc[dueStr]) {
                        acc[dueStr] = {
                            due: dueStr,
                            student: s,
                            count: 1
                        }
                    } else {
                        acc[dueStr].count += 1
                    }
                }
                return acc
            }, [])

            return Object.values(values)
        })
            .reduce((acc, val) => {
                if (acc[val.due]) {
                    acc[val.due].push(val)
                } else {
                    acc[val.due] = [val]
                }
                return acc
            }, {});

        let now = new Date();
        let currMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        let startDate = new Date(currMonth)
        startDate.setDate(1 - currMonth.getDay())

        this.state = {
            currDay: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            modalDate: null,
            studentCount,
            currMonth,
            startDate,
            assignmentDays,
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

    toggleModal(modalDate) {
        this.setState({ modalDate })
    }

    renderMonth(startDate) {
        return (
            <div className="si-group-calendar-month">
                <span style={{ fontWeight: "100" }}> Showing <span style={{ fontWeight: "500" }}>how many athletes</span> have assignments due each day</span>
                <br />
                {this.renderHeader()}
                {this.renderWeekdays()}

                {this.renderWeek(startDate)}
                {this.renderWeek(this.incrementDays(startDate, 7))}
                {this.renderWeek(this.incrementDays(startDate, 14))}
                {this.renderWeek(this.incrementDays(startDate, 21))}
                {this.renderWeek(this.incrementDays(startDate, 28))}
                {this.renderWeek(this.incrementDays(startDate, 35))}
            </div>
        )
    }

    renderHeader() {
        return <div className="si-group-calendar-header">
            <div className="navigator" onClick={this.clickedPreviousMonth}><BackArrow /></div>
            <div style={{ flexGrow: 1 }}> </div>
            <h2>{this.currentMonthName()}</h2>
            <div style={{ flexGrow: 1 }}> </div>
            <div className="navigator" onClick={this.clickedNextMonth}><ForwardArrow /></div>
        </div>
    }

    renderWeekdays() {
        return <div className="si-group-calendar-week">
            <div className="weekday">Sat</div>
            <div className="weekday">Mon</div>
            <div className="weekday">Tue</div>
            <div className="weekday">Wed</div>
            <div className="weekday">Thu</div>
            <div className="weekday">Fri</div>
            <div className="weekday">Sat</div>
        </div >
    }

    renderWeek(startDate) {
        return <div className="si-group-calendar-week">
            {this.renderDay(startDate)}
            {this.renderDay(this.incrementDays(startDate, 1))}
            {this.renderDay(this.incrementDays(startDate, 2))}
            {this.renderDay(this.incrementDays(startDate, 3))}
            {this.renderDay(this.incrementDays(startDate, 4))}
            {this.renderDay(this.incrementDays(startDate, 5))}
            {this.renderDay(this.incrementDays(startDate, 6))}
        </div>
    }

    renderDay(date) {
        let isCurrMonth = this.state.currMonth.getMonth() == date.getMonth()
        let isCurrDay = this.state.currDay.getMonth() == date.getMonth() && this.state.currDay.getDate() == date.getDate()

        let classType = (isCurrMonth ? (isCurrDay ? "current" : "active") : "inactive")

        let contentClasses = "si-group-calendar-day " + classType

        let dateStr = moment(date).format("MMDDYYYY")
        let students = this.state.assignmentDays[dateStr]
        let numberStudents = students ? students.length : null;

        return <div style={{ flexGrow: 1, margin: "4px" }}>
            <div className="si-group-calendar-day-number"> <div className={classType}>{date.getDate()}</div></div>
            <div className={contentClasses} style={{ cursor: students ? "pointer" : "default" }} onClick={students ? (() => this.toggleModal(dateStr)).bind(this) : null}><h2>{numberStudents}</h2></div>
        </div>
    }

    renderModal() {
        let dateStr = this.state.modalDate
        let assignmentStudents = this.state.assignmentDays[dateStr]

        let students = assignmentStudents.map(m => {
            let s = m.student
            let name = s.isInvitation ? (s.name_first + " " + s.name_last) : (s.student.name_first + " " + s.student.name_last)
            let avatar = s.isInvitation ? <Avatar invitation={s} /> : <Avatar user={s} />
            let link = <Link to={'/insights/' + (s.isInvitation ? ("invitations/") : ("students/")) + s.id} className='name-label'>{name}</Link>

            return <div className="student" key={s.id}>
                {avatar}
                {link}
                <div style={{ flexGrow: 1 }} />
                <h3 style={{ marginLeft: "8px" }}>{m.count}</h3>
            </div>
        })
        let studentCount = assignmentStudents.length;
        let percentageTotalCount = Math.round(100 * studentCount / this.state.studentCount)
        let assignmentCount = assignmentStudents.reduce((acc, val) => acc + val.count, 0)

        return <SkModal>
            <h2>{moment(dateStr, "MMDDYYYY").format("LL")}</h2>
            <span style={{ fontWeight: "300" }}>{studentCount} student{studentCount == 1 ? "" : "s"} ({percentageTotalCount}% of group) {studentCount == 1 ? "has" : "have"} assignments due on this day</span>
            <div className="si-group-calendar-detail-row">
                <span>Athletes: {studentCount}</span>
                <div style={{ flexGrow: 1 }} />
                <span>Assignments: {assignmentCount}</span>
            </div>
            <div className="si-group-calendar-modal-students">
                {students}
            </div>
            <button className="button" style={{ width: "100%" }} onClick={(() => this.toggleModal(null)).bind(this)}>
                Done
            </button>
        </SkModal>
    }

    render() {
        return <Fragment>
            {this.renderMonth(this.state.startDate)}
            {this.state.modalDate ? this.renderModal() : null}
        </Fragment>
    }
}
