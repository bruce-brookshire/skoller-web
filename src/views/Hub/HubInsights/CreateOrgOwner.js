import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { CSSTransition } from 'react-transition-group'

class CreateOrgOwner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailConfirm: ''
    }
  }

  onSubmit () {
    if (this.state.email === '') {
      this.setState({error: 'Email is required'})
    } else if (this.state.emailConfirm !== this.state.email) {
      this.setState({error: 'Fields do not match'})
    } else {
      this.setState({error: null})
      actions.insights.createInsightsUser(this.state.email).then((user) => {
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
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Confirm Email</div>
          <input className='hub-insights-form-input' type='email' onChange={(e) => this.setState({emailConfirm: e.target.value})} />
        </div>
        <CSSTransition
          key={1}
          in={this.state.email.includes('@') && this.state.email.includes('.') && this.state.email === this.state.emailConfirm}
          timeout={500}
          unmountOnExit
          classNames="fade"
        >
          <div className='hub-insights-form-row'>
            <p style={{margin: 0, width: '256px'}}>We&apos;ll send an email to {this.state.email} with a temporary password.</p>
          </div>
        </CSSTransition>
        {this.state.error && this.state.error !== 'Fields do not match' &&
          <div className='hub-insights-form-error'>{this.state.error}</div>
        }
        {this.state.error === 'Fields do not match' && this.state.email !== this.state.emailConfirm &&
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
