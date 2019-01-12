import React from 'react'
import PropTypes from 'prop-types'
import Card from '../../../components/Card'

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
            <th>Location:</th>
            <td>{school.adr_locality} {school.adr_region} {school.adr_zip}</td>
          </tr>
          <tr>
            <th>Time Zone:</th>
            <td>{school.timezone}</td>
          </tr>
          <tr>
            <th>School Color:</th>
            <td style={{color: `${school.color}`}}>{school.color}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  renderTitle () {
    const {onEdit} = this.props
    return (
      <div className='cn-icon-flex'>
        School Details
        <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => onEdit() } />
      </div>
    )
  }

  renderContent () {
    const {school, onEdit} = this.props
    return (
      <div>
        {school ? this.renderSchoolTable()
          : <a onClick={() => onEdit()}>Add details</a>}
      </div>
    )
  }

  render () {
    return (
      <Card
        title={this.renderTitle()}
        content={this.renderContent()}
      />
    )
  }
}

SchoolDetails.propTypes = {
  onEdit: PropTypes.func,
  school: PropTypes.object
}

export default SchoolDetails
