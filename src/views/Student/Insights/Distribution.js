import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryPie, VictoryLabel } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getWeightDistribution } from './DataUtils'
import { getStyles } from './styles'
import WeightIcon from '../Tasks/WeightIcon'

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

  toTitleCase (string) {
    var sentence = string.toLowerCase().split(' ')
    for (var i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
    }
    sentence = sentence.join(' ')
    return sentence
  }

  renderLabel (x, y, styles, animate, data, impact) {
    let details
    let color = '#' + (this.props.cl ? this.props.cl.color : '57B9E4')
    switch (impact) {
      case 'high':
        details = {text: 'More than 15% of your class grade', style: 'One', icon: () => <WeightIcon color={color} weight={0.2} />}
        break
      case 'medium':
        details = {text: '5%-15% of your class grade', style: 'Two', icon: () => <WeightIcon color={color} weight={0.1} />}
        break
      case 'low':
        details = {text: 'Less than 5% of your class grade', style: 'Three', icon: () => <WeightIcon color={color} weight={0.04} />}
        break
      case 'zero':
        details = {text: 'No impact on class grade', style: 'Four', icon: () => <WeightIcon color={color} weight={0} />}
        break
    }
    return (
      <g transform={`translate(${x}, ${y})`}>
        <g transform={`translate(0, 8)`}>
          <VictoryLabel x={28} y={0}
            text={data.y.toString()}
            style={{...styles.pie[('labelTitle' + details.style)], fontSize: '36px', width: '36px', textAnchor: 'end'}}
            animate={animate}
          />
          <line x1="36" y1="-16" x2="36" y2="16" stroke={styles.pie[('labelTitle' + details.style)].fill} strokeWidth='2' />
        </g>
        <g transform={`translate(44, 0)`} ref={this[impact + 'Ref']}>
          <foreignObject transform={`translate(0, -12)`} style={{height: '36px', width: '36px'}}>
            {details.icon()}
          </foreignObject>
          <VictoryLabel x={40} y={0}
            text={this.toTitleCase(impact) + ' impact'}
            style={styles.pie[('labelTitle' + details.style)]}
            animate={animate}
          />
          <VictoryLabel x={0} y={20}
            text={details.text}
            style={styles.pie[('labelTitle' + details.style + 'Subtitle')]}
            animate={animate}
          />
        </g>
      </g>
    )
  }

  render () {
    let {data, count} = getWeightDistribution(this.props.rootStore.studentAssignmentsStore, this.props.cl, this.props.ids)

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
      const animate = styles.animate

      return (
        <div>
          <div className='insights-title'>
            There are <b style={this.props.cl ? {color: '#' + this.props.cl.color} : null}>{count} assignments</b> {(this.props.cl ? 'in this class...' : 'this semester...')}
          </div>
          <svg style={styles.parent} viewBox='0 0 450 260'>
            <g transform={'translate(18, 28)'}>
              {this.renderLabel(0, 0, styles, animate, data[0], 'high')}
              {this.renderLabel(0, 64, styles, animate, data[1], 'medium')}
              {this.renderLabel(0, 128, styles, animate, data[2], 'low')}
              {this.renderLabel(0, 192, styles, animate, data[3], 'zero')}
            </g>
            <g transform={'translate(200, -64)'}>
              <VictoryPie
                data={data}
                labels={() => ''}
                width={300}
                domain={domain}
                standalone={false}
                size={4}
                style={styles.pie}
                colorScale={styles.pie.colorScale}
                animate={animate}
              />
            </g>
          </svg>
        </div>
      )
    } else {
      return <div />
    }
  }
}

WeightsTimeline.propTypes = {
  history: PropTypes.object,
  rootStore: PropTypes.object,
  cl: PropTypes.object,
  ids: PropTypes.array
}

export default withRouter(WeightsTimeline)
