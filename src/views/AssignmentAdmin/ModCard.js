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
  getRows () {
    const {mods} = this.props
    return mods.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {id, mod_type: modType, is_private: isPrivate, is_auto_update: isAutoUpdate, mod_created_at: createdAt, actions} = item
    const {timeZone} = this.props

    const row = {
      id: id || '',
      modType: <div onClick={() => { this.onModSelect(item) }}>{modType}</div>,
      approvals: <div onClick={() => { this.onModSelect(item) }}>{actions.filter(item => item.is_accepted).length}</div>,
      dismissals: <div onClick={() => { this.onModSelect(item) }}>{actions.filter(item => !item.is_accepted && item.is_accepted !== null).length}</div>,
      isPrivate: <div onClick={() => { this.onModSelect(item) }}>{isPrivate ? 'True' : 'False'}</div>,
      isAutoUpdate: <div onClick={() => { this.onModSelect(item) }}>{isAutoUpdate ? 'True' : 'False'}</div>,
      createdAt: <div onClick={() => { this.onModSelect(item) }}>{convertUTCDatetimeToDateTimeString(createdAt, timeZone)}</div>
    }

    return row
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
  timeZone: PropTypes.string.isRequired
}

export default ModCard
