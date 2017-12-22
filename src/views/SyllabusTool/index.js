import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import Assignments from '../components/ClassEditor/Assignments'
import GradeScale from '../components/ClassEditor/GradeScale'
import FileViewer from '../../components/FileViewer'
import IssuesModal from './IssuesModal'
import Professor from '../components/ClassEditor/Professor'
import Weights from '../components/ClassEditor/Weights'
import {FileTabs, FileTab} from '../../components/FileTab'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import actions from '../../actions'
import {mapProfessor} from '../../utilities/display'

const steps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]

const ContentEnum = {
  PROFESSOR: 0,
  GRADE_SCALE: 1,
  WEIGHTS: 2,
  ASSIGNMENTS: 3,
  REVIEW: 4
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
    this.getClass()
    this.getDocuments()
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
      isDIY: state.isDIY || false,
      isAdmin: state.isAdmin || false,
      isReviewer: state.isReviewer || false,
      isSW: state.isSW || false,
      loadingClass: false,
      openIssuesModal: false,
      sectionId: state.sectionId || null,
      stepCount: 5
    }
  }

  /*
  * Intialize the current index of content to be shown.
  */
  initializeCurrentIndex () {
    const {state} = this.props.location
    let currentIndex = ContentEnum.WEIGHTS
    if (state.isAdmin) currentIndex = ContentEnum.PROFESSOR
    if (state.sectionId) {
      switch (state.sectionId) {
        case 100:
          currentIndex = ContentEnum.WEIGHTS
          break
        case 200:
          currentIndex = ContentEnum.ASSIGNMENTS
          break
        case 300:
          currentIndex = ContentEnum.REVIEW
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
    this.setState({loadingClass: true})
    actions.classes.getClassById(classId).then((cl) => {
      this.setState({cl, loadingClass: false})
    }).catch(() => { this.setState({loadingClass: false}) })
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

  /*
  * Lock the class for DIY.
  */
  lockClass () {
    if (this.state.isDIY) {
      const {params: {classId}} = this.props
      const form = {is_class: true}
      actions.classes.lockClass(classId, form).then(() => {
      }).catch((error) => { if (error !== 422) browserHistory.push('/student/classes') })
    }
  }

  /*
  * Unlock the the class.
  */
  unlockClass () {
    const {params: {classId}} = this.props
    const form = this.state.isDIY ?
      {is_class: true} : {class_lock_section_id: this.state.sectionId}

    actions.classes.unlockClass(classId, form).then(() => {
    }).catch(() => false)
  }


  /*
  * Unlock the class for syllabus worker.
  */
  unlockSWLock () {
    const {params: {classId}} = this.props
    const form = {class_lock_section_id: this.state.sectionId, is_completed: true}

    actions.classes.unlockClass(classId, form).then(() => {
      this.handleSWNext()
    }).catch(() => { browserHistory.push('/hub/landing') })
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
        <div>
          <div className='left'>
            <a onClick={() => browserHistory.push('/hub/landing')}>Back to homepage</a>
          </div>
          <div className='right'>
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
    switch (this.state.currentIndex) {
      case ContentEnum.PROFESSOR:
        return <Professor cl={this.state.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.GRADE_SCALE:
        return <GradeScale cl={this.state.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.WEIGHTS:
        return <Weights cl={this.state.cl} disableNext={this.state.disableNext} toggleDisabled={this.toggleDisabled.bind(this)} />
      case ContentEnum.ASSIGNMENTS:
        return <Assignments cl={this.state.cl} />
      default:
    }
  }

  /*
  * Render the syllabus section tabs for user to tab between syllabus section content.
  * Render for syllabus workers and admin. Not for DIY.
  */
  renderSectionTabs () {
    const {isReviewer, isAdmin} = this.state
    if (isReviewer || isAdmin) {
      return (
        <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentIndex}>
          { isAdmin &&
            <FileTab name='Professor Info' onClick={() => this.setState({currentIndex: 0})} />
          }
          { isAdmin &&
            <FileTab name='Grade Scale' onClick={() => this.setState({currentIndex: 1})} />
          }
          <FileTab name='Weights' onClick={() => this.setState({currentIndex: 2})} />
          <FileTab name='Assignments' onClick={() => this.setState({currentIndex: 3})} />
          <FileTab name='Review' onClick={() => this.setState({currentIndex: 4})} />
        </FileTabs>
      )
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
        <div className='row actions-container full-width margin-top margin-bottom'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
            <ProgressBar currentStep={this.state.currentIndex}>
              {steps.map((step, index) => {
                return <ProgressStep key={`step-${index}`} label={step} />
              })}
            </ProgressBar>
          </div>
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

    if (isDIY) {
      return (
        <a className='skip-button' onClick={() => false}>
          <span>Skip this class</span>
        </a>
      )
    }
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
          <span>{meet_days}: {meet_start_time}</span>
        </div>
      )
    }
  }

  renderClassIssue () {
    const {cl, isDIY} = this.state
    const needsHelp = cl.help_requests.length > 0
    if (needsHelp && !isDIY) {
      return (
        <div className='issue-icon-container'>
          <div className='message-bubble triangle-bottom'>
            {cl.help_requests[0].note}
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
    const {isAdmin} = this.state

    if (isAdmin) {
      return (
        <a
          className='right cn-red'
          style={{color: 'red'}}
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
  * On syllabus section done.
  */
  onNext () {
    const {isDIY, isReviewer, isAdmin, isSW} = this.state

    if (isDIY) {
      this.handleDIYNext()
    } else if (isAdmin || isSW) {
      this.unlockSWLock()
    }
  }

  handleDIYNext () {
    if (this.state.currentIndex !== (this.state.stepCount - 1)) {
      this.setState({currentIndex: this.state.currentIndex + 1})
    }
  }


  /*
  * Get the next class with an open syllabus section for syllabus
  * worker to work on.
  */
  handleSWNext () {
    const {sectionId} = this.state
    switch (sectionId) {
      case 100:
        this.getNextWeightClass()
        break
      case 200:
        this.getNextAssignmentClass()
        break
      case 300:
        this.getNextReviewClass()
        break
      default:
        break
    }
  }

  /*
  * Fetch the next weight class for worker
  */
  getNextWeightClass () {
    actions.syllabusworkers.getWeightClass().then((cl) => {
      const {state} = this.props.location
      browserHistory.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: {...state} })
      this.intializeComponent()
    }).catch(() => false)
  }

  /*
  * Fetch the next assignment class for worker
  */
  getNextAssignmentClass () {
    actions.syllabusworkers.getAssignmentClass().then((cl) => {
      const {state} = this.props.location
      browserHistory.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: {...state} })
      this.intializeComponent()
    }).catch(() => false)
  }

  /*
  * Fetch the next review class for worker
  */
  getNextReviewClass () {
    actions.syllabusworkers.getWeightClass().then((cl) => {
      const {state} = this.props.location
      browserHistory.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: {...state} })
      this.intializeComponent()
    }).catch(() => false)
  }

  /*
  * Render a way to tab back for DIY.
  */
  onPrevious () {
    if (this.state.currentIndex > ContentEnum.WEIGHTS) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  toggleIssuesModal () {
    this.setState({openIssuesModal: !this.state.openIssuesModal})
  }

  /*
  * Disable the next button
  *
  * @param [Boolean] value. Boolean value to indicate if next button should be disabled
  */
  toggleDisabled (value) {
    this.setState({disableNext: value})
  }

  render () {
    const {cl, loadingClass, isAdmin} = this.state
    const disabledClass = this.state.disableNext ? 'disabled' : ''

    if (loadingClass) return <div />
    return (
      <div className='cn-syllabus-tool-container'>
        <div className='row full-width col-xs-12 col-md-10 col-lg-10'>
          <div className='row full-width'>
            {this.renderSWControls()}
            <div className='cn-class-info col-xs-12'>
              {this.renderBackButton()}

              <div className='header-container'>
                <div className='header'>
                  {this.renderClassIssue()}
                  <h2>{cl && cl.name}</h2>
                  {}
                  {isAdmin && <div className='margin-left'>
                    <i className='fa fa-wrench cn-red' style={{cursor: 'pointer'}} onClick={() => false} />
                  </div>}
                </div>
                {this.renderClassDetails()}
              </div>
              <div>
                {this.renderSkipButton()}
                {this.renderEnrollment()}
              </div>
            </div>
          </div>

          <div className='row full-width'>
            <div className='col-xs-12 col-md-6 col-lg-5 margin-top'>
              <div className='cn-section-container cn-syllabus-section-container'>
                {this.renderContent()}
              </div>
              {this.renderSectionTabs()}
            </div>
            <div className='col-xs-12 col-md-6 col-lg-7 margin-top'>
              <div className='cn-section-container'>
                {this.state.currentDocument && <FileViewer source={this.state.currentDocument} /> }
              </div>
              {this.renderDocumentTabs()}
              {this.renderHavingIssues()}
            </div>
          </div>

          <div className='row actions-container full-width margin-top'>
            <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
              <button
                className={`button full-width margin-bottom ${disabledClass}`}
                disabled={this.state.disableNext}
                onClick={this.onNext.bind(this)}
              >Next</button>
            </div>
          </div>

          {this.renderProgressBar()}

        </div>
        {this.renderIssuesModal()}
      </div>
    )
  }
}

SyllabusTool.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object
}

export default SyllabusTool
