import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import moment from 'moment'

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
        <option value={'name'}>Class name</option>
        <option value={'meet_start_time'}>Meeting times</option>
        <option value={'meet_days'}>Meeting days</option>
        <option value={'subject'}>Subject</option>
        <option value={'section'}>Section</option>
        <option value={'code'}>Code</option>
      </select>
    )
  }

  renderClassInfoCr () {
    return (
      null
    )
  }

  renderChangeRequests () {
    let changeRequests = this.props.cl.change_requests.filter(a => a.is_completed === true)
    if (this.state.filter !== 'all') {
      changeRequests = changeRequests.filter(a => Object.keys(a.data)[0] === this.state.filter)
    }
    changeRequests.sort((a, b) => moment(a.updated_at).isBefore(b.updated_at) ? 1 : -1)
    return (
      <div className='hub-change-request-history'>
        <div className='hub-change-request-history-shadow' />
        <div className='hub-change-request-history-shadow-bottom' />
        <div className='hub-change-request-history-list'>
          {changeRequests.map(cr => {
            let i = 0
            console.log(cr.change_type.id, cr)
            return (
              <div key={cr.id}>
                {Object.keys(cr.data).map(data => {
                  i += 1
                  return (
                    <div key={i} className='hub-change-request-history-cr'>
                      <div className='hub-change-request-history-cr-row'>
                        <p>Change type:</p>
                        <p>{data.replace('_', ' ')}</p>
                      </div>
                      <div className='hub-change-request-history-cr-row'>
                        <p>Data:</p>
                        <h2>{cr.data[data]}</h2>
                      </div>
                      <div className='hub-change-request-history-cr-row'>
                        <p>Updated:</p>
                        <p>{moment(moment.utc(cr.updated_at).toDate()).local().format('MM/DD/YY h:mma')}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        <h3>{this.props.cl.change_requests.filter(a => a.is_completed === true).length.toString()} past change requests completed</h3>
        {this.renderListFilter()}
        {this.renderChangeRequests()}
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
