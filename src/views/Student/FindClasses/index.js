import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {InputField} from '../../../components/Form'
import SearchSchool from './SearchSchool'
import SearchClass from './SearchClass'
import SearchSemester from './SearchSemester'
import CreateSchoolModal from './CreateSchoolModal'
import Modal from '../../../components/Modal'

class FindClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
  }

  initializeState () {
    return {
      school: null,
      schoolName: '',
      openCreateSchoolModal: false,
      cl: null,
      clName: '',
      newSchool: false,
      newCl: false,
      semester: null,
      subject: '',
      section: '',
      code: ''
    }
  }

  onSubmitSchool (school) {
    this.setState({school: school, schoolName: school.name})
  }

  onSubmitClass (cl) {
    this.setState({
      cl: cl,
      clName: cl.name,
      semester: cl.class_period,
      section: cl.section,
      code: cl.code,
      subject: cl.subject
    })
  }

  onSubmitSemester (semester) {
    this.setState({semester})
  }

  onCreateClass (clName) {
    this.setState({clName, newCl: true})
  }

  onCreateSemester (semester) {
    const {school} = this.state
    actions.periods.createPeriod(school.id, {name: semester}).then((semester) => {
      this.setState({semester})
    }).catch(() => { this.setState({semester: null}) })
  }

  onCreateSchool (schoolName) {
    this.setState({schoolName, newSchool: true, newCl: true})
    this.toggleCreateSchoolModal()
  }

  renderSchoolName () {
    const {formErrors} = this.props
    return (
      <InputField
        error={formErrors.schoolName}
        name='schoolName'
        onChange={(name, value) => {
          this.resetSchool()
        }}
        value={this.state.schoolName}
      />
    )
  }

  renderSemesterName () {
    const {formErrors} = this.props
    return (
      <InputField
        error={formErrors.semesterName}
        name='semesterName'
        onChange={(name, value) => {
          this.resetSemester()
        }}
        value={this.state.semester.name}
      />
    )
  }

  renderClassName () {
    const {formErrors} = this.props
    return (
      <InputField
        error={formErrors.clName}
        name='clName'
        onChange={(name, value) => {
          this.resetClass(value)
        }}
        value={this.state.clName}
      />
    )
  }

  renderSchool () {
    const {school} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-label'>School</div>
          {school ? this.renderSchoolName() : <SearchSchool
            onSchoolSelect={this.onSubmitSchool.bind(this)}
            onSchoolCreate={this.onCreateSchool.bind(this)}
          />}
        </div>
      </div>
    )
  }

  renderClass () {
    const {cl, newCl} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-label'>Class name</div>
          {(cl || newCl) ? this.renderClassName() : <SearchClass
            schoolId={this.state.school.id}
            onClassSelect={this.onSubmitClass.bind(this)}
            onClassCreate={this.onCreateClass.bind(this)}
          />}
        </div>
      </div>
    )
  }

  renderSemester () {
    const {school, semester} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-label'>{!school.is_university ? 'Year or ' : ''}Semester</div>
          {semester ? this.renderSemesterName() : <SearchSemester
            schoolId={school.id}
            isUniversity={school.is_university}
            onSemesterSelect={this.onSubmitSemester.bind(this)}
            onSemesterCreate={this.onCreateSemester.bind(this)}
          />}
        </div>
      </div>
    )
  }

  renderDisabledField () {
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-disabled-label'></div>
          <div className='cn-find-classes-disabled'></div>
        </div>
      </div>
    )
  }

  resetClass (value) {
    const {newSchool} = this.state
    if (newSchool) {
      this.setState({clName: value})
    } else {
      this.setState({
        cl: null,
        clName: '',
        newCl: false,
        semester: null,
        subject: '',
        section: '',
        code: ''
      })
    }
  }

  resetSchool () {
    this.setState(this.initializeState())
  }

  resetSemester () {
    const {newCl} = this.state
    if (newCl) {
      this.setState({semester: null})
    } else {
      this.resetClass()
    }
  }

  resetSubject (value) {
    const {newCl} = this.state
    if (newCl) {
      this.setState({subject: value})
    } else {
      this.resetClass()
    }
  }

  resetCode (value) {
    const {newCl} = this.state
    if (newCl) {
      this.setState({code: value})
    } else {
      this.resetClass()
    }
  }

  resetSection (value) {
    const {newCl} = this.state
    if (newCl) {
      this.setState({section: value})
    } else {
      this.resetClass()
    }
  }

  toggleCreateSchoolModal () {
    this.setState({openCreateSchoolModal: !this.state.openCreateSchoolModal})
  }

  renderCreateSchoolModal () {
    return (
      <Modal
        open={this.state.openCreateSchoolModal}
        onClose={this.toggleCreateSchoolModal.bind(this)}
      >
        <CreateSchoolModal
          name={this.state.schoolName}
          onClose={this.toggleCreateSchoolModal.bind(this)}
          onSubmit={this.onSubmitSchool.bind(this)}
        />
      </Modal>
    )
  }

  renderClassDetail () {
    const {formErrors} = this.props
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-sub-field'>
          <div className='cn-find-classes-label'>Subject</div>
          <InputField
            error={formErrors.subject}
            name='subject'
            onChange={(name, value) => {
              this.resetSubject(value)
            }}
            value={this.state.subject}
          />
        </div>
        <div className='cn-find-classes-sub-field'>
          <div className='cn-find-classes-label'>Code</div>
          <InputField
            error={formErrors.code}
            name='code'
            onChange={(name, value) => {
              this.resetCode(value)
            }}
            value={this.state.code}
          />
        </div>
        <div className='cn-find-classes-sub-field'>
          <div className='cn-find-classes-label'>Section</div>
          <InputField
            error={formErrors.section}
            name='section'
            onChange={(name, value) => {
              this.resetSection(value)
            }}
            value={this.state.section}
          />
        </div>
      </div>
    )
  }

  render () {
    let {schoolName, school, cl, newCl, clName, semester} = this.state
    return (
      <div className='cn-find-classes-container'>
        <div className='cn-find-classes-content'>
          <div className='cn-find-classes-header'>
            <h2>Set up or find a class</h2>
            <p>Make sure this info is correct so your classmates can find the class!</p>
          </div>
          {this.renderSchool()}
          {school ? this.renderClass() : this.renderDisabledField()}
          {(cl || (newCl && clName)) ? this.renderSemester() : this.renderDisabledField()}
          {(!school || (school && school.is_university)) && (semester ? this.renderClassDetail() : this.renderDisabledField())}
        </div>
        {schoolName && this.renderCreateSchoolModal()}
      </div>
    )
  }
}

FindClasses.propTypes = {
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(FindClasses, 'form'))
