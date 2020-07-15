import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SiWeightsChart from '../components/charts/SiWeightsChart'
import SiAssignmentsChart from '../components/charts/SiAssignmentsChart'
import SiSpoofChart from '../components/charts/SiSpoofChart'

@inject('rootStore') @observer
export default class GroupInsights extends Component {
  static propTypes = {
    group: PropTypes.object,
    rootStore: PropTypes.object
  }

  // render () {
  //   const chartSize = {width: 600, height: 350}
  //   let assignments = []

  //   this.props.group.students.forEach(s => {
  //     assignments = assignments.concat(s.assignments)
  //   })

  //   return (
  //     <div>
  //       <SiWeightsChart view={'w'} size={chartSize} assignments={assignments} />
  //       <SiAssignmentsChart view={'w'} size={chartSize} assignments={assignments} />
  //     </div>
  //   )
  // }

  constructor (props) {
    super(props)
    this.state = {
      mode: 'Assignments'
      // assignments: [].concat.apply([], this.props.classes.map(cl => cl.assignments))
    }
  }

  getTimeframe () {
    return this.props.rootStore.insightsStore.interfaceSettings.timeframe
  }

  renderCharts () {
    const chartSize = {width: 600, height: 350}
    let assignments = []

    this.props.group.students.forEach(s => {
      assignments = assignments.concat(s.assignments)
    })

    if (assignments.length > 0) {
      return (
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
          {/* <div className='si-student-insights-detail'>
            <div><b>{getAssignmentWeightsInNextNDays(assignments, this.getTimeframe())}% of {this.props.user.student.name_first}&apos;s grade</b> will be determined in the next {this.getTimeframe()} days</div>
          </div> */}
        </div>
      )
    } else {
      return (
        <div className='si-student-insights-row'>
          <div className='si-student-chart-container'>
            <SiSpoofChart chartSize={chartSize} />
          </div>
          <div className='si-student-insights-detail'>
            <div>Insights will appear here when athletes and their classes are added to this team</div>
          </div>
        </div>
      )
    }
  }

  renderContent () {
    return (
      <div className='si-student-insights'>
        {this.renderCharts()}
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    )
  }
}
