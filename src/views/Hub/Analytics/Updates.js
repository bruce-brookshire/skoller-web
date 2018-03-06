import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import Grid from '../../../components/Grid/index'

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
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  componentWillMount () {
  }

  componentWillUnmount () {
  }

  /*
  * Initialize state
  */
  initializeState () {
    return {
      loading: false,
    }
  }

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  getRows() {
    return this.props.data.mod.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const { type, manual_dismiss, manual_copies, count_private,
      count, auto_updates, percent_mods } = item

    const manual_total = (manual_copies + manual_dismiss == 0) ? 1 : manual_copies + manual_dismiss

    const row = {
      type: type || '',
      manualChanges: <div>{count}<br />{`(${percent_mods}% of total mods)`}</div>,
      private: count_private || 0,
      copies: <div>{manual_copies}<br />{`(${manual_copies / manual_total * 100}%)`}</div>,
      dismisses: <div>{manual_dismiss}<br />{`(${manual_dismiss / manual_total * 100}%)`}</div>,
      autoCopies: <div>{count == 0 ? 0 : auto_updates / count * 100}% reached threshold</div> 
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
        />
      </div>
    )
  }
}

Updates.propTypes = {
  data: PropTypes.object.isRequired
}

export default Updates
