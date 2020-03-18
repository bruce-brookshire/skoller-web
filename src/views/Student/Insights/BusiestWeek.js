import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryScatter, VictoryLabel, VictoryAxis, VictoryBar, VictoryStack, VictoryTooltip } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getAssignmentCountDataByClass } from './DataUtils'
import { getStyles } from './styles'

export class DataComponent extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    orientation: PropTypes.string,
    datum: PropTypes.object
  }

  render () {
    const {x, y} = this.props
    return (
      <g>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L5,3 z" fill="#57B9E4" />
        </marker>
        {/* <path d={`M ${x} ${y - 10} C ${x + 20} ${y - 50}, ${(450 / 2) - 20} 80, ${450 / 2} 40`} markerEnd="url(#arrow)" stroke="black" strokeWidth='2' fill="transparent"/> */}
        <path d={`M ${(450 / 2) - 18} 40 C ${(450 / 2) - 20} 80, ${x + 20} ${y - 50}, ${x + 3} ${y - 15}`} markerEnd="url(#arrow)" stroke="#57B9E4" strokeWidth='2' fill="transparent"/>
      </g>
    )
  }
}

DataComponent.propTypes = {
  view: PropTypes.string
}

@inject('rootStore') @observer
class BusiestWeek extends React.Component {
  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

  render () {
    let {data, classData} = getAssignmentCountDataByClass(this.props.rootStore.studentAssignmentsStore, this.props.cl, this.props.ids)
    const styles = this.getStyles()
    if (data.length > 0) {
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
      const tickValues = data.map(d => d.x)
      const animate = null

      return (
        <svg
          // style={styles.parent}
          viewBox='0 0 450 260'
        >

          <g transform={'translate(16, -36)'}>
            {/* Add shared independent axis */}
            <VictoryAxis
              tickValues={tickValues}
              tickFormat={d => moment(d, 'X').format('M/DD')}
              tickCount={5}
              style={styles.axisDates}
              domain={{x: domain.x}}
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
              domain={{y: domain.y}}
              tickFormat={d => Math.round((d))}
              offsetX={50}
              orientation='left'
              standalone={false}
              domainPadding={200}
              style={styles.axisOne}
              animate={animate}
            />

            {/* <g>
              <VictoryBar
                data={data}
                domain={domain}
                scale={{x: 'time', y: 'linear'}}
                standalone={false}
                interpolation='monotoneX'
                style={{data: {fill: 'blue'}}}
                animate={animate}
              />
            </g> */}
            <VictoryStack
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              interpolation='monotoneX'
            >
              {Object.keys(classData).map(k => {
                if (k !== 'null') {
                  let cl = this.props.rootStore.studentClassesStore.classes.find(cl => cl.id === parseInt(k))
                  let color = cl.getColor()
                  let data = classData[k].data
                  data = data.map(datum => {
                    return ({
                      x: datum.x,
                      y: datum.y,
                      label: cl.name
                    })
                  })
                  return (
                    <VictoryBar
                      key={Object.keys(classData).indexOf(k)}
                      data={data}
                      domain={domain}
                      scale={{x: 'time', y: 'linear'}}
                      standalone={false}
                      interpolation='monotoneX'
                      style={{data: {fill: color}}}
                      animate={animate}
                      renderInPortal={true}
                      labelComponent={
                        <VictoryTooltip
                          flyoutStyle={styles.flyout}
                          renderInPortal={true}
                        />
                      }
                    />
                  )
                }
              })}
            </VictoryStack>

            <VictoryScatter
              data={[{x: parseInt(this.props.busiestWeek), y: this.props.busiestWeekCount}]}
              size={5}
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              style={styles.scatter}
              animate={animate}
              dataComponent={<DataComponent />}
            />

          </g>
        </svg>
      )
    } else {
      return <div />
    }
  }
}

BusiestWeek.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object,
  ids: PropTypes.array,
  busiestWeek: PropTypes.string,
  busiestWeekCount: PropTypes.number
}

export default withRouter(BusiestWeek)
