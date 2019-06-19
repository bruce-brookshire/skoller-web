import React from 'react'

class NewAssignment extends React.Component {
  render () {
    return (
      <div>{this.props.assignmentParams.name}</div>
    )
  }
}

export default NewAssignment
