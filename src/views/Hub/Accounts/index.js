import React from 'react'
import {browserHistory} from 'react-router'
import AccountSearch from './AccountSearch'
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
      loading: false,
      users: []
    }
  }

  /*
  * Get users
  */
  getAccounts(queryString){
    this.setState({loading: true})
    actions.auth.getUsers(queryString).then(users => {
      this.setState({users, loading: false})
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
      isActive: <a>Active</a>
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
          <h2 className='center-text' style={{marginBottom: 0}}>Search Accounts</h2>
          <AccountSearch {...this.props} loading={this.state.loading} onSearch={this.getAccounts.bind(this)}/>
          <div>
            <a onClick={this.onCreateAccount.bind(this)}>Create new account</a>
            <span className='description'>Manage user account details from this page</span>
          </div>
        </div>
        <Grid
          className='cn-accounts-table'
          emptyMessage={'Search for accounts using the controls above.'}
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
