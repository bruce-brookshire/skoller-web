import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Table from '../components/Table'
import GentleModal from '../components/GentleModal'
import SkSelect from '../../components/SkSelect'
import { toTitleCase, optionalPlural } from '../utils'
import CreateOrgGroup from '../../Hub/HubInsights/CreateOrgGroup'
import StudentsCell from '../components/StudentsCell'
import OwnersCell from '../components/OwnersCell'
import LoadingIndicator from '../components/LoadingIndicator'
import SkModal from '../../components/SkModal/SkModal'
import CreateStudents from '../components/CreateStudents'
import { Link } from 'react-router-dom'
import StatusIndicators from '../components/StatusIndicators'

@inject('rootStore') @observer
class NameCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showActions: false,
      showAddStudents: false,
      studentsAlias: this.props.rootStore.insightsStore.org.studentsAlias
    }
  }

  renderCreateStudentsModal () {
    return (
      this.state.showAddStudents && <SkModal disableOutsideClick={true} closeModal={() => this.setState({showAddStudents: false})}>
        <CreateStudents showConfirm group={this.props.d} onSubmit={() => {
          this.props.rootStore.insightsStore.updateData(['invitations'])
          this.setState({showAddStudents: false})
        }} />
      </SkModal>
    )
  }

  renderActions () {
    let group = this.props.d

    return (
      <GentleModal closeModal={() => this.setState({showActions: false})} show={this.state.showActions}>
        <div className='action-button' onClick={() => this.setState({showAddStudents: true, showActions: false})}><p>Upload {this.state.studentsAlias}s to {group.name}</p></div>
      </GentleModal>
    )
  }

  render () {
    return (
      <div className='si-groups-table-name'>
        <Link to={'/insights/groups/' + this.props.d.id}>
          {this.props.d.name}
        </Link>
        <StatusIndicators group={this.props.d} hideNumbers={true} />
        {/* <span style={{marginLeft: '8px'}}>{this.renderActions()}<i onClick={() => this.setState({showActions: true})} className='fas fa-ellipsis-h' /></span> */}
        {/* {this.renderCreateStudentsModal()} */}
      </div>
    )
  }
}

NameCell.propTypes = {
  d: PropTypes.object,
  rootStore: PropTypes.object
}

