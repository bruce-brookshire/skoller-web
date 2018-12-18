import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

class ClassCard extends React.Component {
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
      <div>
        <i className='fa fa-file-text cn-blue cursor margin-right' onClick={() => this.props.toggleDocuments()} />
        <i className='fa fa-pencil cn-blue cursor' onClick={() => this.props.onEdit()} />
        <i className={'fa fa-wrench cursor margin-left ' + (isEditable ? 'cn-grey' : 'cn-red')} onClick={() => this.props.toggleWrench()} />
        <i className={'cursor margin-left ' + (isChat ? 'fa fa-comment cn-blue' : 'fa fa-comment-o cn-grey')} onClick={() => this.props.toggleChat()} />
        {(cl.student_requests.findIndex((item) => !item.is_completed) > -1 || cl.change_requests.findIndex((item) => !item.is_completed && item.change_type.id === 400) > -1) &&
          <i className='fa fa-warning cn-red cursor margin-left' onClick={this.props.onSelectIssue.bind(this)} />
        }
      </div>
    )
  }

  renderAdminFields () {
    const {cl} = this.props

    return (
      <div className='cn-class-card-row'>
        <div className='cn-class-card-field'>
          <div className='cn-class-card-label'>
            Status
          </div>
          {cl.status.name}
        </div>
        <div className='cn-class-card-field'>
          <div className='cn-class-card-label'>
            Enrollment
          </div>
          {cl.enrollment}
        </div>
      </div>
    )
  }

  renderSection (title) {
    const {cl} = this.props
    return (
      <div className='cn-class-card-field'>
        <div className='cn-class-card-label'>
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

  render () {
    const {cl, schoolName, semesterName, professorName, isAdmin} = this.props

    return (
      <div className='cn-class-card'>
        <div className='cn-class-card-content'>
          <div className='cn-class-card-header'>
            <div className='cn-class-title'>
              {cl.name}
              {this.props.isAdmin && this.renderAdminHeader()}
            </div>
            <div className='cn-class-subtitle'>
              {cl.subject} {cl.code}{this.renderSectionSuffix()}
            </div>
          </div>
          <div className='cn-class-card-row'>
            {(isAdmin || (!isAdmin && (cl.meet_days || cl.meet_start_time))) && <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Meeting times
              </div>
              {cl.meet_days + (cl.meet_days !== 'Online' && cl.meet_start_time ? ' ' + moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mm a').toString() : '')}
            </div>}
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Professor
              </div>
              {professorName || 'N/A'}
            </div>
            {!isAdmin && !cl.code && cl.section && this.renderSection('Period')}
          </div>
          <div className='cn-class-card-row'>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                School
              </div>
              {schoolName}
            </div>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Semester
              </div>
              {semesterName}
            </div>
          </div>
          {(isAdmin && <div className='cn-class-card-row'>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Subject
              </div>
              {cl.subject}
            </div>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Code
              </div>
              {cl.code}
            </div>
            {this.renderSection('Section/Period')}
          </div>)}
          {this.props.onSubmit && <button
            onClick={() => this.props.onSubmit()}
            className='button margin-top form-button full-width'
          >{`Enroll in ${cl.name}`}</button>}
          {this.props.isAdmin && this.renderAdminFields()}
        </div>
      </div>
    )
  }
}

export default ClassCard

ClassCard.propTypes = {
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
  onSelectIssue: PropTypes.func
}
