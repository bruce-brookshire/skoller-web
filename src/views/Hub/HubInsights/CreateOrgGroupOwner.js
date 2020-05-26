import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import SkSelect from '../../components/SkSelect'

class CreateOrgGroupOwner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      group: null
    }
  }

  onSubmit () {
    if (this.state.email === '') {
      this.setState({error: 'Email is required'})
    } else if (this.state.password === '') {
      this.setState({error: 'Password is required'})
    } else if (this.state.group === null) {
      this.setState({error: 'Group is required'})
    } else {
      let form = {
        email: this.state.email,
        password: this.state.password
      }
      actions.auth.registerUserAdmin(form)
        .then((user) => {
          actions.insights.createOrgMember(this.props.org.id, user.id).then(member => {
            actions.insights.createOrgGroupOwner(this.props.org.id, this.state.group.id, member.id)
              .then(() => {
                this.props.onSubmit && this.props.onSubmit()
              })
              .catch(() => {
                this.setState({error: 'Error tagging user to org. Try again later.'})
              })
          })
        })
        .catch(() => {
          this.setState({error: 'Error creating user. Try again later.'})
        })
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container'>
        <h1 style={{margin: '0'}}>Create Org Group Owner</h1>
        <h3 style={{margin: '0'}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Email</div>
          <input className='hub-insights-form-input' type='email' onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Password</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({password: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <SkSelect selection={this.state.group ? this.state.group.name : 'Select a group for this user to own'} optionsMap={() => this.props.org.groups.map(g => {
            return (
              <div className='hub-insights-autocomplete-option' key={g.id} onClick={() => this.setState({group: g})}>{g.name}</div>
            )
          })} />
        </div>
        {this.state.error &&
          <div className='hub-insights-form-error'>{this.state.error}</div>
        }

        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-save' onClick={() => this.onSubmit()}>
            <p>Submit</p>
          </div>
        </div>
      </div>
    )
  }
}

CreateOrgGroupOwner.propTypes = {
  onSubmit: PropTypes.func,
  org: PropTypes.object
}

export default CreateOrgGroupOwner
