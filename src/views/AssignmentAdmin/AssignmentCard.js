import React from 'react'
import PropTypes from 'prop-types'

class AssignmentCard extends React.Component {
  render () {
    return (
      <div id='cn-assignment-card' className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <div className='cn-shadow-box-title'>
            Assignment
          </div>
        </div>
      </div>
    )
  }
}

AssignmentCard.propTypes = {
  assignment: PropTypes.object
}

export default AssignmentCard
