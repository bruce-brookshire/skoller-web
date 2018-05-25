import React from 'react'
import PropTypes from 'prop-types'
import {convertUTCDatetimeToDateString} from '../../utilities/time'

class AssignmentCard extends React.Component {
  /*
  * Map the assignment dateParts
  *
  * @param [String] date. YYYY-MM-DD
  * @return [String]. MM/DD
  */
  mapAssignmentDate (date) {
    const {school} = this.props
    const datePretty = convertUTCDatetimeToDateString(date, school.timezone)
    const dateParts = datePretty.split('-')
    return `${dateParts[1]}/${dateParts[2]}`
  }

  render () {
    const {assignment, weights} = this.props
    return (
      <div id='cn-assignment-card' className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title'>
            Assignment
          </div>
          <div className='cn-card-row'>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                Name
              </div>
              {assignment.name}
            </div>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                Due
              </div>
              {this.mapAssignmentDate(assignment.due)}
            </div>
          </div>
          <div className='cn-card-row'>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                Weight
              </div>
              {(assignment.weight_id && weights && weights.find(w => w.id === assignment.weight_id).name) || 'N/A'}
            </div>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                From Mod
              </div>
              {assignment.from_mod ? 'True' : 'False'}
            </div>
          </div>
          <div className='cn-card-row'>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                Students
              </div>
              {assignment.student_count}
            </div>
            <div className='cn-card-field'>
              <div className='cn-card-label'>
                Mods
              </div>
              {assignment.mod_count}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AssignmentCard.propTypes = {
  assignment: PropTypes.object,
  school: PropTypes.object,
  weights: PropTypes.array
}

export default AssignmentCard
