import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import AssignmentsTimeline from '../Insights/AssignmentsTimeline'
import WeightsTimeline from '../Insights/WeightsTimeline'
import Distribution from '../Insights/Distribution'
import SpeculateTool from '../Insights/SpeculateTool'
import SkSelect from '../../components/SkSelect'

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
class ClassInsights extends React.Component {
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
            <AssignmentsTimeline cl={this.props.cl} view={'w'} />
          </div>
        )
      } else if (this.state.type === 'Weights') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <WeightsTimeline cl={this.props.cl} view={'w'} />
          </div>
        )
      } else if (this.state.type === 'Distribution') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <Distribution cl={this.props.cl} />
          </div>
        )
      } else if (this.state.type === 'Speculate') {
        return (
          <div style={{margin: '2rem 1rem 1rem 1rem'}}>
            <SpeculateTool cl={this.props.cl} />
          </div>
        )
      }
    } else {
      return (
        <p style={{textAlign: 'center', color: 'rgba(0,0,0,0.3)', margin: '32px'}}>Insights are available when you add assignments</p>
      )
    }
  }

  renderNav () {
    let color = this.props.cl.color
    return (
      <div
        style={{
          borderBottom: '2px solid #4a4a4a50',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '0 1rem',
          padding: '0 0 0 0'
        }}
      >
        <p
          style={{
            borderBottom: this.state.type === 'distribution' ? '4px solid #' + color : '',
            fontWeight: this.state.type === 'distribution' ? '600' : '',
            margin: '0 0 -2px 0',
            padding: '0 12px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={() => this.setState({type: 'distribution'})}
        >
          Distribution
        </p>
        <p
          style={{
            borderBottom: this.state.type === 'assignmentsTimeline' ? '4px solid #' + color : '',
            fontWeight: this.state.type === 'assignmentsTimeline' ? '600' : '',
            margin: '0 0 -2px 0',
            padding: '0 12px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={() => this.setState({type: 'assignmentsTimeline'})}
        >
          Assignments
        </p>
        <p
          style={{
            borderBottom: this.state.type === 'weightsTimeline' ? '4px solid #' + color : '',
            fontWeight: this.state.type === 'weightsTimeline' ? '600' : '',
            margin: '0 0 -2px 0',
            padding: '0 12px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={() => this.setState({type: 'weightsTimeline'})}
        >
          Weights
        </p>
        <p
          style={{
            borderBottom: this.state.type === 'speculate' ? '4px solid #' + color : '',
            fontWeight: this.state.type === 'speculate' ? '600' : '',
            margin: '0 0 -2px 0',
            padding: '0 12px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={() => this.setState({type: 'speculate'})}
        >
          Speculate
        </p>
      </div>
    )
  }

  renderSelectOptions () {
    let options = ['Distribution', 'Assignments', 'Weights', 'Speculate']

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
      <div style={{margin: '1rem 1rem 0 1rem'}}>
        <SkSelect className='sk-insights-select' selection={<b>{this.state.type}</b>} optionsMap={() => this.renderSelectOptions()} />
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.props.rootStore.studentAssignmentsStore.assignments.length > 0 && this.renderSelect()}
        {this.renderContent()}
      </div>
    )
  }
}

ClassInsights.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object
}

export default withRouter(ClassInsights)
