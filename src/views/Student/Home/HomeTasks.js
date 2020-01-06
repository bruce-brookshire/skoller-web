import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'

@inject('rootStore') @observer
class HomeTasks extends React.Component {
  render () {
    return (
      <div className='home-tasks'>
        <TasksList maxDays={10} />
      </div>
    )
  }
}

HomeTasks.propTypes = {
  classes: PropTypes.object,
  onAddClass: PropTypes.func,
  onClassSelect: PropTypes.func
}

export default HomeTasks
