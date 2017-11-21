import React from 'react'
import PropTypes from 'prop-types'
import FileViewer from '../../components/FileViewer'
import Assignments from '../components/ClassEditor/Assignments'
import GradeScale from '../components/ClassEditor/GradeScale'
import Professor from '../components/ClassEditor/Professor'
import Weights from '../components/ClassEditor/Weights'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'

const steps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]


class DIYTool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      stepCount: 4
    }
  }

  renderContent () {
    switch (this.state.currentIndex) {
      case 0:
        return <GradeScale />
      case 1:
        return <Professor />
      case 2:
        return <Weights />
      case 3:
        return <Assignments />
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

  render () {
    return (
      <div className='cn-diy-tool-container'>
        <div className='row full-width col-xs-12 col-md-10 col-lg-10'>
          <div className='row full-width'>
            <div className='cn-class-info col-xs-12'>
              <a className='back-button' onClick={this.onPrevious.bind(this)}><i className='fa fa-angle-left' /></a>
              <h2>{'Astronomy'}</h2>
              <a className='skip-button' onClick={() => false}><span>Skip this class</span></a>
            </div>
          </div>

          <div className='row full-width'>
            <div className='col-xs-12 col-md-6 col-lg-5 margin-top'>
              <div className='cn-section-container cn-syllabus-section-container'>
                {this.renderContent()}
              </div>
            </div>
            <div className='col-xs-12 col-md-6 col-lg-7 margin-top'>
              <div className='cn-section-container'>
                <FileViewer source="https://classnav-syllabi-files.s3.amazonaws.com/d9af83017135b77b7a72275668fa07bd1496676167128IrelandSyllabusTYW.docx" />
              </div>
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
