import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Table from '../components/Table'
import StudentAthleteCard from '../components/StudentAthleteCard'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays } from '../utils'

@inject('rootStore') @observer
class Watchlist extends React.Component {
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

    return <div className='si-smart-tracker-value'>{value}</div>
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

  renderTable () {
    let students = this.props.rootStore.insightsStore.students.filter(s => {
      return this.props.rootStore.insightsStore.watchlist.map(u => u.org_student_id).includes(s.id)
    })
    students = this.sortStudents(students)
    const headers = [{children: 'Student-Athlete', colSpan: 1}, this.props.rootStore.insightsStore.interfaceSettings.dashboard.sort]
    const d = students.map(d => {
      return [
        <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
        this.renderValue(d)
      ]
    })

    return (
      <Table headers={headers} data={d} />
    )
  }

  render () {
    return (
      <div className='si-smart-tracker'>
        <h1><i className='fas fa-clipboard-list'/> My Watchlist</h1>
        <div className='si-smart-tracker-content'>
          {this.renderTable()}
        </div>
      </div>
    )
  }
}

Watchlist.propTypes = {
  rootStore: PropTypes.object
}

export default Watchlist
