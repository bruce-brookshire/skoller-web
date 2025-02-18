import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryScatter, VictoryLabel, VictoryAxis, VictoryStack, VictoryTooltip, VictoryArea } from 'victory'
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
    let fill = '#57B9E450'
    let strokeWidth = 20.5
    return (
      <g>
        {/* <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L5,3 z" fill={fill} />
        </marker>
        <path d={`M ${(450 / 2) - 18} 40 C ${(450 / 2) - 20} 80, ${x + 20} ${y - 50}, ${x + 3} ${y - 15}`} markerEnd="url(#arrow)" stroke={fill} strokeWidth='2' fill="transparent"/> */}
        <path d={`M ${x} 40, ${x} ${250}, ${x} ${250}`} stroke={fill} strokeWidth={strokeWidth} fill="transparent"/>
      </g>
    )
  }
}

DataComponent.propTypes = {
  view: PropTypes.string
}

@inject('rootStore') @observer
class EasiestWeek extends React.Component {
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
          // data[0].x - 604800,
          // data[data.length - 1].x + 604800
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

            {this.props.easiestWeeks.map(w => {
              return (
                <VictoryScatter
                  key={this.props.easiestWeeks.indexOf(w)}
                  data={[{x: parseInt(moment(w.getWeek()).format('X')), y: w.overallWeight}]}
                  size={5}
                  domain={domain}
                  scale={{x: 'time', y: 'linear'}}
                  standalone={false}
                  style={styles.scatter}
                  animate={animate}
                  dataComponent={<DataComponent />}
                />
              )
            })}

            <VictoryStack
              domain={domain}
              scale={{x: 'time', y: 'linear'}}
              standalone={false}
              interpolation='monotoneX'
              labels={() => ''}
            >
              {Object.keys(classData).map(k => {
                if (k !== 'null') {
                  let cl = this.props.rootStore.studentClassesStore.classes.find(cl => cl.id === parseInt(k))
                  // let color = this.convertHexToRGB(cl.getColor())
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
                      style={{data: {fill: halfColor, stroke: color, strokeWidth: 2}}}
                      animate={animate}
                      labels={() => ''}
                      labelComponent={
                        <VictoryTooltip
                          flyoutStyle={styles.flyout}
                          renderInPortal={false}
                        />
                      }
                    />
                  )
                }
              })}
            </VictoryStack>
          </g>
        </svg>
      )
    } else {
      return <div />
    }
  }
}

EasiestWeek.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object,
  ids: PropTypes.array,
  easiestWeeks: PropTypes.array
}

export default withRouter(EasiestWeek)
