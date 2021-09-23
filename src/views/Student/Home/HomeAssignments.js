import React from 'react'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'

// stext-purple, green, orange, danger

@inject('rootStore') @observer
class HomeAssignments extends React.Component {
  render () {
    return (
      <div class="home-tasks">
          <div class="home-tasks-inner">
            <div class="divider-spantext"><span>weekdays work</span> </div>
            
        </div>
      </div>
      )
  }
}

export default HomeAssignments
