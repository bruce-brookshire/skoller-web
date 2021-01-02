import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SmartTrackerIcon from '../../../assets/sk-icons/insights/SmartTrackerIcon'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkSelect from '../../components/SkSelect'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays, toTitleCase } from '../utils'
import ToolTip from '../../components/ToolTip'
import CreateStudents from '../components/CreateStudents'
import SkModal from '../../components/SkModal/SkModal'
import AddClasses from '../components/AddClasses'
import { withRouter } from 'react-router-dom'
import CalendarSmall from '../../../assets/sk-icons/calendar/CalendarSmall'
import ForwardArrow from '../../../assets/sk-icons/navigation/ForwardArrow'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import OrgCalendar from './OrgCalendar'
import { toJS } from 'mobx'

@inject('rootStore') @observer
class SmartTracker extends React.Component {
  constructor(props) {
    super(props)

    let now = new Date();
    let currMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    this.state = {
      team: 'All',
      searchQuery: '',
      trackerType: 'smart',
      currMonth
    }
  }

  onSetupClasses() {
    // console.log('setup classes')
  }

  renderValue(d) {
    const setup = <div className="si-add-classes-button"> <AddClasses user={d} /></div>
    if (d.isInvitation) {
      if (d.class_ids.length === 0) return setup
    } else {
      if (d.classes.length === 0) return setup
    }

    const days = this.props.rootStore.insightsStore.interfaceSettings.timeframe
    let intensityString = days
    let value
    let sort = this.props.rootStore.insightsStore.interfaceSettings.sort

    switch (sort) {
      case 'Assignments':
        value = getAssignmentCountInNextNDays(d.assignments, days)
        break
      case 'Grade Impact':
        value = getAssignmentWeightsInNextNDays(d.assignments, days) + '%'
        break
      case 'Stress score':
        value = d.intensity[intensityString]
        break
    }

    if (sort === 'Stress score') {
      return <div className='si-smart-tracker-value'>{value} <span>out of</span> 10</div>
    }

    return (
      <div className='si-smart-tracker-value'>{value}</div>
    )
  }

  sortStudents(students) {
    const days = this.props.rootStore.insightsStore.interfaceSettings.timeframe

    switch (this.props.rootStore.insightsStore.interfaceSettings.sort) {
      case 'Assignments':
        return students.sort((a, b) => {
          if (getAssignmentCountInNextNDays(a.assignments, days) < getAssignmentCountInNextNDays(b.assignments, days)) {
            return 1
          } else {
            return -1
          }
        })

      case 'Grade Impact':
        return students.sort((a, b) => {
          if (getAssignmentWeightsInNextNDays(a.assignments, days) < getAssignmentWeightsInNextNDays(b.assignments, days)) {
            return 1
          } else {
            return -1
          }
        })

      case 'Stress score':
        let intensityString = days
        return students.sort((a, b) => {
          if (a.intensity[intensityString] < b.intensity[intensityString]) {
            return 1
          } else {
            return -1
          }
        })
    }
  }

  filterStudents(students) {
    if (this.state.searchQuery !== '') {
      students = students.filter(s => {
        return (s.student.name_first + ' ' + s.student.name_last).toLowerCase().includes(this.state.searchQuery.toLowerCase())
      })
    }

    if (this.state.team !== 'All') {
      students = students.filter(s => {
        return (s.isInvitation
          ? s.getOrgGroups().map(g => g.name).includes(this.state.team)
          : s.org_groups.map(g => g.name).includes(this.state.team)
        )
      })
    }

    return this.sortStudents(students.slice())
  }

  renderSortOption() {
    let description
    let sort = this.props.rootStore.insightsStore.interfaceSettings.sort
    let timeframe = this.props.rootStore.insightsStore.interfaceSettings.timeframe

    switch (sort) {
      case 'Grade Impact':
        description = `Grade impact sorts athletes based on who's total grade is impacted the most over the next ${timeframe} days.`
        break

      case 'Assignments':
        description = `Assignments sorts athletes based on who has the most assignments due over the next ${timeframe} days.`
        break

      case 'Stress score':
        description = `Intensity score is a measure of what the next ${timeframe} days look like relative to the entire semester for each individual athlete, taking assignments and grade impact into account.`
        break
    }
    return (
      <div className='si-smart-tracker-sort-option'>
        <div>
          {sort}
        </div>
        <ToolTip
          tip={
            <div>
              <h3>{sort}</h3>
              <p>
                {description}
              </p>
            </div>
          }
        >
          <div className='si-smart-tracker-sort-option-info'>
            ?
          </div>
        </ToolTip>

      </div>
    )
  }

  toggleShowAddStudents(bool) {
    this.setState({ showNewStudentModal: bool })
  }

  clickedNextMonth = () => this.modifyMonth(1);
  clickedPreviousMonth = () => this.modifyMonth(-1);

  modifyMonth(offset) {
    const { currMonth } = this.state;
    let newMonth = new Date(currMonth.getFullYear(), currMonth.getMonth() + offset, 1);

    this.setState({ currMonth: newMonth })
  }

