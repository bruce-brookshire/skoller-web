import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'

@inject('rootStore') @observer
class ProjectFourDoor extends React.Component {
  /*
  * Determine if the class is 'complete'.
  *
  * @return [Boolean]. boolean indicating if the class is complete
  */
  isComplete () {
    const {cl} = this.props
    return (cl.status && cl.status.is_complete)
  }

  /*
  * Handle user DIY.
  */
  onDIY () {
    const {cl} = this.props
    browserHistory.push({
      pathname: `/class/${cl.id}/syllabus_tool/`,
      state: {
        isDIY: true
      }
    })
  }

  /*
  * Determine if the class is in review status (able to request help)
  *
  * @return [Boolean]. boolean indicating if the class is in review
  */
  inHelp () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Help')
  }

  renderNormal () {
    return (
      <div className='cn-project-four-door'>
        <div className='margin-bottom'>Hang out while the Skoller team takes care of it</div>
        <div className='margin-bottom'>--- OR ---</div>
        <button className='button full-width cn-shadow-box' onClick={this.onDIY.bind(this)}>Input your syllabus information now</button>
      </div>
    )
  }

  renderInverted () {
    return (
      <div className='cn-project-four-door'>
        <button className='button full-width cn-shadow-box' onClick={this.onDIY.bind(this)}>Review syllabus now</button>
        <div className='margin-bottom'>--- OR ---</div>
        <span>Skoller will automatically review it for you within 24 hours.</span>
      </div>
    )
  }

  renderCompass () {
    return (
      <div className='cn-project-four-door'>
        <h2>All done!</h2>
        <span>Hang tight while Skoller reviews your syllabus for you</span>
      </div>
    )
  }

  renderDIY () {
    return (
      <div className='cn-project-four-door'>
        <button className='button full-width cn-shadow-box' onClick={this.onDIY.bind(this)}>Review syllabus now</button>
        <div className='margin-bottom'>--- OR ---</div>
        <span>Wait for a classmate to review the syllabus, but this could take a while...</span>
      </div>
    )
  }

  renderSkollerWorking () {
    return (
      <div className='center-text'>
        <span>Hang tight. Skoller is working on this syllabus right now.</span><br/><br/>
      </div>
    )
  }

  renderComplete () {
    return (
      <div className='center-text'>
        <span>All done! You and your classmates are good to go.</span><br/><br/>
      </div>
    )
  }

  renderFourDoor () {
    const {is_auto_syllabus: autoSyllabus, is_diy_enabled: diy, is_diy_preferred: diyPref} = this.props.cl.school
    // in review
    if (this.inHelp()) {
      return this.renderSkollerWorking()
    // complete
    } else if (this.isComplete()) {
      return this.renderComplete()
    // normal
    } else if (diy && !diyPref && autoSyllabus) {
      return this.renderNormal()
    // inverted
    } else if (diy && diyPref && autoSyllabus) {
      return this.renderInverted()
      // compass
    } else if (!diy && !diyPref && autoSyllabus) {
      return this.renderCompass()
      // diy
    } else if (diy && !autoSyllabus) {
      return this.renderDIY()
    } else {
      return this.renderNormal()
    }
  }

  render () {
    return this.renderFourDoor()
  }
}

ProjectFourDoor.propTypes = {
  cl: PropTypes.object,
  rootStore: PropTypes.object
}

export default ProjectFourDoor
