import React from 'react'
import StudentNav from '../StudentNav'
import PropTypes from 'prop-types'
import SkBanner from './SkBanner'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class StudentLayout extends React.Component {
  gettingData () {
    if (this.props.rootStore.studentClassesStore.loading || this.props.rootStore.studentJobsStore.loading) {
      return true
    } else {
      return false
    }
  }

  renderContent () {
    return (
      <div className='sk-layout'>
        <StudentNav />
        <main id='main' style={this.props.rootStore.studentNavStore.jobsMode ? {backgroundColor: '#4a4a4a'} : {}}>
          <SkBanner />
          {this.props.children}
        </main>
      </div>
    )
  }

  render () {
    if (this.gettingData()) {
      return <SkLoader />
    } else {
      return (
        this.renderContent()
      )
    }
  }
}

StudentLayout.propTypes = {
  rootStore: PropTypes.object,
  noLogin: PropTypes.bool,
  imgPath: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default StudentLayout
