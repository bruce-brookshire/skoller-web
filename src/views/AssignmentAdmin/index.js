import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AssignmentCard from './AssignmentCard'
import actions from '../../actions'
import ModCard from './ModCard'
import Modal from '../../components/Modal'
import ModDetail from './ModDetail'
import AssignmentPosts from './AssignmentPosts'

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
      posts: assignment.posts || []
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
