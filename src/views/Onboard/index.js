import React from 'react'
import PropTypes from 'prop-types'
import MyClasses from '../MyClasses'
import SubmitSyllabi from './SubmitSyllabi'
import Verification from './Verification'
import {ProgressBar, ProgressStep} from '../../components/ProgressBar'

const steps = [ 'Personal Info', 'Verification', 'Enroll in classes', 'Submit syllabi' ]

class Onboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      stepCount: 3
    }
  }

  renderContent () {
    switch (this.state.currentIndex) {
      case 0:
        return <Verification/>
      case 1:
        return <MyClasses />
      case 2:
        return <SubmitSyllabi />
        return
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
      <div className='cn-onboarding-container'>

        <div className='row full-width justify-center'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
            <ProgressBar currentStep={this.state.currentIndex + 1}>
              {steps.map((step, index) => {
                return <ProgressStep key={`step-${index}`} label={step} />
              })}
            </ProgressBar>
          </div>
        </div>

        <div className='row full-width margin-top margin-bottom justify-center'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6 margin-top margin-bottom'>
            {this.renderContent()}
          </div>
        </div>

        <div className='row full-width justify-center'>
          <div className='space-between-vertical col-xs-12 col-md-8 col-lg-6'>
            <button className='button full-width margin-top margin-bttom' onClick={this.onNext.bind(this)}>Next</button>
          </div>
        </div>

      </div>
    )
  }
}

export default Onboard
