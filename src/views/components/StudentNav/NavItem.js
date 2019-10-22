import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import HomeIcon from '../../../assets/sk-icons/HomeIcon'
import TasksIcon from '../../../assets/sk-icons/TasksIcon'
import ActivityIcon from '../../../assets/sk-icons/ActivityIcon'
import ChatIcon from '../../../assets/sk-icons/ChatIcon'
import ClassesIcon from '../../../assets/sk-icons/ClassesIcon'
import CalendarIcon from '../../../assets/sk-icons/CalendarIcon'

@inject('rootStore')
@observer
class NavItem extends React.Component {
  getActivePage () {
    const {
      studentNavStore: { activePage }
    } = this.props.rootStore
    return activePage
  }

  getNavIcon () {
    const iconStyle = {
      width: '30px',
      height: '22px',
      color: 'white',
      marginRight: '-8px',
      marginTop: '3px'
    }
    if (this.props.pageName.includes('home')) {
      return <HomeIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('tasks')) {
      return <TasksIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('classes')) {
      return <ClassesIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('calendar')) {
      return <CalendarIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('chat')) {
      return <ChatIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('activity')) {
      return <ActivityIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('share')) {
      return <i className='fas fa-users' style={iconStyle} />
    } else {
      return null
    }
  }

  render () {
    return (
      <div
        className={
          's-nav-item ' +
          (this.getActivePage() === this.props.pageName ? 'active' : '')
        }
        onClick={() => {
          browserHistory.push('/student/' + this.props.pageName)
        }}
      >
        {this.getNavIcon()}
        <a>{this.props.text}</a>
        <span />
      </div>
    )
  }
}

NavItem.propTypes = {
  rootStore: PropTypes.object,
  pageName: PropTypes.string,
  text: PropTypes.string
}

export default NavItem
