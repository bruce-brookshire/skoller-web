import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import Table from '../components/Table'
import data from './test'
import TeamsCell from '../components/TeamsCell'
import InsightsLayout from '../../components/InsightsLayout'

@inject('rootStore') @observer
class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.insightsStore.getStudents()
  }

  renderTable () {
    const headers = ['📷', 'First name', 'Last name', 'Watching', 'Teams', 'Phone', 'Email']
    let i = 0
    const d = data.map(d => {
      i += 1
      return [
        <Avatar user={d} key={i} />,
        d.name_first,
        d.name_last,
        <WatchToggle user={d} key={i} />,
        <TeamsCell key={i} user={d} />,
        d.phone,
        d.email
      ]
    })

    return (
      <Table headers={headers} data={d} />
    )
  }

  renderContent () {
    return (
      this.renderTable()
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
