import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AssignmentCard from './AssignmentCard'
import actions from '../../actions'

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
      loading: false,
      mods: []
    }
  }

  componentWillMount () {
    this.getMods()
  }

  getMods () {
    this.setState({loading: true})
    const {params: {assignmentId}} = this.props
    actions.mods.getAssignmentMods(assignmentId).then((mods) => {
      this.setState({mods})
      this.setState({loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  renderAssignmentCard () {
    const {assignment, school, weights} = this.props.location.state
    return (
      <AssignmentCard
        assignment={assignment}
        school={school}
        weights={weights}
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
  location: PropTypes.object,
  params: PropTypes.object
}

export default AssignmentAdmin
