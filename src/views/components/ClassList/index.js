import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid/index'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'

const headers = [
  {
    field: 'courseNumber',
    display: 'Class Number'
  },
  {
    field: 'name',
    display: 'Class Name'
  },
  {
    field: 'professor',
    display: 'Professor'
  },
  {
    field: 'days',
    display: 'Days'
  },
  {
    field: 'beginTime',
    display: 'Start Time'
  },
  {
    field: 'status',
    display: 'Syllabus Status'
  },
  {
    field: 'enrollment',
    display: 'Classmates'
  }
]

class ClassList extends React.Component {
  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.props.classes.sort((a, b) => {
      var aNum = this.getStatusNum(a.status.name.toLowerCase())
      var bNum = this.getStatusNum(b.status.name.toLowerCase())
      if (aNum > bNum) {
        return -1
      } else if (aNum < bNum) {
        return 1
      } else {
        return 0
      }
    }).map((item, index) =>
      this.mapRow(item, index)
    )
  }
  getStatusNum (status) {
    switch (status) {
      case 'new class':
      case 'needs setup':
        return 100
      case 'syllabus submitted':
        return 50
      case 'class setup':
      case 'class issue':
        return 25
      default:
        return 0
    }
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, subject, section, code, name, meet_start_time: startTime, meet_days: days, professor, status, enrollment} = item

    const row = {
      id: id || '',
      courseNumber: (subject ? subject + ' ' : '') + (code ? code : '') + (section && code ? '.' + section : ''), // eslint-disable-line no-unneeded-ternary
      name: name || '-',
      professor: professor ? mapProfessor(professor) : '',
      days: days || '',
      beginTime: days === 'Online' ? '' : (startTime ? mapTimeToDisplay(startTime) : (section && !code ? section : '')),
      status: status ? this.mapStatus(status) : '-',
      enrollment: (enrollment && (enrollment - 1) > 0) ? enrollment - 1 : 0
    }

    return row
  }

  /*
  * Map the class status to ui
  *
  * @param [String] status. Class status.
  */
  mapStatus (status) {
    status = status.name.toLowerCase()
    if (status === 'new class' || status === 'needs setup') {
      return <span className='cn-red'> Set Up Class</span>
    } else if (status === 'syllabus submitted') {
      return <span className='cn-grey'>In Review</span>
    } else if (status === 'class setup' || status === 'class issue') {
      return <span className='cn-green' >Complete</span>
    }
    return status
  }

  onClassSelect (cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  render () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={this.props.onDelete ? true : false} // eslint-disable-line no-unneeded-ternary
        canSelect={this.props.onSelect ? true : false} // eslint-disable-line no-unneeded-ternary
        onDelete={this.props.onDelete ? this.props.onDelete() : null}
        onSelect={this.onClassSelect.bind(this)}
        deleteMessage={this.props.deleteMessage}
        emptyMessage={this.props.emptyMessage}
      />
    )
  }
}

ClassList.propTypes = {
  classes: PropTypes.array,
  onDelete: PropTypes.func,
  deleteMessage: PropTypes.string,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func
}

export default ClassList
