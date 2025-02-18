import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryTooltip, VictoryScatter, VictoryLine, VictoryLabel, VictoryAxis, VictoryBar } from 'victory'
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
              backgroundColor: 'whibluete',
              border: '1px solid #4a4a4a',
              borderRadius: '5px',
              padding: '8px',
              position: 'absolute',
              bottom: '12px',
              left: 'calc(50% - 48px)'
            }}
          >
            <div style={{textAlign: 'center'}}>
              {this.props.view === 'w' &&
                <h3 style={{margin: 0, fontSize: '14px'}}>{moment(datum.x, 'X').format('M/D')} - {moment(datum.x, 'X').add(7, 'days').format('M/D')}</h3>
              }
              {this.props.view === 'd' &&
                <h3 style={{margin: 0, fontSize: '14px'}}>{moment(datum.x, 'X').format('M/D')}</h3>
              }
              {this.props.view === 'm' &&
                <h3 style={{margin: 0, fontSize: '14px'}}>{moment(datum.x, 'X').format('M/D')} - {moment(datum.x, 'X').add(1, 'months').subtract(1, 'days').format('M/D')}</h3>
              }
              <p style={{margin: 0, fontSize: '12px'}}>{datum.y} assignments</p>
            </div>
          </div>
        </foreignObject>
      </g>
    )
  }
}

DateTooltip.propTypes = {
  view: PropTypes.string
}

@inject('rootStore') @observer
class AssignmentsTimeline extends React.Component {
  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

  render () {
    let data = getAssignmentCountData((this.props.cl ? this.props.cl.assignments : this.props.assignments), this.props.cl ? this.props.cl : false, this.props.ids, this.props.view)

    const styles = this.getStyles()
    if (data.length > 0) {
      const today = parseInt(moment().format('X'))
      const domain = {
        x: [
          data[0].x - 604800,
          data[data.length - 1].x + 604800
        ],
        y: [
          0,
          Math.max.apply(Math, data.map(a => a.y)) + (Math.max.apply(Math, data.map(a => a.y)) * 0.25)
        ]
      }
      let hideToday = false
      if (moment(today, 'X').isAfter(moment(domain.x[1], 'X'))) {
        hideToday = true
      }
      const tickValues = data.map(d => d.x)
      const animate = this.props.view !== 'd' ? styles.animate : null

      return (
        <div>
          <div className='insights-title'>
            <b style={this.props.cl ? {color: '#' + this.props.cl.color} : null}>How many assignments 090 </b> do you have each {this.props.view === 'd' ? 'day' : ''}{this.props.view === 'm' ? 'month' : ''}{this.props.view === 'w' ? 'week' : ''}?
          </div>
          <svg style={styles.parent} viewBox='0 0 450 260'>
            {/* Define labels */}
            {/* <VictoryLabel x={225} y={40}
              text={`How many assignments do you have each ${this.props.view === 'd' ? 'day' : ''}${this.props.view === 'm' ? 'month' : ''}${this.props.view === 'w' ? 'week' : ''}?`}
              style={styles.title}
              animate={animate}
            /> */}

            <g transform={'translate(16, -20)'}>
              {/* Add shared independent axis */}
              <VictoryAxis
                tickValues={tickValues}
                tickFormat={d => moment(d, 'X').format('M/DD')}
                tickCount={5}
                style={styles.axisDates}
                domain={{x: domain.x}}
                // scale='time'
                standalone={false}
                animate={animate}
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
                animate={animate}
              />

              {!hideToday && <g>
                <VictoryLine
                  x={() => today}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  style={styles.todayLine.back}
                  animate={animate}
                />

                <VictoryLine
                  x={() => today}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  style={styles.todayLine.front}
                  animate={animate}
                />

                <VictoryScatter
                  data={[{x: today, y: domain.y[1]}]}
                  domain={domain}
                  standalone={false}
                  scale={{x: 'time', y: 'linear'}}
                  size={4}
                  style={styles.todayLine.dot}
                  animate={animate}
                />

                <VictoryLabel x={(((today - domain.x[0]) / (domain.x[1] - domain.x[0])) * 336) + 35} y={34}
                  text={'Today'}
                  style={styles.label}
                  animate={animate}
                />
              </g>}

              {(this.props.view === 'w' || this.props.view === 'm') &&
                <VictoryLine
                  data={data}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  interpolation='monotoneX'
                  style={styles.lineOne}
                  animate={animate}
                />
              }

              {(this.props.view === 'w' || this.props.view === 'm') &&
                <g>
                  <VictoryScatter
                    data={data}
                    size={5}
                    domain={domain}
                    scale={{x: 'time', y: 'linear'}}
                    standalone={false}
                    style={styles.scatter}
                    labels={() => ''}
                    labelComponent={ <VictoryTooltip flyoutComponent={<DateTooltip view={this.props.view}/>} /> }
                    animate={animate}
                  />
                </g>
              }

              {this.props.view === 'd' &&
                <VictoryBar
                  data={data}
                  size={5}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  style={styles.scatter}
                  labels={() => ''}
                  labelComponent={ <VictoryTooltip flyoutComponent={<DateTooltip view={this.props.view} />} /> }
                  animate={animate}
                />
              }
            </g>
          </svg>
        </div>
      )
    } else {
      return <div />
    }
  }
}

AssignmentsTimeline.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object,
  ids: PropTypes.array,
  view: PropTypes.string
}

export default withRouter(AssignmentsTimeline)
