import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import Table from '../components/Table'
import data from './test'
import TeamsCell from '../components/TeamsCell'
import InsightsLayout from '../../components/InsightsLayout'
import CopyCell from '../components/CopyCell'
import actions from '../../../actions'
import SmartTracker from './SmartTracker'

@inject('rootStore') @observer
class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.insightsStore.getStudents()

    actions.insights.getStudentsByTeamId()
  }

  renderTable () {
    const headers = ['📷', 'First name', 'Last name', 'Watching', 'Teams', 'Phone (click to copy)', 'Email']
    let i = 0
    const da = this.props.rootStore.insightsStore.students
    const d = da.map(d => {
      i += 1
      return [
        <Avatar user={d} key={i} />,
        d.name_first,
        d.name_last,
        <WatchToggle showConfirm={true} user={d} key={i} />,
        <TeamsCell key={i} user={d} />,
        <CopyCell isPhone={true} text={d.phone} key={i} />,
        <a className={'link-style'} href={'mailto:' + d.email} key={i}>{d.email}</a>
      ]
    })

    return (
      <Table headers={headers} data={d} />
    )
  }

  renderHeader () {
    return (
      <div className='si-table-header'>
        <div className='si-table-header-item'>
          Sort
        </div>
      </div>
    )
  }

  renderSmartTracker () {
    return (
      <SmartTracker />
    )
  }

  renderContent () {
    return (
      <div className='si-dashboard'>
        {this.renderHeader()}
        {/* {this.renderTable()} */}
        {this.renderSmartTracker()}
      </div>
    )
  }

  render () {
    return (
      <InsightsLayout>
        {this.renderContent()}
      </InsightsLayout>
    )
  }
}

Dashboard.propTypes = {
  rootStore: PropTypes.object
}

export default Dashboard
