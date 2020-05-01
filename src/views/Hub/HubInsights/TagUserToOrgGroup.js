import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Table from '../../Insights/components/Table'
import SkSelect from '../../components/SkSelect'

class TagUserToOrgGroup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      query: '',
      loading: false,
      users: null,
      group: null
    }
  }

  getAccounts (queryString) {
    console.log(this.props)
    this.setState({loading: true})
    actions.auth.getUsers(queryString).then(users => {
      users.forEach(u => {
        u.isOwner = false
        if (this.props.groupOwners.map(o => o.user_id).includes(u.id)) {
          u.isOwner = true
        }
      })
      this.setState({users, loading: false})
    }).catch(() => false)
  }

  onSearch () {
    this.getAccounts('email=' + this.state.query)
  }

  tagOwner (user) {
    if (this.state.group === null) {
      this.setState({error: 'Group is required'})
    } else {
      actions.insights.createOrgGroupOwner(this.props.org.id, this.state.group.id, user.id)
        .then(() => {
          this.props.onSubmit && this.props.onSubmit()
        })
        .catch(() => {
          this.setState({error: 'Error tagging user to org. Try again later.'})
        })
    }
  }

  renderTagButton (user) {
    if (user.isOwner) {
      return (
        <p style={{color: 'green'}}>Already an org group owner</p>
      )
    } else {
      if (this.state.group) {
        return (
          <div onClick={() => this.tagOwner(user)} className='hub-insights-form-button'>
            <p>Make owner</p>
          </div>
        )
      } else {
        return (
          <div className='disabled'>
            <p>Select a group first</p>
          </div>
        )
      }
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container' style={{padding: '0 1rem'}}>
        <h1 style={{margin: 0}}>Make User an Org Group Owner</h1>
        <h3 style={{margin: 0}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <input className='hub-insights-form-input' placeholder='Search for a user by email address' onChange={(e) => this.setState({query: e.target.value})} />
          <div className='hub-insights-form-save'>
            <p onClick={() => this.onSearch()}>Search</p>
          </div>
        </div>
        <div className='hub-insights-form-row'>
          <SkSelect selection={this.state.group ? this.state.group.name : 'Select a group for this user to own'} optionsMap={() => this.props.org.groups.map(g => {
            return (
              <div className='hub-insights-autocomplete-option' key={g.id} onClick={() => this.setState({group: g})}>{g.name}</div>
            )
          })} />
        </div>
        {this.state.loading &&
          <SkLoader />
        }
        <div className='hub-insights-form-row'>
          {this.state.users && !this.state.loading &&
            <Table headers={['Email address', 'Tag']} data={this.state.users.map(u => [u.email, this.renderTagButton(u)])} />
          }
        </div>
      </div>
    )
  }
}

TagUserToOrgGroup.propTypes = {
  org: PropTypes.object,
  onSubmit: PropTypes.func,
  groupOwners: PropTypes.array
}

export default TagUserToOrgGroup
