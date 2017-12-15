import React from 'react'
import PropTypes from 'prop-types'
import FileViewer from '../../components/FileViewer'
import Assignments from '../components/ClassEditor/Assignments'
import GradeScale from '../components/ClassEditor/GradeScale'
import Professor from '../components/ClassEditor/Professor'
import Weights from '../components/ClassEditor/Weights'
import {FileTabs, FileTab} from '../../components/FileTab'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import actions from '../../actions'

const steps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]


class DIYTool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentDocumentIndex: 0,
      currentDocument: null,
      currentIndex: 2,
      stepCount: 4,
      documents: []
    }
  }

  componentWillMount () {
    this.getDocuments()
    this.lockClass()
  }

  componentWillUnmount () {
    this.unlockClass()
  }

  getDocuments () {
    const {state} = this.props.location
    actions.documents.getClassDocuments(state.cl).then((documents) => {
      documents.sort((a, b) => b.is_syllabus)
      this.setState({documents, currentDocument: (documents[0] && documents[0].path) || null})
    }).catch(() => false)
  }

  lockClass () {
    const {state} = this.props.location
    actions.classes.lockClass(state.cl).then(() => {
    }).catch(() => false)
  }

  unlockClass () {
    const {state} = this.props.location
    actions.classes.unlockClass(state.cl).then(() => {
    }).catch(() => false)
  }

  renderContent () {
    const {state} = this.props.location

    switch (this.state.currentIndex) {
      case 0:
        return <Professor />
      case 1:
        return <GradeScale />
      case 2:
        return <Weights cl={state.cl} />
      case 3:
        return <Assignments cl={state.cl} />
      default:
    }
  }

  onNext () {
    if (this.state.currentIndex !== (this.state.stepCount - 1)) {
      this.setState({currentIndex: this.state.currentIndex + 1})
    }
  }

  onPrevious () {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  renderDocumentTabs () {
    return this.state.documents.map((document, index) => {
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

  render () {
    const {state: {cl}} = this.props.location
    return (
      <div className='cn-diy-tool-container'>
        <div className='row full-width col-xs-12 col-md-10 col-lg-10'>
          <div className='row full-width'>
            <div className='cn-class-info col-xs-12'>
              <a className='back-button' onClick={this.onPrevious.bind(this)}><i className='fa fa-angle-left' /></a>
              <h2>{cl.name}</h2>
              <a className='skip-button' onClick={() => false}><span>Skip this class</span></a>
            </div>
          </div>

          <div className='row full-width'>
            <div className='col-xs-12 col-md-6 col-lg-5 margin-top'>
              <div className='cn-section-container cn-syllabus-section-container'>
                {this.renderContent()}
              </div>
              <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentIndex}>
                <FileTab name='Professor Info' onClick={() => this.setState({currentIndex: 0})} />
                <FileTab name='Grade Scale' onClick={() => this.setState({currentIndex: 1})} />
                <FileTab name='Weights' onClick={() => this.setState({currentIndex: 2})} />
                <FileTab name='Assignments' onClick={() => this.setState({currentIndex: 3})} />
                <FileTab name='Review' onClick={() => this.setState({currentIndex: 4})} />
              </FileTabs>
            </div>
            <div className='col-xs-12 col-md-6 col-lg-7 margin-top'>
              <div className='cn-section-container'>
                {this.state.currentDocument && <FileViewer source={this.state.currentDocument} /> }
              </div>
              <FileTabs style={{marginLeft: '7px', marginRight: '7px'}} currentIndex={this.state.currentDocumentIndex}>
                {this.renderDocumentTabs()}
              </FileTabs>
            </div>
          </div>

          <div className='row actions-container full-width margin-top'>
            <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
              <button className='button full-width' onClick={this.onNext.bind(this)}>Next</button>
            </div>
          </div>

          <div className='row actions-container full-width margin-top margin-bottom'>
            <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
              <ProgressBar currentStep={this.state.currentIndex}>
                {steps.map((step, index) => {
                  return <ProgressStep key={`step-${index}`} label={step} />
                })}
              </ProgressBar>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

DIYTool.propTypes = {

}

export default DIYTool
