import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'
import PeriodForm from './PeriodForm'
import SemesterDetails from './SemesterDetails'
import SchoolDetails from './SchoolDetails'
import SchoolDetailsForm from './SchoolDetailsForm'
import actions from '../../../actions'
import {inject, observer} from 'mobx-react'
import FourDoor from '../../components/FourDoor'
import EmailDomainDetails from './EmailDomainDetails'
import EmailDomainForm from './EmailDomainForm'

@inject('rootStore') @observer
class SchoolInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
    this.initializeComponent()
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
  }

  initializeComponent () {
    const {state} = this.props.location
    if (state && state.school) {
      actions.schools.getSchoolById(state.school.id).then(school => {
        const periods = school.class_periods
        this.setState({school, periods})
      })
      this.getEmailDomains()
    }
  }

  getEmailDomains () {
    const {school} = this.state
    actions.schools.getEmailDomains(school.id).then(emailDomains => {
      this.setState({emailDomains})
    }).catch(() => false)
  }

  getMainPeriods () {
    const {periods} = this.state

    return periods ? periods.filter(pr => {
      return pr.is_main_period
    }) : []
  }

  getOtherPeriods () {
    const {periods} = this.state

    return periods ? periods.filter(pr => {
      return !pr.is_main_period
    }) : []
  }

  initializeState () {
    const {state} = this.props.location
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.title = 'School Info'
    return {
      openDetailsForm: false,
      openPeriodForm: false,
      openEmailDomainForm: false,
      school: (state && state.school) || null,
      periods: [],
      emailDomains: []
    }
  }

  onFourDoorChange (school, form) {
    actions.fourdoor.overrideSchool(school.id, form).then((school) => {
      this.setState({ school: school })
    })
  }

  handleChatStateChange () {
    if (this.state.school) {
      const {id, is_chat_enabled: chat} = this.state.school
      actions.schools.updateSchool({id: id, is_chat_enabled: !chat}).then((school) => {
        this.setState({school: school})
      }).catch(() => { this.setState({loading: false}) })
    }
  }

  renderChatEnabled () {
    const { school } = this.state

    return (
      <div>
        <a onClick={this.handleChatStateChange.bind(this)}>
          {(school && !school.is_chat_enabled) && <i className="far fa-comment fa-2x cn-blue"></i>}
          {(school == null || school.is_chat_enabled) && <i className="fas fa-comment fa-2x cn-blue"></i>}
        </a>
      </div>
    )
  }

  handleClassStartStateChange () {
    if (this.state.school) {
      const {id, is_class_start_enabled: classStart} = this.state.school
      actions.schools.updateSchool({id: id, is_class_start_enabled: !classStart}).then((school) => {
        this.setState({school: school})
      }).catch(() => { this.setState({loading: false}) })
    }
  }

  renderClassStartEnabled () {
    const { school } = this.state

    return (
      <div>
        <a onClick={this.handleClassStartStateChange.bind(this)}>
          {(school && !school.is_class_start_enabled) && <i className="far fa-bell-slash fa-2x cn-blue"></i>}
          {(school == null || school.is_class_start_enabled) && <i className="fas fa-bell fa-2x cn-blue"></i>}
        </a>
      </div>
    )
  }

  renderFourDoor () {
    return (
      <FourDoor
        school={this.state.school}
        currentValues={this.state.school}
        onChange={this.onFourDoorChange.bind(this)}
      />
    )
  }

  /*
  * Render the school details
  */
  renderSchoolDetails () {
    const { school } = this.state

    return (
      <SchoolDetails
        onEdit={this.toggleDetailsForm.bind(this)}
        school={school}
      />
    )
  }

  /*
  * Render Semeter details
  */
  renderMainPeriod () {
    return (
      <SemesterDetails
        header="Main Semesters"
        periods={this.getMainPeriods()}
        school={this.state.school}
        onCreate={this.togglePeriodForm.bind(this)}
        onUpdate={this.initializeComponent.bind(this)}
        onUpload={this.initializeComponent.bind(this)}
      />
    )
  }

  /*
  * Render Semeter details
  */
  renderOtherPeriod () {
    return (
      <SemesterDetails
        header="Other Semesters"
        periods={this.getOtherPeriods()}
        school={this.state.school}
        onCreate={this.togglePeriodForm.bind(this)}
        onUpdate={this.initializeComponent.bind(this)}
        onUpload={this.initializeComponent.bind(this)}
      />
    )
  }

  renderSchoolSettings () {
    const {school} = this.state
    return (
      <div>
        <table className='switch-table'>
          <tbody>
            <tr>
              <th>Main:</th>
              <td><div className='switch' /></td>
            </tr>
            {school && <tr>
              <th>4 Door:</th>
              <td>{this.renderFourDoor()}</td>
            </tr>}
            <tr>
              <th>Chat:</th>
              <td>{this.renderChatEnabled()}</td>
            </tr>
            <tr>
              <th>Class Start:</th>
              <td>{this.renderClassStartEnabled()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  /*
  * Render school details form.
  */
  renderDetailsFormModal () {
    return (
      <Modal
        open={this.state.openDetailsForm}
        onClose={this.toggleDetailsForm.bind(this)}
      >
        <SchoolDetailsForm school={this.state.school} onSubmit={this.onDetailsSumbit.bind(this)} onClose={this.toggleDetailsForm.bind(this)} />
      </Modal>
    )
  }

  renderEmailDomains () {
    const {school, emailDomains} = this.state
    return (
      <EmailDomainDetails
        school={school}
        title={'Email Domains'}
        onAdd={this.toggleEmailDomainForm.bind(this)}
        emailDomains={emailDomains}
        onDelete={this.onDeleteEmailDomain.bind(this)}
      />
    )
  }

  /*
  * Render semester details form
  */
  renderPeriodFormModal () {
    return (
      <Modal
        open={this.state.openPeriodForm}
        onClose={this.togglePeriodForm.bind(this)}
      >
        <PeriodForm
          school={this.state.school}
          onSubmit={this.onPeriodSumbit.bind(this)}
          onClose={this.togglePeriodForm.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render email domain form
  */
  renderEmailDomainFormModal () {
    return (
      <Modal
        open={this.state.openEmailDomainForm}
        onClose={this.toggleEmailDomainForm.bind(this)}
      >
        <EmailDomainForm
          school={this.state.school}
          onSubmit={this.onEmailDomainSumbit.bind(this)}
          onClose={this.toggleEmailDomainForm.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Call back on school detail form submission.
  */
  onDetailsSumbit (school) {
    this.setState({ school, openDetailsForm: false })
  }

  /*
  * Call back on school period form submission.
  */
  onPeriodSumbit () {
    this.setState({openPeriodForm: false})
    this.initializeComponent()
  }

  /*
  * Call back on school email domain form submission.
  */
  onEmailDomainSumbit () {
    this.setState({openEmailDomainForm: false})
    this.getEmailDomains()
  }

  onDeleteEmailDomain (emailDomain) {
    actions.schools.deleteEmailDomains(emailDomain.id).then(() => {
      this.getEmailDomains()
    }).catch(() => false)
  }

  /*
  * Toggle schools details modal.
  */
  toggleDetailsForm () {
    this.setState({openDetailsForm: !this.state.openDetailsForm})
  }

  /*
  * Toggle schools period modal.
  */
  togglePeriodForm () {
    this.setState({openPeriodForm: !this.state.openPeriodForm})
  }

  /*
  * Toggle schools email domain modal.
  */
  toggleEmailDomainForm () {
    this.setState({openEmailDomainForm: !this.state.openEmailDomainForm})
  }

  render () {
    return (
      <div className='cn-school-info'>
        <div className='row'>
          <div className='col-xs-12 col-md-3 margin-top'>
            {this.renderSchoolDetails()}
          </div>
          <div className='col-xs-12 col-md-1 margin-top'></div>
          <div className='col-xs-12 col-md-8 margin-top'>
            {this.renderMainPeriod()}
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>Class Settings</h3>
            {this.renderSchoolSettings()}
          </div>
          <div className='col-xs-12 col-md-1 margin-top'></div>
          <div className='col-xs-12 col-md-8 margin-top'>
            {this.renderOtherPeriod()}
          </div>
          <div className='col-xs-12 col-md-9 margin-top'></div>
          <div className='col-xs-12 col-md-3 margin-top'>
            {this.renderEmailDomains()}
          </div>
        </div>
        {this.renderDetailsFormModal()}
        {this.renderPeriodFormModal()}
        {this.renderEmailDomainFormModal()}
      </div>
    )
  }
}

SchoolInfo.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default SchoolInfo
