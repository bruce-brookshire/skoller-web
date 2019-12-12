import React from 'react'
import PropTypes from 'prop-types'
import CareerInterests from '../../../../assets/sk-icons/jobs/CareerInterests'
import Education from '../../../../assets/sk-icons/jobs/Education'
import WorkExperience from '../../../../assets/sk-icons/jobs/WorkExperience'
import VolunteerExperience from '../../../../assets/sk-icons/jobs/VolunteerExperience'
import CompanyValues from '../../../../assets/sk-icons/jobs/CompanyValues'
import EqualOpportunityEmployment from '../../../../assets/sk-icons/jobs/EqualOpportunityEmployment'
import Extras from '../../../../assets/sk-icons/jobs/Extras'
import PersonalityProfile from '../../../../assets/sk-icons/jobs/PersonalityProfile'
import OnTheWeb from '../../../../assets/sk-icons/jobs/OnTheWeb'
import Documents from '../../../../assets/sk-icons/jobs/Documents'

class ProfileBlock extends React.Component {
  renderIcon () {
    if (this.props.title === 'Career Interests') {
      return (
        <CareerInterests />
      )
    } else if (this.props.title === 'Education') {
      return (
        <Education />
      )
    } else if (this.props.title === 'Work Experience') {
      return (
        <WorkExperience />
      )
    } else if (this.props.title === 'Volunteer Experience') {
      return (
        <VolunteerExperience />
      )
    } else if (this.props.title === 'Company Values') {
      return (
        <CompanyValues />
      )
    } else if (this.props.title === 'Equal Opportunity Employment') {
      return (
        <EqualOpportunityEmployment />
      )
    } else if (this.props.title === 'Extras') {
      return (
        <Extras />
      )
    } else if (this.props.title === 'Personality Profile') {
      return (
        <PersonalityProfile />
      )
    } else if (this.props.title === 'On the Web') {
      return (
        <OnTheWeb />
      )
    } else if (this.props.title === 'Documents') {
      return (
        <Documents />
      )
    }
  }

  renderTitle () {
    return (
      <h2>{this.renderIcon()} {this.props.title}</h2>
    )
  }

  render () {
    return (
      <div className='jobs-profile-block'>
        <div className='jobs-profile-block-header'>
          <div className='jobs-profile-block-header-title'>
            {this.renderTitle()}
          </div>
          <div className='jobs-profile-block-settings' onClick={() => this.props.settingsButton()}>...</div>
        </div>
        <div className='jobs-profile-block-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

ProfileBlock.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
  settingsButton: PropTypes.function
}

export default ProfileBlock
