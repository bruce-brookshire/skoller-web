import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { toTitleCase } from '../../Insights/utils'

class CreateOrgGroup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onSubmit () {
    if (this.checkGroupName()) {
      this.setState({error: 'This group already exists'})
    } else if (this.state.name === '') {
      this.setState({error: 'Group name is required'})
    } else {
      let form = {
        name: this.state.name
      }
      actions.insights.createOrgGroup(this.props.org.id, form)
        .then(() => {
          this.props.onSubmit && this.props.onSubmit()
        })
    }
  }

  checkGroupName () {
    const groupNames = this.props.org.groups.map(g => g.name)
    if (groupNames.includes(this.state.name)) {
      return true
    } else {
      return false
    }
  }

  updateName (e) {
    this.setState({name: e.target.value})
  }

  render () {
    return (
      <div className='hub-insights-form-container'>
        <h1 style={{margin: '0'}}>Create New {this.props.alias ? toTitleCase(this.props.alias) : 'Org Group'}</h1>
        <h3 style={{margin: '0'}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Name</div>
          <input className='hub-insights-form-input' onChange={(e) => this.updateName(e)} />
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

CreateOrgGroup.propTypes = {
  onSubmit: PropTypes.func,
  org: PropTypes.object,
  alias: PropTypes.string
}

export default CreateOrgGroup
