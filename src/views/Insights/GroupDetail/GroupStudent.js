import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import moment from 'moment'
import { optionalPlural } from '../utils'
import StatusIndicators from '../components/StatusIndicators'
import { Link } from 'react-router-dom'
import AddClasses from '../components/AddClasses'

export default function GroupStudent(props) {
  if (!props.student && !props.invitation) return null

  if (props.student) {
    const name = props.student.student.name_first + ' ' + props.student.student.name_last
    const numClasses = props.student.classes.length
    return (
      <div key={props.student.id} className='si-group-student'>
        <div className='si-group-student-left'>
          <Avatar user={props.student} />
        </div>
        <div className='si-group-student-right'>
          <div className='si-group-student-row'>
            <Link to={'/insights/students/' + props.student.id} className='si-group-student-name'>{name}</Link>
            {numClasses === 0 ? <AddClasses user={props.student} /> : <StatusIndicators student={props.student} />}
          </div>
        </div>
      </div>
    )
  } else if (props.invitation) {
    const invitation = props.invitation
    const name = invitation.name_first + ' ' + invitation.name_last
    const numClasses = invitation.class_ids.length
    return (
      <div key={invitation.id} className='si-group-student'>
        <div className='si-group-student-left'>
          <Avatar user={null} invitation={invitation} />
        </div>
        <div className='si-group-student-right'>
          <div className='si-group-student-row'>
            <Link to={'/insights/invitations/' + invitation.id} className='si-group-student-name'>{name}</Link>
            {numClasses === 0 ? <AddClasses user={invitation} /> : <StatusIndicators hideTooltip invitation={invitation} />}
          </div>
        </div>
      </div>
    )
  }
}

GroupStudent.propTypes = {
  student: PropTypes.object,
  invitation: PropTypes.object
}
