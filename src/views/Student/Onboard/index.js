import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import FindClasses from '../FindClasses'
import ProjectFourDoor from './ProjectFourDoor'
import SubmitSyllabi from './SubmitSyllabi/index'

@inject('rootStore') @observer
class Onboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 1,
      stepCount: 4,
      showUploadWarning: false
    }
  }

  renderContent () {
    switch (this.state.currentIndex) {
      case 1:
        return <FindClasses onNext={this.onNext.bind(this)} />
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

  render () {
    return (
      <div className='cn-onboarding-container'>
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
