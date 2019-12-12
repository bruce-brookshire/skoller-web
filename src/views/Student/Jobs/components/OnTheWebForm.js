import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../../actions'
import InputField from './InputField'

@inject('rootStore') @observer
class OnTheWebForm extends React.Component {
  constructor (props) {
    super(props)

    let links = this.props.rootStore.studentJobsStore.profile.social_links

    this.state = {
      linkedin: links ? links.linkedin : '',
      facebook: links ? links.facebook : '',
      twitter: links ? links.twitter : '',
      instagram: links ? links.instagram : '',
      github: links ? links.github : '',
      personal: links ? links.personal : ''
    }
  }

  sanitize (link) {
    link = link.replace(/http:\/\/|https:\/\/|www\./g, '')
    if (link) {
      link = 'http://' + link
    }
    return link
  }

  async onSubmit () {
    let form = {
      id: this.props.rootStore.studentJobsStore.profile.id,
      social_links: {
        linkedin: this.sanitize(this.state.linkedin),
        facebook: this.sanitize(this.state.facebook),
        twitter: this.sanitize(this.state.twitter),
        instagram: this.sanitize(this.state.instagram),
        github: this.sanitize(this.state.github),
        personal: this.sanitize(this.state.personal)
      }
    }

    console.log(form)

    actions.jobs.editJobsProfile(form)
      .then((r) => {
        console.log(r)
        this.props.onSubmit()
      })
  }

  renderContent () {
    let disabled = false
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          <p>Add links to your other online profiles so employers can get to know you better!</p>
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>LinkedIn</div>
          <InputField updateValue={(value) => this.setState({linkedin: value})} value={this.state.linkedin} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Facebook</div>
          <InputField updateValue={(value) => this.setState({facebook: value})} value={this.state.facebook} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Twitter</div>
          <InputField updateValue={(value) => this.setState({twitter: value})} value={this.state.twitter} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Instagram</div>
          <InputField updateValue={(value) => this.setState({instagram: value})} value={this.state.instagram} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Github</div>
          <InputField updateValue={(value) => this.setState({github: value})} value={this.state.github} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Personal Website</div>
          <InputField updateValue={(value) => this.setState({personal: value})} value={this.state.personal} autoFocus={true} />
        </div>
        <div className='jobs-form-row'>
          <div className={'jobs-form-save ' + (disabled ? 'disabled' : '')}>
            <p
              onClick={() =>
                disabled ? null : this.onSubmit()
              }
            >
              Save
            </p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

OnTheWebForm.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default OnTheWebForm
