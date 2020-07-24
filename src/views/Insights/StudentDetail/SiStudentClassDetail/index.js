import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClassDetail from '../../../Student/ClassDetail/ClassDetail'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import NestedNav from '../../components/NestedNav'

@inject('rootStore') @observer
export default class SiStudentClassDetail extends Component {
  static propTypes = {
    rootStore: PropTypes.object,
    match: PropTypes.object
  }

  render () {
    let user
    if (this.props.match.params.invitationId) {
      user = this.props.rootStore.insightsStore.invitations.find(i => i.id === parseInt(this.props.match.params.invitationId))
    } else {
      user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }
    let cl = toJS(user.classes.find(cl => cl.id === parseInt(this.props.match.params.classId)))
    cl.color = this.props.match.params.invitationId ? '4a4a4a' : cl.color
    return (
      <div>
        <NestedNav pageType='studentDetail' />
        <ClassDetail insightsUser cl={cl} />
      </div>
    )
  }
}
