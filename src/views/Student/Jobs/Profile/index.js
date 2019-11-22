import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../../components/StudentLayout'
import {browserHistory} from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('jobs/profile')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  pushIfNoProfile () {
    if (!this.props.rootStore.studentJobsStore.hasJobsProfile) {
      browserHistory.push('/student/home')
    }
  }

  renderContent () {
    return (
      <div className='jobs-profile'>
        <div className='jobs-profile-cell'>
          <h1>Your Profile</h1>
        </div>
      </div>
    )
  }

  render () {
    if (this.props.rootStore.studentJobsStore.loading) {
      return (
        <SkLoader />
      )
    } else {
      this.pushIfNoProfile()
      return (
        <StudentLayout>
          {this.renderContent()}
        </StudentLayout>
      )
    }
  }
}

Profile.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Profile
