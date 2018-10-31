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
      actions.schools.getSchoolById(state.school).then(school => {
        const periods = school.class_periods
        this.setState({school, periods})
      })
    }
  }

  initializeState () {
    const {state} = this.props.location
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.title = 'School Info'
    return {
      openDetailsForm: false,
      openPeriodForm: false,
      school: (state && state.school) || null,
      periods: []
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
          {(school && !school.is_chat_enabled) && <i className="fa fa-comment-o fa-2x cn-blue"></i>}
          {(school == null || school.is_chat_enabled) && <i className="fa fa-comment fa-2x cn-blue"></i>}
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
  renderPeriod () {
    const {periods} = this.state
    return (
      <SemesterDetails
        header="Semesters"
        periods={periods}
        onEdit={this.togglePeriodForm.bind(this)}
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
          periods={this.state.periods}
          onSubmit={this.onPeriodSumbit.bind(this)}
          onClose={this.togglePeriodForm.bind(this)}
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
  onPeriodSumbit (period) {
    this.setState({openPeriodForm: false})
    this.initializeComponent()
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

  render () {
    return (
      <div className='cn-school-info'>
        <div className='row'>
          <div className='col-xs-12 col-md-6 margin-top'>
            {this.renderSchoolDetails()}
          </div>
          <div className='col-xs-12 col-md-6 margin-top'>
            {this.renderPeriod()}
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>Class Settings</h3>
            {this.renderSchoolSettings()}
          </div>
        </div>
        {this.renderDetailsFormModal()}
        {this.renderPeriodFormModal()}
      </div>
    )
  }
}

SchoolInfo.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default SchoolInfo
