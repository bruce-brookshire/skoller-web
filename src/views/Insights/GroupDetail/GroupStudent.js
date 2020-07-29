import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import moment from 'moment'
import { optionalPlural } from '../utils'
import StatusIndicators from '../components/StatusIndicators'
import { Link } from 'react-router-dom'
import AddClasses from '../components/AddClasses'

export default function GroupStudent (props) {
  if (!props.student && !props.invitation) return null

  if (props.student) {
    const renderAddClasses = <AddClasses user={props.student} />
    const name = props.student.student.name_first + ' ' + props.student.student.name_last
    const numClasses = props.student.classes.length
    let classes
    if (numClasses > 0) {
      classes = optionalPlural(props.student.classes, '# class@', 'es')
    } else {
      classes = renderAddClasses
    }
    return (
      <div key={props.student.id} className='si-group-student'>
        <div className='si-group-student-left'>
          <Avatar user={props.student} />
        </div>
        <div className='si-group-student-right'>
          <div className='si-group-student-row'>
            <Link to={'/insights/students/' + props.student.id} className='si-group-student-name'>{name}</Link>
            <StatusIndicators student={props.student} />
          </div>
          <div className='si-group-student-row'>
            <div>{classes}</div>
          </div>
        </div>
      </div>
    )
  } else if (props.invitation) {
    const renderAddClasses = <AddClasses user={props.invitation} />
    const invitation = props.invitation
    const name = invitation.name_first + ' ' + invitation.name_last
    const numClasses = invitation.class_ids.length
    let classes
    if (numClasses > 0) {
      classes = optionalPlural(invitation.class_ids, '# class@', 'es')
    } else {
      classes = renderAddClasses
    }
    return (
      <div key={invitation.id} className='si-group-student'>
        <div className='si-group-student-left'>
          <Avatar user={null} invitation={invitation} />
        </div>
        <div className='si-group-student-right'>
          <div className='si-group-student-row'>
            <Link to={'/insights/invitations/' + props.invitation.id} className='si-group-student-name'>{name}</Link>
            <StatusIndicators hideTooltip invitation={invitation} />
          </div>
          <div className='si-group-student-row'>
            <div>{classes}</div>
            {/* <div>Sent {moment(invitation.inserted_at).fromNow()}</div> */}
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
