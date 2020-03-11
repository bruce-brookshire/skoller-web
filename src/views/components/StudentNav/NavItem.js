import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import HomeIcon from '../../../assets/sk-icons/HomeIcon'
import TasksIcon from '../../../assets/sk-icons/TasksIcon'
import ActivityIcon from '../../../assets/sk-icons/ActivityIcon'
import ChatIcon from '../../../assets/sk-icons/ChatIcon'
import ClassesIcon from '../../../assets/sk-icons/ClassesIcon'
import CalendarIcon from '../../../assets/sk-icons/CalendarIcon'
import ShareIcon from '../../../assets/sk-icons/ShareIcon'
import InsightsIcon from '../../../assets/sk-icons/InsightsIcon'
import Profile from '../../../assets/sk-icons/jobs/Profile'
import Resume from '../../../assets/sk-icons/jobs/Resume'
import Browse from '../../../assets/sk-icons/jobs/Browse'

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
    // const iconStyle = {
    //   width: '30px',
    //   height: '22px',
    //   color: 'white',
    //   marginRight: '-8px',
    //   marginTop: '3px'
    // }
    if (this.props.pageName.includes('home') || this.props.pageName.includes('jobs/home')) {
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
      return <ShareIcon fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('jobs/profile')) {
      return <Profile fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('jobs/resume')) {
      return <Resume fill="white" width="22px" height="22px" />
    } else if (this.props.pageName.includes('jobs/browse')) {
      return <Browse fill="white" width="19px" height="18px" />
    } else if (this.props.pageName.includes('insights')) {
      return <InsightsIcon fill="white" width="22px" height="24px" />
    } else {
      return null
    }
  }

  render () {
    let jobsMode = this.props.rootStore.studentNavStore.jobsMode
    return (
      <div
        className={
          's-nav-item ' +
          (this.getActivePage() === this.props.pageName ? (jobsMode ? 'active-jobs' : 'active') : '')
        }
        onClick={() => {
          this.props.history.push('/student/' + this.props.pageName)
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
  text: PropTypes.string,
  history: PropTypes.object
}

export default withRouter(NavItem)
