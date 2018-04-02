import React from 'react'
import PropTypes from 'prop-types'

class SemesterDetails extends React.Component {
  renderSemesterTable () {
    const {period} = this.props
    return (
      <table className='school-info-table'>
        <tbody>
          <tr>
            <th>Semester Name:</th>
            <td>{period.name}</td>
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
          <h3>{this.props.header}</h3>
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
  period: PropTypes.object,
  header: PropTypes.string
}

export default SemesterDetails
