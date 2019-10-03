import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import ChangeRequest from './ChangeRequest'
import {changeRequestIsComplete} from '../../../utilities/changeRequests'

class ClassWithChangeRequests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {mounted: false}
    window.scrollTo(0, 0)
  }
  componentDidMount () {
    this.setState({mounted: true})
  }
  renderWrench () {
    const isEditable = this.props.cl.is_editable
    return (
      <div className='margin-left'>
        <i className={'fa fa-wrench cursor ' + (isEditable ? 'cn-grey' : 'cn-red')} onClick={() => this.props.toggleWrench()} />
      </div>
    )
  }

  renderAdminHeader () {
    const isEditable = this.props.cl.is_editable
    const isChat = this.props.cl.is_chat_enabled
    const {cl} = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {this.props.toggleDocuments && <i className='fa fa-file-text cn-blue cursor margin-right' onClick={() => this.props.toggleDocuments()} />}
        {this.props.onEdit && <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => this.props.onEdit()} />}
        {this.props.toggleWrench && <i className={'fa fa-wrench cursor margin-left ' + (isEditable ? 'cn-grey' : 'cn-red')} onClick={() => this.props.toggleWrench()} />}
        {this.props.toggleChat && <i className={'cursor margin-left ' + (isChat ? 'fas fa-comment cn-blue' : 'far fa-comment cn-grey')} onClick={() => this.props.toggleChat()} />}
        {this.props.onSelectIssue && (cl.student_requests.findIndex((item) => !changeRequestIsComplete(item)) > -1 || cl.change_requests.findIndex((item) => !changeRequestIsComplete(item) && item.change_type.id === 400) > -1) &&
          <i className='fa fa-warning cn-red cursor margin-left' onClick={this.props.onSelectIssue.bind(this)} />
        }
      </div>
    )
  }

  renderSection (title) {
    const {cl} = this.props
    return (
      <div className='cn-class-cr-card-field'>
        <div className='cn-class-cr-card-label'>
          {title}
        </div>
        {cl.section}
      </div>
    )
  }

  renderSectionSuffix () {
    const {cl} = this.props
    if (cl.section) {
      return '.' + cl.section
    } else {
      return ''
    }
  }

  renderContent () {
    const {cl, schoolName, semesterName, boxClassName, contentClassName} = this.props
    return (
      <div className={'cn-class-cr-card ' + boxClassName} ref={cardRef => { this.cardRef = cardRef }}>
        <div className={'cn-class-cr-card-content ' + contentClassName}>

          <div className='cn-class-cr-card-header'>
            <div className='cn-class-title'>
              <div ref={nameRef => { this.nameRef = nameRef }}>
                {cl.name}
              </div>
              {this.props.onDelete && <i className='cursor margin-left fas fa-trash-alt cn-red' onClick={() => this.props.onDelete()} />}
            </div>
            <div className='cn-class-subtitle'>
              {cl.subject} {cl.code}{this.renderSectionSuffix()}
            </div>
          </div>

          <div className='cn-class-cr-card-row' ref={meetTimesRef => { this.meetTimesRef = meetTimesRef }}>
            {(cl.meet_days || cl.meet_start_time) && <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Meeting times
              </div>
              {(cl.meet_days !== 'Online' && cl.meet_start_time ? ' ' + moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mm a').toString() : '')}
            </div>}
          </div>

          <div className='cn-class-cr-card-row' ref={meetDaysRef => { this.meetDaysRef = meetDaysRef }}>
            {(cl.meet_days || cl.meet_start_time) && <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Meeting days
              </div>
              {cl.meet_days}
            </div>}
          </div>

          <div className='cn-class-cr-card-row'>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                School
              </div>
              {schoolName}
            </div>
          </div>

          <div className='cn-class-cr-card-row' ref={termRef => { this.termRef = termRef }}>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Semester
              </div>
              {semesterName}
            </div>
          </div>

          <div className='cn-class-cr-card-row' ref={subjectRef => { this.subjectRef = subjectRef }}>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Subject
              </div>
              {cl.subject}
            </div>
          </div>

          <div className='cn-class-cr-card-row' ref={sectionRef => { this.sectionRef = sectionRef }}>
            {this.renderSection('Section/Period')}
          </div>

          <div className='cn-class-cr-card-row' ref={codeRef => { this.codeRef = codeRef }}>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Code
              </div>
              {cl.code}
            </div>
          </div>

          {this.props.onSubmit && <button
            onClick={() => this.props.onSubmit()}
            className='button margin-top form-button full-width'
          >{`Enroll in ${cl.name}`}</button>}
          <div className='cn-class-cr-card-row'>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Status
              </div>
              {cl.status.name}
            </div>
          </div>
          <div className='cn-class-cr-card-row'>
            <div className='cn-class-cr-card-field'>
              <div className='cn-class-cr-card-label'>
                Enrollment
              </div>
              {cl.enrollment}
            </div>
          </div>
          {this.props.isAdmin && this.renderAdminHeader()}
        </div>
      </div>
    )
  }

  renderChangeRequests () {
    const cl = this.props.cl
    let crs = {
      'gradeScale': {
        ref: null,
        crs: []
      },
      'weights': [],
      'professor': [],
      'classInfo': {
        'name': {
          ref: this.nameRef,
          crs: []
        },
        'code': {
          ref: this.codeRef,
          crs: []
        },
        'subject': {
          ref: this.subjectRef,
          crs: []
        },
        'location': {
          ref: this.locationRef,
          crs: []
        },
        'meet_start_time': {
          ref: this.meetTimesRef,
          crs: []
        },
        'meet_days': {
          ref: this.meetDaysRef,
          crs: []
        },
        'term': {
          ref: this.termRef,
          crs: []
        },
        'section': {
          ref: this.sectionRef,
          crs: []
        }
      }
    }
    cl.change_requests.filter(c => !changeRequestIsComplete(c)).forEach(cr => {
      cr.members.forEach(member => {
        if (!member.is_completed) {
          if (cr.change_type.id === 100) {
            crs.gradeScale.crs.push({member: member, cr: cr})
          } else if (cr.change_type.id === 200) {
            crs.weights.crs.push({member: member, cr: cr})
          } else if (cr.change_type.id === 300) {
            crs.professor.crs.push({member: member, cr: cr})
          } else if (cr.change_type.id === 400) {
            if (member.member_name === 'name') {
              crs.classInfo.name.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'code') {
              crs.classInfo.code.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'subject') {
              crs.classInfo.subject.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'location') {
              crs.classInfo.location.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'meet_start_time') {
              crs.classInfo.meet_start_time.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'meet_days') {
              crs.classInfo.meet_days.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'term') {
              crs.classInfo.term.crs.push({member: member, cr: cr})
            } else if (member.member_name === 'section') {
              crs.classInfo.section.crs.push({member: member, cr: cr})
            }
          }
        }
      })
    })
    let crsToRender = []
    Object.keys(crs).forEach(category => {
      if (category === 'classInfo') {
        Object.keys(crs[category]).forEach(type => {
          let categoryChangeRequests = crs[category][type].crs
          let ref = crs[category][type].ref
          if (categoryChangeRequests.length > 0 && ref) {
            let crCount = 0
            categoryChangeRequests.forEach(cr => {
              crCount += 1
              crsToRender.push(
                <ChangeRequest
                  cl={this.props.cl}
                  cr={cr.cr}
                  member={cr.member}
                  width={this.cardRef.offsetWidth}
                  onChange={() => this.props.onChange()}
                  multipleCrs={{count: categoryChangeRequests.length, position: crCount}}
                  offsetTop={ref.offsetTop}
                />
              )
            })
          }
        })
      }
    })
    let i = 0
    crsToRender.sort((a, b) => new Date(b.props.cr.inserted_at) - new Date(a.props.cr.inserted_at))
    return (
      crsToRender.map(cr => {
        i += 1
        return (
          <div key={i}>
            {cr}
          </div>
        )
      })
    )
  }

  render () {
    return (
      <div className='hub-class-with-change-requests'>
        <div className='hub-class-with-change-requests-card'>
          {this.renderContent()}
        </div>
        <div className='hub-class-with-change-requests-crs'>
          {this.state.mounted &&
            this.renderChangeRequests()
          }
        </div>
      </div>
    )
  }
}

export default ClassWithChangeRequests

ClassWithChangeRequests.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  schoolName: PropTypes.string.isRequired,
  professorName: PropTypes.string,
  semesterName: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  isAdmin: PropTypes.bool,
  toggleWrench: PropTypes.func,
  toggleChat: PropTypes.func,
  toggleDocuments: PropTypes.func,
  onDelete: PropTypes.func,
  onSelectIssue: PropTypes.func,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  onChange: PropTypes.func
}
