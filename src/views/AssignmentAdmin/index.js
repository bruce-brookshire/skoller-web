import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AssignmentCard from './AssignmentCard'

@inject('rootStore') @observer
class AssignmentAdmin extends React.Component {
  constructor (props) {
    super(props)
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Assignment Admin'
    this.state = this.initializeState()
  }

  initializeState () {
    return {
    }
  }

  renderAssignmentCard () {
    const {assignment} = this.props.location.state
    return (
      <AssignmentCard
        assignment={assignment}
      />
    )
  }

  render () {
    return (
      <div id='cn-assignment-admin-container'>
        {this.renderAssignmentCard()}
      </div>
    )
  }
}

AssignmentAdmin.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default AssignmentAdmin
