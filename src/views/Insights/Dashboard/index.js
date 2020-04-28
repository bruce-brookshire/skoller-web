import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import Table from '../components/Table'
import TeamsCell from '../components/TeamsCell'
import InsightsLayout from '../../components/InsightsLayout'
import CopyCell from '../components/CopyCell'
import actions from '../../../actions'
import SmartTracker from './SmartTracker'
import OrgOverview from './OrgOverview'

@inject('rootStore') @observer
class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.insightsStore.getStudents()
    this.props.rootStore.navStore.setActivePage('insights/dashboard')

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

  renderOrgOverview () {
    return (
      <OrgOverview />
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
        <div className='si-dashboard-column-sm'>
          {this.renderOrgOverview()}
        </div>
        <div className='si-dashboard-column-lg'>
          {this.renderSmartTracker()}
        </div>
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
