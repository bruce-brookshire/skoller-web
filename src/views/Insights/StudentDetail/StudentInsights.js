import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SiAssignmentsChart from '../components/charts/SiAssignmentsChart'
import { getAssignmentWeightsInNextNDays } from '../utils'
import SiWeightsChart from '../components/charts/SiWeightsChart'

@inject('rootStore') @observer
class StudentInsights extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'Assignments',
      assignments: [].concat.apply([], this.props.classes.map(cl => cl.assignments))
    }
  }

  getTimeframe () {
    return this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe === 'Next 7 days' ? 7 : 30
  }

  renderContent () {
    let assignments = this.state.assignments
    let chartSize = {width: 600, height: 350}

    return (
      <div className='si-student-insights'>
        <div className='si-student-insights-row'>
          <div className='si-student-chart-container'>
            <div className='si-student-insights-switch'>
              <div className={'si-student-insights-switch-option left ' + (this.state.mode === 'Assignments' ? 'active' : null)} onClick={() => this.setState({mode: 'Assignments'})}>Assignments</div>
              <div className={'si-student-insights-switch-option right ' + (this.state.mode === 'Weights' ? 'active' : null)} onClick={() => this.setState({mode: 'Weights'})}>Weights</div>
            </div>
            {this.state.mode === 'Assignments' &&
              <SiAssignmentsChart chartSize={chartSize} assignments={assignments} view={'w'} />
            }
            {this.state.mode === 'Weights' &&
              <SiWeightsChart chartSize={chartSize} assignments={assignments} view={'w'} />
            }
          </div>
          <div className='si-student-insights-detail'>
            <div><b>{getAssignmentWeightsInNextNDays(assignments, this.getTimeframe())}% of {this.props.user.student.name_first}&apos;s grade</b> will be determined in the next {this.getTimeframe()} days</div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        <div className='si-student-detail-cell-subtitle'><h2>{this.getTimeframe() === 7 ? this.props.user.intensity.sevenDay : this.props.user.intensity.thirtyDay} out of 10</h2></div>
        {this.renderContent()}
      </Fragment>
    )
  }
}

StudentInsights.propTypes = {
  rootStore: PropTypes.object,
  user: PropTypes.object,
  classes: PropTypes.object
}

export default StudentInsights
