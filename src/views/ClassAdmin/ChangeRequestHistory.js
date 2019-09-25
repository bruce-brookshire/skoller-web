import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import moment from 'moment'
import { changeRequestIsComplete } from '../../utilities/changeRequests';

class ChangeRequestHistory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: 'all'
    }
  }

  renderListFilter () {
    return (
      <select value={this.state.filter} onChange={(e) => this.setState({filter: e.target.value})}>
        <option value={'all'}>All change requests</option>
        <optgroup label="Class info">
          <option value={'name'}>Class name</option>
          <option value={'meet_start_time'}>Meeting times</option>
          <option value={'meet_days'}>Meeting days</option>
          <option value={'subject'}>Subject</option>
          <option value={'section'}>Section</option>
          <option value={'code'}>Code</option>
        </optgroup>
        <optgroup label="Grade scale">
          <option value={'gradeScale'}>Grade scale</option>
        </optgroup>
        <optgroup label="Weights">
          <option value={'weights'}>Weights</option>
        </optgroup>
        <optgroup label="Professor">
          <option value={'professor'}>Professor</option>
        </optgroup>
      </select>
    )
  }

  renderClassInfoCr () {
    return (
      null
    )
  }

  renderChangeRequests () {
    let changeRequestMembers = []
    this.props.cl.change_requests.filter(cr => changeRequestIsComplete(cr)).forEach(cr => {
      cr.members.forEach(member => {
        if (member.is_completed) {
          changeRequestMembers.push({m: member, cr: cr})
        }
      })
    })
    if (this.state.filter !== 'all') {
      if (this.state.filter === 'gradeScale') {
        changeRequestMembers = changeRequestMembers.filter(member => member.cr.change_type.id === 100)
      } else if (this.state.filter === 'gradeScale') {
        changeRequestMembers = changeRequestMembers.filter(member => member.cr.change_type.id === 200)
      } else if (this.state.filter === 'gradeScale') {
        changeRequestMembers = changeRequestMembers.filter(member => member.cr.change_type.id === 300)
      } else {
        changeRequestMembers = changeRequestMembers.filter(member => member.m.member_name === this.state.filter)
      }
    }
    changeRequestMembers.sort((a, b) => moment(a.cr.updated_at).isBefore(b.cr.updated_at) ? 1 : -1)
    return (
      <div className='hub-change-request-history'>
        <div className='hub-change-request-history-shadow' />
        <div className='hub-change-request-history-shadow-bottom' />
        <div className='hub-change-request-history-list'>
          {changeRequestMembers.map(member => {
            let i = 0
            return (
              <div key={member.m.id}>
                <div key={i} className='hub-change-request-history-cr'>
                  <div className='hub-change-request-history-cr-row'>
                    <p>Change type:</p>
                    <p>{member.m.member_name.replace('_', ' ')}</p>
                  </div>
                  <div className='hub-change-request-history-cr-row'>
                    <p>Data:</p>
                    <h2>{member.m.member_value}</h2>
                  </div>
                  <div className='hub-change-request-history-cr-row'>
                    <p>Updated:</p>
                    <p>{moment(moment.utc(member.cr.updated_at).toDate()).local().format('MM/DD/YY h:mma')}</p>
                  </div>
                  <div className='hub-change-request-history-cr-row'>
                    <p>Submitted by:</p>
                    <p>{member.cr.user.email}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderContent () {
    let totalChangeRequestsComplete = 0
    this.props.cl.change_requests.forEach(cr => {
      cr.members.forEach(member => {
        if (member.is_completed) {
          totalChangeRequestsComplete += 1
        }
      })
    })
    return (
      <div>
        {this.renderListFilter()}
        {this.renderChangeRequests()}
        <p className='hub-change-request-history-info'>{totalChangeRequestsComplete.toString()} total change requests completed.</p>
      </div>
    )
  }

  render () {
    return (
      <Card
        title={'History'}
        content={this.renderContent()}
        boxClassName={'hub-change-request-history-container'}
      />
    )
  }
}

ChangeRequestHistory.propTypes = {
  cl: PropTypes.object
}

export default ChangeRequestHistory
