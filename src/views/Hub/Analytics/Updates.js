import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Grid from '../../../components/Grid/index'
import {roundToTwo} from '../../../utilities/display'

const headers = [
  {
    field: 'type',
    display: 'Type'
  },
  {
    field: 'manualChanges',
    display: 'Manual Changes'
  },
  {
    field: 'private',
    display: 'Private'
  },
  {
    field: 'copies',
    display: 'Shared (Copies)'
  },
  {
    field: 'dismisses',
    display: 'Shared (Dismisses)'
  },
  {
    field: 'autoCopies',
    display: 'Shared (Auto Copy)'
  }
]

@inject('rootStore') @observer
class Updates extends React.Component {
  getRows () {
    return this.props.data.mod.map((item, index) =>
      this.mapRow(item, index)
    ).concat(this.addTotals())
  }

  addTotals () {
    const {mod} = this.props.data

    const row = [{
      type: 'Totals',
      manualChanges: mod.reduce((reducer, item) => reducer + item.count, 0),
      private: mod.reduce((reducer, item) => reducer + item.count_private, 0),
      copies: mod.reduce((reducer, item) => reducer + item.manual_copies, 0),
      dismisses: mod.reduce((reducer, item) => reducer + item.manual_dismiss, 0),
      autoCopies: 'N/A'
    }]

    return row
  }

  mapRow (item, index) {
    const { type, manual_dismiss: manualDismiss, manual_copies: manualCopies, count_private: countPrivate,
      count, auto_updates: autoUpdates, percent_mods: percentMods } = item

    const manualTotal = (manualCopies + manualDismiss === 0) ? 1 : manualCopies + manualDismiss

    const row = {
      type: type || '',
      manualChanges: <div>{count}<br />{`(${roundToTwo(percentMods)}% of total mods)`}</div>,
      private: countPrivate || 0,
      copies: <div>{manualCopies}<br />{`(${roundToTwo(manualCopies / manualTotal * 100)}%)`}</div>,
      dismisses: <div>{manualDismiss}<br />{`(${roundToTwo(manualDismiss / manualTotal * 100)}%)`}</div>,
      autoCopies: <div>{count === 0 ? 0 : roundToTwo(autoUpdates / count * 100)}% reached threshold</div>
    }

    return row
  }

  render () {
    return (
      <div>
        <Grid
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          className="striped"
        />
      </div>
    )
  }
}

Updates.propTypes = {
  data: PropTypes.object.isRequired
}

export default Updates
