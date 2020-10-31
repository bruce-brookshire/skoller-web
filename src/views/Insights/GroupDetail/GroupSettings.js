import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CreateOrgGroupOwner from '../../Hub/HubInsights/CreateOrgGroupOwner'
import { inject, observer } from 'mobx-react'
import actions from '../../../actions'
import { withRouter } from 'react-router-dom'
import OwnersCell from '../components/OwnersCell'

@inject('rootStore') @observer
class GroupSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      groupName: this.props.group.name,
      createOrgGroupOwner: false
    }
  }

  group () {
    return this.props.rootStore.insightsStore.groups.find(g => g.id === parseInt(this.props.group.id))
  }

  static propTypes = {
    group: PropTypes.object,
    rootStore: PropTypes.object,
    onSubmit: PropTypes.func,
    history: PropTypes.object
  }

  onSubmit () {
    actions.insights.updateOrgGroup(this.props.rootStore.insightsStore.org.id, this.group().id, {
      name: this.state.groupName
    })
      .then(r => {
        this.props.rootStore.insightsStore.updateData(['groups'])
        this.props.onSubmit && this.props.onSubmit()
      })
  }

  updateData () {
    this.props.rootStore.insightsStore.updateData(['groups', 'groupOwners'])
  }

  renderGroupSettings () {
    return (
      <div className='si-group-settings'>
        <h2>Group name</h2>
        <input className='si-input' value={this.state.groupName} onChange={(e) => this.setState({groupName: e.target.value})} />
        <h2>Coaches ({this.group().memberOwners.length})</h2>
        <div className='si-group-settings-coaches'>
          <OwnersCell onChange={() => this.updateData()} group={this.group()} org={this.props.rootStore.insightsStore.org} />
          <div className='add-coaches' onClick={() => this.setState({createOrgGroupOwner: true})}>
            + Invite a new coach to Skoller Insights
          </div>
        </div>
        <div className='control-row'>
          <div className='si-button'>
            <p onClick={() => this.onSubmit()}>Save changes</p>
          </div>
          <div className='si-button red'>
            <p onClick={() => this.setState({deleteConfirm: true})}>Delete group</p>
          </div>
        </div>
      </div>
    )
  }

  renderCreateOrgGroupOwner () {
    return (
      <div className='si-group-settings create-group-owner'>
        <div className='back' onClick={() => this.setState({createOrgGroupOwner: false})}>👈 Back</div>
        <CreateOrgGroupOwner groupAlias={this.props.rootStore.insightsStore.org.groupsAlias} group={this.group()} org={this.props.rootStore.insightsStore.org} onSubmit={() => {
          this.setState({createOrgGroupOwner: false})
          this.updateData()
        }} />
      </div>
    )
  }

  onDelete () {
    actions.insights.deleteOrgGroup(this.props.rootStore.insightsStore.org.id, this.group().id)
      .then(() => {
        this.props.rootStore.insightsStore.updateData()
        this.props.history.push('/insights/groups')
      })
  }

  confirmDelete () {
    return (
      <div className='si-group-settings' style={{textAlign: 'center'}}>
        <h2>Are you sure you want to delete {this.group().name}?</h2>
        <p>This action cannot be undone</p>
        <div className='control-row'>
          <div className='si-button'>
            <p onClick={() => this.setState({deleteConfirm: false})}>👈 Go back</p>
          </div>
          <div className='si-button red'>
            <p onClick={() => this.onDelete()}>Delete group</p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.createOrgGroupOwner) return this.renderCreateOrgGroupOwner()
    if (this.state.deleteConfirm) return this.confirmDelete()
    return this.renderGroupSettings()
  }
}

export default withRouter(GroupSettings)
