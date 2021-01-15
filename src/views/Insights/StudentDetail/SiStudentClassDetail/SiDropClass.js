import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import actions from '../../../../actions'
import SkModal from '../../../components/SkModal/SkModal'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class SiDropClass extends React.Component {
  state = {
    showDropClassConfirm: false
  }

  onDropClass () {
    this.setState({showDropClassConfirm: true})
  }

  async onDropClassConfirm () {
    this.setState({loading: true})
    if (this.props.match.params.orgStudentId) {
      let id = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId)).student_id
      await actions.insights.students.dropClass(this.props.cl.id, id).catch(r => console.log(r))
        .then(() => {
          this.props.rootStore.insightsStore.updateStudent(parseInt(this.props.match.params.orgStudentId))
          this.props.onDropClass()
        })
    } else {
      let id = parseInt(this.props.match.params.invitationId)
      let invitation = this.props.rootStore.insightsStore.invitations.find(i => i.id === id)
      let classIds = invitation.class_ids
      classIds.splice(invitation.class_ids.indexOf(this.props.cl.id), 1)
      await actions.insights.invitations.editInvitation(this.props.rootStore.insightsStore.org.id, id, {
        class_ids: classIds
      })
        .then(i => {
          this.props.rootStore.insightsStore.refreshInvitation(i)
        })
      this.props.onDropClass()
    }
  }

  renderDropClassConfirm () {
    return (
      <SkModal>
        <div className='sk-drop-class-modal'>
          <h3>Are you sure you want to drop this class?</h3>
          <div
            className='sk-drop-class-modal-yes'
            onClick={() => this.onDropClassConfirm()}
          >
            <p>Yes, drop class.</p>
          </div>
          <div
            className='sk-drop-class-modal-no'
            onClick={() => this.setState({showDropClassConfirm: false})}
          >
            <p>No, stay in this class.</p>
          </div>
        </div>
      </SkModal>
    )
  }

  renderDropButton () {
    return (
      <div
        className='sk-drop-class'
      >
        {this.props.icon
          ? <i className='fas fa-arrow-alt-circle-down' onClick={() => this.onDropClass()} />
          : <p
            onClick={() => this.onDropClass()}
          >Drop this class</p>
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderDropButton()}
        {this.state.showDropClassConfirm &&
          this.renderDropClassConfirm()
        }
      </div>
    )
  }
}

SiDropClass.propTypes = {
  cl: PropTypes.object,
  onDropClass: PropTypes.func,
  rootStore: PropTypes.object,
  icon: PropTypes.bool,
  match: PropTypes.object
}

export default withRouter(SiDropClass)
