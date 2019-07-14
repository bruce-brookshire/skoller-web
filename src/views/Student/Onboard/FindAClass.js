import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import actions from '../../../actions'
import moment from 'moment'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showClassNameAutocomplete: false,
      classChoice: null,
      classes: [],
      loadingAutocompleteClasses: false,
      input: null,
      showSubjectCodeSectionField: false,
      showMeetTimesDaysField: false,
      showProfessorField: false,
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
      isOnline: false
    }
  }

  searchClasses (value) {
    this.setState({loadingAutocompleteClasses: true})
    if (value) {
      this.setState({loadingAutocompleteClasses: true})
      actions.classes.searchSchoolStudentClasses(this.props.params.termChoice.id, value).then((classes) => {
        this.setState({classes, loadingAutocompleteClasses: false})
      }).catch(() => { this.setState({loadingAutocompleteClasses: false}) })
    } else {
      this.setState({classes: [], loadingAutocompleteClasses: false})
    }
  }

  renderClassNameAutocomplete () {
    return (
      <div
        className='sk-find-class-autocomplete-container'
        style={{
          width: this.classNameField.offsetWidth.toString() + 'px'
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
                <p>{cl.professor ? cl.professor.name_first + ' ' + cl.professor.name_last : '--'}</p>
                <p>
                  <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
                </p>
              </div>
              <div className='sk-find-class-autocomplete-option-row'>
                <p>{cl.meet_days} {moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA')}</p>
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
              classChoice: {'name': this.state.input},
              showClassNameAutocomplete: false,
              showSubjectCodeSectionField: true
            })
          }}
          style={{
            border: 'none',
            padding: '8px 4px 0 4px'
          }}
        >
          Can&apos;t find your class? Click to add <b style={{color: '#57B9E4'}}>{this.state.input}</b> to the Skoller Cloud! ☁️
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
          <p>{cl.professor ? cl.professor.name_first + ' ' + cl.professor.name_last : '--'}</p>
          <p>
            <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
          </p>
        </div>
        <div className='sk-find-class-selected-class-row'>
          <p>{cl.meet_days} {moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA')}</p>
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
              className='sk-find-class-field'
              ref={classNameField => { this.classNameField = classNameField } }
              contentEditable={true}
              onInput={e => {
                this.searchClasses(e.currentTarget.textContent)
                this.setState({input: e.currentTarget.textContent, showClassNameAutocomplete: true})
              }}
            />
        }
        {(this.state.classes && this.state.input && this.state.showClassNameAutocomplete)
          ? this.renderClassNameAutocomplete()
          : null
        }
      </div>
    )
  }

  renderSubjectCodeSectionField () {
    return (
      <div className='sk-find-class-scs-container'>
        <div className='sk-find-class-scs-item'>
          <div className='sk-find-class-scs-label'>
            Subject
          </div>
          <div className='sk-find-class-scs-field'>
            <input
              type='string'
              placeholder='e.g. MKT'
              value={this.state.subject}
              onChange={(event) => this.setState({subject: event.target.value})}
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
              onChange={(event) => this.setState({code: event.target.value})}
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
              onChange={(event) => this.setState({section: event.target.value})}
            />
          </div>
        </div>
      </div>
    )
  }

  renderMeetTimesDaysField () {
    let meetTimesHours = [
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
                    meetDays[day] = !this.state.meetDays[day]
                    this.setState({meetDays})
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

  renderProfessorField () {
    return (
      <div>professor</div>
    )
  }

  render () {
    return (
      <div>
        <SkProgressBar progress={0.5} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-find-class'>
          <h1
            className='onboard-find-class-school'
            style={{
              color: this.props.params.schoolChoice.color ? '#' + this.props.params.schoolChoice.color : null
            }}
          >
            {this.props.params.schoolChoice.name}
          </h1>
          <h3
            className='onboard-find-class-term'
          >
            {this.props.params.termChoice.name}
          </h3>
          <div className="onboard-find-class-sammi-container">
            <img src='/src/assets/images/sammi/Wow@3x.png' />
            <div className="sammi-message"><p>Find your first class!</p></div>
          </div>
        </div>
        <div className='sk-find-class-form'>
          {this.renderClassNameField()}
          {this.state.showSubjectCodeSectionField
            ? this.renderSubjectCodeSectionField()
            : null
          }
          {(this.state.showMeetTimesDaysField || (this.state.subject && this.state.code && this.state.section))
            ? this.renderMeetTimesDaysField()
            : null
          }
          {this.state.showProfessorField
            ? this.renderProfessorField()
            : null
          }
        </div>
        <div
          className={'onboard-next' + ((this.state.classChoice && !this.state.isNewClass) || (this.state.classChoice) ? '' : ' disabled')}
          onClick={() => this.props.onSubmit()}
        >
          <p>Next</p>
        </div>
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  params: PropTypes.object
}

export default SelectSchool
