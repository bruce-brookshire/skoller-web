import React from 'react'
import PropTypes from 'prop-types'
import {convertUTCDatetimeToDateString} from '../../../utilities/time'

class SemesterDetails extends React.Component {
  renderSemesterTable () {
    const {school, period} = this.props
    return (
      <table className='school-info-table'>
        <tbody>
          <tr>
            <th>Semester Name:</th>
            <td>{period.name}</td>
          </tr>
          <tr>
            <th>Start Date:</th>
            <td>{period.start_date ? convertUTCDatetimeToDateString(period.start_date, school.timezone) : ''}</td>
          </tr>
          <tr>
            <th>End Date:</th>
            <td>{period.end_date ? convertUTCDatetimeToDateString(period.end_date, school.timezone) : ''}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render () {
    const {period, onEdit} = this.props
    return (
      <div>
        <div className='edit-header'>
          <h3>2. Active Semester</h3>
          <a onClick={() => onEdit()}>Edit</a>
        </div>

        {period ? this.renderSemesterTable()
          : <a onClick={() => onEdit()}>Add details</a>
        }
      </div>
    )
  }
}

SemesterDetails.propTypes = {
  onEdit: PropTypes.func,
  school: PropTypes.object,
  period: PropTypes.object
}

export default SemesterDetails
