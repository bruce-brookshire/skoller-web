import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Table from '../../Insights/components/Table'

class AddOrRemoveOrgStudents extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      query: '',
      loading: false,
      users: null
    }
  }

  getAccounts (queryString) {
    this.setState({loading: true})
    actions.auth.getUsers(queryString).then(users => {
      users.forEach(u => {
        u.isStudent = false
        if (this.props.org.students.map(o => o.student_id).includes(u.student.id)) {
          u.isStudent = true
        }
      })
      this.setState({users, loading: false})
    }).catch(() => false)
  }

  onSearch () {
    let {query} = this.state
    let queryString = `email=${query}&account_type=100&is_suspended=false&user_name=${query}&or=true`
    console.log(queryString)
    this.getAccounts(queryString)
  }

  tagStudent (user) {
    actions.insights.addStudentToOrg(this.props.org.id, user.student.id)
      .then(() => {
        this.props.onSubmit && this.props.onSubmit()
        this.getAccounts(this.state.query)
      })
  }

  removeStudent (user) {
    actions.insights.removeStudentFromOrg(this.props.org.id, this.props.org.students.find(o => o.student_id === user.student.id).id)
      .then(() => {
        this.props.onSubmit && this.props.onSubmit()
        this.getAccounts(this.state.query)
      })
  }

  renderTagButton (user) {
    if (user.isStudent) {
      return (
        <div onClick={() => this.removeStudent(user)} className='hub-insights-form-button'>
          <p style={{backgroundColor: 'red'}}>Remove student from org</p>
        </div>
      )
    } else {
      return (
        <div onClick={() => this.tagStudent(user)} className='hub-insights-form-button'>
          <p>Add student to org</p>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container' style={{padding: '0 1rem'}}>
        <h1 style={{margin: 0}}>Add or Remove Org Students</h1>
        <h3 style={{margin: 0}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <input className='hub-insights-form-input' placeholder='Search for a user by email address or name' onChange={(e) => this.setState({query: e.target.value})} />
          <div className='hub-insights-form-save'>
            <p onClick={() => this.onSearch()}>Search</p>
          </div>
        </div>
        {this.state.loading &&
          <SkLoader />
        }
        <div className='hub-insights-form-row'>
          {this.state.users && !this.state.loading &&
            <Table headers={['Name', 'Email address', 'Tag']} data={this.state.users.map(u => [u.student.name_first + ' ' + u.student.name_last, u.email, this.renderTagButton(u)])} />
          }
        </div>
      </div>
    )
  }
}

AddOrRemoveOrgStudents.propTypes = {
  org: PropTypes.object,
  onSubmit: PropTypes.func
}

export default AddOrRemoveOrgStudents
