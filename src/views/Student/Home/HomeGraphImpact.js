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
import { getAssignmentCountDataHomeGraph } from '../Insights/DataUtils'

import { VictoryBar, VictoryChart, VictoryAxis , VictoryTooltip, VictoryLabel, VictoryLine, VictoryScatter } from 'victory';
import { getStyles } from '../Insights/styles'




import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,

} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];


class CustomFlyout extends React.Component {
  render() {
    const {x, y, orientation, ji} = this.props;
    const newY = orientation === "bottom" ? y - 35 : y + 35;
    return (
      <g transform={'translate(-100, -200)'} style={{pointerEvents: 'none', position: 'relative'}}>
        <foreignObject x={x} y={y} width="200" height="200">
          {/* <div
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
             <p>All Assignment Details</p>
             <p>Assignment 1</p>
             <p>Assignment 2</p>
            </div>
          </div> */}

          <div class="tip-warp">
              <h3 class="my-10 fs-16 text-center d-block">Week 7:9/29-10/14</h3>
              <div class="flex  justify-between">
                <span class="text-muted fs-12">{ji} Assignments</span>
                <span class="text-muted fs-12">21.7% Overall</span>
              </div>
                <div class="tip-list">
                  <div class="listtip firsttl flex flex-row  justify-between border-top py-5">
                      <div class="">
                          <h6 class="fs-16 text-left stext-purple my-5">Exam 1</h6>
                          <p class="text-muted fs-12 my-5 mt-0">Tue 9/30</p>
                      </div>
                      <div class=""><h5 class="text-right text-dark fs-20 my-5">25%</h5></div>
                    </div>
                </div>
          </div>

        </foreignObject>
      </g>
    );
  }
}
@inject('rootStore') @observer
class HomeGraphImpact extends React.Component {
  constructor (props) {
    super(props)
    // console.log(props.rootStore.studentAssignmentsStore.assignments, 'pp');

    this.state = {
      type: 'Distribution',
      data,
      assignment:props.rootStore.studentAssignmentsStore.assignments
    }
  }

  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

      // ass:this.props.rootStore.studentAssignmentsStore.assignments


  render () {
      const { data: chartData, assignment } = this.state;
      console.log({assignment})
      console.log(assignment, 'before changes');
      let data = getAssignmentCountDataHomeGraph(assignment, false, [], 'w');
      console.log(data, 'un changes');

      const styles = this.getStyles();

      const today = parseInt(moment().format('X'))
      let domain = {x: [0,0], y: [0,0]}
      if(data.length > 0) {
         domain = {
            x: [
              data[0].x - 604800,
              data[data.length - 1].x + 604800
            ],
            y: [
              0,
              Math.max.apply(Math, data.map(a => a.y)) + (Math.max.apply(Math, data.map(a => a.y)) * 0.25)
            ]
          }
      }

      let hideToday = false
      if (moment(today, 'X').isAfter(moment(domain.x[1], 'X'))) {
        hideToday = true
      }
      const tickValues = data.map(d => d.x)
      const animate =  null

      console.log(data, domain, 'assignments--');
    return (
      // <div className='home-shadow-box margin-top home-insights'>

      //   <VictoryChart
      //     domain={{ x: [0, 11], y: [0, 100] }}

      //   >
      //     <VictoryBar
      //       labelComponent={
      //         <VictoryTooltip
      //           flyoutComponent={<CustomFlyout ji='098'/>}
      //         />
      //       }
      //       data={[
      //         {x: 2, y: 5, label: ""},
      //         {x: 6, y: 4, label: ""},
      //         {x: 10, y: 7, label: ""}
      //       ]}
      //       style={{
      //         data: {fill: "tomato", width: 20},
      //         labels: { fill: "tomato"}
      //       }}
      //     />
      //   </VictoryChart>
      // </div>
      <div className='home-shadow-box margin-top home-insights'>
          <svg  viewBox='0 0 450 260'>


            <g transform={'translate(16, -20)'}>
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

                <VictoryBar
                  data={data}
                  size={5}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  style={styles.scatter}
                  labels={() => ''}
                  labelComponent={
                    <VictoryTooltip
                      flyoutComponent={<CustomFlyout ji='098'/>}
                    />
                  }
                  animate={animate}
                />





            </g>
          </svg>
        </div>
    )
  }
}

HomeGraphImpact.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object
}

export default withRouter(HomeGraphImpact)
