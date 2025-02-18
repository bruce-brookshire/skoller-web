import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../actions'
import moment from 'moment'
import ProfessorForm from '../../../views/components/ProfessorForm'
import SkModal from '../../components/SkModal/SkModal'
import Sammi from '../../components/Sammi'
import live from '../../../assets/images/class_status/todolist_gif.gif'
import { CSSTransition } from 'react-transition-group'

@inject('rootStore') @observer
class FindAClass extends React.Component {
  constructor (props) {
    super(props)

    let termChoice
    let schoolChoice
    if (this.props.params) {
      termChoice = this.props.params.termChoice
      schoolChoice = this.props.params.schoolChoice
    } else {
      termChoice = this.props.rootStore.userStore.user.student.primary_period
      schoolChoice = this.props.rootStore.userStore.user.student.primary_school
    }

    this.state = {
      showClassNameAutocomplete: false,
      classChoice: null,
      classes: [],
      loadingAutocompleteClasses: false,
      loadingAutocompleteProfessors: false,
      loadingSubmit: false,
      name: null,
      showSubjectCodeSectionField: false,
      showMeetTimesDaysField: true,
      showProfessorField: true,
      showProfessorAutocomplete: false,
      subject: null,
      code: null,
      section: null,
      isAm: true,
      meetDays: {
        'Su': false,
        'M': false,
        'Tu': false,
        'W': false,
        'Th': false,
        'F': false,
        'Sa': false
      },
      isOnline: false,
      professor: null,
      professorChoice: null,
      professors: null,
      meetTimeHour: '',
      meetTimeMinute: '',
      isNewClass: false,
      termChoice: termChoice,
      schoolChoice: schoolChoice,
      completedClassView: false,
      ios: this.getMobileOperatingSystem() === 'iOS',
      searchClassesValue: null,
      window: window
    }

    this.animationTimeout = 600
    this.searchTimeout = null
  }

  getMobileOperatingSystem () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera

