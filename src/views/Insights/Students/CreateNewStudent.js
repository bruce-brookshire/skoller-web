import React from 'react'
import PropTypes from 'prop-types'

class CreateNewStudent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  render () {
    return (
      <div className='si-new-student'>
        <h1>Invite a New Student</h1>
      </div>
    )
  }
}

CreateNewStudent.propTypes = {
  rootStore: PropTypes.object
}

export default CreateNewStudent
