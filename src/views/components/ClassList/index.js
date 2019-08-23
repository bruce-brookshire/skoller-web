import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'
import CompletionCircle from '../../components/CompletionCircle'

class ClassList extends React.Component {
  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.props.classes.sort((a, b) => {
      var aNum = a.status.is_complete ? 0 : this.getStatusNum(a.status.name.toLowerCase())
      var bNum = b.status.is_complete ? 0 : this.getStatusNum(b.status.name.toLowerCase())
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
    const {id, subject, section, code, getColor, completion, grade, name, meet_start_time: startTime, meet_days: days, professor, status, enrollment} = item
    // TODO for Matt: Anytime you need to use a color on a class, use the getColor() property, and it will return (and save if needed) the correct color
    const color = getColor()

    const row = {
      id: id || '',
      courseNumber: (subject ? subject + ' ' : '') + (code ? code : '') + (section && code ? '.' + section : ''), // eslint-disable-line no-unneeded-ternary
      name: name || '-',
      professor: professor ? mapProfessor(professor) : '',
      days: days || '',
      completion: completion,
      grade: grade,
      color: color,
      beginTime: days === 'Online' ? '' : (startTime ? mapTimeToDisplay(startTime) : (section && !code ? section : '')),
      status: status ? this.mapStatus(item, color) : '-',
      setupStatus: status,
      enrollment: (enrollment && (enrollment - 1) > 0) ? enrollment - 1 : 0
    }
    return row
  }

  /*
  * Map the class status to ui
  *
  * @param [String] item. Class status.
  */
  mapStatus (item, classColor) {
    console.log(item)
    const {status} = item
    var statusNameL = status.name.toLowerCase()
    if (status.is_complete) {
      return (
        <div className='cn-class-list-row-icon-container cn-white' style={{background: classColor, borderColor: classColor}} >
          <span className='cn-class-list-row-grade-text cn-white'>{item.grade > 0 ? item.grade + '%' : '--'}</span>
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
      console.log(c)
      if (c.setupStatus.id === 1400) {
        return (
          <div key={'cn_class_list_row_' + c.id}
            className={'cn-class-list-row margin-bottom ' + this.props.rowClassName}
            onClick={() => this.onClassSelect(c)}
            style={{border: '1px solid', borderColor: c.color ? c.color : '#4a4a4a', borderRadius: '5px'}}
          >
            {c.status}
            <div className='cn-class-list-row-data'>
              <div className='cn-class-list-row-col cn-class-list-row-col-primary'>
                <div className='cn-class-list-title' style={{color: c.color}}>{c.name}</div>
                <div className='cn-class-list-subtext cn-class-list-flex-top cn-class-list-text-left'><i className='fas fa-user' /> {c.enrollment} classmates</div>
                <div className='cn-class-list-subtext cn-class-list-subtext-completion'><CompletionCircle completion={c.completion * 100}/> <div>{Math.round(c.completion * 100)}% complete</div></div>
              </div>
            </div>
          </div>
        )
      } else {
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
      }
    })
  }

  render () {
    return (
      <div className={'cn-class-list-container ' + this.props.containerClassName}>
        {this.renderClassRows()}
        {this.props.classes.length === 0 &&
          <div className='cn-class-list-empty-message'>
            {"Looks like you don't have any classes yet. Join one now!"}
          </div>
        }
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