@inject('rootStore') @observer
class Groups extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/groups')

    this.state = {
      showSort: false,
      showNewGroupModal: false,
      teamsQuery: '',
      sort: {
        value: 'Team name',
        type: 'Ascending'
      }
    }
  }

  sortGroups (groups) {
    let sortedGroups = []
    if (this.state.sort.value === 'Team name') {
      sortedGroups = groups.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.type === 'Descending') {
      sortedGroups = sortedGroups.reverse()
    }
    return sortedGroups
  }

  renderFilteredGroups () {
    let groups = this.props.rootStore.insightsStore.groups.slice()

    if (this.state.teamsQuery) {
      groups = groups.filter(g => g.name.toLowerCase().includes(this.state.teamsQuery.toLowerCase()))
    }

    return this.sortGroups(groups)
  }

  renderStudentsCell (d) {
    return (
      <h2 style={{margin: 0}}>{optionalPlural(d.students.concat(d.invitations), '#', 's')}</h2>
    )
    // return (
    //   <StudentsCell group={d} org={this.props.rootStore.insightsStore.org} onChange={() => this.props.rootStore.insightsStore.updateData(['students'])} />
    // )
  }

  renderOwnersCell (d) {
    return (
      <h2 style={{margin: 0}}>{optionalPlural(d.owners, '#', 's')}</h2>
    )
    // return (
    //   <OwnersCell group={d} org={this.props.rootStore.insightsStore.org} onChange={() => this.props.rootStore.insightsStore.updateData(['groupOwners', 'groups'])} />
    // )
  }

  renderNameCell (d) {
    return (
      <NameCell d={d} />
    )
  }

  renderTable () {
    const headers = ['Name', 'Athletes', 'Owners']
    let da = this.renderFilteredGroups()
    const d = da.map(d => {
      return [
        this.renderNameCell(d),
        this.renderStudentsCell(d),
        this.renderOwnersCell(d)
      ]
    })

    return (
      <Table className='si-groups-table' headers={headers} data={d} />
    )
  }

  renderNewGroupModal () {
    return (
      this.state.showNewGroupModal && <SkModal closeModal={() => this.setState({showNewGroupModal: false})}>
        <CreateOrgGroup org={this.props.rootStore.insightsStore.org} onSubmit={() => {
          this.setState({showNewGroupModal: false})
          this.props.rootStore.insightsStore.updateData(['groups'])
        }} alias={this.props.rootStore.insightsStore.org.groupsAlias} />
      </SkModal>
    )
  }

  renderSortModal () {
    let valueOptions = ['Team name']
    let typeOptions = ['Ascending', 'Descending']
    return (
      <GentleModal show={this.state.showSort} width={380} closeModal={() => {
        this.setState({showSort: false})
      }}>
        <div className='si-filter-modal'>
          <div className='si-filter-modal-select-row'>
            <div className='si-filter-modal-label'>Sort by</div>
          </div>
          <div className='si-filter-modal-select-row'>
            <SkSelect className='si-filter-modal-select' selection={this.state.sort.value} optionsMap={() => valueOptions.map(o => {
              return (
                <div className='si-select-option' onClick={() => this.setState({sort: {...this.state.sort, value: o}})} key={valueOptions.indexOf(o)}>{o}</div>
              )
            })} />
            <SkSelect className='si-filter-modal-select' selection={this.state.sort.type} optionsMap={() => typeOptions.map(o => {
              return (
                <div className='si-select-option' onClick={() => this.setState({sort: {...this.state.sort, type: o}})} key={typeOptions.indexOf(o)}>{o}</div>
              )
            })} />
          </div>
        </div>
      </GentleModal>
    )
  }

  renderFilterBar () {
    return (
      <div className='si-filter-bar'>
        <div className='si-filter-bar-button si-filter-bar-sort' onClick={() => this.setState({showSort: true})}>
          <i className='fas fa-sort' /> Sort
          <div style={{marginLeft: '-0.5rem', marginTop: '4px', position: 'absolute'}}>
            {this.renderSortModal()}
          </div>
        </div>
        <div className='si-filter-bar-search'>
          <input
            className='si-filter-bar-search-input'
            placeholder='Search for a team'
            onChange={(e) => this.setState({teamsQuery: e.target.value})}
            value={this.state.teamsQuery}
          />
        </div>
      </div>
    )
  }

  renderAddGroups () {
    let insightsStore = this.props.rootStore.insightsStore

    return (
      <div className='si-groups-empty'>
        <div className='si-groups-empty-content'>
          <h1>Add {insightsStore.org.groupsAlias}s!</h1>
          <div onClick={() => this.setState({showNewGroupModal: true})} className='plus'>+</div>
          <i className='fas fa-users' />
        </div>
      </div>
    )
  }

  renderContent () {
    let insightsStore = this.props.rootStore.insightsStore
    let title = toTitleCase(insightsStore.org.groupsAlias) + 's'
    return (
      <div className='si-groups'>
        <div className='si-groups-header'>
          <div className='si-groups-header-left'>
            <h1>{title}<LoadingIndicator /></h1>
            <p>Manage all of the {insightsStore.org.groupsAlias}s in {this.props.rootStore.insightsStore.org.name} from this page.</p>
          </div>
          <div className='si-groups-header-right'>
            <div className='si-button'>
              <p
                onClick={() => this.setState({showNewGroupModal: true})}
              >Create a {insightsStore.org.groupsAlias}</p>
            </div>
            {this.renderNewGroupModal()}
          </div>
        </div>
        <div className='si-groups-content'>
          {insightsStore.groups.length > 0 && this.renderFilterBar()}
          {insightsStore.groups.length > 0 && this.renderTable()}
          {insightsStore.groups.length === 0 && this.renderAddGroups()}
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

Groups.propTypes = {
  rootStore: PropTypes.object
}

export default Groups
