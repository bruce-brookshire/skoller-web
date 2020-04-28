import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import Table from '../../../views/Insights/components/Table'

class TagUserToOrg extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      query: '',
      loading: false,
      users: null
    }
  }

  componentWillUnmount () {
    // this.props.onSubmit && this.props.onSubmit()
  }

  getAccounts (queryString) {
    console.log(this.props)
    this.setState({loading: true})
    actions.auth.getUsers(queryString).then(users => {
      users.forEach(u => {
        u.isOwner = false
        if (this.props.org.owners.map(o => o.user_id).includes(u.id)) {
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
    actions.insights.createOrgOwner(this.props.org.id, {user_id: user.id})
      .then(() => {
        this.props.onSubmit && this.props.onSubmit()
        this.getAccounts(this.state.query)
      })
  }

  removeOwner (user) {
    actions.insights.deleteOrgOwner(this.props.org.id, {user_id: user.id})
      .then(() => {
        this.props.onSubmit && this.props.onSubmit()
        this.getAccounts(this.state.query)
      })
  }

  renderTagButton (user) {
    if (user.isOwner) {
      return (
        <div onClick={() => this.removeOwner(user)} className='hub-insights-form-button'>
          <p style={{backgroundColor: 'red'}}>Remove owner</p>
        </div>
      )
    } else {
      return (
        <div onClick={() => this.tagOwner(user)} className='hub-insights-form-button'>
          <p>Make owner</p>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container' style={{padding: '0 1rem'}}>
        <h1 style={{margin: 0}}>Tag Users as Org Owners</h1>
        <h3 style={{margin: 0}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <input className='hub-insights-form-input' placeholder='Email address' onChange={(e) => this.setState({query: e.target.value})} />
          <div className='hub-insights-form-save'>
            <p onClick={() => this.onSearch()}>Search</p>
          </div>
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

TagUserToOrg.propTypes = {
  org: PropTypes.object,
  onSubmit: PropTypes.func
}

export default TagUserToOrg
