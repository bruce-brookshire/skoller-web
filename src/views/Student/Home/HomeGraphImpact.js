import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ModifiedDateTooltip } from '../Insights/WeightsTimeline'
import { modifiedGetAssignmentWeightData } from '../Insights/DataUtils'

import { VictoryBar, VictoryAxis, VictoryTooltip, VictoryLabel } from 'victory'
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

class CustomGradeLabel extends React.Component {
  render () {
    const { index, activeIdx, text } = this.props

    if (index === activeIdx) {
      const newProps = { ...this.props }
      delete newProps.text
      newProps.style = { ...this.props.style, fill: '#4A4A4A', fontSize: 10 }

      return (
        <VictoryLabel
          key={index}
          dy={-7}
          {...newProps}
          text={[`${text}`, 'This', 'Week']}
          className="activeLabel"
          backgroundComponent={<rect className="activeLabel__rect" />}
          backgroundPadding={{ left: 5, right: 5, top: 7, bottom: -1 }}
          backgroundStyle={{
            fill: '#D9D9D9',
            stroke: '#000',
            rx: 5
          }}
        />
      )
    }

    return (
      <VictoryLabel key={index} dy={-5} {...this.props}/>
    )
  }
}
CustomGradeLabel.propTypes = {
  index: PropTypes.number,
  activeIdx: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.object
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

  createDomain (data) {
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

    return domain
  }

  render () {
    const { cl } = this.props

    let data = modifiedGetAssignmentWeightData((cl ? cl.assignments : this.props.assignments), cl, this.props.ids, 'w', this.props.rootStore.userStore.user.student.primary_period)

    const today = parseInt(moment().format('X'))
    const styles = this.getStyles()
    const domain = this.createDomain(data)
    const tickValues = data.map(d => d.x)
    const animate = null

    let activeIdx
    if (tickValues[0] > today) {
      activeIdx = 0
    } else if (tickValues[tickValues.length - 1] < today) {
      activeIdx = tickValues.length - 1
    } else {
      activeIdx = tickValues.findIndex(week => { return today < week }) - 1
    }

    return (
      <div className='home-shadow-box margin-top home-insights'>
        <h2 className="sec-title"><LineGraphSvg /> Grade Impact</h2>
        <svg viewBox='0 0 450 310' className="home-insights-svg">

          <g>
            {/* Left axis */}
            <VictoryAxis
              tickValues={tickValues}
              tickFormat={(d, idx) => idx + 1}
              tickCount={5}
              groupComponent={<g transform="translate(0, 1)" />}
              tickLabelComponent={<CustomGradeLabel activeIdx={activeIdx} />}
              style={styles.homeAxisDates}
              domain={{x: domain.x}}
              standalone={false}
              animate={animate}
            />

            {/* Bottom axis */}
            <VictoryAxis
              dependentAxis
              // label='Assignments'
              domain={{y: domain.y}}
              offsetX={50}
              orientation='left'
              standalone={false}
              domainPadding={200}
              style={styles.homeAxisGrade}
              tickFormat={d => (d * 100) + '%'}
              animate={animate}
            />

            <VictoryBar
              data={data}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              barWidth={30}
              standalone={false}
              cornerRadius={4}
              style={{
                data: {
                  strokeWidth: 1,
                  borderRadius: 3,
                  stroke: (datum) => { return datum.index < activeIdx ? '#57B9E4' : '#000' },
                  fill: (datum) => { return datum.index === activeIdx ? '#F1AA3A' : datum.index < activeIdx ? '#EDFAFF' : '#fff' }
                }
              }}
              labels={() => ''}
              labelComponent={
                <VictoryTooltip
                  renderInPortal={false}
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
