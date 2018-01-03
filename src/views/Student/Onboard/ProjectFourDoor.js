import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

@inject('rootStore') @observer
class ProjectFourDoor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {classes: []}
  }

  /*
  * Fetch the classes for a student.
  */
  componentWillMount () {
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
    }).catch(() => false)
  }

  renderContent () {
    const {userStore: {user: {student: {school: {is_diy_enabled, is_diy_preferred, is_auto_syllabus}}}}} = this.props.rootStore

    if (is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return this.renderNormal()
    } else if (is_diy_enabled && is_diy_preferred && is_auto_syllabus) {
      return this.renderInverted()
    } else if (!is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return this.renderCompass()
    } else if (is_diy_enabled && is_diy_preferred && !is_auto_syllabus) {
      return this.renderDIY()
    } else {
      return this.renderNormal()
    }
  }

  renderNormal () {
    return (
      <div className='center-text margin-top'>
        <div className='margin-top margin-bottom' style={{marginTop: '2em', marginBottom: '2em'}}>
          <button className='button' onClick={this.onSkoller.bind(this)}>Hang out while the Skoller team takes care of it</button>
          <div>
            <span className='info-2'>{'You\'ll have to wait up to 72 hours for your classes to be set up'}</span>
          </div>
        </div>
        <div className='margin-top margin-bottom'>
          <a className='margin-top' onClick={this.onDIY.bind(this)}>Or, input  your syllabus information right now</a>
          <div>
            <span className='info-2'>This only takes a few minutes</span>
          </div>
        </div>
      </div>
    )
  }

  renderInverted () {
    return (
      <div className='center-text margin-top'>
        <div className='margin-top margin-bottom' style={{marginTop: '2em', marginBottom: '2em'}}>
          <button className='button' onClick={this.onDIY.bind(this)}>Input your syllabus information right now</button>
          <div>
            <span className='info-2'>This only takes a few minutes</span>
          </div>
        </div>
        <div className='margin-top margin-bottom'>
          <a className='margin-top' onClick={this.onSkoller.bind(this)}>Or, hang out while the Skoller team takes care of it</a>
          <div>
            <span className='info-2'>{'You\'ll have to wait up to 72 hours for your classes to be set up'}</span>
          </div>
        </div>
      </div>
    )
  }

  renderCompass () {
    return (
      <div className='center-text margin-top'>
        <div className='margin-top margin-bottom' style={{marginTop: '2em', marginBottom: '2em'}}>
          <span className='info-2' style={{display: 'block', textAlign: 'left'}}>Hang tight while the Skoller team takes care of that for you and your classamtes! We wil send you a notification when your classes are ready.</span>
          <div style={{marginTop: '2em', marginBottom: '2em'}}>
            <button className='button' onClick={this.onSkoller.bind(this)}>Enter Skoller</button>
          </div>
        </div>
      </div>
    )
  }

  renderDIY () {
    return (
      <div className='center-text margin-top'>
        <div className='margin-top margin-bottom' style={{marginTop: '2em', marginBottom: '2em'}}>
          <button className='button' onClick={this.onDIY.bind(this)}>Input the information right now</button>
          <div>
            <span className='info-2'>This only takes a few minutes</span>
          </div>
        </div>
        <div className='margin-top margin-bottom'>
          <a className='margin-top' onClick={this.onSkoller.bind(this)}>Let one of my classmates take care of it</a>
          <div>
            <span className='info-2'>{'This will probably take more than a few minutes'}</span>
          </div>
        </div>
      </div>
    )
  }

  /*
  * Handle skoller
  */
  onSkoller () {
    browserHistory.push('/student/classes')
  }

  /*
  * Handle user DIY.
  */
  onDIY () {
    browserHistory.push({ pathname: '/tutorial/weights', state: {cl: this.props.cl} })
  }

  getIncompleteClassesLength () {
    return this.state.classes.filter(cl => !cl.is_complete).length
  }

  render () {
    return (
      <div className='cn-container'>
        <h1><i className="em em-boom"/> BOOM</h1>
        <p>Your account is all set up and ready to go!</p>
        <p><strong>{this.getIncompleteClassesLength()} of your classes are waiting for the syllabi information to be inputted into Skoller.</strong></p>
        {
          this.getIncompleteClassesLength() > 0
            ? this.renderContent()
            : <div style={{textAlign: 'center', marginTop: '2em', marginBottom: '2em'}}>
              <button className='button' onClick={this.onSkoller.bind(this)}>Enter Skoller</button>
            </div>

        }
      </div>
    )
  }
}

ProjectFourDoor.propTypes = {
  rootStore: PropTypes.object
}

export default ProjectFourDoor
