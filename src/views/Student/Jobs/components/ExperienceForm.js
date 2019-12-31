import React from 'react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import {inject, observer} from 'mobx-react'
import moment from 'moment'

@inject('rootStore') @observer
class ExperienceForm extends React.Component {
  constructor (props) {
    super(props)

    let e = this.props.editingExperience
    if (e) {
      this.state = {
        title: e.name,
        organization: e.organization_name,
        startDate: moment(e.start_date).format('MM/YYYY'),
        endDate: moment(e.end_date).format('MM/YYYY'),
        description: '• ' + e.description.replace(/\|/g, '\n• ')
      }
    } else {
      this.state = {
        title: '',
        organization: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    }
  }

  handleStartDate (value) {
    if (value === '') {
      this.setState({startDate: ''})
    }

    if (value.split('').length > 7) {
      this.setState({startDate: this.state.startDate})
      return
    }

    if (value.split('').length === 3 && value.charAt(2) !== '/') {
      value = value.split('')[0] + value.split('')[1] + '/' + value.split('')[2]
    }

    let slashCount = 0
    value.split('').forEach(c => {
      if (c === '/') {
        slashCount += 1
      }
    })
    if (slashCount > 1) {
      this.setState({startDate: this.state.startDate})
      return
    }

    let splitValue = value.split('/')
    if (isNaN(value)) {
      if (splitValue[0] > 12) {
        this.setState({startDate: this.state.startDate})
        return
      }
      if (isNaN(splitValue[1]) || splitValue[1].includes('.')) {
        this.setState({startDate: this.state.startDate})
        return
      }
      if (value.charAt(2) === '/' && !isNaN(splitValue[0])) {
        this.setState({startDate: value})
      } else {
        this.setState({startDate: this.state.startDate})
      }
    } else {
      this.setState({startDate: value})
    }
  }

  handleEndDate (value) {
    if (value === '') {
      this.setState({endDate: ''})
    }

    if (value.split('').length > 7) {
      this.setState({endDate: this.state.endDate})
      return
    }

    if (value.split('').length === 3 && value.charAt(2) !== '/') {
      value = value.split('')[0] + value.split('')[1] + '/' + value.split('')[2]
    }

    let slashCount = 0
    value.split('').forEach(c => {
      if (c === '/') {
        slashCount += 1
      }
    })
    if (slashCount > 1) {
      this.setState({endDate: this.state.endDate})
      return
    }

    let splitValue = value.split('/')
    if (isNaN(value)) {
      if (splitValue[0] > 12) {
        this.setState({endDate: this.state.endDate})
        return
      }
      if (isNaN(splitValue[1]) || splitValue[1].includes('.')) {
        this.setState({endDate: this.state.endDate})
        return
      }
      if (value.charAt(2) === '/' && !isNaN(splitValue[0])) {
        this.setState({endDate: value})
      } else {
        this.setState({endDate: this.state.endDate})
      }
    } else {
      this.setState({endDate: value})
    }
  }

  handleDescription (v) {
    if (v.includes('\n')) {
      let splitV = (v.split('\n'))
      let newLines = []
      splitV.forEach(line => {
        if (line.charAt(0) !== '•') {
          let newLine = '• ' + line
          newLines.push(newLine)
        } else {
          newLines.push(line)
        }
      })
      let value = newLines.join('\n')
      this.setState({description: value})
    } else {
      if (v.charAt(0) !== '•') {
        v = '• ' + v
      }
      this.setState({description: v})
    }
  }

  onSubmit () {
    if (this.props.editingExperience) {
      let form = {
        job_profile_id: this.props.rootStore.studentJobsStore.profile.id,
        name: this.state.title,
        organization_name: this.state.organization,
        start_date: moment(this.state.startDate, 'MM-YYYY').toISOString(),
        end_date: moment(this.state.endDate, 'MM-YYYY').toISOString(),
        career_activity_type_id: this.props.isVolunteer ? 100 : 400,
        description: this.state.description.replace(/• /g, '|').replace(/•/g, '|').replace(/\n/g, '').substr(1),
        id: this.props.editingExperience.id
      }
      actions.jobs.editActivity(form)
        .then((r) => {
          this.props.onSubmit(true)
        })
    } else {
      let form = {
        job_profile_id: this.props.rootStore.studentJobsStore.profile.id,
        name: this.state.title,
        organization_name: this.state.organization,
        start_date: moment(this.state.startDate, 'MM-YYYY').toISOString(),
        end_date: moment(this.state.endDate, 'MM-YYYY').toISOString(),
        career_activity_type_id: this.props.isVolunteer ? 100 : 400,
        description: this.state.description.replace(/• /g, '|').replace(/•/g, '|').replace(/\n/g, '').substr(1)
      }
      actions.jobs.addCareerActivity(form)
        .then((r) => {
          this.props.onSubmit()
        })
    }
  }

  render () {
    let disabled = true
    if (
      this.state.title !== '' &&
      this.state.organization !== '' &&
      this.state.startDate !== '' &&
      this.state.endDate !== '' &&
      this.state.description !== ''
    ) {
      disabled = false
    }
    return (
      <div className='jobs-form-container'>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Position title</div>
          <div className='jobs-form-sub-label'>e.g. {this.props.isVolunteer ? 'Soup Kitchen Volunteer' : 'Chief Executive Officer'}</div>
          <InputField updateValue={(value) => this.setState({title: value})} value={this.state.title} />
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>{this.props.isVolunteer ? 'Organization' : 'Company'}</div>
          <InputField updateValue={(value) => this.setState({organization: value})} value={this.state.organization} />
        </div>
        <div className='jobs-form-row jobs-form-multiple-row'>
          <div className='margin-right'>
            <div className='jobs-form-label'>Start date</div>
            <InputField updateValue={(value) => this.handleStartDate(value)} value={this.state.startDate} placeholder={'MM/YYYY'} />
          </div>
          <div className='margin-left'>
            <div className='jobs-form-label'>End date</div>
            <InputField updateValue={(value) => this.handleEndDate(value)} value={this.state.endDate} placeholder={'MM/YYYY'} />
          </div>
        </div>
        <div className='jobs-form-row'>
          <div className='jobs-form-label'>Description</div>
          <div className='jobs-form-sub-label'>Here&apos;s an example of a good description: {
            this.props.isVolunteer
              ? <div>
                <div>• Helped serve food to homeless.</div>
                <div>• Mentored group of youth at kitchen.</div>
                <div>• Led a team of volunteers.</div>
              </div>
              : <div>
                <div>• Head of growth for startup company.</div>
                <div>• Oversaw a 35% increase in sales.</div>
                <div>• Led a team of 10 staff members.</div>
              </div>
          }
          </div>
          <TextAreaField updateValue={(value) => this.handleDescription(value)} value={this.state.description} />
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
}

ExperienceForm.propTypes = {
  isVolunteer: PropTypes.bool,
  rootStore: PropTypes.object,
  onSubmit: PropTypes.func,
  editingExperience: PropTypes.object
}

export default ExperienceForm
