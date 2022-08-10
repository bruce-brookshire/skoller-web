import React from 'react'
import {inject, observer} from 'mobx-react'

// stext-purple, green, orange, danger

@inject('rootStore') @observer
class HomeAssignments extends React.Component {
  render () {
    return (
      <div className="home-tasks">
        <div className="home-tasks-inner">
          <div className="divider-spantext"><span>weekdays work</span> </div>
        </div>
      </div>
    )
  }
}

export default HomeAssignments
