import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

@inject('rootStore') @observer
class JobsSwitch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: this.props.rootStore.studentNavStore.jobsMode
    }
  }

  render () {
    return (
      <div className='jobs-switch'>
        <p style={{fontWeight: '500', fontSize: '14px', marginRight: '8px', marginTop: '4px'}}>
          SWITCH TO {this.props.rootStore.studentNavStore.jobsMode ? 'SKOLLER' : 'SKOLLER JOBS'}
        </p>
        <label className="switch">
          <input type="checkbox" checked={this.props.rootStore.studentNavStore.jobsMode} onChange={(e) => {
            if (!this.props.rootStore.studentNavStore.jobsMode) {
              browserHistory.push('/student/jobs/home')
            } else {
              browserHistory.push('/student/home')
            }
          }} />
          <span className="slider round" />
        </label>
      </div>
    )
  }
}

JobsSwitch.propTypes = {
  rootStore: PropTypes.object
}

export default JobsSwitch
