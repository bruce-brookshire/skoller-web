import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SkModal from '../../../components/SkModal/SkModal'
import CareerInterestForm from '../components/CareerInterestsForm'
import CareerInterests from '../../../../assets/sk-icons/jobs/CareerInterests'
import Education from '../../../../assets/sk-icons/jobs/Education'
import EducationForm from '../components/EducationForm'
import CompanyValues from '../../../../assets/sk-icons/jobs/CompanyValues'
import CompanyValuesForm from '../components/CompanyValuesForm'
import PersonalityProfile from '../../../../assets/sk-icons/jobs/PersonalityProfile'
import PersonalityProfileForm from '../components/PersonalityProfileForm'
import ExperienceForm from '../components/ExperienceForm'
import VolunteerExperience from '../../../../assets/sk-icons/jobs/VolunteerExperience'
import WorkExperience from '../../../../assets/sk-icons/jobs/WorkExperience'
import VolunteerExperienceSettings from '../components/VolunteerExperienceSettings'
import OnTheWeb from '../../../../assets/sk-icons/jobs/OnTheWeb'
import OnTheWebForm from '../components/OnTheWebForm'
import WorkExperienceSettings from '../components/WorkExperienceSettings'
import EqualOpportunityEmploymentForm from '../components/EqualOpportunityEmploymentForm'
import EqualOpportunityEmployment from '../../../../assets/sk-icons/jobs/EqualOpportunityEmployment'
import Extras from '../../../../assets/sk-icons/jobs/Extras'
import ExtrasForm from '../components/ExtrasForm'

@inject('rootStore') @observer
class ModalRouter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  toggleModal (bool) {
    if (bool !== null) {
      this.setState({show: bool})
    } else {
      this.setState({show: !this.state.show})
    }
  }

  onClose () {
    this.toggleModal(false)
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  onSubmit (doNotClose = false) {
    this.props.rootStore.studentJobsStore.refreshJobsProfile()
    if (!doNotClose) {
      this.props.onClose()
    }
  }

  renderForm () {
    if (this.props.form === 'careerInterests') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <CareerInterests /> Education
          </h2>
          <CareerInterestForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'education') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <Education /> Career Interests
          </h2>
          <EducationForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'workExperience') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <WorkExperience /> Work Experience
          </h2>
          <WorkExperienceSettings onSubmit={(doNotClose) => this.onSubmit(doNotClose)} />
        </div>
      )
    } else if (this.props.form === 'documents') {
      return (
        <div>documents</div>
      )
    } else if (this.props.form === 'volunteerExperience') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <VolunteerExperience /> Volunteer Experience
          </h2>
          <VolunteerExperienceSettings onSubmit={(doNotClose) => this.onSubmit(doNotClose)} />
        </div>
      )
    } else if (this.props.form === 'companyValues') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <CompanyValues /> Company Values
          </h2>
          <CompanyValuesForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'equalOpportunityEmployment') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <EqualOpportunityEmployment /> Equal Opportunity<br />Employment
          </h2>
          <EqualOpportunityEmploymentForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'extras') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <Extras /> Extras
          </h2>
          <ExtrasForm onSubmit={(doNotClose) => this.onSubmit(doNotClose)} />
        </div>
      )
    } else if (this.props.form === 'personalityProfile') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <PersonalityProfile /> Personality Profile
          </h2>
          <PersonalityProfileForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'onTheWeb') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <OnTheWeb /> Personality Profile
          </h2>
          <OnTheWebForm onSubmit={() => this.onSubmit()} />
        </div>
      )
    } else if (this.props.form === 'addVolunteerExperience') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <VolunteerExperience /> Add Volunteer Experience
          </h2>
          <ExperienceForm isVolunteer={true} onSubmit={(doNotClose) => this.onSubmit(doNotClose)} />
        </div>
      )
    } else if (this.props.form === 'addWorkExperience') {
      return (
        <div>
          <h2 style={{textAlign: 'center', margin: '0'}}>
            <WorkExperience /> Add Work Experience
          </h2>
          <ExperienceForm isVolunteer={false} onSubmit={(doNotClose) => this.onSubmit(doNotClose)} />
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    if (this.props.form && this.renderForm()) {
      return (
        <SkModal closeModal={() => this.onClose()}>
          {this.renderForm()}
        </SkModal>
      )
    } else {
      return null
    }
  }
}

ModalRouter.propTypes = {
  form: PropTypes.string,
  onClose: PropTypes.func,
  rootStore: PropTypes.object
}

export default ModalRouter
