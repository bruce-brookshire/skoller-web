import React from 'react'
import { propTypes, observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

@inject('rootStore')
@observer
class DayCell extends React.Component {
  goToAssignment (assignment) {
    browserHistory.push({pathname: '/student/class/' + assignment.class_id + '/assignments/' + assignment.assignment_id, state: { prevPath: this.props.rootStore.studentNavStore.location.pathname }})
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
  assignment: propTypes.object,
  classColors: propTypes.object
}

export default DayCell
