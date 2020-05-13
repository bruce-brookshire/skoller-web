import React, { Fragment } from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Table from '../components/Table'
import GentleModal from '../components/GentleModal'
import SkSelect from '../../components/SkSelect'
import { toTitleCase } from '../utils'
import CreateOrgGroup from '../../Hub/HubInsights/CreateOrgGroup'
import StudentsCell from '../components/StudentsCell'
import OwnersCell from '../components/OwnersCell'
import TeamsCell from '../components/TeamsCell'
import SkModal from '../../components/SkModal/SkModal'
import CreateOrgOwner from '../../Hub/HubInsights/CreateOrgOwner'
import CreateOrgGroupOwner from '../../Hub/HubInsights/CreateOrgGroupOwner'

@inject('rootStore') @observer
class Organization extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/organization')

    this.state = {
      showNewOrgOwnerModal: false
    }
  }

  renderNewOrgOwnerButton () {
    return (
      <div colSpan={2} className='si-table-button' onClick={() => this.setState({showNewOrgOwnerModal: true})}>
        Create new organization owner
      </div>
    )
  }

  renderOrgOwnersTable () {
    const headers = ['Email']
    let da = this.props.rootStore.insightsStore.org.orgOwners.slice()
    const d = da.map(d => {
      return [
        d.user.email
      ]
    })
    d.push([this.renderNewOrgOwnerButton()])

    return (
      <Fragment>
        <Table className='si-organization-table' headers={headers} data={d} />
        {this.state.showNewOrgOwnerModal && <SkModal closeModal={() => this.setState({showNewOrgOwnerModal: false})}>
          <CreateOrgOwner onSubmit={() => {
            this.setState({showNewOrgOwnerModal: false})
            this.props.rootStore.insightsStore.updateData()
          }} org={this.props.rootStore.insightsStore.org} />
        </SkModal>}
      </Fragment>
    )
  }

  renderTeamsCell (d) {
    return (
      <TeamsCell owner={true} user={d} org={this.props.rootStore.insightsStore.org} onChange={() => this.props.rootStore.insightsStore.updateData()} />
    )
  }

  renderNewOrgGroupOwnerButton () {
    return (
      <div colSpan={2} className='si-table-button' onClick={() => this.setState({showNewOrgGroupOwnerModal: true})}>
        Create new {this.props.rootStore.insightsStore.org.groupsAlias} owner
      </div>
    )
  }

  renderOrgGroupOwnersTable () {
    let insightsStore = this.props.rootStore.insightsStore
    let title = toTitleCase(insightsStore.org.groupsAlias) + 's'
    const headers = ['Email', title]
    let da = insightsStore.org.groupOwners.slice()
    const d = da.map(d => {
      return [
        d.user.email,
        this.renderTeamsCell(d)
      ]
    })
    d.push([this.renderNewOrgGroupOwnerButton()])

    return (
      <Fragment>
        <Table className='si-organization-table' headers={headers} data={d} />
        {this.state.showNewOrgGroupOwnerModal && <SkModal closeModal={() => this.setState({showNewOrgGroupOwnerModal: false})}>
          <CreateOrgGroupOwner onSubmit={() => {
            this.setState({showNewOrgGroupOwnerModal: false})
            this.props.rootStore.insightsStore.updateData()
          }} org={this.props.rootStore.insightsStore.org} />
        </SkModal>}
      </Fragment>
    )
  }

  renderContent () {
    let insightsStore = this.props.rootStore.insightsStore
    let title = toTitleCase(insightsStore.org.groupsAlias) + 's'
    return (
      <div className='si-organization'>
        <div className='si-organization-header'>
          <h1>Organization</h1>
          <p>Manage all of the administrators in {insightsStore.org.name} from this page.</p>
        </div>
        <div className='si-organization-content'>
          <div className='si-organization-column'>
            <h2>Organization owners</h2>
            {this.renderOrgOwnersTable()}
          </div>
          <div className='si-organization-column'>
            <h2>{title} owners</h2>
            {this.renderOrgGroupOwnersTable()}
          </div>
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

Organization.propTypes = {
  rootStore: PropTypes.object
}

export default Organization
