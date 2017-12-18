import React from 'react'
import PropTypes from 'prop-types'
import Classes from './Classes'
import ProjectFourDoor from './ProjectFourDoor'
import SubmitSyllabi from './SubmitSyllabi/index'
import Verification from './Verification'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'
import actions from '../../actions'

const steps = [ 'Personal Info', 'Verification', 'Enroll in classes', 'Submit syllabi' ]

const styles = {
  warning: {
    top: '10px',
    maxWidth: '300px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

class Onboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      stepCount: 4,
      showUploadWarning: false
    }
  }

  renderContent () {
    switch (this.state.currentIndex) {
      case 0:
        return <Verification ref={(c) => { this.verification = c }} />
      case 1:
        return <Classes />
      case 2:
        return <SubmitSyllabi ref={(c) => { this.submitSyllabi = c }} />
      case 3:
        return <ProjectFourDoor />
      default:
    }
  }

  getButtonText () {
    switch (this.state.currentIndex) {
      case 0:
        return 'Aight'
      case 1:
        return 'Blam-o'
      case 2:
        return 'UpLoAd sYlLaBi'
      default:
    }
  }

  onNext () {
    if (this.state.currentIndex === 0) {
      actions.auth.verifyPhoneNumber(this.verification.getForm()).then(() => {
        this.setState({currentIndex: this.state.currentIndex + 1})
      }).catch(() => false)
    } else if (this.state.currentIndex === 2) {
      // TODO: Quick fix for warning. Messy solution.
      if (this.submitSyllabi.getIncompleteClassesLength() > 0) {
        this.setState({showUploadWarning: true})
      } else {
        this.setState({currentIndex: this.state.currentIndex + 1})
      }
    } else if (this.state.currentIndex !== (this.state.stepCount - 1)) {
      this.setState({currentIndex: this.state.currentIndex + 1})
    }
  }

  onPrevious () {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  renderUploadWarningMessage () {
    if (this.state.showUploadWarning) {
      return (
        <div style={styles.warning} className="form-message message-bubble error">
          <span>
            {"You haven't uploaded a syllabus for a class that needs one. Are you sure you want to continue?"}
          </span>
          <div className='margin-top'>
            <a
              style={{color: 'white', textAlign: 'center', borderBottom: '1px solid white'}}
              onClick={() => this.setState({currentIndex: this.state.currentIndex + 1}, this.state.showUploadWarning: false)}
            >Yes, continue without uploading</a>
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='cn-onboarding-container'>

        { this.state.currentIndex !== this.state.stepCount - 1
          ? <div className='row full-width justify-center'>
            <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
              <ProgressBar currentStep={this.state.currentIndex + 1}>
                {steps.map((step, index) => {
                  return <ProgressStep key={`step-${index}`} label={step} />
                })}
              </ProgressBar>
            </div>
          </div> : null
        }

        <div className='row full-width margin-top margin-bottom justify-center' style={{overflow: 'hidden', overflowY: 'scroll'}}>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6 margin-top margin-bottom'>
            {this.renderContent()}
          </div>
        </div>

        { this.state.currentIndex !== this.state.stepCount - 1
          ? <div className='row full-width justify-center'>
            <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
              <div style={{position: 'relative'}}>
                <button className='button full-width margin-top margin-bottom' onClick={this.onNext.bind(this)}>{this.getButtonText()}</button>
                {this.renderUploadWarningMessage()}
              </div>
            </div>
          </div> : null
        }

      </div>
    )
  }
}

export default Onboard
