import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import { getKeyInsights } from '../DataUtils'
import moment from 'moment'
import HardestWeek from '../HardestWeek'
import BusiestWeek from '../BusiestWeek'
import EasiestWeek from '../EasiestWeek'

@inject('rootStore') @observer
class KeyInsights extends React.Component {
  renderSingleHardestWeek (keyInsights) {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)
    let weight = Math.round(keyInsights.hardestWeekTotalWeight * 1000) / 1000

    return (
      <div className='hardest-week'>
        <div className='title'>
          Making up {Math.round(weight * 1000) / 10}% of your total grade, the week of <span className='bold'>{moment(keyInsights.hardestWeeks[0].getWeek()).format('MMMM DD')}</span> is your <b className='bold'>hardest week.</b>
        </div>
        {/* <h3 style={{textAlign: 'center', margin: '0 0 -0.25rem 0'}}>Hardest week</h3> */}
        <HardestWeek ids={ids} hardestWeek={moment(keyInsights.hardestWeeks[0].getWeek()).format('X')} hardestWeekWeight={weight} />
      </div>
    )
  }

  renderSingleBusiestWeek (keyInsights) {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)
    // let assignments = keyInsights.busiestWeek[0].assignments.sort((a, b) => a.weight > b.weight ? 1 : -1)
    // let weight = Math.round(keyInsights.hardestWeekTotalWeight * 1000) / 1000
    // let future = moment(keyInsights.hardestWeeks[0].getWeek()).isAfter(moment())
    let count = keyInsights.busiestWeek[0].assignments.length

    let totalAssignmentCount = 0
    this.props.rootStore.studentAssignmentsStore.assignments.forEach((a) => {
      if (ids.includes(a.class_id)) {
        totalAssignmentCount += 1
      } else return null
    })

    return (
      <div className='hardest-week'>
        <div className='title'>
          With {count} of your {totalAssignmentCount} assignments, the week of <span className='bold'>{moment(keyInsights.busiestWeek[0].getWeek()).format('MMMM DD')}</span> is{keyInsights.busiestWeek[0] === keyInsights.hardestWeeks[0] ? ' also' : ''} your <b className='bold'>busiest week.</b>
        </div>
        <BusiestWeek ids={ids} busiestWeek={moment(keyInsights.busiestWeek[0].getWeek()).format('X')} busiestWeekCount={count} />
      </div>
    )
  }

  renderEasiestWeeks (keyInsights) {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)

    return (
      <div className='hardest-week'>
        <div className='title'>
          Looking to slack off? <span className='bold'>Try these weeks.</span>
        </div>
        <EasiestWeek easiestWeeks={keyInsights.easiestWeeks} ids={ids} />
        <p>{'The weeks of '}
          {keyInsights.easiestWeeks.map(w => {
            let last = false
            if (keyInsights.easiestWeeks.indexOf(w) === keyInsights.easiestWeeks.length - 1) {
              last = true
            }
            return (
              <span style={{fontSize: '18px', fontWeight: '600'}} key={keyInsights.easiestWeeks.indexOf(w)}>
                {last ? 'and ' : ''}{moment(w.getWeek()).format('MMMM Do')}{last ? '' : ', '}
              </span>
            )
          })}
          {' represent the easiest 25% of weeks this semester.'}
        </p>
      </div>
    )
  }

  renderSpacer () {
    return (
      <div style={{borderBottom: '1px solid rgba(0,0,0,0.15)', width: '100%', margin: '2rem 0'}} />
    )
  }

  renderContent () {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null).filter(x => x !== null)
    let moreThanTwoCompletedClasses = false
    if (this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id === 1400).length > 1 && ids.length > 1) {
      moreThanTwoCompletedClasses = true
    }

    let moreThanTwoClassesWithAssignments = false
    if (this.props.rootStore.studentClassesStore.classes.filter(cl => cl.assignments.length > 1)) {
      moreThanTwoClassesWithAssignments = true
    }

    let keyInsights = getKeyInsights(this.props.rootStore.studentAssignmentsStore, ids)
    return (
      <div className='key-insights-container'>
        <h1>Key Weekly Insights</h1>
        {moreThanTwoCompletedClasses && moreThanTwoClassesWithAssignments &&
          <div>
            {this.renderEasiestWeeks(keyInsights)}
            {this.renderSpacer()}
            {this.renderSingleBusiestWeek(keyInsights)}
            {this.renderSpacer()}
            {this.renderSingleHardestWeek(keyInsights)}
          </div>
        }
        {(!moreThanTwoCompletedClasses || !moreThanTwoClassesWithAssignments) &&
          <p>Add more data to see your key insights!</p>
        }
      </div>
    )
  }

  render () {
    let keyInsights = getKeyInsights(this.props.rootStore.studentAssignmentsStore)
    return (
      keyInsights.hardestWeeks.length > 0
        ? this.renderContent()
        : <div />
    )
  }
}

KeyInsights.propTypes = {
  rootStore: PropTypes.object,
  selectedClasses: PropTypes.array
}

export default KeyInsights
