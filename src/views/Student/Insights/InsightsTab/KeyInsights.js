import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import { getHardestWeek } from '../DataUtils'
import moment from 'moment'
import HardestWeek from '../HardestWeek'

@inject('rootStore') @observer
class KeyInsights extends React.Component {
  renderSingleHardestWeek () {
    let keyInsights = getHardestWeek(this.props.rootStore.studentAssignmentsStore)
    let assignments = keyInsights.hardestWeeks[0].assignments.sort((a, b) => a.weight > b.weight ? 1 : -1)
    let weight = Math.round(keyInsights.hardestWeekTotalWeight * 1000) / 1000
    let future = moment(keyInsights.hardestWeeks[0].getWeek()).isAfter(moment())

    return (
      <div>
        <h2>
          Your <b>hardest week</b> {future ? 'will be ' : 'was '}the week of {moment(keyInsights.hardestWeeks[0].getWeek()).format('MMMM DD')}
        </h2>
        <p>
          You {future ? 'have' : 'had'} {assignments.length} assignments this week, worth {weight * 100}% of your total grade.
        </p>
        <HardestWeek hardestWeek={moment(keyInsights.hardestWeeks[0].getWeek()).format('X')} hardestWeekWeight={weight} />
      </div>
    )
  }

  renderContent () {
    let keyInsights = getHardestWeek(this.props.rootStore.studentAssignmentsStore)
    return (
      <div className='key-insights-container'>
        <h1>Key Insights</h1>
        {keyInsights.hardestWeeks.length > 1
          ? <h2 />
          : this.renderSingleHardestWeek()
        }
      </div>
    )
  }

  render () {
    let keyInsights = getHardestWeek(this.props.rootStore.studentAssignmentsStore)
    return (
      keyInsights.hardestWeeks.length > 0
        ? this.renderContent()
        : <div />
    )
  }
}

KeyInsights.propTypes = {
  rootStore: PropTypes.object
}

export default KeyInsights
