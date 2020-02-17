import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryTooltip, VictoryScatter, VictoryLine, VictoryLabel, VictoryAxis } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getAssignmentCountData } from './DataUtils'
import { getStyles } from './styles'

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
class AssignmentsTimeline extends React.Component {
  getStyles () {
    return getStyles()
  }

  render () {
    let data = getAssignmentCountData(this.props.rootStore.studentAssignmentsStore)
    const styles = this.getStyles()
    if (data.length > 0) {
      const today = parseInt(moment().format('X'))
      const domain = {
        x: [
          data[0].x - 604800,
          data[data.length - 1].x + 604800
        ],
        y: [
          Math.min.apply(Math, data.map(a => a.y)),
          Math.max.apply(Math, data.map(a => a.y)) + (Math.max.apply(Math, data.map(a => a.y)) * 0.25)
        ]
      }
      const tickValues = data.map(d => d.x)

      return (
        <svg style={styles.parent} viewBox='0 0 450 350'>

          {/* Define labels */}
          <VictoryLabel x={18} y={40}
            text='Assignments Timeline'
            style={styles.title}
          />

          <VictoryLabel x={18} y={60}
            text='Your hardest week will be EVERY WEEK'
            style={styles.subtitle}
          />

          <g transform={'translate(16, 46)'}>
            {/* Add shared independent axis */}
            <VictoryAxis
              tickValues={tickValues}
              tickFormat={d => moment(d, 'X').format('M/DD')}
              tickCount={5}
              style={styles.axisDates}
              domain={{x: domain.x}}
              // scale='time'
              standalone={false}
            />

            <VictoryLabel x={6} y={154}
              text={'Number of Assignments'}
              style={styles.axisLabel}
              angle={270}
              textAnchor={'middle'}
            />

            <VictoryAxis
              dependentAxis
              // label='Assignments'
              domain={{y: domain.y}}
              offsetX={50}
              orientation='left'
              standalone={false}
              domainPadding={200}
              style={styles.axisOne}
              tickFormat={d => d.toString()}
            />

            <VictoryLine
              x={() => today}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.todayLine.back}
            />

            <VictoryLine
              x={() => today}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.todayLine.front}
            />

            <VictoryScatter
              data={[{x: today, y: domain.y[1]}]}
              domain={domain}
              standalone={false}
              scale={{x: 'time', y: 'linear'}}
              size={4}
              style={styles.todayLine.dot}
            />

            <VictoryLabel x={(((today - domain.x[0]) / (domain.x[1] - domain.x[0])) * 336) + 35} y={34}
              text={'Today'}
              style={styles.label}
            />

            <VictoryLine
              data={data}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              interpolation='monotoneX'
              style={styles.lineOne}
            />

            <g>
              <VictoryScatter
                data={data}
                size={5}
                domain={domain}
                scale={{x: 'time', y: 'linear'}}
                standalone={false}
                style={styles.scatter}
                labels={() => ''}
                labelComponent={ <VictoryTooltip flyoutComponent={<DateTooltip/>} /> }
              />
            </g>

          </g>
        </svg>
      )
    } else {
      return <div />
    }
  }
}

AssignmentsTimeline.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object
}

export default withRouter(AssignmentsTimeline)
