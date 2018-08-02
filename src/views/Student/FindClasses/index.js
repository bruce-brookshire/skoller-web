import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import actions from '../../../actions'
import {InputField} from '../../../components/Form'
import SearchSchool from '../../components/SearchSchool'
import SearchClass from './SearchClass'
import SearchSemester from './SearchSemester'
import SearchProfessor from '../../components/ClassEditor/Professor/SearchProfessor'
import CreateSchoolModal from './CreateSchoolModal'
import Modal from '../../../components/Modal'
import MeetingTimes from '../../components/ClassEditor/MeetingTimes'
import moment from 'moment-timezone'
import ProfessorModal from '../../components/ClassEditor/Professor/ProfessorModal'
import { browserHistory } from 'react-router'
import ClassCard from '../../../components/ClassCard'

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
      openMeetingTimeModal: false,
      openProfessorModal: false,
      cl: null,
      clName: '',
      newSchool: false,
      newCl: false,
      semester: null,
      subject: '',
      section: '',
      code: '',
      days: '',
      time: '',
      professor: null,
      loading: false,
      fade: false
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
      subject: cl.subject,
      days: cl.meet_days,
      time: cl.meet_start_time,
      professor: cl.professor
    })
  }

  mapForm () {
    let form = {
      name: this.state.clName,
      meet_start_time: this.state.days === 'Online' ? 'Online' : this.state.time,
      meet_days: this.state.days,
      professor_id: this.state.professor.id,
      code: this.state.code || '',
      section: this.state.section || '',
      subject: this.state.subject || ''
    }
    return form
  }

  enroll (cl) {
    actions.classes.enrollInClass(cl.id).then((studentCl) => {
      this.setState({loading: false})
      browserHistory.push({
        pathname: 'student/class-link',
        state: {
          enrollmentLink: studentCl.enrollment_link,
          className: cl.name
        }
      })
    })
  }

  onSubmit () {
    const {newCl, cl, semester} = this.state
    this.setState({loading: true})
    if (newCl) {
      let clForm = this.mapForm()
      actions.classes.createClass(clForm, semester.id).then((cl) => {
        this.enroll(cl)
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.enroll(cl)
    }
  }

  onSubmitMeetingTime (form) {
    this.setState({days: form.days, time: form.days !== 'Online' ? form.time : ''})
  }

  onSubmitSemester (semester) {
    this.setState({semester})
  }

  onCreateClass (clName) {
    this.setState({clName, newCl: true})
  }

  onSubmitProfessor (professor) {
    this.setState({professor})
  }

  onCreateSemester (semester) {
    const {school} = this.state
    actions.periods.createPeriod(school.id, {name: semester}).then((semester) => {
      this.setState({semester})
    }).catch(() => { this.setState({semester: null}) })
  }

  onCreateProfessor (professor) {
    this.toggleProfessorModal()
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
    const {newCl, cl} = this.state
    return (
      <InputField
        error={formErrors.semesterName}
        name='semesterName'
        onChange={(name, value) => {
          this.resetSemester()
        }}
        value={this.state.semester.name}
        disabled={!newCl && cl}
      />
    )
  }

  renderProfessorName () {
    const {formErrors} = this.props
    const {newCl, cl} = this.state
    return (
      <InputField
        error={formErrors.professorName}
        name='professorName'
        onChange={(name, value) => {
          this.resetProfessor()
        }}
        disabled={!newCl && cl}
        value={this.state.professor ? this.state.professor.name_first + ' ' + this.state.professor.name_last : ''}
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
            placeholder={'Find your school'}
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
        code: '',
        days: '',
        time: '',
        professor: null
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

  resetProfessor () {
    const {newCl} = this.state
    if (newCl) {
      this.setState({professor: null})
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

  resetMeetingDetails (value) {
    const {newCl} = this.state
    if (newCl) {
      this.toggleMeetingTimeModal()
    } else {
      this.resetClass()
    }
  }

  toggleCreateSchoolModal () {
    this.setState({openCreateSchoolModal: !this.state.openCreateSchoolModal})
  }

  toggleProfessorModal () {
    this.setState({openProfessorModal: !this.state.openProfessorModal})
  }

  toggleMeetingTimeModal () {
    this.setState({openMeetingTimeModal: !this.state.openMeetingTimeModal})
  }

  renderProfessorModal () {
    const {school} = this.state
    return (
      <Modal
        open={this.state.openProfessorModal}
        onClose={this.toggleProfessorModal.bind(this)}
      >
        <ProfessorModal
          schoolId={school.id}
          isUniversity={school.is_university}
          onClose={this.toggleProfessorModal.bind(this)}
          onSubmit={this.onSubmitProfessor.bind(this)}
        />
      </Modal>
    )
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

  renderMeetingTimeModal () {
    const {days, time} = this.state
    return (
      <Modal
        open={this.state.openMeetingTimeModal}
        onClose={this.toggleMeetingTimeModal.bind(this)}
      >
        <MeetingTimes
          days={days}
          time={time}
          onClose={this.toggleMeetingTimeModal.bind(this)}
          onSubmit={this.onSubmitMeetingTime.bind(this)}
        />
      </Modal>
    )
  }

  renderClassDetail () {
    const {formErrors} = this.props
    const {newCl, cl, school} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        {school && school.is_university && <div className='cn-find-classes-sub-field'>
          <div className='cn-find-classes-label'>Subject</div>
          <InputField
            error={formErrors.subject}
            name='subject'
            onChange={(name, value) => {
              this.resetSubject(value)
            }}
            value={this.state.subject}
            disabled={!newCl && cl}
            placeholder='e.g. MKT'
          />
        </div>}
        {school && school.is_university && <div className='cn-find-classes-sub-field'>
          <div className='cn-find-classes-label'>Code</div>
          <InputField
            error={formErrors.code}
            name='code'
            onChange={(name, value) => {
              this.resetCode(value)
            }}
            value={this.state.code}
            disabled={!newCl && cl}
            placeholder='e.g. 3201'
          />
        </div>}
        <div className={school && school.is_university ? 'cn-find-classes-sub-field' : 'cn-find-classes-field'}>
          <div className='cn-find-classes-label'>{school && school.is_university ? 'Section' : 'Period or Start Time'}</div>
          <InputField
            error={formErrors.section}
            name='section'
            onChange={(name, value) => {
              this.resetSection(value)
            }}
            value={this.state.section}
            disabled={!newCl && cl}
            placeholder={(school && !school.is_university) ? 'e.g. 5th Period' : 'e.g. 01'}
          />
        </div>
      </div>
    )
  }

  renderMeetingButton () {
    return (
      <button
        className={`button full-width`}
        onClick={() => this.toggleMeetingTimeModal()}
        type="button"
      >Pick meeting times</button>
    )
  }

  renderMeetingFields () {
    const {formErrors} = this.props
    const {newCl, cl, days, time} = this.state

    let inputValue = days + (time ? ' ' + moment(this.state.time, 'HH:mm:ss').format('hh:mm a').toString() : '')
    return (
      <InputField
        error={formErrors.meet_times}
        name='meet_times'
        onChange={(name, value) => {
          this.resetMeetingDetails(value)
        }}
        value={inputValue}
        disabled={!newCl && cl}
      />
    )
  }

  renderMeeting () {
    const {newCl, days, time} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-label'>Meet times</div>
          {newCl && (!days || !time) && days !== 'Online' ? this.renderMeetingButton() : this.renderMeetingFields()}
        </div>
      </div>
    )
  }

  renderProfessor () {
    const {school, professor, newCl} = this.state
    return (
      <div className='cn-find-classes-field-container'>
        <div className='cn-find-classes-field'>
          <div className='cn-find-classes-label'>{school.is_university ? 'Professor' : 'Teacher'}</div>
          {!newCl || professor ? this.renderProfessorName() : <SearchProfessor
            schoolId={school.id}
            isUniversity={school.is_university}
            onProfessorSelect={this.onSubmitProfessor.bind(this)}
            onProfessorCreate={this.onCreateProfessor.bind(this)}
          />}
        </div>
      </div>
    )
  }

  renderExistsMessage () {
    return (
      <div className='cn-find-classes-exists'>Woah… that class is already set up! 😲💯</div>
    )
  }

  renderSubmit () {
    const {newCl, cl} = this.state
    return (
      <div>
        {!newCl && this.renderExistsMessage()}
        <button
          onClick={this.onSubmit.bind(this)}
          className='button margin-top margin-bottom form-button full-width'
        >{newCl ? 'Create class' : `Enroll in ${cl.name}`}</button>
      </div>
    )
  }

  renderFields () {
    const {school, cl, newCl, clName, semester, section, subject, code, time, days, professor} = this.state
    return (
      <div className={this.state.fade ? 'cn-find-class-fade-left' : ''}>
        {this.renderSchool()}
        {school ? this.renderClass() : this.renderDisabledField()}
        {(cl || (newCl && clName)) ? this.renderSemester() : this.renderDisabledField()}
        {(!newCl && cl) || (semester) ? this.renderClassDetail() : this.renderDisabledField()}
        {(!school || (school && school.is_university)) && ((!newCl && cl) || (section && subject && code) ? this.renderMeeting() : this.renderDisabledField())}
        {(!newCl && cl) || ((time && days) || days === 'Online') || (school && !school.is_university && section) ? this.renderProfessor() : this.renderDisabledField()}
        {((!newCl && cl) || (school && clName && semester && (!school.is_university || (section && subject && code)) && (!school.is_university || ((time && days) || days === 'Online')) && (!newCl || professor))) && this.renderSubmit()}
      </div>
    )
  }

  renderCard () {
    let {school, cl, professor, semester} = this.state
    return (
      <div className='cn-find-classes-card'>
        <ClassCard
          cl={cl}
          onSubmit={this.onSubmit.bind(this)}
          schoolName={school ? school.name : ''}
          professorName={professor ? professor.name_first + ' ' + professor.name_last : ''}
          semesterName={semester ? semester.name : ''}
        />
        <button
          className='full-width button margin-top error-button'
          onClick={() => {
            this.setState({fade: true})
            this.resetClass()
          }}
        >
        👈 Go back - wrong class!
        </button>
      </div>
    )
  }

  render () {
    let {schoolName, school, cl, newCl} = this.state
    return (
      <div className='cn-find-classes-container'>
        <div className='cn-find-classes-content'>
          <div className='cn-find-classes-header'>
            <h2>Find a class</h2>
            <p>Make sure this info is correct so your classmates can find the class!</p>
          </div>
          {(newCl || !cl) ? this.renderFields() : this.renderCard()}
        </div>
        {schoolName && this.renderCreateSchoolModal()}
        {this.renderMeetingTimeModal()}
        {school && this.renderProfessorModal()}
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
