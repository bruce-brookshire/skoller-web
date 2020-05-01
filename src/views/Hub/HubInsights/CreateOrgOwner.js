import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'

class CreateOrgOwner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  }

  onSubmit () {
    if (this.state.email === '') {
      this.setState({error: 'Email is required'})
    } else if (this.state.password === '') {
      this.setState({error: 'Password is required'})
    } else {
      let form = {
        email: this.state.email,
        password: this.state.password
      }
      actions.auth.registerUserAdmin(form).then((user) => {
        actions.insights.createOrgOwner(this.props.org.id, {user_id: user.id})
          .then(() => {
            this.props.onSubmit && this.props.onSubmit()
          })
          .catch(() => {
            this.setState({error: 'Error tagging user to org. Try again later.'})
          })
      }).catch(() => {
        this.setState({error: 'Error creating user. Try again later.'})
      })
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container'>
        <h1 style={{margin: '0'}}>Create Org Owner</h1>
        <h3 style={{margin: '0'}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Email</div>
          <input className='hub-insights-form-input' type='email' onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        {/* <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>First name</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({firstName: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Last name</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({lastName: e.target.value})} />
        </div> */}
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Password</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({password: e.target.value})} />
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

CreateOrgOwner.propTypes = {
  onSubmit: PropTypes.func,
  org: PropTypes.object
}

export default CreateOrgOwner
