import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Grid from '../../../components/Grid'
import actions from '../../../actions'

const headers = [
  {
    field: 'context',
    display: 'Context'
  },
  {
    field: 'note',
    display: 'Note'
  },
  {
    field: 'user',
    display: 'User'
  },
  {
    field: 'reportedBy',
    display: 'Reported By'
  }
]

class ReportList extends React.Component {
  getRows () {
    return this.props.location.state.reports.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {context, note, reported_by: reportedBy, user} = item

    const row = {
      id: user.id,
      context: context || '',
      note: note || '',
      reportedBy: reportedBy.email,
      user: user.email
    }

    return row
  }

  onSelectReport (report) {
    actions.auth.getUserById(report).then((user) => {
      this.props.history.push({
        pathname: '/hub/accounts/account/info',
        state: {user: user}
      })
    })
  }

  render () {
    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <h2 className='center-text'>Reports</h2>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            className="striped"
            canSelect={true}
            onSelect={this.onSelectReport.bind(this)}
          />
        </div>
      </div>
    )
  }
}

ReportList.propTypes = {
  location: PropTypes.object
}

export default withRouter(ReportList)
