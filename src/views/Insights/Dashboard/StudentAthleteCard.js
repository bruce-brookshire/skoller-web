import React from 'react'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import PropTypes from 'prop-types'

const StudentAthleteCard = (props) => {
  return (
    <div className='si-sa-card'>
      <Avatar props={props.user} />
      <div className='sa-info'>
        <div className='sa-name'>
          {props.user.student.name_first + ' ' + props.user.student.name_last}
          <WatchToggle rootStore={props.rootStore} showConfirm={false} user={props.user} />
        </div>
        <div className='sa-teams'>
          {props.user.org_groups.map(t => {
            return (
              <div className='sa-team' key={props.user.org_groups.indexOf(t)}>
                {t.name}{props.user.org_groups.indexOf(t) !== props.user.org_groups.length - 1 ? ', ' : ''}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

StudentAthleteCard.propTypes = {
  user: PropTypes.object,
  rootStore: PropTypes.object
}

export default StudentAthleteCard
