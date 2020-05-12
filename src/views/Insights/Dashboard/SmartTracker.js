import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SmartTrackerIcon from '../../../assets/sk-icons/insights/SmartTrackerIcon'
import Table from '../components/Table'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkSelect from '../../components/SkSelect'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays, toTitleCase } from '../utils'

@inject('rootStore') @observer
class SmartTracker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      team: 'All',
      searchQuery: ''
    }
  }

  renderValue (d) {
    const days = this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe === 'Next 7 days' ? 7 : 30
    let intensityString = days === 7 ? 'sevenDay' : 'thirtyDay'
    let value

    switch (this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort) {
      case 'Assignments':
        value = getAssignmentCountInNextNDays(d.assignments, days)
        break
      case 'Weights':
        value = getAssignmentWeightsInNextNDays(d.assignments, days) + '%'
        break
      case 'Intensity':
        value = d.intensity[intensityString]
        break
    }

    return (
      <div className='si-smart-tracker-value'>{value}</div>
    )
  }

  sortStudents (students) {
    const days = this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe === 'Next 7 days' ? 7 : 30

    switch (this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort) {
      case 'Assignments':
        return students.sort((a, b) => {
          if (getAssignmentCountInNextNDays(a.assignments, days) < getAssignmentCountInNextNDays(b.assignments, days)) {
            return 1
          } else {
            return -1
          }
        })

      case 'Weights':
        return students.sort((a, b) => {
          if (getAssignmentWeightsInNextNDays(a.assignments, days) < getAssignmentWeightsInNextNDays(b.assignments, days)) {
            return 1
          } else {
            return -1
          }
        })

      case 'Intensity':
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

  renderTable () {
    const headers = [{children: 'Student-Athlete', colSpan: 1}, this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort]
    const data = this.filterStudents(this.props.rootStore.insightsStore.students).map(d => {
      return [
        <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
        this.renderValue(d)
      ]
    })

    return (
      <Table headers={headers} data={data} />
    )
  }

  render () {
    let timeframeOptions = ['Next 7 days', 'Next 30 days']
    let filterOptions = ['Assignments', 'Weights', 'Intensity']
    let teamOptions = ['All'].concat(this.props.rootStore.insightsStore.org.groups.map(g => g.name))
    let title = toTitleCase(this.props.rootStore.insightsStore.org.groupsAlias) + 's'
    let interfaceSettings = this.props.rootStore.insightsStore.interfaceSettings
    return (
      <div className='si-smart-tracker'>
        <h1><SmartTrackerIcon /> Smart Tracker</h1>
        <div className='si-smart-tracker-timeframe'>
          <div style={{paddingRight: '8px'}}>Timeframe: </div>
          <SkSelect className='si-select' selection={interfaceSettings.dashboard.timeframe} optionsMap={() => timeframeOptions.map(o => {
            return (
              <div
                key={timeframeOptions.indexOf(o)}
                className='si-smart-tracker-timeframe-option'
                onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe = o }}
              >{o}</div>
            )
          })} />
        </div>
        <div className='si-smart-tracker-filter'>
          <div className='si-smart-tracker-filter-group'>
            <p className='si-smart-tracker-filter-label'>{title}: </p>
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
            <p className='si-smart-tracker-filter-label'>Sort: </p>
            <SkSelect className='si-select' selection={this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort} optionsMap={() => filterOptions.map(o => {
              return (
                <div
                  key={filterOptions.indexOf(o)}
                  className='si-select-option'
                  onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort = o }}
                >{o}</div>
              )
            })} />
          </div>
          <div className='si-smart-tracker-filter-group grow'>
            <p className='si-smart-tracker-filter-label'>Search: </p>
            <input className='si-smart-tracker-search' value={this.state.searchQuery} onChange={(e) => this.setState({searchQuery: e.target.value})} />
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
