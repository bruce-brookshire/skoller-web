import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import {inject, observer} from 'mobx-react'
import moment from 'moment'
import ExperienceForm from './ExperienceForm'

@inject('rootStore') @observer
class VolunteerExperienceSettings extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false
    }
  }

  deleteActivity (id) {
    actions.jobs.deleteActivity(id, this.props.rootStore.studentJobsStore.profile.id)
      .then(() => {
        this.props.onSubmit(true)
      })
  }

  render () {
    let profile = this.props.rootStore.studentJobsStore.profile
    let volunteerExperiences = profile.volunteer_activities
    return (
      <div className='jobs-form-container'>
        {this.props.rootStore.studentJobsStore.profile.volunteer_activities.map(e => {
          return (
            <div key={volunteerExperiences.indexOf(e)} className='jobs-form-row'>
              <div className='jobs-form-label'>{e.name}</div>
              <div className='jobs-form-sub-label'>{moment(e.start_date).format('M/YYYY')} - {moment(e.end_date).format('M/YYYY')}</div>
              <div className='jobs-form-action-list'>
                <p
                  onClick={() => this.setState({editing: e.id})}
                >
                  Edit
                </p>
                <p
                  onClick={() => this.deleteActivity(e.id)}
                >
                  Delete
                </p>
              </div>
              {this.state.editing === e.id &&
                <div style={{border: '1px solid #4a4a4a', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,0.02)'}}>
                  <ExperienceForm editingExperience={e} isVolunteer={true} onSubmit={() => {
                    this.props.onSubmit()
                    this.setState({editing: false})
                  }} />
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}

VolunteerExperienceSettings.propTypes = {
  isVolunteer: PropTypes.bool,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func
}

export default VolunteerExperienceSettings
