import React from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@inject('rootStore')
@observer
class DayCell extends React.Component {
  goToAssignment (assignment) {
    this.props.history.push({pathname: '/student/class/' + assignment.class_id + '/assignments/' + assignment.assignment_id, state: { prevPath: this.props.rootStore.studentNavStore.location.pathname }})
  }

  // return the rendered calendar day cell
  render () {
    const assignmentStyle = {
      backgroundColor: this.props.classColors[this.props.assignment.class_id]
    }

    return (
      <div className="calendar-assignment" style={assignmentStyle} onClick={() => this.goToAssignment(this.props.assignment)}>
        {this.props.assignment.name}
      </div>
    )
  }
}

DayCell.propTypes = {
  rootStore: PropTypes.object,
  assignment: PropTypes.object,
  classColors: PropTypes.object
}

export default withRouter(DayCell)
