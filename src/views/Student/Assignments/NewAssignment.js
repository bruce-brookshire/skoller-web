import React from 'react'
import moment from 'moment'

class NewAssignment extends React.Component {
  render () {
    return (
      <div className="add-assignment-assignment" style={{borderColor: this.props.assignment.class.getColor()}}>
        <div style={{color: this.props.assignment.class.getColor()}}>{this.props.assignment.class.name}</div>
        <div>{this.props.assignment.name}</div>
        <div>{moment(this.props.assignment.due).format('MMMM D, YYYY')}</div>
        <div onClick={() => this.props.removeNewAssignment(this.props.assignment)}>remove</div>
      </div>
    )
  }
}

export default NewAssignment
