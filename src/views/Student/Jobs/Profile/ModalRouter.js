import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SkModal from '../../../components/SkModal/SkModal'
import CareerInterestForm from '../components/CareerInterestsForm';
import CareerInterests from '../../../../assets/sk-icons/jobs/CareerInterests';

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

  renderForm () {
    if (this.props.form === 'careerInterests') {
      return (
        <div>
          <h1 style={{textAlign: 'center', margin: '0'}}>
            <CareerInterests /> Career Interests
          </h1>
          <CareerInterestForm />
        </div>
      )
    } else if (this.props.form === 'education') {
      return (
        <div>education</div>
      )
    } else if (this.props.form === 'workExperience') {
      return (
        <div>workExperience</div>
      )
    } else if (this.props.form === 'documents') {
      return (
        <div>documents</div>
      )
    } else if (this.props.form === 'volunteerExperience') {
      return (
        <div>volunteerExperience</div>
      )
    } else if (this.props.form === 'companyValues') {
      return (
        <div>companyValues</div>
      )
    } else if (this.props.form === 'equalOpportunityEmployment') {
      return (
        <div>equalOpportunityEmployment</div>
      )
    } else if (this.props.form === 'extras') {
      return (
        <div>extras</div>
      )
    } else if (this.props.form === 'personalityProfile') {
      return (
        <div>personalityProfile</div>
      )
    } else if (this.props.form === 'onTheWeb') {
      return (
        <div>onTheWeb</div>
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
  onClose: PropTypes.function
}

export default ModalRouter
