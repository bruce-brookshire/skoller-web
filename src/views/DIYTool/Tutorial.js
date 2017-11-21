import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import FileViewer from '../../components/FileViewer'
import Assignments from '../components/ClassEditor/Assignments'
import GradeScale from '../components/ClassEditor/GradeScale'
import Professor from '../components/ClassEditor/Professor'
import Weights from '../components/ClassEditor/Weights'
import WeightSyllabus from './WeightSyllabus'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import Joyride from 'react-joyride';

// const progressSteps = [ 'Weights Intro', 'Input Weights', 'Assignments Intro', 'Input Assignments' ]
const styles = {
  toolTip: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: '1px solid black',
    borderRadius: '10px',
    mainColor: '#ff4456',
    textAlign: 'center',
    overflow: 'hidden',
    maxWidth: '29rem',
    arrow: {
    },
    beacon: {
      offsetX: 10,
      offsetY: 10,
      inner: '#ccc',
      outer: '#ccc'
    },
    close: {
      display: 'none'
    },
    header: {
      display: 'none',
      textAlign: 'right'
      // or any style attribute
    },
    main: {
      padding: '20px'
    },
    footer: {
      display: 'none'
    },
    skip: {
      color: '#f04'
    },
    hole: {
      backgroundColor: 'rgba(255,255,255,0)'
    }
  }
}

const steps = [
  {
    title: '',
    text: 'The syllabi will pop up in this box on the right.',
    selector: '.syllabus',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip
  },
  {
    title: '',
    text: 'And your control panel pops up on the left.',
    selector: '.control-panel',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip
  },
  {
    title: '',
    text: 'First, look through the syllabus for the section with the assignment weights.',
    selector: '#weights-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'syllabus',
    scrollToElementId: 'weights-table'
  },
  {
    title: '',
    text: 'Then select whether the class is based on percentages or points. This class is based on percentages, so we will leave it there.',
    selector: '#class-editor-weight-converter',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weight-converter',
    scrollExtraHeight: 30
  },
  {
    title: '',
    text: 'Now you can start entering assignment categories and their respective weights. Feel free to copy paste from the syllabus-it\'ll be faster and more accurate.',
    selector: '#class-editor-weight-form',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weight-form'
  },
  {
    title: '',
    text: 'The weights will pop up in this box. If you mess up, you can delete or edit categories by clicking on them.',
    selector: '#class-editor-weights-table',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weights-table'
  },
  {
    title: '',
    text: 'Before moving on, make sure the numbers add up.',
    selector: '#class-editor-weights-total',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    scrollToRef: 'controlPanel',
    scrollToElementId: 'class-editor-weights-total'
  },
  {
    title: '',
    text: 'Once everything looks good, hit the save button to save your changes and move onto the next class. Go ahead and hit that button to get started.',
    selector: '.save-button',
    position: 'top',
    type: 'hover',
    isFixed: true,
    style: styles.toolTip,
    allowClicksThruHole: true
  }
]


class DIYTutorial extends React.Component {
  constructor (props) {
    super(props)
    this.nextToolTip = (description) => {
      return (
        <div>
          <p>{description}</p>
          <button onClick={() => { this.joyride.next() }} className='button'>Next</button>
        </div>
      )
    }
  }

  componentDidMount () {
    steps.forEach((step, index) => {
      if (index !== steps.length - 1) {
        step.text = this.nextToolTip(step.text)
      }
      this.joyride.addTooltip(step)
    })
  }

  renderContent () {
    return <Weights />
  }

  renderSyllabus () {
    return <WeightSyllabus />
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

  handleScrollToElement (ref, documentId, extraHeight = 0) {
    const elem = document.getElementById(documentId)
    // elem.scrollTop = elem.scrollHeight
    this[ref].scrollTop = elem.scrollHeight + extraHeight
  }

  onFinish() {
    browserHistory.push('/diy/tool')
  }

  render () {
    return (
      <div className='cn-syllabus-tutorial-container'>
        <Joyride
          callback={(param) => {
            const {step} = param
            if (step.scrollToRef && step.scrollToElementId) {
              this.handleScrollToElement(step.scrollToRef, step.scrollToElementId, step.scrollExtraHeight)
            }
          }}
          ref={(component) => { this.joyride = component }}
          showOverlay={true}
          steps={steps}
          type='continuous'
          autoStart={true}
          run={true}
        />
        <div className='row full-width col-xs-12 col-md-10 col-lg-10'>

          <div className='cn-outline-container row full-width col-xs-12 col-md-6 col-lg-5'>

            <div className='cn-tutorial-info'>
              <h1 className='header margin-top'>Weights</h1>
              <span className='description margin-top'>For Skaller to work, we need to grab the assignment weights for each class. Look at this example...</span>
            </div>

            <div ref={(component) => { this.controlPanel = component }} className='cn-section-container control-panel left margin-top col-xs-12 col-md-10 '>
              {this.renderContent()}
            </div>

            <div ref={(component) => { this.syllabus = component }} className='cn-section-container syllabus right margin-top col-xs-12 col-md-10'>
              {this.renderSyllabus()}
            </div>

            <div className='col-xs-12'>
              <div className='button-container margin-top'>
                <button onClick={this.onFinish.bind(this)} className='button full-width save-button'>Save and Continue</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

DIYTutorial.propTypes = {

}

export default DIYTutorial
