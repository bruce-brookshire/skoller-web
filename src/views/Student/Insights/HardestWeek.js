import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryScatter, VictoryLabel, VictoryAxis, VictoryArea, VictoryStack, VictoryTooltip } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getAssignmentWeightDataByClass, convertHexToRGBWithOpacity } from './DataUtils'
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
    let fill = '#4a4a4a'
    return (
      <g>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L5,3 z" fill={fill} />
        </marker>
        {/* <path d={`M ${x} ${y - 10} C ${x + 20} ${y - 50}, ${(450 / 2) - 20} 80, ${450 / 2} 40`} markerEnd="url(#arrow)" stroke="black" strokeWidth='2' fill="transparent"/> */}
        <path d={`M ${(450 / 2) - 18} 40 C ${(450 / 2) - 20} 80, ${x + 20} ${y - 50}, ${x + 3} ${y - 15}`} markerEnd="url(#arrow)" stroke={fill} strokeWidth='2' fill="transparent"/>
      </g>
    )
  }
}

DataComponent.propTypes = {
  view: PropTypes.string
}

@inject('rootStore') @observer
class HardestWeek extends React.Component {
  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

  render () {
    let {data, classData} = getAssignmentWeightDataByClass(this.props.rootStore.studentAssignmentsStore, this.props.cl, this.props.ids)
    const styles = this.getStyles()
    if (data.length > 0) {
      const domain = {
        x: [
          data[0].x,
          data[data.length - 1].x
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
              text={'% of Total Grade'}
              style={styles.axisLabel}
              angle={270}
              textAnchor={'middle'}
            />

            <VictoryAxis
              dependentAxis
              domain={{y: domain.y}}
              tickFormat={d => Math.round((d * 100)).toString() + '%'}
              offsetX={50}
              orientation='left'
              standalone={false}
              domainPadding={200}
              style={styles.axisOne}
              animate={animate}
            />

            <VictoryStack
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              interpolation='monotoneX'
              labels={() => ''}
              style={{labels: {fontFamily: '"Calibre", sans-serif'}}}
            >
              {Object.keys(classData).map(k => {
                if (k !== 'null') {
                  let cl = this.props.rootStore.studentClassesStore.classes.find(cl => cl.id === parseInt(k))
                  let color = cl.getColor()
                  let halfColor = convertHexToRGBWithOpacity(color)
                  let data = classData[k].data
                  data = data.map(datum => {
                    return ({
                      x: datum.x,
                      y: datum.y,
                      label: cl.name
                    })
                  })
                  return (
                    <VictoryArea
                      key={Object.keys(classData).indexOf(k)}
                      data={data}
                      domain={domain}
                      scale={{x: 'time', y: 'linear'}}
                      standalone={false}
                      interpolation='monotoneX'
                      // style={{data: {fill: color.toLowerCase().replace('ff', '75'), stroke: color, strokeWidth: '1'}}}
                      style={{data: {fill: halfColor, stroke: color, strokeWidth: 2}, labels: {fontFamily: '"Calibre", sans-serif'}}}
                      animate={animate}
                      labels={() => ''}
                      labelComponent={
                        <VictoryTooltip
                          flyoutStyle={{...styles.flyout, fontFamily: 'inherit'}}
                          // renderInPortal={true}
                        />
                      }
                    />
                  )
                }
              })}
            </VictoryStack>

            <VictoryScatter
              data={[{x: parseInt(this.props.hardestWeek), y: this.props.hardestWeekWeight}]}
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

HardestWeek.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object,
  ids: PropTypes.array,
  hardestWeek: PropTypes.string,
  hardestWeekWeight: PropTypes.number
}

export default withRouter(HardestWeek)
