import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'

@inject('rootStore') @observer
class ProjectFourDoor extends React.Component {
  renderContent () {
    const {userStore: {user: {student: {school: {is_diy_enabled, is_diy_preferred, is_auto_syllabus}}}}} = this.props.rootStore

    // needs syllabus
    if (this.needsSyllabus()) {
      return this.renderNeedsSyllabus()
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
    let spanText = hasUnsavedSyllabi ? 'Double check to make sure you are submitting the correct file(s).' : 'Upload your syllabus.'
    return (
      <div className='center-text'>
        <span>{spanText}</span>
        <button className={`button full-width margin-top ${hasUnsavedSyllabi ? '' : 'disabled'}`}
                disabled={!hasUnsavedSyllabi}
                onClick={() => { this.props.onSubmit() }}>Submit</button>
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
  * Determine if the class is in 'needs syllabus' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsSyllabus () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Syllabus')
  }

  /*
  * Handle user DIY.
  */
  onDIY () {
    const {cl} = this.props
    browserHistory.push(`/class/${cl.id}/syllabus_tool/tutorial/weights`)
  }

  render () {
    return this.isWeights() || this.needsSyllabus() ? this.renderContent() : this.renderMessages()
  }
}

ProjectFourDoor.propTypes = {
  cl: PropTypes.object,
  rootStore: PropTypes.object
}

export default ProjectFourDoor