  currentMonthName() {
    return this.state.currMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  renderAddStudents() {
    if (!this.state.showNewStudentModal) return null

    return (
      <SkModal disableOutsideClick closeModal={() => this.setState({ showNewStudentModal: false })}>
        <CreateStudents showConfirm onSubmit={() => {
          this.props.rootStore.insightsStore.updateData()
          this.setState({ showNewStudentModal: false })
        }} />
      </SkModal>
    )
  }

  renderTable() {
    const headers = ['Athlete', this.renderSortOption()]
    let data = this.filterStudents(this.props.rootStore.insightsStore.students).map(d => {
      if (d) {
        return [
          <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
          this.renderValue(d)
        ]
      }
    })

    if (this.props.rootStore.insightsStore.groups.length === 0) {
      return (
        <div className='add-athletes-callout'>
          <h1>Add teams!</h1>
          <div onClick={() => this.props.history.push('/insights/groups')} className='plus'>+</div>
          <i className='fas fa-running' />
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className='add-athletes-callout'>
          <h1>Add athletes!</h1>
          <div onClick={() => this.toggleShowAddStudents(true)} className='plus'>+</div>
          <i className='fas fa-running' />
        </div>
      )
    }

    return (
      <table>
        <thead>
          <tr>
            {headers.map(h => {
              return (
                <th key={headers.indexOf(h)}>{h}</th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            return (
              <tr key={data.indexOf(d)}>
                <td className='si-smart-tracker-sa'>{d[0]}</td>
                <td>{d[1]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className='si-smart-tracker'>
        {this.renderAddStudents()}
        {this.state.trackerType === 'smart' ? this.renderSmart() : this.renderCalendar()}
      </div>
    )
  }

  renderSmart() {
    let filterOptions = ['Assignments', 'Grade Impact', 'Stress score']
    let teamOptions = ['All'].concat(this.props.rootStore.insightsStore.org.groups ? this.props.rootStore.insightsStore.org.groups.map(g => g.name) : null)
    let title = toTitleCase(this.props.rootStore.insightsStore.org.groupsAlias) + 's'
    let interfaceSettings = this.props.rootStore.insightsStore.interfaceSettings
    let timeframeOptions = interfaceSettings.timeframeOptions

    return <Fragment>
      <div className='si-smart-tracker-timeframe'>
        {this.renderTitle()}
        <div className="column">
          <div className='si-smart-tracker-timeframe-label' style={{ paddingRight: '8px' }}>Looking at </div>
          <SkSelect className='si-select' selection={'Next ' + interfaceSettings.timeframe + ' days'} optionsMap={() => timeframeOptions.map(o => {
            return (
              <div
                key={timeframeOptions.indexOf(o)}
                className='si-smart-tracker-timeframe-option si-select-option'
                onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.timeframe = o }}
              >{'Next ' + o + ' days'}</div>
            )
          })} />
        </div>
      </div>
      <div className='si-smart-tracker-filter'>
        <div className='si-smart-tracker-filter-group'>
          <p className='si-smart-tracker-filter-label'>{title}</p>
          <SkSelect className='si-select' selection={this.state.team} optionsMap={() => teamOptions.map(o => {
            return (
              <div
                key={teamOptions.indexOf(o)}
                className='si-select-option'
                onClick={() => this.setState({ team: o })}
              >{o}</div>
            )
          })} />
        </div>
        <div className='si-smart-tracker-filter-group'>
          <p className='si-smart-tracker-filter-label'>Sort</p>
          <SkSelect className='si-select' selection={this.props.rootStore.insightsStore.interfaceSettings.sort} optionsMap={() => filterOptions.map(o => {
            return (
              <div
                key={filterOptions.indexOf(o)}
                className='si-select-option'
                onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.sort = o }}
              >{o}</div>
            )
          })} />
        </div>
        <div className='si-smart-tracker-filter-group grow'>
          <p className='si-smart-tracker-filter-label'>Search</p>
          <input placeholder='Search for an athlete' className='si-smart-tracker-search' value={this.state.searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value })} />
        </div>
      </div>
      <div className='si-smart-tracker-content'>
        {this.renderTable()}
      </div>
    </Fragment>
  }

  renderCalendar() {
    let students = this.props.rootStore.insightsStore.getStudentsAndInvitations()
    console.log(this.state.currMonth)
    return <Fragment>
      {this.renderTitle()}

      <OrgCalendar students={students} currMonth={this.state.currMonth} />

    </Fragment>
  }

  renderHeader() {
    const navStyle = { cursor: "pointer", padding: "4px" }
    return <Fragment>
      <div style={{ flexGrow: 1 }} />
      <div style={navStyle} onClick={this.clickedPreviousMonth}><BackArrow /></div>
      <div style={{ paddingLeft: "16px", paddingRight: "16px" }}><h2 style={{ margin: '0px' }}>{this.currentMonthName()}</h2></div>
      <div style={navStyle} onClick={this.clickedNextMonth}><ForwardArrow /></div>
    </Fragment>
  }

  renderTitle() {
    const isSmart = this.state.trackerType === 'smart'
    let icon = isSmart
      ? <SmartTrackerIcon fill={this.props.rootStore.insightsStore.darkMode ? 'white' : ''} />
      : <div style={{ paddingRight: '4px', paddingLeft: '2px' }}><CalendarSmall height="26" width="26" fill={this.props.rootStore.insightsStore.darkMode ? 'white' : '#4A4A4A'} /></div>;


    return <div className="row" style={{ paddingTop: '0px', alignItems: "flex-start" }}>
      {icon}
      <select className="si-tracker-selector" style={{ width: isSmart ? "215px" : "150px", color: "#57b9e4" }} value={this.state.trackerType} onChange={({ target: { value } }) => this.setState({ trackerType: value })}>
        <option className="value-option" value="smart">Smart Tracker</option>
        <option className="value-option" value="calendar">Calendar</option>
      </select>
      {!isSmart && this.renderHeader()}
    </div>
  }
}

SmartTracker.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(SmartTracker)
