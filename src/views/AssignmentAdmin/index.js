import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AssignmentCard from './AssignmentCard'
import actions from '../../actions'
import ModCard from './ModCard'
import SkModal from '../../views/components/SkModal/SkModal'
import ModDetail from './ModDetail'
import AssignmentPosts from './AssignmentPosts'
import AdminAssignmentForm from '../components/ClassEditor/Assignments/AdminAssignmentForm'

@inject('rootStore') @observer
class AssignmentAdmin extends React.Component {
  constructor (props) {
    super(props)
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Assignment Admin'
    this.state = this.initializeState()
  }

  initializeState () {
    const {assignment} = this.props.location.state
    return {
      loading: false,
      mods: [],
      openModModal: false,
      currentMod: null,
      posts: assignment.posts || [],
      openAssignmentModal: false,
      assignment: assignment,
      studentCount: assignment.student_count || 0
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

  onDeletePost (post) {
    const newPosts = this.state.posts.filter(p => p.id !== post.id)
    console.log(newPosts)
    this.setState({posts: newPosts})
  }

  onModSelect (item) {
    this.setState({openModModal: true, currentMod: item})
  }

  toggleAssignmentModal () {
    this.setState({openAssignmentModal: !this.state.openAssignmentModal})
  }

  renderAssignmentCard () {
    const {school, weights} = this.props.location.state
    const {assignment, mods, studentCount} = this.state
    return (
      <AssignmentCard
        assignment={assignment}
        school={school}
        weights={weights}
        onClickEdit={this.toggleAssignmentModal.bind(this)}
        modCount={mods.length}
        studentCount={studentCount}
      />
    )
  }

  /*
  * Render the editclass modal.
  */
  renderModModal () {
    const {openModModal, currentMod} = this.state
    return (
      <Modal
        open={openModModal}
        onClose={() => this.setState({openModModal: false, currentMod: null})}
      >
        <ModDetail
          mod={currentMod}
        />
      </Modal>
    )
  }

  renderAssignmentPosts () {
    const {assignment} = this.props.location.state
    const {posts} = this.state
    return (
      <AssignmentPosts
        assignment={assignment}
        posts={posts}
        onDelete={this.onDeletePost.bind(this)}
      />
    )
  }

  renderAssignmentModal () {
    const {openAssignmentModal, assignment} = this.state
    const {cl, weights} = this.props.location.state
    if (openAssignmentModal) {
      return (
        <SkModal
          closeModal={() => this.toggleAssignmentModal()}
        >
          <AdminAssignmentForm
            assignment={assignment}
            cl={cl}
            onUpdateAssignment={(assignment) => this.setState({assignment: assignment, openAssignmentModal: !openAssignmentModal})}
            isAdmin={true}
            weights={weights}
          />
        </SkModal>
      )
    }
  }

  render () {
    const {mods, currentMod} = this.state
    const {school, weights} = this.props.location.state
    return (
      <div id='cn-assignment-admin-container'>
        {this.renderAssignmentCard()}
        {mods && <ModCard
          mods={mods}
          timeZone={school.timezone}
          weights={weights}
          onSelect={this.onModSelect.bind(this)}
        />}
        {this.renderAssignmentPosts()}
        {currentMod && this.renderModModal()}
        {this.renderAssignmentModal()}
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
