import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import Loading from '../../components/Loading'
import actions from '../../actions'
import Weights from '../components/ClassEditor/Weights'
import Assignments from '../components/ClassEditor/Assignments'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import FileViewer from '../../components/FileViewer'
import IssuesModal from './IssuesModal'
import {FileTabs, FileTab} from '../../components/FileTab'
import {inject, observer} from 'mobx-react'

const steps = [ 'Weights', 'Assignments', 'Review' ]

const ContentEnum = {
  WEIGHTS: 0,
  ASSIGNMENTS: 1,
  REVIEW: 2
}

@inject('rootStore') @observer
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
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.isDIY = false
    this.unlockClass()
  }

  /*
  * Intialize the component
  */
  intializeComponent () {
    this.setState(this.initializeState())
    this.getClass()
    this.getDocuments()
    this.lockClass()
  }

  /*
  * Initialize state
  */
  initializeState () {
    const {state} = this.props.location
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.isDIY = state.isDIY || false
    return {
      currentDocumentIndex: 0,
      currentDocument: null,
      currentIndex: ContentEnum.WEIGHTS,
      documents: [],
      gettingClass: false,
      isSW: state.isSW || false,
      loadingClass: true,
      openIssuesModal: false,
      sectionId: state.sectionId || null,
      stepCount: 3
    }
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
    const {params: {classId}} = this.props
    let {navbarStore} = this.props.rootStore
    actions.classes.getClassById(classId).then((cl) => {
      navbarStore.cl = cl
      this.setState({loadingClass: false})
    }).catch(() => { this.setState({loadingClass: false}) })
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

  onUpdateClass (form) {
    let {navbarStore} = this.props.rootStore
    actions.classes.updateClass(form).then((cl) => {
      navbarStore.cl = cl
    }).catch(() => false)
  }

  /*
  * Lock the class for DIY or SW.
  */
  lockClass () {
    const {navbarStore} = this.props.rootStore
    const {params: {classId}} = this.props
    const form = {is_class: true}
    actions.classes.lockClass(classId, form).then(() => {
    }).catch((error) => {
      if (error === 409 && navbarStore.isDIY) {
        browserHistory.push('/student/classes')
      }
    })
  }

  /*
  * Toggle the issues modal.
  */
  toggleIssuesModal () {
    this.setState({openIssuesModal: !this.state.openIssuesModal})
  }

  /*
  * Unlock the the class when not complete.
  */
  unlockClass () {
    const {params: {classId}} = this.props
    const form = {is_class: true}

    actions.classes.unlockClass(classId, form).then(() => {
    }).catch(() => false)
  }

  /*
  * Unlock the class for syllabus worker.
  */
  unlock () {
    const {params: {classId}} = this.props
    const {isSW} = this.state
    const form = {is_class: true, is_completed: true}
    this.setState({submitting: true})
    actions.classes.unlockClass(classId, form).then(() => {
      this.setState({submitting: false})
      if (isSW) {
        this.getNextClass()
      } else {
        browserHistory.push('/student/classes')
      }
    }).catch(() => { this.setState({submitting: false}); browserHistory.push('/hub/landing') })
  }

  /*
  * Fetch the next class for SW.
  *
  */
  getNextClass () {
    this.setState({gettingClass: true})
    actions.syllabusworkers.getNextClass().then((cl) => {
      const {state} = this.props.location
      browserHistory.push({ pathname: `/class/${cl.id}/syllabus_tool`, state: {...state} })
      this.intializeComponent()
      this.setState({gettingClass: false})
    }).catch(() => {
      this.setState({gettingClass: false})
      browserHistory.push('hub/landing')
    })
  }

  /*
  * On syllabus section done.
  */
  onNext () {
    const {currentIndex, stepCount} = this.state

    if (currentIndex !== (stepCount - 1)) {
      this.setState({currentIndex: currentIndex + 1})
    } else {
      this.unlock()
    }
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
  * Render the back button to tab between syllabus sections
  */
  renderBackButton () {
    const {currentIndex} = this.state

    if (currentIndex > ContentEnum.WEIGHTS) {
      return (
        <a className='back-button' onClick={this.onPrevious.bind(this)}>
          <i className='fa fa-angle-left' /> Go Back
        </a>
      )
    }
  }

  /*
  * Render the button text dependent on worker.
  */
  renderButtonText () {
    return (this.state.currentIndex === ContentEnum.ASSIGNMENTS)
      ? 'Everything looks good. Submit info and continue'
      : 'Next'
  }

  /*
  * Render the syllabus section content.
  */
  renderContent () {
    const {navbarStore} = this.props.rootStore
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
          cl={navbarStore.cl}
          isReview={false}
          onSubmit={this.onNext.bind(this)} />
      case ContentEnum.REVIEW:
        return (
          <div>
            <div className='cn-section-content-header'>
              Almost done!
            </div>
            <div className='margin-bottom'>
              Here&apos;s your last chance to review the weights and assignments for {navbarStore.cl.name + ' '}
              before submitting for the whole class.
            </div>
            <Weights
              cl={navbarStore.cl}
              isReview={true}
              onSubmit={this.onNext.bind(this)}
              onUpdateClass={this.onUpdateClass.bind(this)}
              onEdit={() => {
                this.setState({currentIndex: ContentEnum.WEIGHTS})
              }}
            />
            <Assignments
              cl={navbarStore.cl}
              isReview={true}
              onSubmit={this.onNext.bind(this)}
              onEdit={() => {
                this.setState({currentIndex: ContentEnum.ASSIGNMENTS})
              }}
            />
            <button
              className='button full-width margin-top margin-bottom'
              onClick={() => this.onNext()}
            >
            ⚡️Submit⚡️
            </button>
          </div>
        )
      default:
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
                removable={false}
                changed={false}
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
  * Render the having issues modal.
  */
  renderIssuesModal () {
    const {navbarStore} = this.props.rootStore
    return (
      <IssuesModal
        cl={navbarStore.cl}
        open={this.state.openIssuesModal}
        onClose={this.toggleIssuesModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
          this.unlock()
        }}
      />
    )
  }

  /*
  * Render the progress bar for DIY.
  */
  renderProgressBar () {
    return (
      <ProgressBar currentStep={this.state.currentIndex}>
        {steps.map((step, index) => {
          return <ProgressStep key={`step-${index}`} label={step} index={index} />
        })}
      </ProgressBar>
    )
  }

  /*
  * Update the class in state.
  *
  * @param [Object]. The class to update with
  */
  updateClass (cl) {
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = cl
  }

  render () {
    const {loadingClass} = this.state
    const {navbarStore} = this.props.rootStore

    if (loadingClass || navbarStore.cl == null) return <Loading />
    return (
      <div className='cn-syllabus-tool-container'>
        {this.renderProgressBar()}
        <div className='cn-body-container'>
          <div className='cn-section-container cn-control-panel'>
            <div className='cn-section-header'>
              {this.renderBackButton()}
            </div>
            <div className='cn-section-content'>
              {this.renderContent()}
            </div>
            <div className='cn-section-footer'>
              <div>
                {this.renderHavingIssues()}
              </div>
            </div>
          </div>

          <div className='cn-section-container cn-file-panel'>
            {this.renderDocumentTabs()}
            <div className='cn-section-content'>
              {this.state.currentDocument && <FileViewer source={this.state.currentDocument} /> }
            </div>
          </div>
        </div>
        {navbarStore.cl && this.renderIssuesModal()}
      </div>
    )
  }
}

SyllabusTool.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  rootStore: PropTypes.object
}

export default SyllabusTool
