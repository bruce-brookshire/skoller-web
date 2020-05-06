import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SmartTrackerIcon from '../../../assets/sk-icons/insights/SmartTrackerIcon'
import Table from '../components/Table'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkSelect from '../../components/SkSelect'

@inject('rootStore') @observer
class SmartTracker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: 'Assignments',
      timeframe: 'Next 7 days'
    }
  }

  renderTable () {
    const headers = [{children: 'Student-Athlete', colSpan: 1}, this.state.filter]
    const data = this.props.rootStore.insightsStore.students.map(d => {
      return [
        <StudentAthleteCard user={d} key={d.id} rootStore={this.props.rootStore} />,
        Math.floor(Math.random() * Math.floor(20))
      ]
    })

    return (
      <Table headers={headers} data={data} />
    )
  }

  render () {
    let options = ['Next 7 days', 'Next 30 days']
    return (
      <div className='si-smart-tracker'>
        <h1><SmartTrackerIcon /> Smart Tracker</h1>
        <div className='si-smart-tracker-timeframe'>
          Timeframe: <SkSelect className='si-select' selection={this.state.timeframe} optionsMap={() => options.map(o => {
            return (
              <div
                key={options.indexOf(o)}
                className='si-smart-tracker-timeframe-option'
                onClick={() => this.setState({timeframe: o})}
              >{o}</div>
            )
          })} />
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
