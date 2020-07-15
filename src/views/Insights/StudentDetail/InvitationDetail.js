import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StudentDetail from '.'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class InvitationDetail extends Component {
  static propTypes = {
    match: PropTypes.object,
    rootStore: PropTypes.object,
    history: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      autoShowAddClasses: false
    }
  }

  render () {
    return (
      <StudentDetail autoShowAddClasses={this.state.autoShowAddClasses} invitation={this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))} />
    )
  }
}

export default withRouter(InvitationDetail)
