import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import Assignments from '../components/ClassEditor/Assignments'
import ClassForm from './ClassForm'
import FileViewer from '../../components/FileViewer'
import GradeScale from '../components/ClassEditor/GradeScale'
import IssuesModal from './IssuesModal'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import Professor from '../components/ClassEditor/Professor'
import StatusForm from './StatusForm'
import Weights from '../components/ClassEditor/Weights'
import {FileTabs, FileTab} from '../../components/FileTab'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import actions from '../../actions'
import {mapProfessor} from '../../utilities/display'
import {mapTimeToDisplay} from '../../utilities/time'

const steps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]

const ContentEnum = {
  PROFESSOR: 0,
  GRADE_SCALE: 1,
  WEIGHTS: 2,
  ASSIGNMENTS: 3
}

class SyllabusTool extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the documents for a class.
  * Lock the class.
  */
  componentWillMount () {
    this.intializeComponent()
  }

  /*
  * Unlock the class on component will mount
  */
  componentWillUnmount () {
    this.unlockClass()
  }

  /*
  * Intialize the component
  */
  intializeComponent () {
    this.setState(this.initializeState())
    this.getClass()
    this.getDocuments()
    this.getLocks()
    this.lockClass()
  }

  /*
  * Initialize state
  */
  initializeState () {
    const {state} = this.props.location
    const currentIndex = this.initializeCurrentIndex()
    return {
      cl: null,
      currentDocumentIndex: 0,
      currentDocument: null,
      currentIndex,
      disableNext: false,
      documents: [],
      gettingClass: false,
      isDIY: state.isDIY || false,
      isAdmin: state.isAdmin || false,
      isReviewer: state.isReviewer || false,
      isSW: state.isSW || false,
      loadingClass: true,
      locks: [],
      openEditClassModal: false,
      openIssuesModal: false,
      sectionId: state.sectionId || null,
      stepCount: 4,
      submiting: false
    }
  }

  /*
  * Intialize the current index of content to be shown.
  */
  initializeCurrentIndex () {
    const {state} = this.props.location
    let currentIndex = ContentEnum.WEIGHTS
    if (state.isAdmin && !state.isSW) currentIndex = ContentEnum.PROFESSOR
    if (state.sectionId) {
      switch (state.sectionId) {
        case 100:
          currentIndex = ContentEnum.WEIGHTS
          break
        case 200:
          currentIndex = ContentEnum.ASSIGNMENTS
          break
        case 300:
          currentIndex = ContentEnum.WEIGHTS
          break
        default:
          break
      }
    }
    return currentIndex
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
    const {params: {classId}} = this.props
    actions.classes.getClassById(classId).then((cl) => {
      this.setState({cl, loadingClass: false})
    }).catch((error) => {  this.setState({loadingClass: false}) })
  }
  /*
  * Fetch the documnets for a class.
  */
  getDocuments () {
    const {params: {classId}} = this.props
    actions.documents.getClassDocuments(classId).then((documents) => {
      documents.sort((a, b) => b.is_syllabus)
      this.setState({documents, currentDocument: (documents[0] && documents[0].path) || null})
    }).catch(() => false)
  }

  getLocks () {
    const {params: {classId}} = this.props
    actions.classes.getLocks(classId).then((locks) => {
      this.setState({locks})
    }).catch(() => false)
  }

  /*
  * Lock the class for DIY or admin who are not working as SW.
  */
  lockClass () {
    if (this.state.isDIY || (this.state.isAdmin && !this.state.isSW)) {
      const {params: {classId}} = this.props
      const form = {is_class: true}
      actions.classes.lockClass(classId, form).then(() => {
      }).catch((error) => {
        if (error === 409 && this.state.isDIY) {
          browserHistory.push('/student/classes')
        }
      })
    }
  }

  /*
  * Unlock the the class when not complete.
  */
  unlockClass () {
    const {params: {classId}} = this.props
    const form = (this.state.isDIY || (this.state.isAdmin && !this.state.isSW)) ?
      {is_class: true} : {class_lock_section_id: this.state.sectionId}

    actions.classes.unlockClass(classId, form).then(() => {
    }).catch(() => false)
  }

  /*
  * Unlock and complete for diy
  */
  unlockDIYLock () {
    const {params: {classId}} = this.props
    const form = {is_class: true, is_completed: true}
    this.setState({submitting: true})
    actions.classes.unlockClass(classId, form).then(() => {
      browserHistory.push('/student/classes')
      this.setState({submitting: false})
    }).catch(() => { this.setState({submitting: false}) })
  }

  /*
  * Unlock the class for syllabus worker.
  */
  unlockSWLock () {
    const {params: {classId}} = this.props
    const form = {class_lock_section_id: this.state.sectionId, is_completed: true}

    this.setState({submitting: true})
    actions.classes.unlockClass(classId, form).then(() => {
      this.handleSWNext()
      this.setState({submitting: false})
    }).catch(() => { this.setState({submitting: false}); browserHistory.push('/hub/landing') })
  }

  /*
  * Update the class in state.
  *
  * @param [Object]. The class to update with
  */
  updateClass (cl) {
    this.setState({cl})
  }

  /*
  * Render the controls for the syllabi worker or admin.
  */
  renderSWControls () {
    const {isDIY, cl: {school}} = this.state
    if (!isDIY) {
      return (
        <div className='cn-sw-controls'>
          <div>
            <div>{school && school.name}</div>
          </div>
        </div>
      )
    }
  }

  /*
  * Render the syllabus section content.
  */
  renderContent () {
    const {isReviewer} = this.state
    switch (this.state.currentIndex) {
      case ContentEnum.PROFESSOR:
        return <Professor cl={this.state.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.GRADE_SCALE:
        return <GradeScale cl={this.state.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.WEIGHTS:
        return <Weights cl={this.state.cl} isReview={isReviewer} disableNext={this.state.disableNext} toggleDisabled={this.toggleDisabled.bind(this)} />
      case ContentEnum.ASSIGNMENTS:
        return <Assignments cl={this.state.cl} isReview={isReviewer} />
      default:
    }
  }

  /*
  * Render the syllabus section tabs for user to tab between syllabus section content.
  * Render for syllabus workers and admin. Not for DIY.
  */
  renderSectionTabs () {
    const {isReviewer, isAdmin, isSW} = this.state
    if (isReviewer || (isAdmin && !isSW)) {
      if (isReviewer) {
        return (
          <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentIndex-2}>
            <FileTab className='flex' name='Weights' onClick={() => this.setState({currentIndex: 2})} />
            <FileTab className='flex' name='Assignments' onClick={() => this.setState({currentIndex: 3})} />
          </FileTabs>
        )
      } else {
        return (
          <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentIndex}>
            <FileTab className='flex' name='Professor Info' onClick={() => this.setState({currentIndex: 0})} />
            <FileTab className='flex' name='Grade Scale' onClick={() => this.setState({currentIndex: 1})} />
            <FileTab className='flex' name='Weights' onClick={() => this.setState({currentIndex: 2})} />
            <FileTab className='flex' name='Assignments' onClick={() => this.setState({currentIndex: 3})} />
          </FileTabs>
        )
      }
    }
  }

  /*
  * Render the document tabs for the user to tab between documents.
  */
  renderDocumentTabs () {
    return (
      <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentDocumentIndex}>
        {
          this.state.documents.map((document, index) => {
            return (
              <FileTab
                key={index}
                name={document.name}
                onClick={() =>
                  this.setState({currentDocument: document.path, currentDocumentIndex: index})
                }
              />
            )
          })
        }
      </FileTabs>
    )
  }

  /*
  * Render the progress bar for DIY.
  */
  renderProgressBar () {
    const {isDIY} = this.state
    if (isDIY) {
      return (
        <div className='margin-bottom'>
          <ProgressBar currentStep={this.state.currentIndex}>
            {steps.map((step, index) => {
              return <ProgressStep key={`step-${index}`} label={step} />
            })}
          </ProgressBar>
        </div>
      )
    }
  }

  /*
  * Render the back button to tab between syllabus sections
  */
  renderBackButton () {
    const {currentIndex, isDIY} = this.state

    if (currentIndex > ContentEnum.WEIGHTS && isDIY) {
      return (
        <a className='back-button' onClick={this.onPrevious.bind(this)}>
          <i className='fa fa-angle-left' />
        </a>
      )
    }
  }

  /*
  * Render the skip button for DIY
  */
  renderSkipButton () {
    const {isDIY} = this.state

    {/* TODO Put this back in
      if (isDIY) {
        return (
          <a className='skip-button' onClick={() => false}>
            <span>Skip this class</span>
          </a>
        )
      }
    */}
  }

  /*
  * Render the enrollment count for admin.
  */
  renderEnrollment () {
    const {isAdmin, cl} = this.state
    if (isAdmin) {
      return (
        <div>
          <span style={{marginRight: '5px'}}>{cl.enrollment || 0}</span>
          <i className='fa fa-user' />
        </div>
      )
    }
  }

  /*
  * Render the class details for non DIY
  */
  renderClassDetails () {
    const {cl: {number, professor, meet_days, meet_start_time}, isDIY} = this.state

    if (!isDIY) {
      return (
        <div className='class-details'>
          <span>{number}</span>
          <span>{professor && mapProfessor(professor)}</span>
          <span>{meet_days}: {meet_start_time ? mapTimeToDisplay(meet_start_time) : 'TBA'}</span>
        </div>
      )
    }
  }

  renderClassIssue () {
    const {cl, isDIY} = this.state
    const helpRequests = cl.help_requests.filter(h => !h.is_completed)
    const needsHelp = helpRequests.length > 0
    if (needsHelp && !isDIY) {
      return (
        <div className='issue-icon-container' onClick={this.toggleIssuesModal.bind(this)}>
          <div className='message-bubble triangle-top'>
            {helpRequests[0].note}
            <div className='triangle-inner' />
          </div>
          <i className='fa fa-exclamation-triangle cn-red margin-right' />
        </div>
      )
    }
  }

  /*
  * Render having issues for admin and SW
  */
  renderHavingIssues () {
    const {isAdmin, isSW} = this.state

    if (isAdmin || isSW) {
      return (
        <a
          className='having-issues cn-red'
          onClick={this.toggleIssuesModal.bind(this)}
        >Having issues?</a>
      )
    }
  }

  /*
  * Render the having issues modal.
  */
  renderIssuesModal () {
    return (
      <IssuesModal
        cl={this.state.cl}
        open={this.state.openIssuesModal}
        onClose={this.toggleIssuesModal.bind(this)}
        onSubmit={this.updateClass.bind(this)}
      />
    )
  }

  /*
  * Render the editclass modal.
  */
  renderEditClassModal () {
    return (
      <Modal
        open={this.state.openEditClassModal}
        onClose={this.toggleEditClassModal.bind(this)}
      >
        <ClassForm
          cl={this.state.cl}
          onClose={this.toggleEditClassModal.bind(this)}
          onSubmit={this.updateClass.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the status form of the class for the admin to update.
  */
  renderStatusForm () {
    if (this.state.isAdmin && !this.state.isSW) {
      return (
        <div className='cn-status-form'>
          <StatusForm cl={this.state.cl}/>
        </div>
      )
    }
  }

  /*
  * Render the button text dependent on worker.
  */
  renderButtonText () {
    const {isDIY, isReviewer, isAdmin, isSW} = this.state
    let text = ''
    if ((isReviewer || isDIY) && this.state.currentIndex === ContentEnum.ASSIGNMENTS) text = 'Everything looks good. Submit info and continue'
    else if (isAdmin && !isSW) text = 'Done'
    else text = 'Next'
    return text
  }

  renderWrench () {
    const {isAdmin, cl} = this.state
    if (isAdmin && !cl.is_editable) {
      return (
        <div className='margin-left'>
          <i className='fa fa-wrench cn-red cursor' onClick={this.toggleWrench.bind(this)} />
        </div>
      )
    }
    else if (isAdmin && cl.is_editable) {
      return (
        <div className='margin-left'>
          <i className='fa fa-wrench cn-grey cursor' onClick={this.toggleWrench.bind(this)} />
        </div>
      )
    }
  }

  toggleWrench () {
    const {cl} = this.state
    actions.classes.updateClass({id: cl.id, is_editable: !cl.is_editable}).then((cl) => {
      this.setState({cl})
    }).catch(() => false)
  }

  /*
  * On syllabus section done.
  */
  onNext () {
    const {isDIY, isReviewer, isAdmin, isSW} = this.state

    if (isDIY) {
      this.handleDIYNext()
    } else if (isAdmin && !isSW) {
      browserHistory.push('/hub/classes')
    } else if (isAdmin || isSW) {
      if (isReviewer && this.state.currentIndex !== (this.state.stepCount - 1)) {
        this.setState({currentIndex: this.state.currentIndex + 1})
      } else {
        this.unlockSWLock()
      }
    }
  }

  /*
  * On DIY next
  * If DIY is done, complete class.
  */
  handleDIYNext () {
    if (this.state.sectionId === 100) {
      const {cl} = this.state
      browserHistory.push(`/class/${cl.id}/syllabus_tool/tutorial/assignments`)
    } else {
      this.unlockDIYLock()
    }
  }

  /*
  * Get the next class with an open syllabus section for syllabus
  * worker to work on.
  */
  handleSWNext () {
    const {sectionId} = this.state
    let sectionName = sectionId === 100 ? 'weights' : sectionId === 200 ?
      'assignments' : 'reviews'
    this.getNextClass(sectionName)
  }

  /*
  * Fetch the next class for SW.
  *
  * @param [String] sectionName. Name of the section SW is working on.
  */
  getNextClass (sectionName) {
    this.setState({gettingClass: true})
    actions.syllabusworkers.getNextClass(sectionName).then((cl) => {
      const {state} = this.props.location
      browserHistory.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: {...state} })
      this.intializeComponent()
      this.setState({gettingClass: false})
    }).catch(() => { this.setState({gettingClass: false}) })
  }

  /*
  * Render a way to tab back for DIY.
  */
  onPrevious () {
    if (this.state.currentIndex > ContentEnum.WEIGHTS) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  /*
  * Toggle the issues modal.
  */
  toggleIssuesModal () {
    this.setState({openIssuesModal: !this.state.openIssuesModal})
  }

  /*
  * Toggle the edit class modal.
  */
  toggleEditClassModal () {
    this.setState({openEditClassModal: !this.state.openEditClassModal})
  }

  /*
  * Disable the next button
  *
  * @param [Boolean] value. Boolean value to indicate if next button should be disabled
  */
  toggleDisabled (value) {
    this.setState({disableNext: value})
  }

  tagUploader () {
    const {documents, currentDocumentIndex, isAdmin} = this.state
    if(isAdmin) {
      let document = documents[currentDocumentIndex]
      const email = document.user ? document.user.email : null

      if (email) {
        return (
          <div className='margin-right' style={{position: 'absolute', marginTop: '-1.2em', alignSelf: 'flex-end'}}>
            <i className='fa fa-user' />
            <span style={{marginRight: '2px'}}>{email}</span>
          </div>
        )
      }
    }
  }

  tagWorker () {
    let lock = null
    if (this.state.currentIndex === ContentEnum.WEIGHTS) {
      lock = this.state.locks.find(lock => lock.class_lock_section.id === 100)
    } else if (this.state.currentIndex === ContentEnum.ASSIGNMENTS) {
      lock = this.state.locks.find(lock => lock.class_lock_section.id === 200)
    }
    const email = lock ? lock.user.email : null

    if (email) {
      return (
        <div className='margin-left' style={{position: 'absolute', marginTop: '-1.2em'}}>
          <i className='fa fa-user' />
          <span style={{marginLeft: '2px'}}>{email}</span>
        </div>
      )
    }
  }

  render () {
    const {cl, disableNext, loadingClass, isAdmin,
      isReviewer, isDIY, currentIndex, gettingClass, submitting} = this.state

    const disableButton = disableNext || gettingClass || submitting
    const disabledClass = disableButton ? 'disabled' : ''
    const completeClass = ((isReviewer || isDIY) &&
      currentIndex === ContentEnum.ASSIGNMENTS) ? 'cn-green-background' : ''

    if (loadingClass) return <Loading />
    return (
      <div className='cn-syllabus-tool-container'>

        <div className='cn-header-container'>
          {this.renderSWControls()}
          <div className='cn-class-info col-xs-12'>
            {this.renderBackButton()}

            <div className='header-container'>
              <div className='header'>
                {this.renderClassIssue()}
                <h2>{cl && cl.name}</h2>
                {isAdmin && <div className='margin-left'>
                  <i className='fa fa-pencil cn-blue cursor' onClick={this.toggleEditClassModal.bind(this)} />
                </div>}
                {this.renderWrench()}

              </div>
              {this.renderClassDetails()}
            </div>
            <div>
              {this.renderSkipButton()}
              {this.renderEnrollment()}
            </div>
          </div>
        </div>

        <div className='cn-body-container'>

          <div className='cn-section-container cn-control-panel'>
            {this.tagWorker()}
            <div className='cn-section-control'>
              {this.renderContent()}
            </div>
            {this.renderSectionTabs()}
          </div>

          <div className='cn-section-container cn-file-panel'>
            {this.tagUploader()}
            <div className='cn-section-control'>
              {this.state.currentDocument && <FileViewer source={this.state.currentDocument} /> }
            </div>
            {this.renderDocumentTabs()}
            {this.renderHavingIssues()}
          </div>

        </div>

        <div className='cn-footer-container'>
          {this.renderStatusForm()}

          <button
            className={`button margin-top margin-bottom ${completeClass} ${disabledClass}`}
            disabled={disableButton}
            onClick={this.onNext.bind(this)}
          >{this.renderButtonText()}</button>

          {this.renderProgressBar()}
        </div>

        {this.renderIssuesModal()}
        {this.renderEditClassModal()}
      </div>
    )
  }
}

SyllabusTool.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object
}

export default SyllabusTool
