import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import Joyride from 'react-joyride'

class Tutorial extends React.Component {
  constructor (props) {
    super(props)
    this.state = {stepCount: 0, currentIndex: 1, steps: []}
    this.nextToolTip = (description) => {
      return (
        <div>
          <p>{description}</p>
          <button onClick={() => {
            this.joyride.next()
            /* Only here becuase weights tutroail changes the array of weights dependent
             on step. If tutorial changes. Remove this code and isTutorial prop! */
            if (this.props.updateStep) this.props.updateStep(this.state.stepCount + 1)
            this.setState({stepCount: this.state.stepCount + 1})
          }} className='button'>Next</button>
        </div>
      )
    }
  }

  /*
  * Set steps based on user type.
  */
  componentWillMount () {
    let newSteps = this.props.steps
    if (this.props.userType !== 'private') {
      newSteps = newSteps.filter(step => !step.private)
    }
    this.setState({steps: newSteps})
  }

  /*
  * Add tooltips for steps.
  */
  componentDidMount () {
    this.state.steps.forEach((step, index) => {
      if (index !== this.state.steps.length - 1) {
        step.text = this.nextToolTip(step.text)
      }
      this.joyride.addTooltip(step)
    })
  }

  handleScrollToElement (ref, documentId, extraHeight = 0) {
    const elem = document.getElementById(documentId)
    // elem.scrollTop = elem.scrollHeight
    this[ref].scrollTop = elem.scrollHeight + extraHeight
  }

  onFinish () {
    const {params: {classId}} = this.props

    browserHistory.push({
      pathname: `/class/${classId}/syllabus_tool`,
      state: {
        isDIY: true,
        sectionId: this.props.sectionId
      }
    })
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
          steps={this.state.steps}
          type='continuous'
          autoStart={true}
          run={this.state.stepCount > 0}
        />
        <div className='row full-width col-xs-12 col-md-10 col-lg-10'>

          <div className='cn-outline-container row full-width col-xs-12 col-md-6 col-lg-5'>

            <div className='cn-tutorial-info full-width'>
              <h1 className='header margin-top'>{this.props.header}</h1>
              <span className='description margin-top'>{this.props.description}</span>
              {this.state.stepCount === 0 ? <button className='button' onClick={() => this.setState({stepCount: 1}) }>Next</button> : null}
            </div>

            <div ref={(component) => { this.controlPanel = component }} className='cn-section-container control-panel left margin-top col-xs-12 col-md-10 ' style={{backgroundColor: this.state.stepCount > 0 ? 'white' : ''}}>
              {this.state.stepCount > 0 ? this.props.control : null}
            </div>

            <div ref={(component) => { this.syllabus = component }} className='cn-section-container syllabus right margin-top col-xs-12 col-md-10' style={{backgroundColor: this.state.stepCount > 0 ? 'white' : ''}}>
              {this.state.stepCount > 0 ? this.props.syllabus : null}
            </div>

            {
              this.props.userType === 'private'
                ? <span className='having-issues'>Having Issues?</span> : null
            }

            <div className='col-xs-12'>
              <div className='button-container margin-top'>
                {
                  this.state.stepCount > 0
                    ? <button
                      className='button full-width save-button'
                      onClick={this.onFinish.bind(this)}
                    >Save and Continue</button> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Tutorial.propTypes = {
  control: PropTypes.node,
  description: PropTypes.string,
  header: PropTypes.string,
  location: PropTypes.object,
  syllabus: PropTypes.node
}

export default Tutorial
