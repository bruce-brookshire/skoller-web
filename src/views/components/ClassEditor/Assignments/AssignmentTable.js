import React from 'react'
import PropTypes from 'prop-types'
import {convertUTCDatetimeToDateString} from '../../../../utilities/time'

class AssignmentTable extends React.Component {
  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight_id, due} = item
    const {currentAssignment, viewOnly, weights, currentWeight} = this.props

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
        {!viewOnly &&
          <div className='col-xs-1'>
            <div className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                // if (disabled) return
                this.props.onDeleteAssignment(item)
              }}><i className='fa fa-times' />
            </div>
          </div>
        }
        <div className={!viewOnly ? 'col-xs-9' : 'col-xs-10'}>
          <div>{name}</div>
          {!currentWeight && <div className='description'>
            {(weight_id && weights && weights.find(w => w.id === weight_id).name) || 'N/A'}
          </div>}
        </div>
        <div className='col-xs-2 right-text'>
          {due ? this.mapAssignmentDate(due) : 'N/A'}
        </div>
      </div>
    )
  }

  /*
  * Map the assignment dateParts
  *
  * @param [String] date. YYYY-MM-DD
  * @return [String]. MM/DD
  */
  mapAssignmentDate (date) {
    const {cl} = this.props
    const datePretty = convertUTCDatetimeToDateString(date, cl.school.timezone)
    const dateParts = datePretty.split('-')
    return `${dateParts[1]}/${dateParts[2]}`
  }

  /*
  * Render the assignments for a given class.
  */
  renderAssignments () {
    const {assignments} = this.props

    // sort by due date.
    return assignments.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((assignment, index) =>
      this.getRow(assignment, index)
    )
  }

  render () {
    const {viewOnly, currentWeight} = this.props

    return (
      <div id='cn-assignment-table'>
        <div id='cn-assignment-table-label'>
          Saved assignments{currentWeight ? ' for ' + currentWeight.name : ''}
        </div>
        <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`} >
          <div id='class-editor-assignments-table' ref={(field) => { this.sectionControl = field }}>
            {this.renderAssignments()}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentTable.propTypes = {
  viewOnly: PropTypes.bool,
  assignments: PropTypes.array,
  currentAssignment: PropTypes.object,
  onSelectAssignment: PropTypes.func,
  onDeleteAssignment: PropTypes.func,
  weights: PropTypes.array,
  cl: PropTypes.object,
  currentWeight: PropTypes.object
}

export default AssignmentTable
