import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class AssignmentList extends React.Component {
  renderInsertWeightsBar () {
    const assignments = [...this.props.assignments]
    const weights = [...this.props.weights]
    console.log(assignments)
    weights.forEach((w, index) => {
      assignments.forEach(a => {
        if (a.weight_id === w.id) {
          weights.splice(index, 1)
        }
      })
    })

    if (weights.length >= 1) {
      return (
        <div className="">{weights.length} categor{weights.length === 1 ? 'y' : 'ies'} need{weights.length === 1 ? 's' : ''} assignment{weights.length === 1 ? '' : 's'}. Click to add them!</div>
      )
    } else if (weights.length <= 0) return null
  }

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
      const gradeSectionBgcolor = { background: a.grade ? '#' + this.props.classColor : 'grey' }
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
        {this.renderInsertWeightsBar()}
        {this.renderClassAssignments()}
      </div>
    )
  }
}

AssignmentList.propTypes = {
  assignments: PropTypes.array,
  weights: PropTypes.array,
  onSelect: PropTypes.func,
  classColor: PropTypes.string
}

export default AssignmentList
