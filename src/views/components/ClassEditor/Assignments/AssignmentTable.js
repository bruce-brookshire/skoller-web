import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class AssignmentTable extends React.Component {
  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight_id: weightId, due} = item
    const {currentAssignment, viewOnly, currentWeight} = this.props
    const activeClass = (currentAssignment && currentAssignment.id) === id
      ? 'active' : ''

    return (
      <div
        className={`table-row ${activeClass}`}
        key={`assignment-${index}`}
        onClick={() => {
          if (viewOnly) return
          this.props.onSelectAssignment(item)
        }}
      >
        <div className='col-xs-7 assignment-name-container'>
          {!viewOnly &&
            <div className='col-xs-2'>
              <div
                className='button-delete-x-light center-content'
                onClick={(event) => {
                  event.stopPropagation()
                  /* if (disabled) return */
                  this.props.onDeleteAssignment(item)
                }}><img src='/src/assets/images/syllabus_tool/circle_x.png' />
              </div>
            </div>
          }
          <div className={`assignment-label ${!viewOnly ? 'col-xs-9' : 'col-xs-10'}`}>
            <div>{name}</div>
            {!currentWeight && this.renderWeightName(weightId)}
          </div>
        </div>
        <div className='col-xs-5 right-text'>
          {due ? this.mapAssignmentDate(due) : ''}
        </div>
      </div>
    )
  }

  /* TODO: This is a bit bloated, but when it was unrolled into the rendering code
      it was crashing as 'undefined' did not have name. Could be more trim.
  */
  renderWeightName (id) {
    const {weights} = this.props
    console.log(weights)
    if (weights) {
      var weight = weights.find(w => w.id === id)
      if (weight && weight !== undefined) {
        return <div className='description'>
          {weight.name}
        </div>
      } else {
        return <div className='description'>
           N/A
        </div>
      }
    } else {
      return null
    }
  }

  /*
  * Map the assignment dateParts
  *
  * @param [String] date. YYYY-MM-DD
  * @return [String]. MM/DD
  */
  mapAssignmentDate (date) {
    const {cl} = this.props
    const today = moment.tz(Date.now(), cl.school.timezone)
    const due = moment.tz(date, cl.school.timezone)
    return today.format('YYYY-MM-DD') === due.format('YYYY-MM-DD') ? 'Today'
      : `${due.format('ddd')}, ${due.format('MMM')} ${due.format('Do')}`
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments () {
    const {assignments} = this.props

    // sort by due date.
    return assignments.sort((a, b) => {
      return new Date(b.due) - new Date(a.due)
    }).map((assignment, index) =>
      this.getRow(assignment, index)
    )
  }

  renderSubmit () {
    const {assignments} = this.props
    const disableButton = assignments.length === 0

    if (!this.props.viewOnly) {
      return (
        <div id='submit-container'>
          <div id='notification'>
            Be sure to add all assignments for this category!
          </div>
          <button
            onClick={() => this.props.onSubmit()}
            disabled={disableButton}
            className={`submit-assignments button ${disableButton ? 'disabled' : ''}`}
          >
            Done ({assignments.length} Assignments Added)
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    const {viewOnly} = this.props

    return (
      <div id='class-editor-assignments-table' className={`${viewOnly ? 'view-only' : ''}`} ref={(field) => { this.sectionControl = field }} >
        <div id='assignment-rows'>
          {this.renderAssignments()}
        </div>
        {this.renderSubmit()}
      </div>
    )
  }
}

AssignmentTable.propTypes = {
  viewOnly: PropTypes.bool,
  assignments: PropTypes.array.isRequired,
  currentAssignment: PropTypes.object,
  onSelectAssignment: PropTypes.func,
  onDeleteAssignment: PropTypes.func,
  weights: PropTypes.array,
  cl: PropTypes.object,
  currentWeight: PropTypes.object,
  isAdmin: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default AssignmentTable
