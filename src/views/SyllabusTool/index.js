import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Loading from '../../components/Loading'
import actions from '../../actions'
import Weights from '../components/ClassEditor/Weights'
import Assignments from '../components/ClassEditor/Assignments'
// import { ProgressBar, SyllabusProgressStep } from '../../components/ProgressBar'
import FileUpload from '../../components/FileUpload'
import FileViewer from '../../components/FileViewer'
import IssuesModal from '../components/ClassEditor/IssuesModal'
import ProblemsModal from './ProblemsModal'
import { FileTabs, FileTab } from '../../components/FileTab'
import { inject, observer } from 'mobx-react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

// TODO: File upload here needs to be replaced with component at ../../components/TabbedFileUpload

const steps = ['Weights', 'Assignments']

const ContentEnum = {
  WEIGHTS: 0,
  ASSIGNMENTS: 1,
  REVIEW: 2
}

@inject('rootStore') @observer
class SyllabusTool extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the documents for a class.
  * Lock the class.
  */
  componentWillMount() {
    this.intializeComponent()
  }

  /*
  * Unlock the class on component will mount
  */
  componentWillUnmount() {
    let { navbarStore } = this.props.rootStore
    navbarStore.cl = null
    navbarStore.isDIY = false
    this.unlockClass()
  }

  /*
  * Intialize the component
  */
  intializeComponent() {
    this.setState(this.initializeState())
    this.getClass()
    this.getDocuments()
    this.lockClass()
  }

  /*
  * Initialize state
  */
  initializeState() {
    const { state } = this.props.location
    console.log({ state })
    let { navbarStore } = this.props.rootStore
    navbarStore.cl = null
    navbarStore.isInsights = state.isInsights || false
    navbarStore.isDIY = state.isDIY || false
    navbarStore.weightId = state.weightId || false
    return {
      currentDocumentIndex: 0,
      currentDocument: null,
      currentIndex: state.weightId ? ContentEnum.ASSIGNMENTS : ContentEnum.WEIGHTS,
      documents: [],
      gettingClass: false,
      loadingClass: true,
      openIssuesModal: false,
      openProblemsModal: false,
      stepCount: 3,
      uploadingDoc: false,
      singleWeight: state.weightId ? state.weightId : false,
      assignments: [],
      isStudent: this.props.rootStore.userStore.isStudent()
    }
  }

  /*
  * Fetch the class by id.
  */
  getClass() {
    const classId = this.props.match.params.classId
    let { navbarStore } = this.props.rootStore
    actions.classes.getClassById(classId).then((cl) => {
      navbarStore.cl = cl
      this.setState({ loadingClass: false })
    }).catch(() => { this.setState({ loadingClass: false }) })
  }

  /*
  * Fetch the documents for a class.
  */
  getDocuments() {
    const classId = this.props.match.params.classId
    actions.documents.getClassDocuments(classId).then((documents) => {
      documents.sort((a, b) => b.is_syllabus)
      this.setState({ documents, currentDocument: (documents[0] && documents[0].path) || null })
    }).catch(() => false)
  }

  onUpdateClass(form) {
    let { navbarStore } = this.props.rootStore
    actions.classes.updateClass(form).then((cl) => {
      navbarStore.cl = cl
    }).catch(() => false)
  }

  /*
  * Lock the class for DIY or SW.
  */
  lockClass() {
    const { navbarStore } = this.props.rootStore
    const classId = this.props.match.params.classId
    const form = { is_class: true }
    actions.classes.lockClass(classId, form).then(() => {
    }).catch((error) => {
      if (error === 409 && navbarStore.isDIY) {
        if (navbarStore.isInsights) {
          this.props.history.goBack()
        } else {
          this.props.history.push('/student/classes')
        }
      }
    })
  }

  /*
  * Toggle the issues modal.
  */
  toggleIssuesModal() {
    this.setState({ openIssuesModal: !this.state.openIssuesModal })
  }

  /*
  * Toggle the problems modal.
  */
  toggleStudentProblemsModal() {
    this.setState({ openProblemsModal: !this.state.openProblemsModal })
  }

  /*
  * Unlock the the class when not complete.
  */
  unlockClass() {
    const classId = this.props.match.params.classId
    const form = { is_class: true }

    actions.classes.unlockClass(classId, form).then(() => {
    }).catch(() => false)
  }

  /*
  * Unlock the class for syllabus worker.
  */
  unlock(isCompleted) {
    const classId = this.props.match.params.classId
    const { navbarStore } = this.props.rootStore
    const form = { is_class: true, is_completed: isCompleted }
    this.setState({ submitting: true })
    actions.classes.unlockClass(classId, form).then((r) => {
      this.setState({ submitting: false })
      if (!navbarStore.isDIY) {
        if (!this.props.rootStore.userStore.isStudent()) {
          this.getNextClass()
        }
      } else {
        if (navbarStore.isInsights) {
          this.props.history.goBack()
        } else {
          this.props.history.push('/student/classes')
        }
      }
    }).catch(() => {
      this.setState({ submitting: false })
      this.props.history.push('/')
    })
  }

  /*
  * Fetch the next class for SW.
  *
  */
  getNextClass() {
    this.setState({ gettingClass: true })
    actions.syllabusworkers.getNextClass().then((cl) => {
      const { state } = this.props.location
      this.props.history.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: { ...state } })
      this.intializeComponent()
      this.setState({ gettingClass: false })
    }).catch(() => {
      this.setState({ gettingClass: false })
      this.props.history.push('hub/landing')
    })
  }

  /*
  * On syllabus section done.
  */
  onNext() {
    const { currentIndex, stepCount } = this.state

    if (currentIndex !== (stepCount - 1)) {
      this.setState({ currentIndex: currentIndex + 1 })
      this.lockClass()
    } else {
      this.unlock(true)
    }
  }

  /*
  * Render a way to tab back for DIY.
  */
  onPrevious() {
    if (this.state.currentIndex > ContentEnum.WEIGHTS) {
      this.setState({ currentIndex: this.state.currentIndex - 1 })
    }
  }

  /*
  * Render the back button to tab between syllabus sections
  */
  renderBackButton() {
    const { currentIndex } = this.state

    if (currentIndex === ContentEnum.ASSIGNMENTS) {
      return (
        <a className='back-button link-style' onClick={this.onPrevious.bind(this)}>
          <i className='fa fa-angle-left' /> Back to weights
        </a>
      )
    }
  }

  /*
  * Render the button text dependent on worker.
  */
  renderButtonText() {
    return (this.state.currentIndex === ContentEnum.ASSIGNMENTS)
      ? 'Everything looks good. Submit info and continue'
      : 'Next'
  }

  /*
  * Render the syllabus section content.
  */
  renderContent() {
    const { navbarStore } = this.props.rootStore
    switch (this.state.currentIndex) {
      case ContentEnum.WEIGHTS:
        return <Weights
          cl={navbarStore.cl}
          isReview={false}
          onSubmit={this.onNext.bind(this)}
          onUpdateClass={this.onUpdateClass.bind(this)}
        />
      case ContentEnum.ASSIGNMENTS:
        return <Assignments
          onBack={() => this.setState({ currentIndex: 0 })}
          cl={navbarStore.cl}
          isReview={false}
          onSubmit={this.onNext.bind(this)}
          singleWeight={this.state.singleWeight}
        />
      case ContentEnum.REVIEW:
        return (
          <div>
            <div className='cn-section-content-header'>
              Step 3: Review
            </div>
            <div className='margin-bottom'>
              Almost done! Here&apos;s your last chance to review the weights and assignments
              before submitting for the whole class.
            </div>
            <Weights
              cl={navbarStore.cl}
              isReview={true}
              onSubmit={this.onNext.bind(this)}
              onUpdateClass={this.onUpdateClass.bind(this)}
              onEdit={() => {
                this.setState({ currentIndex: ContentEnum.WEIGHTS })
              }}
            />
            <Assignments
              cl={navbarStore.cl}
              isReview={true}
              onSubmit={this.onNext.bind(this)}
              onEdit={() => {
                this.setState({ currentIndex: ContentEnum.ASSIGNMENTS })
              }}
              singleWeight={this.state.singleWeight}
            />
            <button
              id='cn-review-submit'
              className='button full-width margin-top margin-bottom'
              onClick={() => this.onNext()}
            >
              <div>
                ⚡️
              </div>
              <div>
                Submit
              </div>
              <div>
                ⚡️
              </div>
            </button>
          </div>
        )
      default:
    }
  }

  /*
  * Render the document tabs for the user to tab between documents.
  */
  renderDocumentTabs() {
    return (
      <FileTabs currentIndex={this.state.currentDocumentIndex} addFileClick={this.addFileClick.bind(this)}>
        {
          this.state.documents.map((document, index) => {
            return (
              <FileTab
                key={index}
                name={document.name}
                removable={false}
                changed={false}
                onClick={() =>
                  this.setState({ currentDocument: document.path, currentDocumentIndex: index })
                }
              />
            )
          })
        }
      </FileTabs>
    )
  }
  addFileClick() {
    this.setState({ currentDocument: null, currentDocumentIndex: null })
  }

  /*
  * Render having issues
  */
  renderHavingIssues() {
    const { navbarStore } = this.props.rootStore
    return (
      <a
        className='cn-red'
        onClick={!navbarStore.isDIY ? this.toggleIssuesModal.bind(this) : this.toggleStudentProblemsModal.bind(this)}
      >Syllabus issues?</a>
    )
  }

  /*
  * Render the having issues modal.
  */
  renderIssuesModal() {
    const { navbarStore } = this.props.rootStore
    const { openIssuesModal } = this.state
    return (
      <IssuesModal
        cl={navbarStore.cl}
        open={openIssuesModal}
        onClose={this.toggleIssuesModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
          this.unlock(false)
        }}
      />
    )
  }

  /*
  * Render the having issues modal.
  */
  renderProblemsModal() {
    const { navbarStore } = this.props.rootStore
    const { openProblemsModal } = this.state

    return (
      <ProblemsModal
        cl={navbarStore.cl}
        open={openProblemsModal}
        onClose={this.toggleStudentProblemsModal.bind(this)}
      />
    )
  }

  /*
  * Render the progress bar for DIY.
  */
  renderProgressBar() {
    if (!this.state.singleWeight) {
      return <div className='cn-section-progress-outer'>
        <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="40" />
        <span className="cn-section-progress-title">Add Weights & Values</span>
        <div className="cn-pull-right">
          <span>{this.state.currentIndex + 1}/3</span>
          <span className='cn-section-progressbar'><ProgressBar percent={(this.state.currentIndex + 1 / 3) * 100} /></span>
        </div>
        {/* <ProgressBar currentStep={this.state.currentIndex} steps={this.steps}>
          {steps.map((step, index) => {
            return <SyllabusProgressStep key={`step-${index}`} label={step} index={index} />
          })}
        </ProgressBar> */}
      </div>
    } else {
      return null
    }
  }

  /*
  * Renders the document viewer/uploader
  */
  renderDocumentViewer() {
    if (this.state.currentDocument) {
      return <div className='cn-section-content'>
        <FileViewer source={this.state.currentDocument} />
      </div>
    } else if (this.state.documents.length === 0) {
      return <div className='cn-section-content'>
        <FileUpload className={'cn-section-file-upload' + (this.state.uploadingDoc ? ' cn-upload-disabled' : '')}
          allow={true}
          disabled={this.state.uploadingDoc}
          onUpload={(file) => { this.uploadFile.bind(this)(file, true) }}>
          <span className="cn-blue">
            {
              this.state.uploadingDoc
                ? 'Uploading...'
                : 'Drag-n-drop a file here if you would like to view the syllabus while setting up the class 👌'
            }
          </span>
        </FileUpload>
      </div>
    } else {
      return <div className='cn-section-content'>
        <FileUpload className={'cn-section-file-upload' + (this.state.uploadingDoc ? ' cn-upload-disabled' : '')}
          allow={true}
          disabled={this.state.uploadingDoc}
          onUpload={(file) => { this.uploadFile.bind(this)(file, false) }}>
          <span className="cn-blue">
            {
              this.state.uploadingDoc
                ? 'Uploading...'
                : 'Drag-n-drop an additional file 👌'
            }
          </span>
        </FileUpload>
      </div>
    }
  }

  /*
  * Upload the given file
  */
  uploadFile(file, isSyllabus) {
    let { navbarStore } = this.props.rootStore
    this.setState({ uploadingDoc: true })
    actions.documents.uploadClassDocument(navbarStore.cl, file, isSyllabus).then((document) => {
      var newDocs = this.state.documents.slice(0)
      newDocs.push(document)
      this.setState({ documents: newDocs, currentDocument: document.path, currentDocumentIndex: newDocs.length - 1, uploadingDoc: false })
    }).catch(() => false)
  }

  /*
  * Update the class in state.
  *
  * @param [Object]. The class to update with
  */
  updateClass(cl) {
    let { navbarStore } = this.props.rootStore
    navbarStore.cl = cl
  }

  async onBackToClasses() {
    await actions.weights.getClassWeightsByClassId(this.props.match.params.classId)
      .then(async r => {
        if (r ? r.length > 0 : false) {
          await actions.assignments.getClassAssignments({ id: this.props.match.params.classId })
            .then(r => {
              if (r.length > 0) {
                this.props.rootStore.studentClassesStore.updateClasses()
                this.unlock(true)
              } else {
                this.unlock(false)
              }
            })
        } else {
          this.unlock(false)
        }
      })
      .catch((e) => {
        this.unlock(false)
        this.props.history.push('/student/classes')
      })
  }

  renderBackToClasses() {
    const { navbarStore } = this.props.rootStore
    if (navbarStore.isDIY) {
      if (navbarStore.isInsights) {
        return (
          <div className='cn-syllabus-tool-back-button' onClick={() => this.props.history.goBack()}>
            <span>👈</span> Back to athlete
          </div>
        )
      }
      return (
        <div className='cn-syllabus-tool-back-button' onClick={() => this.onBackToClasses()}>
          <span>👈</span> Back to classes
        </div>
      )
    }
  }

  render() {
    const { loadingClass } = this.state
    const { navbarStore } = this.props.rootStore

    if (loadingClass || navbarStore.cl == null) return <Loading />
    return (
      <div className='cn-syllabus-tool-container'>
        {this.renderBackToClasses()}
        <div className='cn-body-container'>
          <div className='cn-section-container cn-control-panel'>
            <div className='cn-section-content'>
              {this.renderProgressBar()}
              {this.renderContent()}
            </div>
          </div>

          <div className='cn-section-container cn-file-panel'>
            <div className='cn-syllabus-tool-tabs'>
              {this.renderDocumentTabs()}
            </div>
            <div className='cn-section-header'>
              {this.renderHavingIssues()}
            </div>
            {this.renderDocumentViewer()}
          </div>
        </div>
        {navbarStore.cl && !navbarStore.isDIY && this.renderIssuesModal()}
        {navbarStore.cl && navbarStore.isDIY && this.renderProblemsModal()}
      </div>
    )
  }
}

SyllabusTool.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(SyllabusTool)
