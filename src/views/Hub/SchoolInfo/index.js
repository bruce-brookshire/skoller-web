import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'
import PeriodForm from './PeriodForm'
import SemesterDetails from './SemesterDetails'
import SchoolDetails from './SchoolDetails'
import SchoolDetailsForm from './SchoolDetailsForm'
import actions from '../../../actions'
import {inject, observer} from 'mobx-react'

@inject('rootStore') @observer
class SchoolInfo extends React.Component {
  constructor (props) {
    super(props)

    // Boolean lists enabled as follows:
    // is_diy_enabled, is_diy_preferred, is_auto_syllabus
    this.fourDoorStatesDef = {
      diy_sw: [true, false, true],
      diy_preferred_sw: [true, true, true],
      sw: [false, false, true],
      diy: [true, true, false]
    }

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

  handleFourDateStateChange () {
    const values = Object.values(this.fourDoorStatesDef)
    const states = Object.keys(this.fourDoorStatesDef)
    const curState = this.getFourDoorState()
    const currIdx = states.findIndex(s => s === curState)
    const nextIdx = currIdx + 1 > states.length - 1 ? 0 : currIdx + 1

    const { school } = this.state
    let form = {
      is_diy_enabled: values[nextIdx][0],
      is_diy_preferred: values[nextIdx][1],
      is_auto_syllabus: values[nextIdx][2]
    }

    actions.fourdoor.overrideSchool(school.id, form).then((school) => {
      this.setState({ school: school })
    })
  }

  getFourDoorState () {
    if (this.state && !this.state.school) return null

    const statesDef = this.fourDoorStatesDef
    const { is_diy_enabled: diy, is_diy_preferred: diyPref, is_auto_syllabus: autoSyllabus } = this.state.school
    const curState = [diy, diyPref, autoSyllabus]
    const comp = JSON.stringify(curState)
    const curIdx = Object.values(statesDef).findIndex((b) => comp === JSON.stringify(b))

    return Object.keys(statesDef)[curIdx]
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

  renderFourDoorSelect () {
    let sImg = 'default'
    let dImg = 'default'
    let label = 'Normal'

    switch (this.getFourDoorState()) {
      case 'diy_preferred_sw':
        sImg = 'default'
        dImg = 'on'
        label = 'DIY Preferred'

        break
      case 'sw':
        sImg = 'on'
        dImg = 'off'
        label = 'Skoller only'
        break
      case 'diy':
        sImg = 'off'
        dImg = 'on'
        label = 'DIY only'
        break
    }

    return (
      <div>
        {label}
        <a onClick={this.handleFourDateStateChange.bind(this)}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <img className='four-door-icon margin-right' src={`/src/assets/images/four_door/skoller_${sImg}.png`} />
          <img className='four-door-icon' src={`/src/assets/images/four_door/diy_${dImg}.png`} />
        </a>
      </div>
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
        header="2. Semesters"
        periods={periods}
        onEdit={this.togglePeriodForm.bind(this)}
        onUpload={this.initializeComponent.bind(this)}
      />
    )
  }

  renderSchoolSettings () {
    return (
      <div>
        <table className='switch-table'>
          <tbody>
            <tr>
              <th>Main:</th>
              <td><div className='switch' /></td>
            </tr>
            <tr>
              <th>4 Door:</th>
              <td>{this.renderFourDoorSelect()}</td>
            </tr>
            <tr>
              <th>Weights:</th>
              <td>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <a>Admin</a>
                    <a style={{marginLeft: '5px', marginRight: '5px'}}>Worker</a>
                    <a>DIY</a>
                  </div>
                  <img className='four-door-icon' src='/src/assets/images/four_door/skoller_default.png'></img>
                </div>
              </td>
            </tr>
            <tr>
              <th>Assignments:</th>
              <td>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <a>Admin</a>
                    <a style={{marginLeft: '5px', marginRight: '5px'}}>Worker</a>
                    <a>DIY</a>
                  </div>
                  <img className='four-door-icon' src='/src/assets/images/four_door/skoller_default.png'></img>
                </div>
              </td>
            </tr>
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
            <h3>5. Class Settings</h3>
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
