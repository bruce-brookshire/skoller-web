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

  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      invitation: null
    }

    this.getInvitation()
  }

  async getInvitation () {
    let invitation = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))

    if (!invitation) this.props.history.push('/insights/students')

    let classes = []
    let assignments = []
    await asyncForEach(invitation.class_ids, async id => {
      await actions.classes.getClassByIdAdmin(id)
        .then(r => {
          r.assignments.forEach(a => {
            if (r.is_points) {
              let totalWeight = 0
              r.weights.forEach(w => {
                console.log({w, totalWeight})
                totalWeight += w.weight
              })
              a.weight = (r.weights.find(w => w.id === a.weight_id).weight / r.assignments.filter(as => as.weight_id === a.weight_id, 0).length) / totalWeight
            } else {
              a.weight = r.weights.find(w => w.id === a.weight_id).weight / r.assignments.filter(as => as.weight_id === a.weight_id, 0).length
            }
            a.class_id = r.id
          })

          assignments.concat(r.assignments)
          r.color = '4a4a4a'
          classes.push(r)
        })
    })

    this.setState({invitation: {...invitation, classes, assignments}, loading: false})

    console.log(this.state.invitation)
  }

  render () {
    if (this.state.loading) return <SkLoader />

    return (
      <StudentDetail invitation={this.state.invitation} />
    )
  }
}

export default withRouter(InvitationDetail)
