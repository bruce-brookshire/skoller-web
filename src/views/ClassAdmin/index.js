import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../actions'
import Modal from '../../components/Modal'
import ClassForm from './ClassForm'
import IssuesModal from '../components/ClassEditor/IssuesModal'
import HelpResolvedModal from './HelpResolvedModal'
import RequestResolvedModal from './RequestResolvedModal'

@inject('rootStore') @observer
class ClassAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Initialize state
  */
  initializeState () {
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.isDIY = false
    navbarStore.toggleEditCl = this.toggleEditClassModal.bind(this)
    navbarStore.toggleWrench = this.toggleWrench.bind(this)
    navbarStore.toggleChat = this.toggleChat.bind(this)
    navbarStore.toggleIssues = this.toggleIssuesModal.bind(this)
    navbarStore.toggleHelpResolved = this.toggleHelpResolvedModal.bind(this)
    navbarStore.toggleRequestResolved = this.toggleRequestResolvedModal.bind(this)
    return {
      openEditClassModal: false,
      openHelpResolvedModal: false,
      openIssuesModal: false,
      openRequestResolvedModal: false
    }
  }

  /*
  * Unlock the class on component will mount
  */
  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.toggleEditCl = null
    navbarStore.toggleWrench = null
    navbarStore.toggleChat = null
    navbarStore.toggleIssues = null
    navbarStore.toggleHelpResolved = null
    navbarStore.toggleRequestResolved = null
  }

  /*
  * Gets array of all student requests yet to be completed
  */
  openStudentRequests () {
    let {navbarStore} = this.props.rootStore
    const sr = navbarStore.cl.student_requests.filter(c => !c.is_completed)
    const cr = navbarStore.cl.change_requests.filter(c => !c.is_completed)
    return sr.concat(cr)
  }

  /*
  * Toggle the edit class modal.
  */
  toggleEditClassModal () {
    this.setState({openEditClassModal: !this.state.openEditClassModal})
  }

  /*
  * Toggle the issues modal.
  */
  toggleIssuesModal () {
    this.setState({openIssuesModal: !this.state.openIssuesModal})
  }

  /*
  * Toggle the issues resolved modal.
  */
  toggleHelpResolvedModal () {
    this.setState({openHelpResolvedModal: !this.state.openHelpResolvedModal})
  }

  /*
  * Toggle the issues resolved modal.
  */
  toggleRequestResolvedModal () {
    this.setState({openRequestResolvedModal: !this.state.openRequestResolvedModal})
  }

  toggleChat () {
    let {navbarStore} = this.props.rootStore
    const {cl} = navbarStore
    actions.classes.updateClass({id: cl.id, is_chat_enabled: !cl.is_chat_enabled}).then((cl) => {
      navbarStore.cl = cl
    }).catch(() => false)
  }

  toggleWrench () {
    let {navbarStore} = this.props.rootStore
    const {cl} = navbarStore
    actions.classes.updateClass({id: cl.id, is_editable: !cl.is_editable}).then((cl) => {
      navbarStore.cl = cl
    }).catch(() => false)
  }

  /*
  * Update the class in state.
  *
  * @param [Object]. The class to update with
  */
  updateClass (cl) {
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = cl
  }

  /*
  * Render the editclass modal.
  */
  renderEditClassModal () {
    let {navbarStore} = this.props.rootStore
    return (
      <Modal
        open={this.state.openEditClassModal}
        onClose={this.toggleEditClassModal.bind(this)}
      >
        <ClassForm
          cl={navbarStore.cl}
          onClose={this.toggleEditClassModal.bind(this)}
          onSubmit={this.updateClass.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the help needed info
  */
  renderHelpResolvedModal () {
    let {navbarStore} = this.props.rootStore
    return (
      <HelpResolvedModal
        cl={navbarStore.cl}
        open={this.state.openHelpResolvedModal}
        onClose={this.toggleHelpResolvedModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
        }}
      />
    )
  }

  /*
  * Render the having issues modal.
  */
  renderIssuesModal () {
    let {navbarStore} = this.props.rootStore
    return (
      <IssuesModal
        cl={navbarStore.cl}
        open={this.state.openIssuesModal}
        onClose={this.toggleIssuesModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
        }}
      />
    )
  }

  /*
  * Render the issues resolved modal.
  */
  renderRequestResolvedModal () {
    let {navbarStore} = this.props.rootStore
    let openRequests = this.openStudentRequests()
    return (
      <RequestResolvedModal
        cl={navbarStore.cl}
        open={this.state.openRequestResolvedModal}
        onClose={this.toggleRequestResolvedModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
        }}
        request={openRequests[0]}
      />
    )
  }

  renderClassDetais () {

  }

  renderGradeScale () {

  }

  renderProfessor () {

  }

  renderStudents () {

  }

  renderWeights () {

  }

  renderAssignments () {

  }

  renderChat () {

  }

  renderSyllabus () {

  }

  render () {
    const {navbarStore} = this.props.rootStore

    return (
      <div id='cn-class-admin'>
        {this.renderClassDetais()}
        {this.renderGradeScale()}
        {this.renderProfessor()}
        {this.renderStudents()}
        {this.renderWeights()}
        {this.renderAssignments()}
        {this.renderChat()}
        {this.renderSyllabus()}
        {navbarStore.cl && this.renderIssuesModal()}
        {navbarStore.cl && this.renderHelpResolvedModal()}
        {navbarStore.cl && this.renderRequestResolvedModal()}
        {this.renderEditClassModal()}
      </div>
    )
  }
}

ClassAdmin.propTypes = {
  location: PropTypes.object,
  rootStore: PropTypes.object
}

export default ClassAdmin
