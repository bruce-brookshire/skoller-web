import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { convertLocalDateToUTC } from '../../../utilities/time'

class CreateOrg extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      signUpLink: '',
      linkStartDate: '',
      linkEndDate: '',
      error: null
    }
  }

  mapForm () {
    let form = {}
    form.start = convertLocalDateToUTC(this.state.linkStartDate, 'America/Chicago')
    form.end = convertLocalDateToUTC(this.state.linkEndDate, 'America/Chicago')
    form.name = this.state.name + ' org sign up link'
    form.link = this.state.signUpLink
    return form
  }

  onSubmit () {
    if (this.state.name === '') {
      this.setState({error: 'Org name is required'})
    } else if (this.state.signUpLink === '') {
      this.setState({error: 'Signup link ending is required'})
    } else if (this.state.linkStartDate === '') {
      this.setState({error: 'Link start date is required'})
    } else if (this.state.linkEndDate === '') {
      this.setState({error: 'Link end date is required'})
    } else {
      let newForm = this.mapForm()
      actions.signupLinks.createCustomLink(newForm)
        .then((link) => {
          actions.insights.createOrg({name: this.state.name, custom_signup_link_id: link.id})
            .then(() => {
              this.props.onSubmit && this.props.onSubmit()
            })
            .catch(() => this.setState({error: 'Error creating org. Try again later.'}))
        })
        .catch(() => this.setState({error: 'Error creating org link. Try again later.'}))
    }
  }

  render () {
    return (
      <div className='hub-insights-form-container'>
        <h1 style={{margin: '0'}}>Create Org</h1>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Org Name</div>
          <input className='hub-insights-form-input' onChange={(e) => this.setState({name: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Signup Link Ending</div>
          <input className='hub-insights-form-input' placeholder='e.g. skolleruniversityathletics' onChange={(e) => this.setState({signUpLink: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Link Start Date</div>
          <input className='hub-insights-form-input' type='date' onChange={(e) => this.setState({linkStartDate: e.target.value})} />
        </div>
        <div className='hub-insights-form-row'>
          <div className='hub-insights-form-label'>Link End Date</div>
          <input className='hub-insights-form-input' type='date' onChange={(e) => this.setState({linkEndDate: e.target.value})} />
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

CreateOrg.propTypes = {
  org: PropTypes.object,
  onSubmit: PropTypes.func
}

export default CreateOrg
