import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ModifiedDateTooltip } from '../Insights/WeightsTimeline'
import { getAssignmentCountDataHomeGraph, modifiedGetAssignmentWeightData } from '../Insights/DataUtils'

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryLine, VictoryScatter, VictoryArea } from 'victory'
import { getStyles } from '../Insights/styles'

import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'
import LineGraphSvg from '../../../assets/sk-icons/LineGraph'

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
]

class CustomFlyout extends React.Component {
  render () {
    const {x, y, orientation, ji} = this.props
    const newY = orientation === 'bottom' ? y - 35 : y + 35
    return (
      <g style={{pointerEvents: 'none'}}>
        <foreignObject x={x - 40} y={y - 50} width="200" height="200">
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

          <div className="tip-warp">
            <div className="tip-wrap__container">

              <h3 className="my-2 text-center d-block">Week 7:9/29-10/14</h3>
              <div className="flex justify-between">
                <span className="text-muted">{ji} Assignments</span>
                <span className="text-muted">21.7% Overall</span>
              </div>
              <div className="tip-list">
                <div className="listtip firsttl flex flex-row  justify-between border-top py-5">
                  <div className="">
                    <h6 className="fs-16 text-left stext-purple my-5">Exam 1</h6>
                    <p className="text-muted fs-12 my-5 mt-0">Tue 9/30</p>
                  </div>
                  <div className=""><h5 className="text-right text-dark fs-20 my-5">25%</h5></div>
                </div>
              </div>
            </div>
          </div>

        </foreignObject>
      </g>
    )
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
      assignment: props.rootStore.studentAssignmentsStore.assignments
    }
  }

  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

  // ass:this.props.rootStore.studentAssignmentsStore.assignments

  render () {
    const { data: assignment } = this.state
    console.log({assignment})
    const { cl } = this.props

    // let data = getAssignmentCountDataHomeGraph(assignment, false, [], 'w')
    let data = modifiedGetAssignmentWeightData((cl ? cl.assignments : this.props.assignments), cl, this.props.ids, 'w', this.props.rootStore.userStore.user.student.primary_period)

    const styles = this.getStyles()

    const today = parseInt(moment().format('X'))
    let domain = {x: [0, 0], y: [0, 0]}
    if (data.length > 0) {
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
    const animate = null

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
        <h2 className="sec-title"><LineGraphSvg /> Grade Impact</h2>
        <svg viewBox='0 0 450 280' className="home-insights-svg">

          <g>
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
            </g>}

            {/* <g>
              <VictoryArea
                data={data}
                domain={domain}
                scale={{x: 'time', y: 'linear'}}
                standalone={false}
                interpolation='monotoneX'
                style={styles.area}
                animate={animate}
              />
            </g> */}

            <VictoryBar
              data={data}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              size={5}
              standalone={false}
              style={styles.scatter}
              //   labels={() => 'Week 7: 9/29-10/4 \n 12 assignments \n 21.6% of total grade'}
              //   labels={({ datum }) => `Week 7: ${moment(datum.x, 'X').format('M/D') - moment(datum.x, 'X').add(7, 'days').format('M/D')} \n ${datum.allAssignment.length} assignments \n 21.6% of total grade`}
              labels={() => ''}
              labelComponent={
                <VictoryTooltip
                //   style={{ fill: '#4A4A4A' }}
                  // cornerRadius={0}
                  // pointerLength={0}
                  renderInPortal={false}
                  //   flyoutStyle={{
                  //     stroke: '#979797',
                  //     fill: '#FFFFFF'
                  //   }}
                  // flyoutHeight={60}
                  flyoutComponent={<ModifiedDateTooltip view={'w'} />}
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
  ids: PropTypes.array,
  assignments: PropTypes.object,
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object
}

export default withRouter(HomeGraphImpact)
