import React from 'react'
import {inject, observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import JobsList from './JobsList'
import StudentLayout from '../../../components/StudentLayout'

@inject('rootStore') @observer
class JobsBrowse extends React.Component {
  renderContent () {
    return (
      <div className='jobs-browse-container'>
        <div className='jobs-browse'>
          <JobsList />
        </div>
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.renderContent()}
      </StudentLayout>
    )
  }
}

JobsBrowse.propTypes = {
  rootStore: PropTypes.object
}

export default withRouter(JobsBrowse)
