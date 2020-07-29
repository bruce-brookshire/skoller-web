import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import SiAssignmentsChart from '../components/charts/SiAssignmentsChart'
import { getAssignmentWeightsInNextNDays } from '../utils'
import SiWeightsChart from '../components/charts/SiWeightsChart'
import SiSpoofChart from '../components/charts/SiSpoofChart'
import SkSelect from '../../components/SkSelect'

@inject('rootStore') @observer
class StudentInsights extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: 'Grade Impact',
      assignments: [].concat.apply([], this.props.classes.map(cl => cl.assignments))
    }
  }

  getTimeframe () {
    return this.props.rootStore.insightsStore.interfaceSettings.timeframe
  }

  renderSelect () {
    let options = ['Grade Impact', 'Assignments']

    if (this.state.assignments.length === 0) return null

    return <SkSelect className='si-select' selection={this.state.mode} optionsMap={() => options.map(o => {
      return (
        <div onClick={() => this.setState({mode: o})} className='si-select-option' key={options.indexOf(o)}>{o}</div>
      )
    })} />
  }

  renderCharts () {
    let assignments = this.state.assignments
    let chartSize = {width: 600, height: 350}

    if (this.props.classes.filter(cl => cl.status.id === 1400).length > 0) {
      return (
        <div className='si-student-insights-row'>
          <div className='si-student-chart-container'>
            {this.state.mode === 'Assignments' &&
              <SiAssignmentsChart chartSize={chartSize} assignments={assignments} view={'w'} />
            }
            {this.state.mode === 'Grade Impact' &&
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
            <div>Insights will appear here when {this.props.user.student.name_first}&apos;s classes are set up</div>
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
        <div className='si-student-detail-cell-subtitle'>{this.renderSelect()}</div>
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
