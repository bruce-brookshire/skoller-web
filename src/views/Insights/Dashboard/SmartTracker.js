import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SmartTrackerIcon from '../../../assets/sk-icons/insights/SmartTrackerIcon'
import dataWithId from './test'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import TeamsCell from '../components/TeamsCell'
import CopyCell from '../components/CopyCell'
import Table from '../components/Table'

const StudentAthleteCard = (user) => {
  return (
    <div className='si-sa-card'>
      <Avatar user={user.student} />
      <div className='sa-info'>
        <div className='sa-name'>
          {user.student.name_first + ' ' + user.student.name_last}
          <WatchToggle user={user.student} showConfirm={false} />
        </div>
        <div className='sa-teams'>
          {user.student.teams.map(t => {
            return (
              <div className='sa-team' key={user.student.teams.indexOf(t)}>
                {t.name}{user.student.teams.indexOf(t) !== user.student.teams.length - 1 ? ', ' : ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

@inject('rootStore') @observer
class SmartTracker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: 'Assignments'
    }
  }
  renderTable () {
    const headers = [{children: 'Student-Athlete', colSpan: 1}, this.state.filter]
    let i = 0
    const d = dataWithId.map(d => {
      i += 1
      return [
        <StudentAthleteCard student={d} key={i} />,
        12
      ]
    })

    return (
      <Table headers={headers} data={d} />
    )
  }

  render () {
    return (
      <div className='si-smart-tracker'>
        <h1><SmartTrackerIcon /> Smart Tracker</h1>
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
