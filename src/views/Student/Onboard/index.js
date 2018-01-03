import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import Classes from './Classes'
import ProjectFourDoor from './ProjectFourDoor'
import SubmitSyllabi from './SubmitSyllabi/index'
import Verification from './Verification'
import {ProgressBar, ProgressStep} from '../../../components/ProgressBar'

const steps = [ 'Personal Info', 'Verification', 'Enroll in classes', 'Submit syllabi' ]

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)
    const {userStore: {user}} = props.rootStore
    this.state = {
      currentIndex: user.student.is_verified ? 1 : 0,
      stepCount: 4,
      showUploadWarning: false
    }
  }

  renderContent () {
    switch (this.state.currentIndex) {
      case 0:
        return <Verification onNext={this.onNext.bind(this)}/>
      case 1:
        return <Classes onNext={this.onNext.bind(this)} />
      case 2:
        return <SubmitSyllabi onNext={this.onNext.bind(this)} />
      case 3:
        return <ProjectFourDoor />
      default:
    }
  }

  onNext () {
    this.setState({currentIndex: this.state.currentIndex + 1})
  }

  onPrevious () {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1})
    }
  }

  render () {
    return (
      <div className='cn-onboarding-container'>

        { this.state.currentIndex !== this.state.stepCount - 1
          ? <div className='full-width' style={{display: 'flex', flex: 1}}>
            <ProgressBar currentStep={this.state.currentIndex + 1}>
              {steps.map((step, index) => {
                return <ProgressStep key={`step-${index}`} label={step} />
              })}
            </ProgressBar>
          </div> : null
        }

        <div className='full-width' style={{display: 'flex', flex: 5}}>
          {this.renderContent()}
        </div>

      </div>
    )
  }
}

Onboard.propTypes = {
  rootStore: PropTypes.object
}

export default Onboard
