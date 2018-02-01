import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import Assignments from '../components/ClassEditor/Assignments'
import StudentRequestForm from './StudentRequestForm'
import ClassForm from './ClassForm'
import FileViewer from '../../components/FileViewer'
import GradeScale from '../components/ClassEditor/GradeScale'
import DocumentsDeletedModal from './DocumentsDeletedModal'
import IssuesModal from './IssuesModal'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import Professor from '../components/ClassEditor/Professor'
import StatusForm from './StatusForm'
import Weights from '../components/ClassEditor/Weights'
import {FileTabs, FileTab} from '../../components/FileTab'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import actions from '../../actions'
import stores from '../../stores'

const {navbarStore} = stores

const steps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]

const ContentEnum = {
  PROFESSOR: 0,
  GRADE_SCALE: 1,
  WEIGHTS: 2,
  ASSIGNMENTS: 3
}

@inject('rootStore') @observer
class SyllabusTool extends React.Component {
  constructor (props) {
    super(props)
    navbarStore.toggleEditCl = this.toggleEditClassModal.bind(this)
    navbarStore.toggleWrench = this.toggleWrench.bind(this)
    navbarStore.toggleIssues = this.toggleIssuesModal.bind(this)
    navbarStore.toggleStudentRequest = this.toggleStudentRequest.bind(this)
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
    navbarStore.cl = null
    navbarStore.isDIY = false
    navbarStore.toggleEditCl = null
    navbarStore.toggleWrench = null
    navbarStore.toggleIssues = null
    navbarStore.toggleStudentRequest = null
    this.unlockClass()
  }

