import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../../components/StudentLayout'
import {browserHistory} from 'react-router'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class Resume extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('jobs/resume')
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  pushIfNoProfile () {
    if (!this.props.rootStore.studentJobsStore.hasJobsProfile) {
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
          <div>RESUME</div>
        </StudentLayout>
      )
    }
  }
}

Resume.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Resume
