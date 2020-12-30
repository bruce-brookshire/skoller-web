import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentAthleteCard from '../components/StudentAthleteCard'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays } from '../utils'

@inject('rootStore') @observer
class Watchlist extends React.Component {
  renderValue (d) {
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

    return <div className='si-smart-tracker-value'>{value}</div>
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

  renderTable () {
    let students = this.props.rootStore.insightsStore.students.filter(s => {
      return this.props.rootStore.insightsStore.watchlist.map(u => u.org_student_id).includes(s.id)
    })
    students = this.sortStudents(students)
    const headers = ['Athlete', this.props.rootStore.insightsStore.interfaceSettings.sort]
    const data = students.map(d => {
      return [
        <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
        this.renderValue(d)
      ]
    })

    if (data.length === 0) {
      return (
        <div className='add-athletes-callout si-smart-tracker-callout'>
          <i className='far fa-star' />
          <h2 className='grey-h2'>Follow {this.props.rootStore.insightsStore.org.studentsAlias}s and groups by clicking the star next to the name</h2>
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
