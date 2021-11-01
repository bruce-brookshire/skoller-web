import React from 'react'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'
import ClassAssignments from '../ClassDetail/ClassAssignments'

@inject('rootStore') @observer
class HomeTasks extends React.Component {
  render () {
    return (
      <div className='home-tasks'>
        <TasksList maxDays={10} maxTasks={3} seeMore={true} />
        {/* <ClassAssignments /> */}
      </div>
    )
  }
}

export default HomeTasks
