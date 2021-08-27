import React from 'react'
import {inject, observer} from 'mobx-react'
import TasksList from '../Tasks/TasksList'

@inject('rootStore') @observer
class HomeAssignments extends React.Component {
  render () {
    return (
      <div className='home-tasks'>
        My Assignments

        <div className="list-group">
    <a href="#" className="list-group-item active">
      <h4 className="list-group-item-heading">First List Group Item Heading</h4>
      <p className="list-group-item-text">List Group Item Text</p>
    </a>
    <a href="#" className="list-group-item">
      <h4 className="list-group-item-heading">Second List Group Item Heading</h4>
      <p className="list-group-item-text">List Group Item Text</p>
    </a>
    <a href="#" className="list-group-item">
      <h4 className="list-group-item-heading">Third List Group Item Heading</h4>
      <p class="list-group-item-text">List Group Item Text</p>
    </a>
  </div>
      </div>
    )
  }
}

export default HomeAssignments
