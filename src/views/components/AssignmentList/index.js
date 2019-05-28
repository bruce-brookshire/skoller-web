import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class AssignmentList extends React.Component {
  renderDueDateInfo (dd) {
    const today = moment()
    if (dd) {
      const dueDate = moment(dd)
      const daysTillDue = dueDate.from(today, 'days')
      if (today.isSame(dueDate)) return 'Today'
      if (today.isBefore(dueDate)) return 'In ' + daysTillDue
      if (today.isAfter(dueDate)) return 'In the Past'
    } else { console.warn('This assignment needs a due date!') }
  }

  renderClassAssignments () {
    const assignments = this.props.assignments
    return assignments && assignments.length ? assignments.map(a => {
      const gradeSectionBgcolor = { background: a.grade ? '#57b9e4ff' : 'grey' }
      return (
        <div key={'cn_class_detail_row_' + a.id}
          className='cn-class-list-row margin-bottom'
          style={{background: 'white'}}
          onClick={() => this.onAssignmentSelect(a)}
        >
          <div className='cn-class-list-row-icon-container' style={gradeSectionBgcolor}>
            <span className='cn-class-list-row-icon-text'>{a.grade ? a.grade + '%' : '- -'}</span>
          </div>
          <div className='cn-class-list-row-data'>
            <div className='cn-class-list-row-col'>
              <div className='cn-class-list-title'>{a.name}</div>
              <div className='cn-class-list-subtext'>{a.weight * 100}%</div>
            </div>
            <div className='cn-class-list-row-col'>
              <div className='cn-class-list-subtext cn-class-list-flex-top cn-class-list-text-right'>{this.renderDueDateInfo(a.due)}</div>
            </div>
          </div>
        </div>
      )
    }) : ''
  }

  onAssignmentSelect (assignment) {
    if (this.props.onSelect) this.props.onSelect(assignment)
  }

  render () {
    return (
      <div className={'cn-class-list-container'}>
        {this.renderClassAssignments()}
      </div>
    )
  }
}

AssignmentList.propTypes = {
  assignments: PropTypes.array,
  onSelect: PropTypes.func
}

export default AssignmentList
