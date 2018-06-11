import React from 'react'
import PropTypes from 'prop-types'

class SchoolDetails extends React.Component {
  renderSchoolTable () {
    const {school} = this.props
    return (
      <table className='school-info-table'>
        <tbody>
          <tr>
            <th className='cn-flex-table-cell'>School:</th>
            <td className='cn-flex-table-cell'>{school.name}</td>
          </tr>
          <tr>
            <th>Script Code:</th>
            <td>{school.short_name}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{school.adr_line_1}, {school.adr_city} {school.adr_state} {school.adr_zip}</td>
          </tr>
          <tr>
            <th>Student email domain:</th>
            <td>{school.email_domains && school.email_domains.filter(e => !e.is_professor_only).map(e => e.email_domain).join(', ')}</td>
          </tr>
          <tr>
            <th>Prof email domain:</th>
            <td>{school.email_domains && school.email_domains.filter(e => e.is_professor_only).map(e => e.email_domain).join(', ')}</td>
          </tr>
          <tr>
            <th>Time Zone:</th>
            <td>{school.timezone}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render () {
    const {school, onEdit} = this.props

    return (
      <div>
        <div className='edit-header'>
          <h3>1. School Details</h3>
          <a onClick={() => onEdit()}>Edit</a>
        </div>

        {school ? this.renderSchoolTable()
          : <a onClick={() => onEdit()}>Add details</a>
        }
      </div>
    )
  }
}

SchoolDetails.propTypes = {
  onEdit: PropTypes.func,
  school: PropTypes.object
}

export default SchoolDetails
