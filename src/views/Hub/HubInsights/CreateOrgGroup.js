import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'

class CreateOrgGroup extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
  }

  onSubmit () {
    if (this.state.name === '') {
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

  render () {
    return (
      <div className='hub-insights-form-container'>
        <h1 style={{margin: '0'}}>Create Org Group</h1>
        <h3 style={{margin: '0'}}>{this.props.org.name}</h3>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Name</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({name: e.target.value})} />
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
  org: PropTypes.object
}

export default CreateOrgGroup
