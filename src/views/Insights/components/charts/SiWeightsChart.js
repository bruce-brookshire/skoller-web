import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryScatter, VictoryLine, VictoryAxis, VictoryChart, VictoryContainer, VictoryGroup, VictoryArea } from 'victory'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getStyles } from './styles'

@inject('rootStore') @observer
class WeightsTimeline extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: this.getAssignmentWeightData()
    }
  }

  getStyles () {
    return getStyles(false, this.props.rootStore.insightsStore.darkMode)
  }

  getAssignmentWeightData () {
    let assignments = this.props.assignments
    let data = []
    let firstAssignment = Math.min.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))
    let lastAssignment = Math.max.apply(Math, assignments.map(a => parseInt(moment(a.due).format('X'))))

    switch (this.props.view) {
      case 'w':
        let firstWeek = moment(firstAssignment, 'X').startOf('week')
        let lastWeek = moment(lastAssignment, 'X').startOf('week').add(7, 'days')

        let weeks = []
        while (firstWeek.isBefore(lastWeek)) {
          weeks.push({week: moment(firstWeek), assignments: []})
          firstWeek.add(7, 'days')
        }

        assignments.forEach(assignment => {
          weeks.forEach(w => {
            if (moment(assignment.due).isSame(moment(w.week), 'week')) {
              w.assignments.push(assignment)
            }
          })
        })

        let totalWeight = 0

        weeks.forEach(w => {
          totalWeight += w.assignments.reduce((i, a) => {
            return i + a.weight
          }, 0)
          data.push({
            x: parseInt(moment(w.week).format('X')),
            y: w.assignments.reduce((i, a) => {
              return i + a.weight
            }, 0)
          })
        })

        console.log(totalWeight)

        data = data.map(d => {
          return {
            x: d.x,
            y: d.y / totalWeight
          }
        })
        break

      case 'm':
        let firstMonth = moment(firstAssignment, 'X').startOf('month')
        let lastMonth = moment(lastAssignment, 'X').startOf('month')

        let months = []
        while (firstMonth.isBefore(lastMonth) || firstMonth.isSame(lastMonth, 'month')) {
          months.push({month: moment(firstMonth), assignments: []})
          firstMonth.add(1, 'months')
        }

        assignments.forEach(assignment => {
          months.forEach(m => {
            if (moment(assignment.due).isSame(moment(m.month), 'month')) {
              m.assignments.push(assignment)
            }
          })
        })

        months.forEach(m => {
          data.push({x: parseInt(moment(m.month).format('X')), y: m.assignments.length})
        })
        break
    }

    console.log(data)
    return data
  }

  renderTodayLine (today, hideToday, domain, styles, animate) {
    if (hideToday) {
      return null
    } else {
      return (
        <VictoryGroup>
          <VictoryLine
            x={() => today}
            domain={domain}
            style={styles.todayLine.back}
          />
          <VictoryLine
            x={() => today}
            domain={domain}
            style={styles.todayLine.front}
          />
          <VictoryScatter
            data={[{x: today, y: domain.y[1]}]}
            domain={domain}
            size={4}
            style={styles.todayLine.dot}
            labels={'Today'}
          />
        </VictoryGroup>
      )
    }
  }

  render () {
    let data = this.state.data

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
          <VictoryChart
            animate={styles.animate}
            height={this.props.chartSize ? this.props.chartSize.height : 300}
            width={this.props.chartSize ? this.props.chartSize.width : 550}
            style={styles.parent}
            containerComponent={<VictoryContainer responsive={true} />}
            padding={styles.parent.padding}
          >
            <VictoryAxis
              tickValues={tickValues}
              tickFormat={d => {
                let date = Math.round(d)
                return moment(date, 'X').format('M/DD')
              }}
              tickCount={5}
              style={styles.axisDates}
              scale={{ x: 'time' }}
              fixLabelOverlap={true}
            />
            <VictoryAxis
              dependentAxis
              style={styles.axisOne}
              tickFormat={d => Math.round(d * 100) + '%'}
              label={'Total Grade Impact'}
              fixLabelOverlap={true}
            />
            {this.renderTodayLine(today, hideToday, domain, styles, animate)}
            <VictoryLine
              data={data}
              interpolation='monotoneX'
              style={styles.lineOne}
            />
            <VictoryArea
              data={data}
              interpolation='monotoneX'
              style={styles.area}
            />
            <VictoryScatter
              data={data}
              size={5}
              style={styles.scatter}
              labels={() => ''}
            />
          </VictoryChart>
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
  view: PropTypes.string,
  assignments: PropTypes.array,
  chartSize: PropTypes.object
}

export default withRouter(WeightsTimeline)
