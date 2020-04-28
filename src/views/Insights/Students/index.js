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
import GentleModal from '../components/GentleModal'

@inject('rootStore') @observer
class Students extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.insightsStore.getStudents()
    this.props.rootStore.navStore.setActivePage('insights/students')

    this.state = {
      showFilter: false
    }

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
      <Table className='si-students-table' headers={headers} data={d} />
    )
  }

  renderFilterModal () {
    return (
      <GentleModal show={this.state.showFilter} width={380} closeModal={() => {
        this.setState({showFilter: false})
      }}>
        <h3>filter ur shit</h3>
      </GentleModal>
    )
  }

  renderFilterBar () {
    return (
      <div className='si-filter-bar'>
        <div className='si-filter-bar-button si-filter-bar-filter' onClick={() => this.setState({showFilter: true})}>
          <i className='fas fa-filter' /> Filter
          <div style={{marginLeft: '-0.5rem', marginTop: '4px', position: 'absolute'}}>
            {this.renderFilterModal()}
          </div>
        </div>
        <div className='si-filter-bar-button si-filter-bar-sort'><i className='fas fa-sort' /> Sort</div>
        <div className='si-filter-bar-search'>
          <input
            className='si-filter-bar-search-input'
            placeholder='Search for a student'
          />
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='si-students'>
        <div className='si-students-header'>
          <h1>Students</h1>
        </div>
        <div className='si-students-content'>
          {this.renderFilterBar()}
          {this.renderTable()}
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

Students.propTypes = {
  rootStore: PropTypes.object
}

export default Students
