import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import SkSelect from '../../components/SkSelect'
import { CSSTransition } from 'react-transition-group'
import { toTitleCase } from '../../Insights/utils'

class CreateOrgGroupOwner extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      emailConfirm: '',
      group: this.props.group ? this.props.group : null
    }
  }

  onSubmit () {
    if (this.state.email === '') {
      this.setState({error: 'Email is required'})
    } else if (this.state.emailConfirm !== this.state.email) {
      this.setState({error: 'Fields do not match'})
    } else if (this.state.group === null) {
      this.setState({error: 'Group is required'})
    } else {
      actions.insights.createInsightsUser(this.state.email)
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
        <h1 style={{margin: '0'}}>Create {this.props.groupAlias ? toTitleCase(this.props.groupAlias) : 'Group'} Owner</h1>
        <h3 style={{margin: '0'}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Email</div>
          <input className='hub-insights-form-input' type='email' onChange={(e) => this.setState({email: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Confirm Email</div>
          <input className='hub-insights-form-input' type='email' onChange={(e) => this.setState({emailConfirm: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <SkSelect selection={this.state.group ? this.state.group.name : `Select a ${this.props.groupAlias ? this.props.groupAlias : 'group'} for this user to own`} optionsMap={() => this.props.org.groups.map(g => {
            return (
              <div className='hub-insights-autocomplete-option' key={g.id} onClick={() => this.setState({group: g})}>{g.name}</div>
            )
          })} />
        </div>
        {this.state.error && this.state.error !== 'Fields do not match' &&
          <div className='hub-insights-form-error'>{this.state.error}</div>
        }
        {this.state.error === 'Fields do not match' && this.state.email !== this.state.emailConfirm &&
          <div className='hub-insights-form-error'>{this.state.error}</div>
        }
        <CSSTransition
          key={1}
          in={this.state.email.includes('@') && this.state.email.includes('.') && this.state.email === this.state.emailConfirm && this.state.group}
          timeout={500}
          unmountOnExit
          classNames="fade"
        >
          <div className='hub-insights-form-row'>
            <p style={{margin: 0, width: '256px'}}>We&apos;ll send an email to {this.state.email} with a temporary password.</p>
          </div>
        </CSSTransition>
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
  org: PropTypes.object,
  groupAlias: PropTypes.string,
  group: PropTypes.object
}

export default CreateOrgGroupOwner
