import React from 'react'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { VictoryScatter, VictoryLine, VictoryAxis, VictoryChart, VictoryContainer, VictoryArea } from 'victory'
import PropTypes from 'prop-types'
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
    return [
      {
        x: 1,
        y: 0.15
      },
      {
        x: 2,
        y: 0.25
      },
      {
        x: 3,
        y: 0.65
      },
      {
        x: 4,
        y: 0.3
      },
      {
        x: 5,
        y: 0.15
      },
      {
        x: 6,
        y: 0.5
      }
    ]
  }

  render () {
    let data = this.state.data

    const styles = this.getStyles()
    if (data.length > 0) {
      const tickValues = data.map(d => d.x)

      return (
        <div style={{margin: '1rem 1rem -1.25rem -2rem'}}>
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
              tickFormat={d => ''}
              style={styles.axisDates}
              scale={{ x: 'time' }}
              fixLabelOverlap={true}
            />
            <VictoryAxis
              dependentAxis
              style={styles.axisOne}
              tickFormat={d => ''}
            />
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
