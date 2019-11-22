import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import CompletionCircle from '../../../components/CompletionCircle'
import { calculateTotalProfileScore, calculateCoreProfileCompleteness, calculatePersonalityProfileCompleteness, calculateExperienceProfileCompleteness, calculateExtrasProfileCompleteness } from '../utils'
// import StudentLayout from '../../components/StudentLayout'
// import {browserHistory} from 'react-router'
// import SkLoader from '../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class JobsHome extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true
    }
  }

  renderProfileCell () {
    let profile = this.props.rootStore.studentJobsStore.profile
    let totalProfileScore = calculateTotalProfileScore(profile, this.props.rootStore.userStore.user)
    let coreProfileCompletion = calculateCoreProfileCompleteness(profile)
    let personalityProfileCompletion = calculatePersonalityProfileCompleteness(profile)
    let experienceCompletion = calculateExperienceProfileCompleteness(profile)
    let extrasCompletion = calculateExtrasProfileCompleteness(profile)
    return (
      <div className='jobs-home-cell'>
        <div className='jobs-home-cell-heading'>
          <h1>Your Profile</h1>
          <div className='jobs-home-cell-subheading'>
            <p style={{marginRight: '6px'}}>Profile strength: </p>
            <CompletionCircle completion={totalProfileScore} hexColor={'#4add58'} customSize={32} />
            <p style={{marginLeft: '0px'}}>{totalProfileScore}%</p>
          </div>
        </div>
        <div className='jobs-home-cell-content'>
          <p>Finish your profile and skollerJobs will <b>match you</b> with the <b>perfect job for you.</b></p>
          <div className='jobs-home-cell-profile-categories'>
            <div className='jobs-home-cell-profile-category'>
              <h2>Core Information</h2>
              <div className='jobs-home-cell-profile-category-completion'>
                <CompletionCircle completion={coreProfileCompletion} hexColor={'#4add58'} customSize={32} />
                <p>{coreProfileCompletion}% complete</p>
              </div>
            </div>
            <div className='jobs-home-cell-profile-category'>
              <h2>Personality Profile</h2>
              <div className='jobs-home-cell-profile-category-completion'>
                <CompletionCircle completion={personalityProfileCompletion} hexColor={'#4add58'} customSize={32} />
                <p>{personalityProfileCompletion}% complete</p>
              </div>
            </div>
            <div className='jobs-home-cell-profile-category'>
              <h2>Experience</h2>
              <div className='jobs-home-cell-profile-category-completion'>
                <CompletionCircle completion={experienceCompletion} hexColor={'#4add58'} customSize={32} />
                <p>{experienceCompletion}% complete</p>
              </div>
            </div>
            <div className='jobs-home-cell-profile-category'>
              <h2>Extras</h2>
              <div className='jobs-home-cell-profile-category-completion'>
                <CompletionCircle completion={extrasCompletion} hexColor={'#4add58'} customSize={32} />
                <p>{extrasCompletion}% complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderResumeCell () {
    return (
      <div className='jobs-home-cell'>
        <h1>Resume</h1>
        <div>
          boop
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='jobs-home'>
        {this.renderProfileCell()}
        {/* {this.renderResumeCell()} */}
      </div>
    )
  }
}

JobsHome.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default JobsHome
