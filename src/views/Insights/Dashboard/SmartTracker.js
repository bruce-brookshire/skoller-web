import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SmartTrackerIcon from '../../../assets/sk-icons/insights/SmartTrackerIcon'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkSelect from '../../components/SkSelect'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays, toTitleCase } from '../utils'
import ToolTip from '../../components/ToolTip'

@inject('rootStore') @observer
class SmartTracker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      team: 'All',
      searchQuery: ''
    }
  }

  onSetupClasses () {
    console.log('setup classes')
  }

  renderValue (d) {
    const setup = <div className='si-smart-tracker-value no-classes' onClick={(d) => this.onSetupClasses(d)}>Setup classes</div>
    if (d.isInvitation) {
      if (d.class_ids.length === 0) return setup
    } else {
      if (d.classes.length === 0) return setup
    }

    const days = this.props.rootStore.insightsStore.interfaceSettings.timeframe
    let intensityString = days === 7 ? 'sevenDay' : 'thirtyDay'
    let value

    switch (this.props.rootStore.insightsStore.interfaceSettings.sort) {
      case 'Assignments':
        value = getAssignmentCountInNextNDays(d.assignments, days)
        break
      case 'Grade Impact':
        value = getAssignmentWeightsInNextNDays(d.assignments, days) + '%'
        break
      case 'Personal Intensity':
        value = d.intensity[intensityString]
        break
    }

    return (
      <div className='si-smart-tracker-value'>{value}</div>
    )
  }

  sortStudents (students) {
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

      case 'Personal Intensity':
        let intensityString = days === 7 ? 'sevenDay' : 'thirtyDay'
        return students.sort((a, b) => {
          if (a.intensity[intensityString] < b.intensity[intensityString]) {
            return 1
          } else {
            return -1
          }
        })
    }
  }

  filterStudents (students) {
    if (this.state.searchQuery !== '') {
      students = students.filter(s => {
        return (s.student.name_first + ' ' + s.student.name_last).toLowerCase().includes(this.state.searchQuery.toLowerCase())
      })
    }

    if (this.state.team !== 'All') {
      students = students.filter(s => {
        return s.org_groups.map(g => g.name).includes(this.state.team)
      })
    }

    return this.sortStudents(students.slice())
  }

  renderSortOption () {
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

      case 'Personal Intensity':
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

  renderTable () {
    const headers = ['Athlete', this.renderSortOption()]
    const data = this.filterStudents(this.props.rootStore.insightsStore.getStudentsAndInvitations()).map(d => {
      if (d) {
        return [
          <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
          this.renderValue(d)
        ]
      }
    })

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

  render () {
    let filterOptions = ['Assignments', 'Grade Impact', 'Personal Intensity']
    let teamOptions = ['All'].concat(this.props.rootStore.insightsStore.org.groups ? this.props.rootStore.insightsStore.org.groups.map(g => g.name) : null)
    let title = toTitleCase(this.props.rootStore.insightsStore.org.groupsAlias) + 's'
    let interfaceSettings = this.props.rootStore.insightsStore.interfaceSettings
    let timeframeOptions = interfaceSettings.timeframeOptions
    console.log(interfaceSettings)
    return (
      <div className='si-smart-tracker'>
        <h1><SmartTrackerIcon fill={this.props.rootStore.insightsStore.darkMode ? 'white' : ''} /> Smart Tracker</h1>
        <div className='si-smart-tracker-timeframe'>
          <div className='si-smart-tracker-timeframe-label' style={{paddingRight: '8px'}}>Looking at </div>
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
        <div className='si-smart-tracker-filter'>
          <div className='si-smart-tracker-filter-group'>
            <p className='si-smart-tracker-filter-label'>{title}</p>
            <SkSelect className='si-select' selection={this.state.team} optionsMap={() => teamOptions.map(o => {
              return (
                <div
                  key={teamOptions.indexOf(o)}
                  className='si-select-option'
                  onClick={() => this.setState({team: o})}
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
            <input placeholder='Search for an athlete' className='si-smart-tracker-search' value={this.state.searchQuery} onChange={(e) => this.setState({searchQuery: e.target.value})} />
          </div>
        </div>
        <div className='si-smart-tracker-content'>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

SmartTracker.propTypes = {
  rootStore: PropTypes.object
}

export default SmartTracker
