import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid/index'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'
import UploadDocuments from './UploadDocuments'

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
    field: 'campus',
    display: 'Campus'
  },
  {
    field: 'status',
    display: 'Syllabus Status'
  },
  {
    field: 'enrollment',
    display: 'Enrollment'
  }
]

class ClassList extends React.Component {

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.props.classes.map((item, index) =>
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
    const {id, number, name, meet_start_time, meet_days, campus, professor, status, enrollment} = item

    const row = {
      id: id || '',
      courseNumber: number || '-',
      name: name || '-',
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time ? mapTimeToDisplay(meet_start_time) : 'TBA',
      campus: campus || '',
      status: status ? this.mapStatus(status) : '-',
      enrollment: enrollment || 0,
      component: this.props.onUpdate ? <UploadDocuments cl={item} onUpdateClass={(cl) => {this.props.onUpdate(cl)}}/> : null
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
    if (status === 'new class' || status === 'needs syllabus') {
      return <span className='cn-red'> Upload Syllabus </span>
    } else if (status === 'weights' || status === 'assignments' || status === 'review' || status === 'help') {
      return <span style={{color: '#a0a0a0'}}>In Review</span>
    } else if (status === 'complete' || status === 'change') {
      return <span className='cn-green' >Complete</span>
    }
    return status
  }

  onClassSelect(cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  render () {
    return (
      <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={this.props.disabled}
        canDelete={this.props.onDelete ? true : false}
        canSelect={this.props.onSelect ? true: false}
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
  disabled: PropTypes.bool,
  onDelete: PropTypes.func,
  deleteMessage: PropTypes.string,
  emptyMessage: PropTypes.string,
  onUpdate: PropTypes.func,
  onSelect: PropTypes.func
}

export default ClassList