    // Windows Phone must come first because its UA also contains "Android"
    if (/android/i.test(userAgent)) {
      return 'Android'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }
  }

  searchClasses (value) {
    this.setState({loadingAutocompleteClasses: true})

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout)
    }

    if (value) {
      this.setState({loadingAutocompleteClasses: true, searchClassesValue: value})
      if (this.state.termChoice) {
        this.searchTimeout = setTimeout(() => {
          actions.classes.searchSchoolStudentClasses(this.state.termChoice.id, value).then((classes) => {
            if (this.state.searchClassesValue === value) {
              this.setState({classes, loadingAutocompleteClasses: false})
            }
          }).catch(() => { this.setState({loadingAutocompleteClasses: false}) })
        }, 800)
      }
    } else {
      this.setState({classes: [], loadingAutocompleteClasses: false})
    }
  }

  searchProfessors (value) {
    this.setState({loadingAutocompleteProfessors: true})
    if (value) {
      this.setState({loadingAutocompleteProfessors: true})
      actions.professors.searchProfessors(value, this.state.schoolChoice.id).then((professors) => {
        this.setState({professors, loadingAutocompleteProfessors: false})
      }).catch(() => { this.setState({loadingAutocompleteProfessors: false}) })
    } else {
      this.setState({professors: [], loadingAutocompleteProfessors: false})
    }
  }

  handleResize = () => {
    this.setState({window: window})
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  renderClassNameAutocomplete () {
    // calculate height of the search results container based on window size
    let maxHeight = this.state.window.innerHeight - (this.classNameField.offsetTop + this.classNameField.offsetHeight) - 8

    return (
      <div
        className='sk-find-class-autocomplete-container'
        style={{
          width: this.classNameField.offsetWidth.toString() + 'px',
          maxHeight: this.state.ios ? '120px' : maxHeight
        }}
      >
        {this.state.classes.map(cl => {
          return (
            <div
              className='sk-find-class-autocomplete-option'
              key={cl.id}
              onClick={() => {
                this.setState({
                  classChoice: cl,
                  showClassNameAutocomplete: false,
                  isNewClass: false
                })
                this.classNameField.innerHTML = null
              }}
            >
              <div className='sk-find-class-autocomplete-option-title'>
                <h3>{cl.name}</h3>
              </div>
              <div className='sk-find-class-autocomplete-option-row'>
                <p>{
                  cl.professor
                    ? (cl.professor.name_first ? cl.professor.name_first : '') + ' ' + (cl.professor.name_last ? cl.professor.name_last : '')
                    : '--'
                }</p>
                <p>
                  <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
                </p>
              </div>
              <div className='sk-find-class-autocomplete-option-row'>
                <p>{cl.meet_days} {cl.meet_start_time ? moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA') : ''}</p>
                <p>{cl.subject} {cl.code}.{cl.section}</p>
              </div>
            </div>
          )
        })}
        <div
          className='sk-find-class-autocomplete-option'
          onClick={() => {
            this.setState({
              isNewClass: true,
              classChoice: {'name': this.state.name},
              showClassNameAutocomplete: false,
              showSubjectCodeSectionField: true
            })
          }}
          style={{
            border: 'none',
            padding: '8px 4px 0 4px'
          }}
        >
          Add class <b style={{color: '#57B9E4'}}>{this.state.name}</b>
        </div>
      </div>
    )
  }

  renderClassChoice () {
    let cl = this.state.classChoice
    return (
      <div
        className='sk-find-class-selected-class'
        onClick={() => this.setState({classChoice: null})}
      >
        <div className='sk-find-class-selected-class-title'>
          <h3>{cl.name}</h3>
        </div>
        <div className='sk-find-class-selected-class-row'>
          <p>{cl.professor ? ((cl.professor.name_first ? cl.professor.name_first : '') + ' ' + (cl.professor.name_last ? cl.professor.name_last : '')) : '--'}</p>
          <p>
            <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
          </p>
        </div>
        <div className='sk-find-class-selected-class-row'>
          <p>{cl.meet_days} {cl.meet_days === 'Online' ? '' : moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA')}</p>
          <p>{cl.subject} {cl.code}.{cl.section}</p>
        </div>
      </div>
    )
  }

  renderNewClassName () {
    return (
      <div
        className='sk-find-class-selected-name'
        onClick={() => this.setState({classChoice: null})}
      >
        {this.state.classChoice.name}
      </div>
    )
  }

  renderClassNameField () {
    return (
      <div>
        {(this.state.classChoice && !this.state.isNewClass)
          ? null
          : <div className='sk-find-class-label'>Class Name</div>
        }
        {this.state.classChoice && this.state.isNewClass
          ? this.renderNewClassName()
          : this.state.classChoice
            ? this.renderClassChoice()
            : <div
              className={'sk-find-class-field'}
              ref={classNameField => { this.classNameField = classNameField } }
              contentEditable={true}
              onInput={e => {
                this.searchClasses(e.currentTarget.textContent)
                this.setState({name: e.currentTarget.textContent, showClassNameAutocomplete: true})
              }}
            />
        }
        {(this.state.classes && this.state.name && this.state.showClassNameAutocomplete)
          ? this.renderClassNameAutocomplete()
          : null
        }
      </div>
    )
  }

  renderSubjectCodeSectionField () {
    return (
      <div style={{display: 'flex', flexDirection: 'column', marginTop: '5px'}}>

        <div><b>Class Details (Optional)</b></div>
        <div className='sk-find-class-scs-container'>
          <div className='sk-find-class-scs-item'>
            <div className='sk-find-class-scs-label'>
            Subject
            </div>
            <div className='sk-find-class-scs-field'>
              <input
                autoFocus
                type='string'
                placeholder='e.g. MKT'
                value={this.state.subject}
                style={{textTransform: 'uppercase'}}
                onChange={(event) => this.setState({subject: event.target.value.toUpperCase()})}
              />
            </div>
          </div>
          <div className='sk-find-class-scs-item'>
            <div className='sk-find-class-scs-label'>
            Code
            </div>
            <div className='sk-find-class-scs-field'>
              <input
                type='string'
                placeholder='e.g. 101'
                value={this.state.code}
                style={{textTransform: 'uppercase'}}
                onChange={(event) => this.setState({code: event.target.value.toUpperCase()})}
              />
            </div>
          </div>
          <div className='sk-find-class-scs-item'>
            <div className='sk-find-class-scs-label'>
            Section
            </div>
            <div className='sk-find-class-scs-field'>
              <input
                type='string'
                placeholder='e.g. 01'
                value={this.state.section}
                style={{textTransform: 'uppercase'}}
                onChange={(event) => this.setState({section: event.target.value.toUpperCase()})}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMeetTimesDaysField () {
    let meetTimesHours = [
      '00',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12'
    ]

    let meetTimesMinutes = [
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55'
    ]

    let meetDays = [
      'Su',
      'M',
      'Tu',
      'W',
      'Th',
      'F',
      'Sa'
    ]

    return (
      <div className='sk-find-class-mtd-container'>
        <div className='sk-find-class-mtd-item'>
          <div className='sk-find-class-mtd-label'>
            Meeting time*
          </div>
          <div className='sk-find-class-mtd-field'>
            <div className={'sk-find-class-mtd-time' + (this.state.isOnline ? ' disabled' : '')}>
              <select
                disabled={this.state.isOnline}
                value={this.state.meetTimeHour}
                onChange={(event) => this.setState({meetTimeHour: event.target.value})}
              >
                {meetTimesHours.map(hour => {
                  return (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  )
                })}
              </select>
              <div className='sk-find-class-mtd-divider'>:</div>
              <select
                disabled={this.state.isOnline}
                value={this.state.meetTimeMinute}
                onChange={(event) => this.setState({meetTimeMinute: event.target.value})}
              >
                {meetTimesMinutes.map(minute => {
                  return (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='sk-find-class-mtd-ampm'>
              <p
                className={'sk-find-class-mtd-am' + ((this.state.isAm && !this.state.isOnline) ? ' active' : '') + (this.state.isOnline ? ' disabled' : '')}
                onClick={() => this.setState({isAm: true})}
              >
                AM
              </p>
              <p
                className={'sk-find-class-mtd-pm' + ((!this.state.isAm && !this.state.isOnline) ? ' active' : '') + (this.state.isOnline ? ' disabled' : '')}
                onClick={() => this.setState({isAm: false})}
              >
                PM
              </p>
            </div>
          </div>
        </div>
        <div className='sk-find-class-mtd-item-days'>
          <div className='sk-find-class-mtd-label'>
            Meeting days*
          </div>
          <div className='sk-find-class-mtd-days-container'>
            {meetDays.map((day) => {
              let className
              if (day === 'Su') {
                className = 'sk-find-class-mtd-day first'
              } else if (day === 'Sa') {
                className = 'sk-find-class-mtd-day last'
              } else {
                className = 'sk-find-class-mtd-day'
              }
              if (this.state.meetDays[day]) {
                className = className + ' active'
              }
              if (this.state.isOnline) {
                className = className + ' disabled'
              }
              let meetDays = this.state.meetDays
              return (
                <div
                  key={day}
                  className={className}
                  onClick={() => {
                    if (!this.state.isOnline) {
                      meetDays[day] = !this.state.meetDays[day]
                      this.setState({meetDays})
                    }
                  }}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
        <div className='sk-find-class-mtd-item-online'>
          <input
            type='checkbox'
            name='Online Class'
            checked={this.state.isOnline}
            onChange={() => {
              this.setState({
                isOnline: !this.state.isOnline
              })
            }}
          />
          <p
            onClick={() => {
              this.setState({
                isOnline: !this.state.isOnline
              })
            }}
          >
            *This is an online class
          </p>
        </div>
      </div>
    )
  }

  renderProfessorAutocomplete () {
    return (
      <div
        className='sk-find-class-p-autocomplete-container'
        style={{
          width: this.professorField.offsetWidth.toString() + 'px'
        }}
      >
        {this.state.professors.map(professor => {
          return (
            <div
              className='sk-find-class-p-autocomplete-option'
              key={professor.id}
              onClick={() => {
                let classChoice = this.state.classChoice
                classChoice.professor = professor
                this.setState({
                  professorChoice: professor,
                  classChoice: classChoice,
                  showProfessorAutocomplete: false
                })
              }}
            >
              {professor.name_first} {professor.name_last} <span className='sk-find-class-p-email'>{professor.email}</span>
            </div>
          )
        })}
        <div
          className='sk-find-class-p-autocomplete-option sk-blue'
          style={{
            border: 'none',
            padding: '8px 4px 0 4px'
          }}
          onClick={() => this.setState({showNewProfessorModal: true})}
        >
          Create a new professor
        </div>
      </div>
    )
  }

  renderNewProfessorModal () {
    let classChoice = this.state.classChoice
    return (
      <SkModal closeModal={() => this.setState({showNewProfessorModal: false})}>
        <ProfessorForm
          schoolId={this.state.schoolChoice.id}
          isUniversity={this.state.schoolChoice.is_university}
          onSubmit={(professor) => {
            classChoice.professor = professor
            this.setState({
              showNewProfessorModal: false,
              classChoice: classChoice,
              professorChoice: professor,
              showProfessorAutocomplete: false
            })
          }}
        />
      </SkModal>
    )
  }

  clearProfessor () {
    let classChoice = this.state.classChoice
    delete classChoice.professor
    this.setState({
      classChoice: classChoice,
      professor: '',
      professorChoice: null
    })
  }

  renderProfessorField () {
    return (
      <div className='sk-find-class-p-container'>
        {this.state.showNewProfessorModal
          ? this.renderNewProfessorModal()
          : null
        }
        <div className='sk-find-class-p-item'>
          <div className='sk-find-class-p-label'>
            Professor
          </div>
          <div
            className='sk-find-class-p-field'
            ref={professorField => { this.professorField = professorField } }
            onClick={() => this.clearProfessor()}
          >
            {this.state.professorChoice === null
              ? <input
                type='string'
                placeholder='e.g. Smith'
                value={this.state.professor}
                onChange={(e) => {
                  this.searchProfessors(e.target.value)
                  this.setState({professor: e.target.value, showProfessorAutocomplete: true})
                }}
                style={{color: 'rgba(0,0,0,0.5)'}}
              />
              : <p>
                {this.state.professorChoice.name_first} {this.state.professorChoice.name_last}
              </p>
            }
            {/* {this.state.professor && !this.state.showProfessorAutocomplete && <p onClick={() => this.setState({showNewProfessorModal: true})} style={{margin: '-8px 0 0 0', color: 'red', fontSize: '12px'}}>You must create a new professor to add this class</p>} */}
          </div>
          {(this.state.showProfessorAutocomplete && this.state.professor && this.state.professors)
            ? this.renderProfessorAutocomplete()
            : null
          }
        </div>
      </div>
    )
  }

  renderForm () {
    let meetDaysChecked = false
    Object.keys(this.state.meetDays).forEach(day => {
      if (this.state.meetDays[day]) {
        meetDaysChecked = true
      }
    })
    return (
      <div style={{display: !this.state.isNewClass ? 'none' : ''}}>
        <CSSTransition
          in={this.state.showSubjectCodeSectionField}
          timeout={this.animationTimeout}
          classNames="zoom"
          unmountOnExit
        >
          <div className='sk-find-class-form-row'>
            {this.renderSubjectCodeSectionField()}
          </div>
        </CSSTransition>
        <CSSTransition
          in={(this.state.showMeetTimesDaysField || (this.state.subject && this.state.code && this.state.section))}
          timeout={this.animationTimeout}
          classNames="zoom"
          unmountOnExit
        >
          <div className='sk-find-class-form-row'>
            {this.renderMeetTimesDaysField()}
          </div>
        </CSSTransition>
        <CSSTransition
          in={this.state.showProfessorField || (meetDaysChecked || this.state.isOnline)}
          timeout={this.animationTimeout}
          classNames="zoom"
          unmountOnExit
        >
          <div className='sk-find-class-form-row'>
            {this.renderProfessorField()}
          </div>
        </CSSTransition>
      </div>
    )
  }

  getMeetDays () {
    let meetDays = ''
    Object.keys(this.state.meetDays).forEach(day => {
      let abbrDay
      if (this.state.meetDays[day]) {
        if (day === 'Su') {
          abbrDay = 'U'
        } else if (day === 'Tu') {
          abbrDay = 'T'
        } else if (day === 'Th') {
          abbrDay = 'R'
        } else if (day === 'Sa') {
          abbrDay = 'S'
        } else {
          abbrDay = day
        }
        meetDays = meetDays + abbrDay
      }
    })
    return meetDays
  }

  getMeetStartTime () {
    let meetStartTime = ''
    let hour = this.state.meetTimeHour
    if (!this.state.isAm) {
      if (parseInt(this.state.meetTimeHour) !== 12) {
        hour = (parseInt(this.state.meetTimeHour) + 12).toString()
      }
    }
    if (parseInt(hour) < 10) {
      hour = '0' + hour.toString()
    }
    meetStartTime = hour + ':' + this.state.meetTimeMinute + ':00'
    return meetStartTime
  }

  validateForm () {
    if (this.state.isNewClass) {
      if (this.state.name) {
        return true
      } else {
        return false
      }
    } else if (this.state.classChoice) {
      return true
    } else {
      return false
    }
  }

  handleSubmit () {
    if (this.state.isNewClass) {
      const form = {
        'name': this.state.name,
        'subject': this.state.subject ? this.state.subject.toUpperCase() : null,
        'code': this.state.code,
        'section': this.state.section,
        'crn': null,
        'meet_start_time': this.state.isOnline ? null : this.getMeetStartTime(),
        'meet_days': this.state.isOnline ? 'Online' : this.getMeetDays(),
        'location': null,
        'type': null,
        'class_period_id': this.state.termChoice.id,
        'professor_id': this.state.professorChoice ? this.state.professorChoice.id : null
      }
      if (this.validateForm()) {
        this.setState({loadingSubmit: true})
        actions.classes.createClass(form, this.state.termChoice.id).then((response) => {
          this.setState({loadingSubmit: false})
          if (this.props.altEnroll) {
            this.props.altEnroll(response.id)
          } else {
            actions.classes.enrollInClass(response.id).then(() => {
              this.props.onSubmit()
              if (this.props.launchClassStatusModal) {
                this.props.launchClassStatusModal(response)
              }
            })
          }
        })
      }
    } else {
      if (this.props.altEnroll) {
        this.props.altEnroll(this.state.classChoice.id)
      } else {
        actions.classes.enrollInClass(this.state.classChoice.id).then((r) => {
          if (r.status.id === 1400 && !this.props.onboard) {
            this.props.launchClassStatusModal(r)
          } else {
            if (this.props.onboard) {
              this.props.onSubmit()
            } else {
              this.props.launchClassStatusModal(r)
            }
          }
        })
      }
    }
  }

  renderFormSection () {
    return (
      <div className='sk-find-class-form-container'>
        <div className='sk-find-class-form'>
          <div className='sk-find-class-form-row'>
            {this.renderClassNameField()}
          </div>
          {this.renderForm()}
        </div>
        {this.renderPreview()}
      </div>
    )
  }

  renderSchoolDetailsSection () {
    return (
      <React.Fragment>
        <div className='sk-find-class'>
          <div>
            <h1
              className='sk-find-class-school'
              style={{
                color: this.state.schoolChoice ? this.state.schoolChoice.color : null
              }}
            >
              {this.state.schoolChoice ? this.state.schoolChoice.name : ''}
            </h1>
            <h3
              className='sk-find-class-term'
            >
              {this.state.termChoice ? this.state.termChoice.name : ''}
            </h3>
          </div>
          <p>
            <small
              style={{color: '#57B9E4', cursor: 'pointer', width: '100%'}}
              onClick={() => this.props.onBack(this.state.schoolChoice, this.state.termChoice)}
            >
              Edit
            </small>
          </p>
        </div>
        {this.props.hideOnboard
          ? null
          : <div>
            <Sammi
              message='Find your first class!'
              emotion='wow'
              position='left'
            />
            <SkProgressBar progress={0.5} width={'100%'} backgroundColor={'$cn-color-blue'}/>
          </div>
        }
      </React.Fragment>
    )
  }

  renderMeetDaysPreview () {
    let meetDays = this.state.meetDays

    if (this.state.isOnline) return 'Online'

    return (
      Object.keys(meetDays).map(d => {
        if (meetDays[d]) {
          return <span key={Object.keys(meetDays).indexOf(d)}>{d + ' '}</span>
        }
      })
    )
  }

  renderPreview () {
    return (
      <CSSTransition
        in={this.state.isNewClass}
        timeout={this.animationTimeout}
        classNames=""
        unmountOnExit
      >
        <div className='sk-fc-preview'>

          <div className='sk-fc-preview-block'>
            <div
              className='sk-find-class-selected-class'
            >
              <div className='sk-find-class-selected-class-title'>
                <h3>{this.state.name}</h3>
              </div>
              <div className='sk-find-class-selected-class-row'>
                <p>{this.state.professorChoice ? ((this.state.professorChoice.name_first ? this.state.professorChoice.name_first : '') + ' ' + (this.state.professorChoice.name_last ? this.state.professorChoice.name_last : '')) : '--'}</p>
                <p>
                  <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />
                </p>
              </div>
              <div className='sk-find-class-selected-class-row'>
                <p>{this.renderMeetDaysPreview()} {this.state.isOnline ? '' : (this.state.meetTimeHour + ':' + this.state.meetTimeMinute + (this.state.isAm ? 'am' : 'pm'))}</p>
                <p>{this.state.subject} {this.state.code}{this.state.section && '.'}{this.state.section}</p>
              </div>
            </div>
            {this.renderNext()}
          </div>
        </div>
      </CSSTransition>
    )
  }

  renderNext () {
    return <div
      className={'sk-csm-next'}
      onClick={() => {
        if (this.validateForm() && !this.state.loadingSubmit) {
          this.handleSubmit()
        }
      }}
    >
      <p>{this.state.classChoice ? 'Join class' : 'Next'}</p>
    </div>
  }

  renderContent () {
    return (
      <div className='sk-find-class-container'>
        {this.props.renderPartner ? this.props.renderPartner() : null}
        <div className='sk-fc-content'>
          {this.renderSchoolDetailsSection()}
          {this.renderFormSection()}
        </div>
        {!this.state.isNewClass && this.renderNext()}
      </div>
    )
  }

  renderCompletedClassView () {
    return (
      <div className='sk-enroll-link-container'>
        <h2>Welcome to {this.state.classChoice.name}!</h2>
        <div style={{display: 'flex', width: '100%', height: '280px', maxHeight: '300px', flexDirection: 'row', justifyContent: 'center', backgroundImage: `url(${live})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}} />
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>The syllabus for this class is <b>ALREADY ORGANIZED</b> on Skoller 🙌</div>
        <div className='sk-enroll-link-enroll-form'>
          <div
            className='sk-enroll-link-enroll-form-button'
            onClick={() => this.props.onSubmit()}
          >
            <p>Continue</p>
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (!this.state.completedClassView) {
      return (
        this.renderContent()
      )
    } else {
      return (
        this.renderCompletedClassView()
      )
    }
  }
}

FindAClass.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  params: PropTypes.object,
  renderPartner: PropTypes.func,
  onBack: PropTypes.func,
  hideOnboard: PropTypes.bool,
  launchClassStatusModal: PropTypes.func,
  onboard: PropTypes.bool,
  altEnroll: PropTypes.func
}

export default FindAClass
