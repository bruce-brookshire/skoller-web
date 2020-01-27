import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../components/Grid'
import { withRouter } from 'react-router-dom'

const headers = [
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'isManual',
    display: 'Manual?'
  },
  {
    field: 'isAccepted',
    display: 'Accepted?'
  }
]

class ModDetail extends React.Component {
  onSelect (item) {
    this.props.history.push({pathname: '/hub/accounts/account/info', state: {user: item.user}})
  }

  mapAction (item, index) {
    const {id, user, is_manual: isManual, is_accepted: isAccepted} = item
    const {email} = user

    const row = {
      id: id || '',
      email: <div onClick={() => { this.onSelect(item) }}>{email}</div>,
      isManual: <div onClick={() => { this.onSelect(item) }}>{isManual ? 'True' : 'False'}</div>,
      isAccepted: <div onClick={() => { this.onSelect(item) }}>{isAccepted ? 'True' : 'False'}</div>
    }

    return row
  }

  getRows () {
    const {mod} = this.props
    return mod.actions.map((item, index) =>
      this.mapAction(item, index)
    )
  }

  renderActions () {
    return (
      <Grid
        emptyMessage={'No actions'}
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
      <div>
        <h2>Mod Detail</h2>
        {this.renderActions()}
      </div>
    )
  }
}

ModDetail.propTypes = {
  mod: PropTypes.object.isRequired
}

export default withRouter(ModDetail)
