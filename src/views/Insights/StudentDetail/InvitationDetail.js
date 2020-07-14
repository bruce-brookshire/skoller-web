import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import StudentDetail from '.'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { asyncForEach } from '../utils'
import actions from '../../../actions'

@inject('rootStore') @observer
class InvitationDetail extends Component {
  static propTypes = {
    match: PropTypes.object,
    rootStore: PropTypes.object,
    history: PropTypes.object
  }

  // constructor (props) {
  //   super(props)

  //   this.state = {
  //     loading: false,
  //     invitation: this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))
  //   }
  // }

  render () {
    // if (this.state.loading) return <SkLoader />

    console.log(this.props.rootStore.insightsStore)

    return (
      <StudentDetail invitation={this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))} />
    )
  }
}

export default withRouter(InvitationDetail)
