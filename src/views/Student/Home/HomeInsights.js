import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import AssignmentsTimeline from '../Insights/AssignmentsTimeline'
import WeightsTimeline from '../Insights/WeightsTimeline'
import Distribution from '../Insights/Distribution'
import Sammi from '../../components/Sammi'
import Progress from '../Insights/Progress'
import SkSelect from '../../components/SkSelect'
import ToolTip from '../../components/ToolTip'

export class DateTooltip extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    orientation: PropTypes.string,
    datum: PropTypes.object
  }

  render () {
    const { datum, x, y } = this.props
    return (
      <g transform={'translate(-100, -200)'} style={{pointerEvents: 'none', position: 'relative'}}>
        <foreignObject x={x} y={y} width="200" height="200">
          <div
            className="graph-tooltip"
            style={{
              width: '96px',
              backgroundColor: 'white',
              border: '1px solid #4a4a4a',
              borderRadius: '5px',
              padding: '8px',
              position: 'absolute',
              bottom: '12px',
              left: 'calc(50% - 48px)'
            }}
          >
            <div style={{textAlign: 'center'}}>
              <h3 style={{margin: 0, fontSize: '14px'}}>{moment(datum.x, 'X').format('M/D')} - {moment(datum.x, 'X').add(7, 'days').format('M/D')}</h3>
              <p style={{margin: 0, fontSize: '12px'}}>{datum.y} assignments</p>
            </div>
          </div>
        </foreignObject>
      </g>
    )
  }
}

@inject('rootStore') @observer
class HomeInsights extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'Distribution'
    }
  }

  renderContent () {
    if (this.props.rootStore.studentAssignmentsStore.assignments.length > 0) {
      if (this.state.type === 'Assignments') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <AssignmentsTimeline view={'w'} />
          </div>
        )
      } else if (this.state.type === 'Weights') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <WeightsTimeline view={'w'} />
          </div>
        )
      } else if (this.state.type === 'Distribution') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <Distribution assignments={this.props.rootStore.studentAssignmentsStore.assignments} />
          </div>
        )
      } else if (this.state.type === 'Progress') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <Progress />
          </div>
        )
      }
    } else {
      return (
        <p style={{textAlign: 'center', color: 'rgba(0,0,0,0.3)', margin: '32px'}}>Insights are available when you add assignments</p>
      )
    }
  }

  renderSelectOptions () {
    let options = ['Distribution', 'Assignments', 'Weights', 'Progress']

    return (
      options.map(o => {
        let index = options.indexOf(o)

        return (
          <div className='sk-insights-select-option' key={index} onClick={() => this.setState({type: o})}>
            {o}
          </div>
        )
      })
    )
  }

  renderSelect () {
    return (
      <div className='home-insights-select' style={{margin: '1rem 1rem 0 1rem'}}>
        <SkSelect className='sk-insights-select' selection={<b>{this.state.type}</b>} optionsMap={() => this.renderSelectOptions()} />
      </div>
    )
  }

  render () {
    return (
      <div className='home-shadow-box margin-top home-insights'>
        <h1
          className='home-heading'
          onClick={() => this.props.history.push('/student/insights')}
        >
          Insights
        </h1>
        <ToolTip tip='Skoller Insights help you see your semester in new ways using data from all of your classes!'><i className='fas fa-info-circle' /></ToolTip>
        {this.renderSelect()}
        {this.renderContent()}
      </div>
    )
  }
}

HomeInsights.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object
}

export default withRouter(HomeInsights)
