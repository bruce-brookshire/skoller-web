import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import StudentRequestModal from './StudentRequestModal'
import actions from '../../../actions'
import Loading from '../../../components/Loading'

@inject('rootStore') @observer
class ProjectFourDoor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openStudentRequestModal: false,
      studentModalError: null,
      school: {},
      loading: false
    }
  }

  componentWillMount () {
    this.setState({loading: true})
    actions.classes.getClassById(this.props.cl.id).then((cl) => {
      this.setState({school: cl.school, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

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
  * Determine if the class is in 'needs syllabus' state to render Project4Door.
  *
  * @return [Boolean]. boolean indicating if the class is in needs syllabus
  */
  needsSyllabus () {
    const {cl} = this.props
    return (cl.status && cl.status.name === 'Needs Syllabus')
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

  /*
  * Toggle the student request modal.
  *
  * @return null.
  */
  toggleStudentRequestModal () {
    this.setState({openStudentRequestModal: !this.state.openStudentRequestModal})
  }

  /*
  * Run when the modal errors out
  *
  * @return null.
  */
  onStudentRequestModalError () {
    this.setState({
      studentModalMessageShowing: true,
      studentModalError: true,
      openStudentRequestModal: false
    })
    setTimeout(() => {
      this.setState({
        studentModalMessageShowing: false
      })
    }, 3000)
  }

  /*
  * Run when the modal change is successful
  *
  * @return null.
  */
  onStudentRequestModalSuccess () {
    this.setState({
      studentModalMessageShowing: true,
      studentModalError: false,
      openStudentRequestModal: false
    })
    setTimeout(() => {
      this.setState({
        studentModalMessageShowing: false
      })
    }, 3000)
  }

  renderNeedAssistance () {
    const {cl} = this.props
    return (
      <div>
        <div className='center-text'>
          <a onClick={() => { this.toggleStudentRequestModal() }}>Need assistance?</a>
        </div>
        {this.renderRequestModalMessage()}
        <StudentRequestModal
          open={this.state.openStudentRequestModal}
          onClose={() => this.toggleStudentRequestModal.bind(this)}
          onError={() => { this.onStudentRequestModalError() }}
          onSuccess={() => { this.onStudentRequestModalSuccess() }}
          cl={cl}>
        </StudentRequestModal>
      </div>
    )
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

  renderNeedsSyllabus () {
    let hasUnsavedSyllabi = this.props.unsavedSyllabi && this.props.unsavedSyllabi.length > 0
    let spanText = hasUnsavedSyllabi ? 'Double check to make sure you\'re submitting the correct file(s).' : 'Upload your syllabus.'
    return (
      <div className='center-text'>
        <span>{spanText}</span>
        <button className={`button full-width margin-top cn-shadow-box ${hasUnsavedSyllabi && !this.props.uploading ? '' : 'disabled'}`}
          disabled={!hasUnsavedSyllabi || this.props.uploading}
          onClick={() => { this.props.onSubmit() }}>{this.props.uploading ? (<i className='fa fa-circle-o-notch fa-spin'></i>) : 'Submit'}</button>
      </div>
    )
  }

  renderSkollerWorking () {
    return (
      <div>
        <div className='center-text'>
          <span>Hang tight. Skoller is working on this syllabus right now.</span><br/><br/>
        </div>
        {this.renderNeedAssistance()}
      </div>
    )
  }

  renderComplete () {
    return (
      <div>
        <div className='center-text'>
          <span>All done! You and your classmates are good to go.</span><br/><br/>
        </div>
        {this.renderNeedAssistance()}
      </div>
    )
  }

  renderRequestModalMessage () {
    if (this.state.studentModalMessageShowing) {
      return (
        <div className='center-text request-modal-message'>
          {this.state.studentModalError ? 'Error creating request.' : 'Your request has been received. Thank you!'}
        </div>
      )
    } else {
      return null
    }
  }

  renderFourDoor () {
    const {is_auto_syllabus: autoSyllabus, is_diy_enabled: diy, is_diy_preferred: diyPref} = this.state.school
    // in review
    if (this.inHelp()) {
      return this.renderSkollerWorking()
    // complete
    } else if (this.isComplete()) {
      return this.renderComplete()
    // needs syllabus
    } else if (this.needsSyllabus()) {
      return this.renderNeedsSyllabus()
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
    const {loading} = this.state
    return loading ? <Loading /> : this.renderFourDoor()
  }
}

ProjectFourDoor.propTypes = {
  cl: PropTypes.object,
  rootStore: PropTypes.object,
  unsavedSyllabi: PropTypes.array,
  uploading: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default ProjectFourDoor
