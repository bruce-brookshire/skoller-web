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
  * Determine if the class is in 'needs input' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsInput () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Student Input')
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

  renderOr () {
    return (
      <div id='or' className='margin-bottom'>
        <div className='line' />
        <div className='or cn-grey'>Don't want to wait?</div>
        <div className='line' />
      </div>
    )
  }

  renderDIYToolCall () {
    return (
      <div>
        <div className='cn-four-door-header'>Less than 5 minutes</div>
        <div className='margin-bottom'>Finish setting this class up using our <b>Do-It-Yourself</b> tool.</div>
        <button className='button full-width cn-shadow-box' onClick={this.onDIY.bind(this)}>Start</button>
      </div>
    )
  }

  renderHangTight () {
    return (
      <div>
        <div className='cn-four-door-header'>Less than 24 hours</div>
        <div className='margin-bottom'>Hang tight while Skoller grabs the important syllabus information.</div>
      </div>
    )
  }

  renderNormal () {
    return (
      <div className='cn-project-four-door'>
        {this.renderHangTight()}
        {this.renderOr()}
        {this.renderDIYToolCall()}
      </div>
    )
  }

  renderInverted () {
    return (
      <div className='cn-project-four-door'>
        {this.renderDIYToolCall()}
        <div className='subtext'><b>Skoller’s team is slammed</b> so waiting on us to finish the syllabus could take a few days.</div>
      </div>
    )
  }

  renderCompass () {
    return (
      <div className='cn-project-four-door'>
        {this.renderHangTight()}
      </div>
    )
  }

  renderDIY () {
    return (
      <div className='cn-project-four-door'>
        {this.renderDIYToolCall()}
        <div className='subtext'><b>Skoller is not processing syllabi</b> for this school at the moment.</div>
      </div>
    )
  }

  renderNeedsInput () {
    return (
      <div className='cn-project-four-door'>
        <div className='cn-four-door-subheading margin-bottom'><b>The Skoller team</b> received a syllabus but could not find enough info to set up the class.</div>
        <div className='cn-four-door-subheading'><b>Set up this class</b> using our <b>DIY tool</b> in less than 5 minutes!</div>
        <button className='button full-width cn-shadow-box' onClick={this.onDIY.bind(this)}>Start</button>
      </div>
    )
  }

  renderComplete () {
    return (
      <div className='cn-project-four-door'>
        <div className='cn-four-door-subheading'>Hop on the app to connect with classmates and <b>Keep Up with Classes, Together</b> 😎</div>
      </div>
    )
  }

  renderFourDoor () {
    const {is_auto_syllabus: autoSyllabus, is_diy_enabled: diy, is_diy_preferred: diyPref} = this.props.cl.school
    // complete
    if (this.isComplete()) {
      return this.renderComplete()
    // normal
    } else if (this.needsInput()) {
      return this.renderNeedsInput()
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