  /*
  * Deletes the provided document and removes it from the documents array in state
  */
  deleteDocument(doc,idx){
    actions.documents.deleteClassDocument(navbarStore.cl,doc).then(() => {
      let newDocs = this.state.documents
      newDocs.splice(idx,1)
      this.setState({
        documents: newDocs,
        currentDocumentIndex: 0,
        currentDocument: null,
      })
      // Show documents deleted modal if all files deleted
      if(this.state.documents.length == 0){
        this.toggleDocumentsDeletedModal()
      }
    }).catch(() => false)
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
    navbarStore.cl = null
    navbarStore.isDIY = state.isDIY || false
    return {
      currentDocumentIndex: 0,
      currentDocument: null,
      currentIndex,
      disableNext: false,
      documents: [],
      gettingClass: false,
      isAdmin: state.isAdmin || false,
      isReviewer: state.isReviewer || false,
      isSW: state.isSW || false,
      loadingClass: true,
      locks: [],
      openDocumentsDeletedModal: false,
      openEditClassModal: false,
      openIssuesModal: false,
      openStudentRequest: false,
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
  * Determine if class is in "Change Request" status
  */
  isChangeRequest(){
    return navbarStore.cl && navbarStore.cl.status && navbarStore.cl.status.name == 'Change' ? true : false
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
    const {params: {classId}} = this.props
    actions.classes.getClassById(classId).then((cl) => {
      navbarStore.cl = cl
      this.setState({loadingClass: false})
    }).catch((error) => {  this.setState({loadingClass: false}) })
  }
  /*
  * Fetch the documents for a class.
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
    if (navbarStore.isDIY || (this.state.isAdmin && !this.state.isSW)) {
      const {params: {classId}} = this.props
      const form = {is_class: true}
      actions.classes.lockClass(classId, form).then(() => {
      }).catch((error) => {
        if (error === 409 && navbarStore.isDIY) {
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
    const form = (navbarStore.isDIY || (this.state.isAdmin && !this.state.isSW)) ?
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
    navbarStore.cl = cl
  }

  /*
  * Render the controls for the syllabi worker or admin.
  */
  renderSWControls () {
    const {cl} = navbarStore
    if (!navbarStore.isDIY && cl) {
      return (
          <div className='margin-right'>{cl.school && cl.school.name}</div>
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
        return <Professor cl={navbarStore.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.GRADE_SCALE:
        return <GradeScale cl={navbarStore.cl} onSubmit={this.updateClass.bind(this)}/>
      case ContentEnum.WEIGHTS:
        return <Weights cl={navbarStore.cl} isReview={isReviewer} disableNext={this.state.disableNext} toggleDisabled={this.toggleDisabled.bind(this)} />
      case ContentEnum.ASSIGNMENTS:
        return <Assignments cl={navbarStore.cl} isReview={isReviewer} />
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
  * Gets array of all new doc ids
  */
  allNewDocs(){
    if(navbarStore.cl && navbarStore.cl.student_requests && navbarStore.cl.student_requests.length > 0){
      let sr = navbarStore.cl.student_requests
      let arr = []
      sr.forEach((r) => {r.docs && r.docs.length > 0 ? arr.push(r.docs.map((d) => d.id)) : null})
      return [].concat(...arr)
    }else{
      return []
    }
  }

  /*
  * Determines if the document originates from a student request
  */
  isNewDoc(doc){
    return this.allNewDocs().indexOf(doc.id) > -1
  }

  /*
  * Determines if the class has any new docs
  */
  hasNewDoc(){
    let newDocs = this.allNewDocs()
    return this.state.documents.filter((d) => newDocs.indexOf(d.id) > -1).length > 0
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
                removable={this.state.isAdmin}
                changed={this.isNewDoc(document)}
                onClick={() =>
                  this.setState({currentDocument: document.path, currentDocumentIndex: index})
                }
                onDelete={() => {
                  let result = window.confirm('Are you sure you want to delete this document?')
                  if(result) this.deleteDocument(document,index)
                }}
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
    if (navbarStore.isDIY) {
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
    const {currentIndex} = this.state

    if (currentIndex > ContentEnum.WEIGHTS && navbarStore.isDIY) {
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
    {/* TODO Put this back in
      if (navbarStore.isDIY) {
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
    const {isAdmin} = this.state
    const {cl} = navbarStore
    if (isAdmin && cl) {
      return (
        <div className='left'>
          <span style={{marginRight: '5px'}}>{cl.enrollment || 0}</span>
          <i className='fa fa-user' />
        </div>
      )
    }
  }

  /*
  * Render having issues for admin and SW
  */
  renderHavingIssues () {
    return (
        <a
          className='having-issues cn-red'
          onClick={this.toggleIssuesModal.bind(this)}
        >Having issues?</a>
    )
  }

  /*
  * Render the student request form.
  */
  renderStudentRequestForm () {
    return (
      <StudentRequestForm
        cl={navbarStore.cl}>
      </StudentRequestForm>
    )
  }

  /*
  * Render the all documents deleted modal.
  */
  renderDocumentsDeletedModal () {
    return (
      <DocumentsDeletedModal
        cl={navbarStore.cl}
        open={this.state.openDocumentsDeletedModal}
        onClose={this.toggleDocumentsDeletedModal.bind(this)}
        onSubmit={(cl) => {this.toggleDocumentsDeletedModal();this.updateClass(cl)} }
      />
    )
  }

  /*
  * Render the having issues modal.
  */
  renderIssuesModal () {
    return (
      <IssuesModal
        cl={navbarStore.cl}
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
          cl={navbarStore.cl}
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
    if (this.state.isAdmin && !this.state.isSW && !this.isChangeRequest()) {
      return (
        <div className='cn-status-form'>
          <StatusForm cl={navbarStore.cl}/>
        </div>
      )
    }
  }

  /*
  * Render the button text dependent on worker.
  */
  renderButtonText () {
    const {isReviewer, isAdmin, isSW} = this.state
    let text = ''
    if ((isReviewer || navbarStore.isDIY) && this.state.currentIndex === ContentEnum.ASSIGNMENTS) text = 'Everything looks good. Submit info and continue'
    else if (isAdmin && !isSW) text = 'Done'
    else text = 'Next'
    return text
  }

  /*
  * On syllabus section done.
  */
  onNext () {
    const {isReviewer, isAdmin, isSW} = this.state

    if (navbarStore.isDIY) {
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
      browserHistory.push(`/class/${navbarStore.cl.id}/syllabus_tool/tutorial/assignments`)
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
  * Toggle the documents deleted modal.
  */
  toggleDocumentsDeletedModal () {
    this.setState({openDocumentsDeletedModal: !this.state.openDocumentsDeletedModal})
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

  toggleWrench () {
    const {cl} = navbarStore
    actions.classes.updateClass({id: cl.id, is_editable: !cl.is_editable}).then((cl) => {
      navbarStore.cl = cl
    }).catch(() => false)
  }

  toggleStudentRequest(){
    this.setState({openStudentRequest: !this.state.openStudentRequest})
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
    let document = documents[currentDocumentIndex]
    if(isAdmin && document) {
      const email = document.user ? document.user.email : null

      if (email) {
        return (
          <div className='margin-right right'>
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
        <div>
          <i className='fa fa-user' />
          <span style={{marginLeft: '2px'}}>{email}</span>
        </div>
      )
    }
  }

  render () {
    const {disableNext, loadingClass, isAdmin,
      isReviewer, currentIndex, gettingClass, submitting} = this.state

    const disableButton = disableNext || gettingClass || submitting
    const disabledClass = disableButton ? 'disabled' : ''
    const completeClass = ((isReviewer || navbarStore.isDIY) &&
      currentIndex === ContentEnum.ASSIGNMENTS) ? 'cn-green-background' : ''

    if (loadingClass) return <Loading />
    return (
      <div className='cn-syllabus-tool-container'>

        <div className='cn-body-container'>

          <div className='cn-section-container cn-control-panel'>
            <div className='cn-section-header'>
              {this.renderSWControls()}
              {this.renderBackButton()}
              {this.renderSkipButton()}
              {this.tagWorker()}
            </div>
            <div className='cn-section-control'>
              {this.renderContent()}
            </div>
            {this.renderSectionTabs()}
            {navbarStore.cl && this.renderStudentRequestForm()}
            <div className='cn-section-footer'>
              <div>
                {this.renderEnrollment()}
                {this.renderHavingIssues()}
              </div>
              {this.renderStatusForm()}
              <div className='horizontal-align-row margin-top margin-right margin-left middle-xs center-xs'>
                <button
                  className={`button col-xs-12 ${completeClass} ${disabledClass}`}
                  style={{flex: '100 1 auto'}}
                  disabled={disableButton}
                  onClick={this.onNext.bind(this)}
                >{this.renderButtonText()}</button>
              </div>

              {this.renderProgressBar()}
            </div>
          </div>

          <div className='cn-section-container cn-file-panel'>
            <div className='cn-section-header'>
              {this.tagUploader()}
            </div>
            <div className='cn-section-control'>
              {this.state.currentDocument && <FileViewer source={this.state.currentDocument} /> }
            </div>
            {this.renderDocumentTabs()}
          </div>

        </div>

        {navbarStore.cl && this.renderIssuesModal()}
        {navbarStore.cl && this.renderDocumentsDeletedModal()}
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
