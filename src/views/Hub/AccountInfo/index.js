import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../../../components/FlexTable'
import Modal from '../../../components/Modal'
import AccountInfoForm from './AccountInfoForm'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class AccountInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.intializeState()
  }

  componentWillMount () {
    const {state} = this.props.location
    if (state && state.user) {
      actions.auth.getUserById(state.user).then(user => {
        this.setState({user})
      }).catch(() => false)
    }
  }

  intializeState () {
    const {state} = this.props.location
    return {
      openAccountForm: false,
      user: (state && state.user) || null
    }
  }

  onEditActiveSemester () {

  }

  renderAccountDetails () {
    const {user} = this.state

    return (
      <div>
        <div className='edit-header'>
          <h3>1. Account Details</h3>
          <a onClick={this.toggleAccountForm.bind(this)}>Edit</a>
        </div>
        {user ?
          <table className='roles-table'>
            <tbody>
              <tr>
                <th className='cn-flex-table-cell'>Email:</th>
                <td className='cn-flex-table-cell'>{user.email}</td>
              </tr>
              <tr>
                <th className='cn-flex-table-cell'>Roles:</th>
                <td className='cn-flex-table-cell'>{user.roles && user.roles.map(role => role.name).join(', ')}</td>
              </tr>
              {user.student &&
                <tr>
                  <th className='cn-flex-table-cell'>First name:</th>
                  <td className='cn-flex-table-cell'>{user.student.name_first}</td>
                </tr>
              }
              {user.student &&
                <tr>
                  <th className='cn-flex-table-cell'>Last name:</th>
                  <td className='cn-flex-table-cell'>{user.student.name_last}</td>
                </tr>
              }
              {user.student &&
                <tr>
                  <th className='cn-flex-table-cell'>Phone:</th>
                  <td className='cn-flex-table-cell'>{user.student.phone}</td>
                </tr>
              }
            </tbody>
          </table> : <a onClick={this.toggleRolesForm.bind(this)}>Add details</a>
        }
      </div>
    )
  }

  renderAccountFormModal () {
    return (
      <Modal
        open={this.state.openAccountForm}
        onClose={this.toggleAccountForm.bind(this)}
      >
        <AccountInfoForm user={this.state.user} onSubmit={this} onClose={this.toggleAccountForm.bind(this)} />
      </Modal>
    )
  }

  /*
  * Call back on school detail form submission.
  */
  onDetailsSumbit (user) {
    this.setState({ user, openAccountForm: false })
  }

  toggleAccountForm () {
    this.setState({openAccountForm: !this.state.openAccountForm})
  }

  render () {
    return (
      <div className='cn-school-info'>
        <h2 className='center-text'>Account Info</h2>
        <div className='row'>
          <div className='col-xs-12 col-md-6 margin-top'>
            {this.renderAccountDetails()}
          </div>
        </div>
        {this.renderAccountFormModal()}
      </div>
    )
  }
}

export default AccountInfo
