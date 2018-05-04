import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'

class ClassCard extends React.Component {
  render () {
    const {cl, schoolName, semesterName, professorName} = this.props

    return (
      <div className='cn-class-card'>
        <div className='cn-class-card-content'>
          <div className='cn-class-title'>
            {cl.name}
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
              {professorName}
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
          <button
            onClick={() => this.props.onSubmit()}
            className='button margin-top form-button full-width'
          >{`Enroll in ${cl.name}`}</button>
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
  semesterName: PropTypes.string
}
