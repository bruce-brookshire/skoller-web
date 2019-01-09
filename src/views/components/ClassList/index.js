import React from 'react'
import PropTypes from 'prop-types'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'

class ClassList extends React.Component {
  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.props.classes.sort((a, b) => {
      var aNum = a.status.is_complete ? 0 : this.getStatusNum(a.status.name.toLowerCase())
      var bNum = a.status.is_complete ? 0 : this.getStatusNum(b.status.name.toLowerCase())
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
      case 'needs student input':
      case 'class setup':
      case 'class issue':
        return 50
      case 'syllabus submitted':
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
    var statusNameL = status.name.toLowerCase()
    if (status.is_complete) {
      return (
        <div className='cn-class-list-row-icon-container'>
          <i className='fas fa-check-square cn-class-list-row-icon cn-green' />
          <span className='cn-class-list-row-icon-text cn-green'>Live</span>
        </div>
      )
    } else if (statusNameL === 'new class' || statusNameL === 'needs setup') {
      return (
        <div className='cn-class-list-row-icon-container'>
          <i className='fas fa-user-edit cn-class-list-row-icon cn-blue' />
          <span className='cn-class-list-row-icon-text cn-blue'>Set Up Class</span>
        </div>
      )
    } else if (statusNameL === 'syllabus submitted') {
      return (
        <div className='cn-class-list-row-icon-container'>
          <i className='far fa-clock cn-class-list-row-icon cn-grey' />
          <span className='cn-class-list-row-icon-text cn-grey'>In Review</span>
        </div>
      )
    } else if (statusNameL === 'class setup' || statusNameL === 'class issue' || statusNameL === 'needs student input') {
      return (
        <div className='cn-class-list-row-icon-container'>
          <i className='fas fa-exclamation-circle cn-class-list-row-icon cn-orange' />
          <span className='cn-class-list-row-icon-text cn-orange'>DIY Required</span>
        </div>
      )
    } else {
      return (
        <div className='cn-class-list-row-icon-container'>
          <i className='fas fa-exclamation cn-class-list-row-icon cn-grey' />
          <span className='cn-class-list-row-icon-text cn-grey'>status.name</span>
        </div>
      )
    }
  }

  onClassSelect (cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  renderClassRows () {
    return this.getRows().map(c => {
      return (
        <div key={'cn_class_list_row_' + c.id}
          className={'cn-class-list-row margin-bottom ' + this.props.rowClassName}
          onClick={() => this.onClassSelect(c)}
        >
          {c.status}
          <div className='cn-class-list-row-data'>
            <div className='cn-class-list-row-col cn-class-list-row-col-primary'>
              <div className='cn-class-list-title'>{c.name}</div>
              <div className='cn-class-list-text'>{c.professor}</div>
              <div className='cn-class-list-subtext'>{c.courseNumber}</div>
            </div>
            <div className='cn-class-list-row-col'>
              <div className='cn-class-list-subtext cn-class-list-flex-top cn-class-list-text-right'>{c.enrollment} <i className='fas fa-user' /></div>
              <div className='cn-class-list-subtext cn-class-list-flex-bottom cn-class-list-text-right'>{c.days + ' ' + c.beginTime}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={'cn-class-list-container ' + this.props.containerClassName}>
        {this.renderClassRows()}
      </div>
    )
  }
}

ClassList.propTypes = {
  classes: PropTypes.array,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func,
  containerClassName: PropTypes.string,
  rowClassName: PropTypes.string
}

export default ClassList
