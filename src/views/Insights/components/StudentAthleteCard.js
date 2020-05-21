import React from 'react'
import Avatar from './Avatar'
import WatchToggle from './WatchToggle'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const StudentAthleteCard = (props) => {
  const link = props.noLink ? null : '/insights/students/' + props.user.id
  return (
    <div className='si-sa-card-container'>
      <div className={'si-sa-card' + (props.noLink ? ' no-link' : '')}>
        <Avatar props={props.user} />
        <div className='sa-info'>
          <div className='sa-name'>
            <Link to={link}>
              {props.user.student.name_first + ' ' + props.user.student.name_last}
            </Link>
            <div className='watch-toggle-container'>
              <WatchToggle rootStore={props.rootStore} showConfirm={props.absoluteToggle} user={props.user} />
            </div>
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
      <Link to={link} className={'si-sa-card-background'} />
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
