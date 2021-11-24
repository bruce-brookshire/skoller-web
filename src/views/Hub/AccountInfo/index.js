import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Modal from '../../../components/Modal'
import AccountInfoForm from './AccountInfoForm'
import actions from '../../../actions'
import ClassList from '../../components/ClassList'
import Grid from '../../../components/Grid'
import DeleteDialog from '../../../components/Grid/DeleteDialog'
import SkLoader from '../../../assets/sk-icons/SkLoader'

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
    const {state} = this.props.location
    console.log(this.props.location)
    console.log('state.user', state.user)

    this.state = {
      classes: [],
      openAccountForm: false,
      openLifeTimeTrialForm: false,
      lifeTimeTrial: 'true',
      user: (state && state.user) || null,
      loading: true
    }

    if (state && state.user) {
      this.getUser(state.user)
      this.setState({
        lifeTimeTrial: state.user.lifetime_subscription
      })
    }

    if (this.state.user && this.state.user.student) {
      actions.classes.getStudentClassesById(this.state.user.student.id).then(classes => {
        this.setState({classes: classes, loading: false})
      }).catch((e) => console.log(e))
    }
  }

  // componentWillMount () {
  //   const {state} = this.props.location
  //   if (state && state.user) {
  //     this.getUser(state.user)
  //   }
  //   if (this.state.user && this.state.user.student) {
  //     actions.classes.getStudentClassesById(this.state.user.student.id).then(classes => {
  //       this.setState({classes: classes})
  //     }).catch(() => false)
  //   }
  // }

  initializeState () {
    const {state} = this.props.location
    return {
      classes: [],
      openAccountForm: false,
      openLifeTimeTrialForm: false,
      user: (state && state.user) || null
    }
  }

  getUser (user) {
    actions.auth.getUserById(user).then(user => {
      console.log('my user', user)
      this.setState({user, loading: false})
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
      this.props.history.push({
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

  toggleLifeTimeTrialModal () {
    this.setState({
      lifeTimeTrial: this.state.user.lifetime_trial,
      openLifeTimeTrialForm: !this.state.openLifeTimeTrialForm
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
      <div className='cn-account-info-box cn-accounts-min-width cn-account-info-details'>
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
                {user.student &&
                  <tr>
                    <th className='cn-flex-table-cell'>Primary School:</th>
                    <td className='cn-flex-table-cell'>{user.student.primary_school ? user.student.primary_school.name : ''}</td>
                  </tr>
                }
                {user.student &&
                  <tr>
                    <th className='cn-flex-table-cell'>User path:</th>
                    <td className='cn-flex-table-cell'>{this.state.user.lifetime_trial ? 'Premium - VIP' : 'Standard' }</td>
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

  renderLifeTimeTrialFormModal () {
    return (
      <Modal
        open={this.state.openLifeTimeTrialForm}
        onClose={this.toggleLifeTimeTrialModal.bind(this)}
      >
        {/* <AccountInfoForm user={this.state.user} onSubmit={this.onDetailsSumbit.bind(this)} onClose={this.toggleAccountForm.bind(this)} /> */}
        <div>
          <h3> User path </h3>
          <label htmlFor="lifetimeselection">User path</label>
          <br />
          <select
            style={{
              width: '100%',
              minWidth: '15ch',
              maxWidth: '30ch',
              border: '1px solid #333',
              borderRadius: '0.25em',
              padding: '0.25em 0.5em',
              fontSize: '1.25rem',
              cursor: 'pointer',
              lineHeight: 1.1,
              backgroundColor: '#fff',
              backgroundImage: 'linear-gradient(to top, #f9f9f9, #fff 33%)'
            }}
            name="onoff" id="lifetimeselection" defaultValue={this.state.lifeTimeTrial} onChange={e => {
              this.setState({lifeTimeTrial: e.target.value})
            }}>
            <option value={true}>Premium - VIP</option>
            <option value={false}>Standard</option>
          </select>
          {/* <input type="radio" htmlFor='life-time-trial' checked={this.state.lifeTimeTrial} value={this.state.lifeTimeTrial} onChange={() => {
            this.setState({lifeTimeTrial: !this.state.lifeTimeTrial})
          }}/> */}

          <button className='button full-width margin-top' onClick={this.handleLifeTimeTrialSubmit.bind(this)}>Submit</button>
          <button className='button-invert full-width margin-top margin-bottom' onClick={this.toggleLifeTimeTrialModal.bind(this)}>Close</button>
        </div>
      </Modal>
    )
  }

  /*
  * Call back on school detail form submission.
  */
  handleLifeTimeTrialSubmit () {
    if (this.state.lifeTimeTrial === 'true') {
      actions.auth.setUserTrialToLifeTime(this.state.user).then(user => {
        this.setState({openLifeTimeTrialForm: false, loading: false})
        // window.location.reload(false)
        actions.auth.getUserById(this.state.user).then(user => {
          this.setState({user})
        })
      }).catch(() => false)
    } else {
      actions.auth.cancelUserTrial(this.state.user).then(user => {
        this.setState({openLifeTimeTrialForm: false, loading: false})
        // window.location.reload(false)
        actions.auth.getUserById(this.state.user).then(user => {
          this.setState({user})
        })
      }).catch(() => false)
    }
  }
  onDetailsSumbit (user) {
    this.setState({ user, openAccountForm: false })
  }

  toggleAccountForm () {
    this.setState({openAccountForm: !this.state.openAccountForm})
  }

  onClassSelect (cl) {
    this.props.history.push({
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
      <div className='cn-account-info-box cn-accounts-min-width'>
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

  renderUserMemberShip () {
    const {user} = this.state
    return (
      <div className="cn-account-info-box cn-accounts-min-width">
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title edit-header'>
           User Path
            <i className='fas fa-pencil-alt cn-blue cursor margin-left' onClick={this.toggleLifeTimeTrialModal.bind(this)} />
          </div>
          <br />
          <br />
          {
            user.student &&
                  <tr>
                    <th className='cn-flex-table-cell'>User path:</th>
                    <td className='cn-flex-table-cell'>{this.state.user.lifetime_trial ? 'Standard' : 'Premium - VIP'}</td>
                  </tr>
          }
          {/* {this.state.user.reports && <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            className="striped"
            canSelect={true}
            onSelect={this.onSelectReport.bind(this)}
          />} */}
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        <h2 className='center-text'>Account Info</h2>
        <div id='cn-account-info'>
          {this.renderAccountDetails()}
          {this.state.user && this.state.user.student &&
            <div className='cn-account-info-box cn-account-info-classes'>
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
          {this.renderUserMemberShip()}

        </div>
        {this.renderAccountFormModal()}

        {this.renderLifeTimeTrialFormModal()}
      </div>
    )
  }

  render () {
    return (
      this.state.loading
        ? <SkLoader />
        : this.renderContent()
    )
  }
}

AccountInfo.propTypes = {
  location: PropTypes.object
}

export default withRouter(AccountInfo)
