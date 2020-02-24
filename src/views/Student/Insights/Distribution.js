import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryPie, VictoryLabel } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getWeightDistribution } from './DataUtils'
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
              <p style={{margin: 0, fontSize: '12px'}}>{Math.round(datum.y * 1000) / 10}% of total grade</p>
            </div>
          </div>
        </foreignObject>
      </g>
    )
  }
}

@inject('rootStore') @observer
class WeightsTimeline extends React.Component {
  getStyles () {
    return getStyles(this.props.cl ? '#' + this.props.cl.color : false)
  }

  render () {
    let {data, count} = getWeightDistribution(this.props.rootStore.studentAssignmentsStore, this.props.cl)

    const styles = this.getStyles()
    if (data.length > 0) {
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

      return (
        <svg style={styles.parent} viewBox='0 0 450 350'>

          {/* Define labels */}
          <VictoryLabel x={18} y={40}
            text='Grade Distribution'
            style={styles.title}
          />

          <VictoryLabel x={18} y={60}
            text={'Of your ' + count + ' assignments this semester...'}
            style={styles.subtitle}
          />

          <g transform={'translate(18, 124)'}>
            <VictoryLabel x={0} y={0}
              text={data[0].y.toString() + ' are high impact'}
              style={styles.pie.labelTitleOne}
            />
            <VictoryLabel x={0} y={20}
              text={'More than 15% of your class grade'}
              style={styles.pie.labelTitleOneSubtitle}
            />

            <VictoryLabel x={0} y={64}
              text={data[1].y.toString() + ' are medium impact'}
              style={styles.pie.labelTitleTwo}
            />
            <VictoryLabel x={0} y={84}
              text={'5-15% of your class grade'}
              style={styles.pie.labelTitleTwoSubtitle}
            />

            <VictoryLabel x={0} y={128}
              text={data[2].y.toString() + ' are low impact'}
              style={styles.pie.labelTitleThree}
            />
            <VictoryLabel x={0} y={148}
              text={'Less than 5% of your class grade'}
              style={styles.pie.labelTitleThreeSubtitle}
            />
          </g>

          <g transform={'translate(180, 0)'}>
            {/* Add shared independent axis */}

            <VictoryPie
              data={data}
              labels={() => ''}
              width={300}
              domain={domain}
              standalone={false}
              size={4}
              style={styles.pie}
              colorScale={styles.pie.colorScale}
            />

          </g>

          {/* <g transform={'translate(300, 40)'}>
            <VictoryStack
              colorScale={styles.stack.colorScale}
              standalone={false}
            >
              <VictoryBar data={[{x: 1, y: data[2].y}]} />
              <VictoryBar data={[{x: 1, y: data[1].y}]} />
              <VictoryBar data={[{x: 1, y: data[0].y}]} />
              <VictoryBar data={[{x: 2, y: 0}]} />
            </VictoryStack>
          </g> */}
        </svg>
      )
    } else {
      return <div />
    }
  }
}

WeightsTimeline.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object
}

export default withRouter(WeightsTimeline)
