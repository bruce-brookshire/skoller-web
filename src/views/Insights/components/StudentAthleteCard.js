import React from 'react'
import Avatar from './Avatar'
import WatchToggle from './WatchToggle'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const StudentAthleteCard = (props) => {
  return (
    <div className='si-sa-card'>
      <Avatar props={props.user} />
      <div className='sa-info'>
        <div className='sa-name'>
          {props.noLink
            ? <div>
              {props.user.student.name_first + ' ' + props.user.student.name_last}
            </div>
            : <Link className='sa-name-name' to={'/insights/students/' + props.user.id}>
              {props.user.student.name_first + ' ' + props.user.student.name_last}
            </Link>
          }
          <WatchToggle rootStore={props.rootStore} showConfirm={props.absoluteToggle} user={props.user} />
        </div>
        {!props.noTeams && <div className='sa-teams'>
          {props.user.org_groups.map(t => {
            return (
              <div className='sa-team' key={props.user.org_groups.indexOf(t)}>
                {t.name}{props.user.org_groups.indexOf(t) !== props.user.org_groups.length - 1 ? ', ' : ''}
              </div>
            )
          })}
        </div>}
      </div>
    </div>
  )
}

StudentAthleteCard.propTypes = {
  user: PropTypes.object,
  rootStore: PropTypes.object,
  noLink: PropTypes.bool,
  absoluteToggle: PropTypes.bool,
  noTeams: PropTypes.bool
}

export default StudentAthleteCard
