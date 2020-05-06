import React from 'react'
import { withRouter } from 'react-router-dom'
import actions from '../../../actions'
import PropTypes from 'prop-types'
import Table from '../../Insights/components/Table'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import SkModal from '../../components/SkModal/SkModal'
import CreateOrgOwner from './CreateOrgOwner'
import CreateOrg from './CreateOrg'
import CreateOrgGroup from './CreateOrgGroup'
import TagUserToOrg from './TagUserToOrg'
import TeamsCell from '../../Insights/components/TeamsCell'
import AddOrRemoveOrgStudents from './AddOrRemoveOrgStudents'
import CreateOrgGroupOwner from './CreateOrgGroupOwner'
import TagUserToOrgGroup from './TagUserToOrgGroup'

class HubInsights extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      orgs: [],
      orgSelection: null,
      showTagUserToOrgModal: false,
      showNewOrgModal: false,
      showNewOrgOwnerModal: false,
      showNewOrgGroupModal: false,
      showManageStudentsModal: false,
      showCreateOrgGroupOwnersModal: false,
      showTagUserToOrgGroupModal: false,
      loadingDetails: false
    }

    this.getData()
  }

  async getData () {
    this.setState({loading: true})
    await actions.insights.getAllOrgs()
      .then(orgs => {
        this.setState({orgs})
      })
      .catch(e => console.log(e))
    this.setState({loading: false})
  }

  async getOrgData (backgroundLoading = false, org = this.state.orgSelection) {
    this.setState({loadingDetails: !backgroundLoading})
    await actions.insights.getAllOrgOwnersInOrg(org.id)
      .then(owners => {
        org.owners = owners
      })
    await actions.insights.getAllGroupsInOrg(org.id)
      .then((groups) => {
        org.groups = groups
      })
    await actions.insights.getAllOrgGroupOwnersInOrg(org.id)
      .then((groupOwners) => {
        org.groupOwners = groupOwners
      })
    await actions.insights.getAllStudentsInOrg(org.id)
      .then(students => {
        console.log(students)
        org.students = students.map(s => { return {...s, orgStudentId: s.id} })
      })
    this.setState({loadingDetails: false, orgSelection: org})
  }

  renderOrgCell (org) {
    return (
      <div
        className='hub-insights-cell-button'
        style={this.state.orgSelection && (this.state.orgSelection.id === org.id ? {backgroundColor: '#ffdc7d', fontWeight: '600', margin: '-4px', padding: '10px 8px 6px 8px'} : null)}
        onClick={() => {
          this.getOrgData(false, org)
        }}>
        {org.name}
      </div>
    )
  }

  renderNewOrgButton () {
    return (
      <div className='hub-insights-cell-button blue' onClick={() => this.setState({showNewOrgModal: true})}>
        Create new org
      </div>
    )
  }

  onSubmitOrgs () {
    this.setState({showNewOrgModal: false})
    this.getData()
  }

  renderOrgs () {
    let data = this.state.orgs.map(o => [this.renderOrgCell(o)])
    data.push([this.renderNewOrgButton()])

    return (
      <div className='hub-insights-group'>
        <h2>Select an Organization</h2>
        <Table
          headers={['Org Name']}
          data={data}
        />
        {this.state.showNewOrgModal &&
          <SkModal closeModal={() => this.setState({showNewOrgModal: false})}>
            <CreateOrg onSubmit={() => this.onSubmitOrgs()} />
          </SkModal>
        }
      </div>
    )
  }

  renderNewOrgOwnerButton () {
    return (
      <div className='hub-insights-cell-button blue' onClick={() => this.setState({showNewOrgOwnerModal: true})}>
        Create new user as org owner
      </div>
    )
  }

  renderTagUserToOrgButton () {
    return (
      <div className='hub-insights-cell-button blue' onClick={() => this.setState({showTagUserToOrgModal: true})}>
        Add or remove an existing user as owner
      </div>
    )
  }

  renderOwnerCell (owner) {
    return (
      <div key={owner.user.id}>
        {owner.user.email}
      </div>
    )
  }

  onSubmitOrgOwner () {
    this.getOrgData()
    this.setState({showNewOrgOwnerModal: false, showTagUserToOrgModal: false})
  }

  renderOrgOwners () {
    if (this.state.orgSelection) {
      let data = this.state.orgSelection.owners.map(o => [this.renderOwnerCell(o)])
      data.push([this.renderNewOrgOwnerButton()])
      data.push([this.renderTagUserToOrgButton()])

      return (
        <div className='hub-insights-group'>
          <h2>Owners</h2>
          <Table
            headers={['Email']}
            data={data}
          />
          {this.state.showNewOrgOwnerModal &&
            <SkModal closeModal={() => this.setState({showNewOrgOwnerModal: false})}>
              <CreateOrgOwner org={this.state.orgSelection} onSubmit={() => this.onSubmitOrgOwner()} />
            </SkModal>
          }
          {this.state.showTagUserToOrgModal &&
            <SkModal closeModal={() => this.setState({showTagUserToOrgModal: false})}>
              <TagUserToOrg org={this.state.orgSelection} onSubmit={() => this.onSubmitOrgOwner()} />
            </SkModal>
          }
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  renderNewOrgGroupButton () {
    return (
      <div className='hub-insights-cell-button blue' onClick={() => this.setState({showNewOrgGroupModal: true})}>
        Create new org group
      </div>
    )
  }

  onSubmitGroups () {
    this.getOrgData()
    this.setState({showNewOrgGroupModal: false})
  }

  renderOrgGroups () {
    if (this.state.orgSelection) {
      let data = this.state.orgSelection.groups.map(g => [g.name])
      data.push([this.renderNewOrgGroupButton()])

      return (
        <div className='hub-insights-group'>
          <h2>Groups</h2>
          <Table
            headers={['Group name']}
            data={data}
          />
          {this.state.showNewOrgGroupModal &&
            <SkModal closeModal={() => this.setState({showNewOrgGroupModal: false})}>
              <CreateOrgGroup org={this.state.orgSelection} onSubmit={() => this.onSubmitGroups()} />
            </SkModal>
          }
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  renderCreateOrgGroupOwnerButton () {
    return (
      <div colSpan={2} className='hub-insights-cell-button blue' onClick={() => this.setState({showCreateOrgGroupOwnersModal: true})}>
        Create new org group owner
      </div>
    )
  }

  renderTagUserToOrgGroupButton () {
    return (
      <div colSpan={2} className='hub-insights-cell-button blue' onClick={() => this.setState({showTagUserToOrgGroupModal: true})}>
        Make an existing user an org group owner
      </div>
    )
  }

  renderOwnerTeamsCell (owner) {
    return (
      <TeamsCell owner={true} user={owner} org={this.state.orgSelection} onChange={() => this.getOrgData(true)} />
    )
  }

  getAllOrgGroupOwners () {
    let orgOwnersArrays = this.state.orgSelection.groups.map(g => g.owners)
    let mergedOwners = [].concat.apply([], orgOwnersArrays)
    let seen = new Set()
    const filteredMergedOwners = mergedOwners.filter(o => {
      const duplicate = seen.has(o.user_id)
      seen.add(o.user_id)
      return !duplicate
    })
    return filteredMergedOwners
  }

  renderOrgGroupOwners () {
    if (this.state.orgSelection) {
      let data = this.getAllOrgGroupOwners().map(o => [o.user_id, this.renderOwnerTeamsCell(o)])
      data.push([this.renderCreateOrgGroupOwnerButton()])
      data.push([this.renderTagUserToOrgGroupButton()])
      return (
        <div className='hub-insights-group'>
          <h2>Group Owners</h2>
          <Table
            headers={['User ID', 'Teams (org groups)']}
            data={data}
          />
          {this.state.showCreateOrgGroupOwnersModal &&
            <SkModal closeModal={() => this.setState({showCreateOrgGroupOwnersModal: false})}>
              <CreateOrgGroupOwner org={this.state.orgSelection} onSubmit={() => this.onSubmitGroups()} />
            </SkModal>
          }
          {this.state.showTagUserToOrgGroupModal &&
            <SkModal closeModal={() => this.setState({showTagUserToOrgGroupModal: false})}>
              <TagUserToOrgGroup groupOwners={this.getAllOrgGroupOwners()} org={this.state.orgSelection} onSubmit={() => this.onSubmitGroups()} />
            </SkModal>
          }
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  renderStudentGroups (user) {
    return (
      <TeamsCell org={this.state.orgSelection} user={user} onChange={() => this.getOrgData(true)} />
    )
  }

  renderManageStudentsButton () {
    return (
      <div colSpan='3' className='hub-insights-cell-button blue' onClick={() => this.setState({showManageStudentsModal: true})}>
        Add or remove org students
      </div>
    )
  }

  renderOrgStudents () {
    if (this.state.orgSelection) {
      let data = this.state.orgSelection.students.map(g => [g.student.name_first + ' ' + g.student.name_last, g.student.phone, this.renderStudentGroups(g)])
      data.push([this.renderManageStudentsButton()])
      return (
        <div className='hub-insights-group'>
          <h2>Students</h2>
          <Table
            headers={['Name', 'Phone', 'Teams (org groups)']}
            data={data}
          />
          {this.state.showManageStudentsModal &&
            <SkModal closeModal={() => this.setState({showManageStudentsModal: false})}>
              <AddOrRemoveOrgStudents org={this.state.orgSelection} onSubmit={() => this.onSubmitGroups()} />
            </SkModal>
          }
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }

  renderDetails () {
    return (
      <React.Fragment>
        {this.state.orgSelection && <h2>{this.state.orgSelection.name}</h2>}
        <div className='hub-insights-info'>
          {!this.state.orgSelection && <p style={{textAlign: 'center', width: '100%'}}>Select an organization to see its details</p>}
          {this.renderOrgOwners()}
          {this.renderOrgGroups()}
          {this.renderOrgGroupOwners()}
          {this.renderOrgStudents()}
        </div>
      </React.Fragment>
    )
  }

  renderContent () {
    return (
      <div className='hub-insights'>
        <h1>Insights</h1>
        <div>
          <span className='description'>Manage orgs, org owners, groups, and group owners from this page</span>
        </div>
        <div className='hub-insights-content'>
          <div className='hub-insights-orgs'>
            {this.renderOrgs()}
          </div>
          <div className='hub-insights-info-container'>
            {this.state.loadingDetails
              ? <SkLoader />
              : this.renderDetails()
            }
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.loading) {
      return <SkLoader />
    } else {
      return this.renderContent()
    }
  }
}

HubInsights.propTypes = {
  history: PropTypes.object
}

export default withRouter(HubInsights)
