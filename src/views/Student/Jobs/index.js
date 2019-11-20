import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import {browserHistory} from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import JobsHome from './JobsHome'

@inject('rootStore') @observer
class Jobs extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('jobs')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  pushIfNoProfile () {
    if (!this.props.rootStore.studentJobsStore.hasJobsProfile) {
      console.log('DOES NOT HAVE PROFILE')
      browserHistory.push('/student/home')
    }
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
          <JobsHome />
        </StudentLayout>
      )
    }
  }
}

Jobs.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Jobs
