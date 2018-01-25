import React from 'react'
import {browserHistory} from 'react-router'
import AccountSearch from './AccountSearch'
import Grid from '../../../components/Grid'
import actions from '../../../actions'

const headers = [
  {
    field: 'type',
    display: 'Type'
  },
  {
    field: 'firstName',
    display: 'First Name'
  },
  {
    field: 'lastName',
    display: 'Last Name'
  },
  {
    field: 'school',
    display: 'School'
  },
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'status',
    display: 'Status'
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
    const {id, email, is_active, roles, student} = item

    const row = {
      id: id || '',
      type: roles[0] ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{roles[0].name}</span></div>) : (<div><span>-</span></div>),
      firstName: student ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.name_first}</span></div>) : (<div><span>-</span></div>),
      lastName: student ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.name_last}</span></div>) : (<div><span>-</span></div>),
      school: student && student.school ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.school.name}</span></div>) : (<div><span>-</span></div>),
      email: email ? <div onClick={() => { this.onAccountSelect(item) }}><span>{email}</span></div> : '',
      status: is_active ? (<a onClick={() => { this.onAccountSelect(item) }}>Active</a>) : (<a className='cn-red'>Suspended</a>),
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
            <span className='total-results'>Total Results: {this.state.users.length}</span>
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
