import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import Modal from '../../../components/Modal'
import AccountInfoForm from './AccountInfoForm'
import actions from '../../../actions'
import ClassList from '../../components/ClassList'
import Grid from '../../../components/Grid'
import DeleteDialog from '../../../components/Grid/DeleteDialog'

const headers = [
  {
    field: 'context',
    display: 'Context'
  },
  {
    field: 'note',
    display: 'Note'
  },
  {
    field: 'isComplete',
    display: 'Complete?'
  },
  {
    field: 'reportedBy',
    display: 'Reported By'
  }
]

class AccountInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
    const {state} = this.props.location
    if (state && state.user) {
      this.getUser(state.user)
    }
    if (this.state.user && this.state.user.student) {
      actions.classes.getStudentClassesById(this.state.user.student.id).then(classes => {
        this.setState({classes: classes})
      }).catch(() => false)
    }
  }

  initializeState () {
    const {state} = this.props.location
    return {
      classes: [],
      openAccountForm: false,
      user: (state && state.user) || null
    }
  }

  getUser (user) {
    actions.auth.getUserById(user).then(user => {
      this.setState({user})
    }).catch(() => false)
  }

  toggleDeleteDialog () {
    this.setState({openDeleteDialog: !this.state.openDeleteDialog})
  }

  renderDeleteDialog () {
    return (
      <DeleteDialog
        open={this.state.openDeleteDialog}
        onClose={this.toggleDeleteDialog.bind(this)}
        onDelete={this.onDeleteUser.bind(this)}
        deleteMessage={'Are you sure you want to delete this user? WARNING: This action is irreversible. All data will be lost and irretrievable.'}
      />
    )
  }

  onDeleteUser () {
    actions.users.deleteUserById(this.state.user).then(_resp => {
      browserHistory.push({
        pathname: '/hub/accounts',
        state: {
          needsChange: true
        }
      })
    }).catch(() => false)
  }

  toggleactive () {
    const {user} = this.state
    const form = {
      is_active: !user.is_active,
      id: user.id
    }
    actions.auth.updateAccount(form).then(user => {
      this.setState({user})
    })
  }

  getUserRoles () {
    const {user} = this.state
    let roles = (user.roles && user.roles.map(role => role.name)) || []
    if (user.student && roles.findIndex(r => r.toLowerCase() === 'student') === -1) {
      roles.push('Student')
    }
    return roles.join(', ')
  }

  renderAccountDetails () {
    const {user} = this.state

    return (
      <div className='cn-shadow-box cn-accounts-min-width'>
        {this.renderDeleteDialog()}
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title edit-header'>
            Account Details
            <i className={'fa fa-hand-paper-o cursor margin-left ' + (user.is_active ? 'cn-grey' : 'cn-red')} onClick={() => this.toggleactive()} />
            <i className='fas fa-pencil-alt cn-blue cursor margin-left' onClick={this.toggleAccountForm.bind(this)} />
            <i className='cursor margin-left fas fa-trash-alt cn-red' onClick={() => this.toggleDeleteDialog()} />
          </div>
          {user
            ? <table className='margin-top roles-table'>
              <tbody>
                <tr>
                  <th className='cn-flex-table-cell'>Email:</th>
                  <td className='cn-flex-table-cell'>{user.email}</td>
                </tr>
                <tr>
                  <th className='cn-flex-table-cell'>Roles:</th>
                  <td className='cn-flex-table-cell'>{this.getUserRoles()}</td>
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
            </table> : <a onClick={this.toggleAccountForm.bind(this)}>Add details</a>
          }
        </div>
      </div>
    )
  }

  renderAccountFormModal () {
    return (
      <Modal
        open={this.state.openAccountForm}
        onClose={this.toggleAccountForm.bind(this)}
      >
        <AccountInfoForm user={this.state.user} onSubmit={this.onDetailsSumbit.bind(this)} onClose={this.toggleAccountForm.bind(this)} />
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

  onClassSelect (cl) {
    browserHistory.push({
      pathname: `/class/${cl.id}/admin`
    })
  }

  getRows () {
    return this.state.user.reports.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {context, note, is_complete: isComplete, reported_by: reportedBy, id} = item

    const row = {
      id: id,
      context: context || '',
      note: note || '',
      isComplete: isComplete ? 'True' : 'False',
      reportedBy: reportedBy.email
    }

    return row
  }

  onSelectReport (report) {
    actions.reports.resolveReport(report.id).then(() => {
      this.getUser(this.state.user)
    }).catch(() => false)
  }

  renderReports () {
    return (
      <div className='cn-shadow-box cn-accounts-min-width'>
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title margin-bottom'>
            Reports
          </div>
          {this.state.user.reports && <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            className="striped"
            canSelect={true}
            onSelect={this.onSelectReport.bind(this)}
          />}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        <h2 className='center-text'>Account Info</h2>
        <div id='cn-account-info'>
          {this.renderAccountDetails()}
          {this.state.user && this.state.user.student &&
            <div className='cn-shadow-box full-width margin-left margin-right'>
              <div className='cn-shadow-box-content'>
                <div className='cn-card-title margin-bottom'>
                  Classes
                </div>
                <ClassList
                  classes={this.state.classes}
                  onDelete={null}
                  onSelect={this.onClassSelect.bind(this)}
                  deleteMessage=""
                  emptyMessage="This student has no classes."
                  onUpdate={null}
                />
              </div>
            </div>
          }
          {this.renderReports()}
        </div>
        {this.renderAccountFormModal()}
      </div>
    )
  }
}

AccountInfo.propTypes = {
  location: PropTypes.object
}

export default AccountInfo
