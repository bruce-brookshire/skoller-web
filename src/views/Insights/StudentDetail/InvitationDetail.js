import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkLoader from '../../../assets/sk-icons/SkLoader'
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
      loading: true,
      invitation: null
    }

    this.getInvitation()
  }

  getInvitation () {
    let invitation = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))

    if (!invitation) this.props.history.push('/insights/students')
  }

  render () {
    if (this.state.loading) return <SkLoader />

    return (
      <StudentDetail invitation={this.state.invitation} />
    )
  }
}

export default withRouter(InvitationDetail)
