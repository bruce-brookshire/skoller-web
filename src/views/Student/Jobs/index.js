import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import { withRouter } from 'react-router-dom'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import JobsHome from './JobsHome'

@inject('rootStore') @observer
class Jobs extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('jobs/home')
    this.props.rootStore.studentNavStore.location = this.props.location

    this.props.rootStore.studentJobsStore.getJobsListings()
  }

  pushIfNoProfile () {
    if (!this.props.rootStore.studentJobsStore.hasJobsProfile) {
      this.props.history.push('/student/home')
    }
  }

  render () {
    if (this.props.rootStore.studentJobsStore.loading || this.props.rootStore.studentJobsStore.loadingListings) {
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
  history: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(Jobs)
