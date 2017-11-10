import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../../components/Grid/index'

const headers = [
  {
    field: 'firstName',
    display: 'First Name'
  },
  {
    field: 'lastName',
    display: 'Last Name'
  },
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'phone',
    display: 'Number'
  },
  {
    field: 'edit',
    display: ''
  }
]

class ProfessorTable extends React.Component {
  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.props.professors.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const { id, objectId, firstName, lastName, email, phone } = item

    const row = {
      id: id || objectId,
      firstName,
      lastName,
      email,
      phone,
      edit: <i className='fa fa-pencil grid-icon' style={{color: '#167AFF'}} onClick={() => this.props.onEdit(item)}/>
    }

    return row
  }

  render () {
    return (
      <div>
        <div className='margin-top'><span> Class Professor(s): </span></div>
        <div className='cn-table-grid-container margin-top margin-bottom'>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={true}
            onDelete={this.props.onDelete}
          />
        </div>
      </div>
    )
  }
}

ProfessorTable.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  professors: PropTypes.array.isRequired
}

export default ProfessorTable
