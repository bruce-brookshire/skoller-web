import React from 'react'
import PropTypes from 'prop-types'
// import StudentLayout from '../../../components/StudentLayout'
// import NestedNav from '../../../components/NestedNav'
import JobDetailContent from './JobDetailContent'

class JobDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      jobId: this.props.match.params.jobId
    }
  }

  renderContent () {
    return (
      <div className='job-detail-container'>
        <JobDetailContent jobId={this.state.jobId} />
      </div>
    )
  }

  render () {
    return (
      // <StudentLayout>
      //   {/* <NestedNav back={true} /> */}
      //   {this.renderContent()}
      // </StudentLayout>
      this.renderContent()
    )
  }
}

JobDetail.propTypes = {
  match: PropTypes.object
}

export default JobDetail
