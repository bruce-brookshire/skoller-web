import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../../../components/FlexTable'
import Modal from '../../../components/Modal'
import PeriodForm from './PeriodForm'
import SchoolDetailsForm from './SchoolDetailsForm'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class SchoolInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.intializeState()
  }

  componentWillMount () {
    const {state} = this.props.location
    actions.periods.getSchoolPeriods(state.school).then(periods => {
      let period = periods.filter(period => period)[0]
      this.setState({period})
    })
  }

  intializeState () {
    const {state} = this.props.location
    return {
      openDetailsForm: false,
      openPeriodForm: false,
      school: (state && state.school) || null,
      period: null
    }
  }


  onEditActiveSemester () {

  }

  renderSchoolDetails () {
    const {school} = this.state

    return (
      <div>
        <div className='edit-header'>
          <h3>1. School Details</h3>
          <a onClick={this.toggleDetailsForm.bind(this)}>Edit</a>
        </div>
        {school ?
          <table className='school-info-table'>
            <tbody>
              <tr>
                <th className='cn-flex-table-cell'>School:</th>
                <td className='cn-flex-table-cell'>{school.name}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{school.adr_line_1}, {school.adr_city} {school.adr_state} {school.adr_zip}</td>
              </tr>
              <tr>
                <th>Student email domain:</th>
                <td>{school.email_domains && school.email_domains.filter(s => !s.is_professor_only).join(', ')}</td>
              </tr>
              <tr>
                <th>Prof email domain:</th>
                <td>{school.email_domains && school.email_domains.filter(s => s.is_professor_only).join(', ')}</td>
              </tr>
              <tr>
                <th>Time Zone:</th>
                <td>{school.timezone}</td>
              </tr>
            </tbody>
          </table> : <a onClick={this.toggleDetailsForm.bind(this)}>Add details</a>
        }
      </div>
    )
  }

  renderActiveSemester () {
    const {period} = this.state
    return (
      <div>
        <div className='edit-header'>
          <h3>2. Active Semester</h3>
          <a onClick={this.togglePeriodForm.bind(this)}>Edit</a>
        </div>

        {period ?
          <table className='school-info-table'>
            <tbody>
              <tr>
                <th>Semester Name:</th>
                <td>{period.name}</td>
              </tr>
              <tr>
                <th>Start Date:</th>
                <td>{period.start_date}</td>
              </tr>
              <tr>
                <th>End Date:</th>
                <td>{period.end_date}</td>
              </tr>
            </tbody>
          </table> : <a onClick={this.togglePeriodForm.bind(this)}>Add details</a>
        }
      </div>
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
              <td>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <img className='four-door-icon margin-right' src='/src/assets/images/four_door/skoller_default.png'></img>
                  <img className='four-door-icon' src='/src/assets/images/four_door/diy_default.png'></img>
                </div>
              </td>
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
          </tbody>
        </table>
      </div>
    )
  }

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

  renderPeriodFormModal () {
    return (
      <Modal
        open={this.state.openPeriodForm}
        onClose={this.togglePeriodForm.bind(this)}
      >
        <PeriodForm school={this.state.school} period={this.state.period} onSubmit={this.onPeriodSumbit.bind(this)} onClose={this.togglePeriodForm.bind(this)} />
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
    this.setState({ period, openPeriodForm: false })
  }

  toggleDetailsForm () {
    this.setState({openDetailsForm: !this.state.openDetailsForm})
  }

  togglePeriodForm () {
    this.setState({openPeriodForm: !this.state.openPeriodForm})
  }

  render () {
    return (
      <div className='cn-school-info'>
        <h2 className='center-text'>School Info</h2>
        <div className='row'>
          <div className='col-xs-12 col-md-6 margin-top'>
            {this.renderSchoolDetails()}
          </div>
          <div className='col-xs-12 col-md-6 margin-top'>
            {this.renderActiveSemester()}
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>3. Import professors</h3>
            <UploadHistory
              disabled={false}
              files={[]}
              info='Upload professor csv.'
              onUpload={(file) => {  }}
              title='Professors'
            />
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>4. Import fields of study</h3>
            <UploadHistory
              disabled={false}
              files={[]}
              info='Upload fields of study csv.'
              onUpload={(file) => {  }}
              title='Fields of Study'
            />
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>5. Import classes</h3>
            <UploadHistory
              disabled={false}
              files={[]}
              info='Upload classes csv.'
              onUpload={(file) => {  }}
              title='Classes'
            />
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>6. Class Settings</h3>
            {this.renderSchoolSettings()}
          </div>
        </div>
        {this.renderDetailsFormModal()}
        {this.renderPeriodFormModal()}
      </div>
    )
  }
}

export default SchoolInfo
