import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class JobsSwitch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: this.props.rootStore.studentNavStore.jobsMode
    }
  }

  render () {
    if (this.props.rootStore.studentJobsStore.hasJobsProfile) {
      return (
        <div className='jobs-switch'>
          <p style={{fontWeight: '500', fontSize: '14px', marginRight: '8px', marginTop: '4px'}}>
            SWITCH TO {this.props.rootStore.studentNavStore.jobsMode ? 'SKOLLER' : 'SKOLLER JOBS'}
          </p>
          <label className="switch">
            <input type="checkbox" checked={this.props.rootStore.studentNavStore.jobsMode} onChange={() => {
              if (!this.props.rootStore.studentNavStore.jobsMode) {
                this.props.history.push('/student/jobs')
              } else {
                this.props.history.push('/student/home')
              }
            }} />
            <span className="slider round" />
          </label>
        </div>
      )
    } else {
      return null
    }
  }
}

JobsSwitch.propTypes = {
  rootStore: PropTypes.object
}

export default withRouter(JobsSwitch)
