import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import StudentRequestModal from './StudentRequestModal'

@inject('rootStore') @observer
class ProjectFourDoor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openStudentRequestModal: false,
    }
  }

  /*
  * Determine if the class is 'complete'.
  *
  * @return [Boolean]. boolean indicating if the class is complete
  */
  isComplete () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Complete')
  }

  /*
  * Determine if the class is in weights to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in weights
  */
  isWeights () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Weights')
  }

  /*
  * Handle user DIY.
  */
  onDIY () {
    const {cl} = this.props
    browserHistory.push(`/class/${cl.id}/syllabus_tool/tutorial/weights`)
  }

  /*
  * Determine if the class is in 'needs syllabus' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsSyllabus () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Syllabus')
  }

  /*
  * Toggle the student request modal.
  *
  * @return null.
  */
  toggleStudentRequestModal () {
    console.log(this.state.openStudentRequestModal)
    this.setState({openStudentRequestModal: !this.state.openStudentRequestModal})
  }

  renderContent () {
    const {userStore: {user: {student: {school: {is_diy_enabled, is_diy_preferred, is_auto_syllabus}}}}} = this.props.rootStore

    // needs syllabus
    if (this.needsSyllabus()) {
      return this.renderNeedsSyllabus()
    // complete
    }else if (this.isComplete()) {
      return this.renderComplete()
    // normal
    }else if (is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return this.renderNormal()
    }
    // inverted
    else if (is_diy_enabled && is_diy_preferred && is_auto_syllabus) {
      return this.renderInverted()
    }
    // compass
    else if (!is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return this.renderCompass()
    }
    // diy
    else if (is_diy_enabled && is_diy_preferred && !is_auto_syllabus) {
      return this.renderDIY()
    }
    // normal
    else {
      return this.renderNormal()
    }
  }

  renderNormal () {
    return (
      <div className='center-text'>
        <button className='button' onClick={this.onDIY.bind(this)}>Review syllabus now</button>
        <div>
          <span className='info-2'>Or Skoller will automatically review it for you within 72 hours.</span>
        </div>
      </div>
    )
  }

  renderInverted () {
    return (
      <div className='center-text'>
        <button className='button' onClick={this.onDIY.bind(this)}>Review syllabus now</button>
        <span className='info-2'>Or Skoller will automatically review it for you within 72 hours.</span>
      </div>
    )
  }

  renderCompass () {
    return (
      <div className='center-text'>
        <h2>All done!</h2>
        <span className='info-2'>Hang tight while Skoller reviews your syllabus for you</span>
      </div>
    )
  }

  renderDIY () {
    return (
      <div className='center-text'>
        <button className='button' onClick={this.onDIY.bind(this)}>Review syllabus now</button>
        <span className='info-2'>Wait for a classmate to review the syllabus, but this could take a while...</span>
      </div>
    )
  }

  renderNeedsSyllabus(){
    let hasUnsavedSyllabi = this.props.unsavedSyllabi && this.props.unsavedSyllabi.length > 0
    let spanText = hasUnsavedSyllabi ? 'Double check to make sure you\'re submitting the correct file(s).' : 'Upload your syllabus.'
    return (
      <div className='center-text'>
        <span>{spanText}</span>
        <button className={`button full-width margin-top ${hasUnsavedSyllabi && !this.props.uploading ? '' : 'disabled'}`}
                disabled={!hasUnsavedSyllabi || this.props.uploading}
                onClick={() => { this.props.onSubmit() }}>{this.props.uploading ? (<i className='fa fa-circle-o-notch fa-spin'></i>) : 'Submit'}</button>
      </div>
    )
  }

  renderComplete(){
    return (
      <div>
        <div className='center-text'>
          <span>All done! You and your classmates are good to go.</span><br/><br/>
          <a onClick={() => {this.toggleStudentRequestModal()}}>Need assistance?</a>
        </div>
        <StudentRequestModal
          open={this.state.openStudentRequestModal}
          onClose={() => this.toggleStudentRequestModal.bind(this)}>
        </StudentRequestModal>
      </div>
    )
  }

  renderMessages () {
    const {cl: {status: {name}}} = this.props

    let message = ''
    if (name === 'New Class' || name === 'Needs Syllabus') {
      message = 'Upload your syllabus.'
    } else if (name === 'Assignments' || name === 'Review' || name === 'Help') {
      message = 'Hang tight. Skoller is working on this syllabus right now.'
    } else if (name === 'Complete' || name === 'Change') {
      message = 'All done! You and your classmates are good to go.'
    }
    return (
      <div className='center-text'>
        <span>{message}</span>
      </div>
    )
  }

  render () {
    return this.isWeights() || this.needsSyllabus() || this.isComplete() ? this.renderContent() : this.renderMessages()
  }
}

ProjectFourDoor.propTypes = {
  cl: PropTypes.object,
  rootStore: PropTypes.object
}

export default ProjectFourDoor
