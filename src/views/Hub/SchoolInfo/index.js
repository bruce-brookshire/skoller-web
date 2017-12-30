import React from 'react'
import PropTypes from 'prop-types'
import FlexTable from '../../../components/FlexTable'
import ClassUploadInfo from './ClassUploadInfo'
import FOSUploadInfo from './FOSUploadInfo'
import Modal from '../../../components/Modal'
import PeriodForm from './PeriodForm'
import SemesterDetails from './SemesterDetails'
import SchoolDetails from './SchoolDetails'
import SchoolDetailsForm from './SchoolDetailsForm'
import UploadHistory from '../../../components/UploadHistory'
import actions from '../../../actions'

class SchoolInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
    const {state} = this.props.location
    if (state && state.school) {
      actions.schools.getSchoolById(state.school).then(school => {
        const period = school.class_periods.find(period => period.is_active)
        this.setState({school, period})
      })
    }
  }

  initializeState () {
    const {state} = this.props.location
    return {
      completedClassCount: 0,
      completedFOSCount: 0,
      erroredClasses: [],
      erroredFOS: [],
      openClassModal: false,
      openFOSModal: false,
      openDetailsForm: false,
      openPeriodForm: false,
      school: (state && state.school) || null,
      period: null
    }
  }

  onEditActiveSemester () {

  }

  /*
  * Render the school details
  */
  renderSchoolDetails () {
    const {school} = this.state
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
  renderActiveSemester () {
    const {period, school} = this.state
    return (
      <SemesterDetails
        period={period}
        school={school}
        onEdit={this.togglePeriodForm.bind(this)}
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

  /*
  * On upload class fos, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadFOS (file) {
    actions.documents.uploadFOSCsv(this.state.school.id, file).then((fos) => {
      const erroredFOS = fos.filter(f => {
        let error = f.errors
        if (error && f.errors.school_field) {
          error = f.errors.school_field.findIndex(e =>
            e.toLowerCase() === 'has already been taken') === -1
        }
        return error
      })
      const completedFOSCount = fos.length - erroredFOS.length
      this.setState({ erroredFOS, completedFOSCount, openFOSModal: true })
    })
  }

  /*
  * On upload class csv, show results of upload.
  *
  * @param [File] file. File to be uploaded.
  */
  onUploadClasses (file) {
    actions.documents.uploadClassCsv(this.state.period.id, file).then((classes) => {
      const erroredClasses = classes.filter(cl => {
        let error = cl.errors
        if (error && cl.errors.class) {
          error = cl.errors.class.findIndex(e =>
            e.toLowerCase() === 'has already been taken') === -1
        }
        return error
      })
      const completedClassCount = classes.length - erroredClasses.length
      this.setState({erroredClasses, completedClassCount, openClassModal: true })
    })
  }

  /*
  * Render the fos upload modal
  */
  renderFOSUploadModal () {
    const {openFOSModal, erroredFOS, completedFOSCount} = this.state
    return (
      <Modal
        open={openFOSModal}
        onClose={this.toggleFOSUploadModal.bind(this)}
      >
        <div>
          <FOSUploadInfo
            erroredFOS={erroredFOS}
            completedFOSCount={completedFOSCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleFOSUploadModal.bind(this)}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  /*
  * Render the class upload results modal.
  */
  renderClassUploadModal () {
    const {openClassModal, erroredClasses, completedClassCount} = this.state
    return (
      <Modal
        open={openClassModal}
        onClose={this.toggleClassUploadModal.bind(this)}
      >
        <div>
          <ClassUploadInfo
            erroredClasses={erroredClasses}
            completedClassCount={completedClassCount}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={this.toggleClassUploadModal.bind(this)}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  /*
  * Toggle the class upload results modal.
  */
  toggleClassUploadModal () {
    this.setState({openClassModal: !this.state.openClassModal})
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
  * Toggle fos modal.
  */
  toggleFOSUploadModal () {
    this.setState({openFOSModal: !this.state.openFOSModal})
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
            <h3>3. Import fields of study</h3>
            <UploadHistory
              allow='text/csv'
              disabled={false}
              files={[]}
              info='Upload fields of study csv.'
              onUpload={(file) => { this.onUploadFOS(file) }}
              title='Fields of Study'
            />
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>4. Import classes</h3>
            <UploadHistory
              allow='text/csv'
              disabled={false}
              files={[]}
              info='Upload classes csv.'
              onUpload={(file) => { this.onUploadClasses(file) }}
              title='Classes'
            />
          </div>
          <div className='col-xs-12 col-md-3 margin-top'>
            <h3>5. Class Settings</h3>
            {this.renderSchoolSettings()}
          </div>
        </div>
        {this.renderDetailsFormModal()}
        {this.renderPeriodFormModal()}
        {this.renderClassUploadModal()}
        {this.renderFOSUploadModal()}
      </div>
    )
  }
}

export default SchoolInfo
