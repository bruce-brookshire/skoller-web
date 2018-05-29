import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../utilities/time'

const headers = [
  {
    field: 'modType',
    display: 'Type'
  },
  {
    field: 'changes',
    display: 'Changes'
  },
  {
    field: 'approvals',
    display: 'Approvals'
  },
  {
    field: 'dismissals',
    display: 'Dismissals'
  },
  {
    field: 'isPrivate',
    display: 'Private'
  },
  {
    field: 'isAutoUpdate',
    display: 'Auto Updated?'
  },
  {
    field: 'createdAt',
    display: 'Created'
  }
]

class ModCard extends React.Component {
  getWeight (id) {
    const {weights} = this.props

    return weights.find(item => item.id === id).name
  }

  getRows () {
    const {mods} = this.props
    return mods.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {id, mod_type: modType, data, is_private: isPrivate, is_auto_update: isAutoUpdate, mod_created_at: createdAt, actions} = item
    const {timeZone} = this.props

    const row = {
      id: id || '',
      modType: <div onClick={() => { this.props.onSelect(item) }}>{modType}</div>,
      changes: <div onClick={() => { this.props.onSelect(item) }}>{this.renderChanges(data)}</div>,
      approvals: <div onClick={() => { this.props.onSelect(item) }}>{actions.filter(item => item.is_accepted).length}</div>,
      dismissals: <div onClick={() => { this.props.onSelect(item) }}>{actions.filter(item => !item.is_accepted && item.is_accepted !== null).length}</div>,
      isPrivate: <div onClick={() => { this.props.onSelect(item) }}>{isPrivate ? 'True' : 'False'}</div>,
      isAutoUpdate: <div onClick={() => { this.props.onSelect(item) }}>{isAutoUpdate ? 'True' : 'False'}</div>,
      createdAt: <div onClick={() => { this.props.onSelect(item) }}>{convertUTCDatetimeToDateTimeString(createdAt, timeZone)}</div>
    }

    return row
  }

  renderChanges (item) {
    let changes = {}
    let newItem = item.assignment ? item.assignment : item
    const {timeZone} = this.props

    if (newItem.name) {
      changes.name = newItem.name
    }

    if (newItem.weight_id) {
      changes.weight = this.getWeight(newItem.weight_id)
    }

    if (newItem.due) {
      changes.due = convertUTCDatetimeToDateTimeString(newItem.due, timeZone)
    }

    return (
      <div>
        {changes.name && <div>Name: {changes.name}</div>}
        {changes.weight && <div>Weight: {changes.weight}</div>}
        {changes.due && <div>Due: {changes.due}</div>}
      </div>
    )
  }

  renderMods () {
    return (
      <Grid
        emptyMessage={'No mods'}
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={false}
        className='striped'
      />
    )
  }

  render () {
    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title'>
            Mods
          </div>
          {this.renderMods()}
        </div>
      </div>
    )
  }
}

ModCard.propTypes = {
  mods: PropTypes.array.isRequired,
  timeZone: PropTypes.string.isRequired,
  weights: PropTypes.array,
  onSelect: PropTypes.func
}

export default ModCard
