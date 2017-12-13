import React from 'react'
import {browserHistory} from 'react-router'
import Grid from '../../../components/Grid'
import actions from '../../../actions'

const headers = [
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'isActive',
    display: 'Active'
  }
]

class Accounts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }

  /*
  * Get users
  */
  componentWillMount () {
    actions.auth.getUsers().then(users => {
      this.setState({users})
    }).catch(() => false)
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.users.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, email, is_active} = item

    const row = {
      id: id || '',
      email: email ? <div onClick={() => this.onAccountSelect(item)}><span>{email}</span></div> : '',
      isAcitve: <a>Active</a>
    }

    return row
  }

  onCreateAccount () {
    browserHistory.push('/hub/accounts/account/info')
  }

  onAccountSelect (user) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {user}})
  }

  render () {
    return (
      <div className='cn-accounts-container'>
        <div className='margin-bottom'>
          <h2 className='center-text'>Accounts</h2>
          <div>
            <a onClick={this.onCreateAccount.bind(this)}>Create new account</a>
            <span className='description'>Manage user account details from this page</span>
          </div>
        </div>
        <Grid
          className='cn-accounts-table'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={false}
        />
      </div>
    )
  }
}

export default Accounts
