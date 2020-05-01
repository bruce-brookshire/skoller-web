import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Table from '../components/Table'
import StudentAthleteCard from './StudentAthleteCard'

@inject('rootStore') @observer
class Watchlist extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: 'Assignments'
    }
  }
  renderTable () {
    let students = this.props.rootStore.insightsStore.students.filter(s => {
      console.log(s)
      return this.props.rootStore.insightsStore.watchlist.map(u => u.org_student_id).includes(s.id)
    })
    const headers = [{children: 'Student-Athlete', colSpan: 1}, this.state.filter]
    const d = students.map(d => {
      return [
        <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
        Math.floor(Math.random() * Math.floor(20))
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
