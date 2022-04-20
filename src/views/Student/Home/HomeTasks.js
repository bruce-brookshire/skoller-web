import React from 'react'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'
import ClassAssignments from '../ClassDetail/ClassAssignments'

@inject('rootStore') @observer
class HomeTasks extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visibleAssignments: []
    }
  }
  render () {
    return (
      <div className='home-tasks'>
        <TasksList maxDays={10} maxTasks={3} seeMore={true} visibleAssignmentsCallback={(visibleAssignments) => this.setState({ visibleAssignments })} />
        {/* <ClassAssignments /> */}
      </div>
    )
  }
}

export default HomeTasks
