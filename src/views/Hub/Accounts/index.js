import React from 'react'
import {browserHistory} from 'react-router'
import AccountSearch from './AccountSearch'
import Grid from '../../../components/Grid'
import actions from '../../../actions'
import Modal from '../../../components/Modal'
import AdminSignUpForm from './AdminSignUpForm'

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
      users: [],
      openCreateModal: false
    }
  }

  /*
  * Get users
  */
  getAccounts (queryString) {
    this.setState({loading: true})
    actions.auth.getUsers(queryString).then(users => {
      this.setState({users, loading: false})
    }).catch(() => false)
  }

  getCsv () {
    actions.users.getStudentCsv().then(csv => {
      let blob = new Blob([csv], {type: 'text/csv'}) // eslint-disable-line no-undef
      let url = window.URL.createObjectURL(blob)
      var downloadLink = document.createElement("a")
      downloadLink.href = url
      var today = new Date()
      downloadLink.download = "Users-" + today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate() + "_" + today.getHours() + "_" + today.getMinutes() + ".csv"

      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    })
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
    const {id, email, is_active: isActive, roles, student} = item

    const row = {
      id: id || '',
      type: roles[0] ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{roles[0].name}</span></div>) : (<div><span>-</span></div>),
      firstName: student ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.name_first}</span></div>) : (<div><span>-</span></div>),
      lastName: student ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.name_last}</span></div>) : (<div><span>-</span></div>),
      school: student && student.school ? (<div onClick={() => { this.onAccountSelect(item) }}><span>{student.school.name}</span></div>) : (<div><span>-</span></div>),
      email: email ? <div onClick={() => { this.onAccountSelect(item) }}><span>{email}</span></div> : '',
      status: isActive ? (<a onClick={() => { this.onAccountSelect(item) }}>Active</a>) : (<a className='cn-red'>Suspended</a>)
    }

    return row
  }

  onCreateAccount (user) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {user: user.user}})
  }

  onAccountSelect (user) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {user}})
  }

  toggleCreateModal () {
    const {openCreateModal} = this.state
    this.setState({openCreateModal: !openCreateModal})
  }

  renderCreateAccountModal () {
    return (
      <Modal
        open={this.state.openCreateModal}
        onClose={this.toggleCreateModal.bind(this)}
      >
        <AdminSignUpForm onSubmit={this.onCreateAccount.bind(this)} onClose={this.toggleCreateModal.bind(this)} />
      </Modal>
    )
  }

  render () {
    return (
      <div className='cn-accounts-container'>
        <div className='margin-bottom'>
          <h2 className='center-text'>Search Accounts</h2>
          <AccountSearch {...this.props} loading={this.state.loading} onSearch={this.getAccounts.bind(this)}/>
          <div>
            <a onClick={this.toggleCreateModal.bind(this)}>Create new account</a>
            <a className='margin-left' onClick={this.getCsv.bind(this)}>Get User CSV</a>
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
        {this.renderCreateAccountModal()}
      </div>
    )
  }
}

export default Accounts
