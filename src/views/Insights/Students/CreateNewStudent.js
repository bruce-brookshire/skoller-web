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
      <div className='si-new-student'></div>
    )
  }
}

CreateNewStudent.propTypes = {
  rootStore: PropTypes.object
}

export default CreateNewStudent
