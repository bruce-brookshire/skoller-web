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

    return (
      <div>
        <i className='fa fa-file-text cn-blue cursor margin-right' onClick={() => this.props.toggleDocuments()} />
        <i className='fa fa-pencil cn-blue cursor' onClick={() => this.props.onEdit()} />
        <i className={'fa fa-wrench cursor margin-left ' + (isEditable ? 'cn-grey' : 'cn-red')} onClick={() => this.props.toggleWrench()} />
        <i className={'cursor margin-left ' + (isChat ? 'fa fa-comment cn-blue' : 'fa fa-comment-o cn-grey')} onClick={() => this.props.toggleChat()} />
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

  render () {
    const {cl, schoolName, semesterName, professorName} = this.props

    return (
      <div className='cn-class-card'>
        <div className='cn-class-card-content'>
          <div className='cn-class-title'>
            {cl.name}
            {this.props.isAdmin && this.renderAdminHeader()}
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
          <div className='cn-class-card-row'>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Meeting times
              </div>
              {cl.meet_days + ' ' + moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mm a').toString()}
            </div>
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Professor
              </div>
              {professorName || 'N/A'}
            </div>
          </div>
          <div className='cn-class-card-row'>
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
            <div className='cn-class-card-field'>
              <div className='cn-class-card-label'>
                Section
              </div>
              {cl.section}
            </div>
          </div>
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
  cl: PropTypes.object,
  onSubmit: PropTypes.func,
  schoolName: PropTypes.string,
  professorName: PropTypes.string,
  semesterName: PropTypes.string,
  onEdit: PropTypes.func,
  isAdmin: PropTypes.bool,
  toggleWrench: PropTypes.func,
  toggleChat: PropTypes.func,
  toggleDocuments: PropTypes.func
}
