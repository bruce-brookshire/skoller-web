import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateTimeString} from '../../../utilities/time'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'inserted_at',
    display: 'Created'
  }
]

class SemesterDetails extends React.Component {
  mapRow (item, index) {
    const {id, name, inserted_at} = item
    const row = {
      id: id,
      name: name || '',
      inserted_at: inserted_at
        ? convertUTCDatetimeToDateTimeString(inserted_at, 'CST') : ''
    }
    return row
  }

  getRows () {
    const {period} = this.props
    return period.sort((a, b) => {
      return a.inserted_at < b.inserted_at ? 1 : -1
    }).map((item, index) =>
      this.mapRow(item, index)
    )
  }

  renderSemesterTable () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={false}
        canSelect={false}
        emptyMessage={'No semesters yet.'} />
    )
  }

  render () {
    const {period, onEdit, header} = this.props
    return (
      <div>
        {header ? <div className='edit-header'>
          <h3>{this.props.header}</h3>
          {onEdit ? <a onClick={() => onEdit()}>Edit</a> : ''}
        </div> : ''}

        {period ? this.renderSemesterTable()
          : onEdit ? <a onClick={() => onEdit()}>Add details</a> : ''
        }
      </div>
    )
  }
}

SemesterDetails.propTypes = {
  onEdit: PropTypes.func,
  school: PropTypes.object,
  period: PropTypes.array,
  header: PropTypes.string
}

export default SemesterDetails
