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
        <div className='insights-title'>
          The week of <b className='bold'>{moment(keyInsights.hardestWeeks[0].getWeek()).format('MMMM DD')}</b> is your <b className='bold'>hardest week.</b>
          <div className='insights-sub-title'>It makes up {Math.round(weight * 1000) / 10}% of your total grade</div>
        </div>
        {/* <h3 style={{textAlign: 'center', margin: '0 0 -0.25rem 0'}}>Hardest week</h3> */}
        <HardestWeek ids={ids} hardestWeek={moment(keyInsights.hardestWeeks[0].getWeek()).format('X')} hardestWeekWeight={weight} />
      </div>
    )
  }

  renderSingleBusiestWeek (keyInsights) {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)
    let count = keyInsights.busiestWeek[0].assignments.length

    return (
      <div className='hardest-week'>
        <div className='insights-title'>
          The week of <b className='bold'>{moment(keyInsights.busiestWeek[0].getWeek()).format('MMMM DD')}</b> is{keyInsights.busiestWeek[0] === keyInsights.hardestWeeks[0] ? ' also' : ''} your <b className='bold'>busiest week.</b>
          <div className='insights-sub-title'>You have {count} assignments due that week.</div>
        </div>
        <BusiestWeek ids={ids} busiestWeek={moment(keyInsights.busiestWeek[0].getWeek()).format('X')} busiestWeekCount={count} />
      </div>
    )
  }

  renderEasiestWeeks (keyInsights) {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)

    return (
      <div className='hardest-week'>
        <div className='insights-title'>
          Looking to <b className='bold'>slack off?</b>
          <div className='insights-sub-title'>
            {keyInsights.easiestWeeks.map(w => {
              let last = false
              if (keyInsights.easiestWeeks.indexOf(w) === keyInsights.easiestWeeks.length - 1) {
                last = true
              }
              return (
                <span style={{fontSize: '14px', fontWeight: '200'}} key={keyInsights.easiestWeeks.indexOf(w)}>
                  {last ? 'and ' : ''}{moment(w.getWeek()).format('MMMM Do')}{last ? '' : ', '}
                </span>
              )
            })}<br />
            {' are the easiest weeks of this semester.'}
          </div>
        </div>
        <EasiestWeek easiestWeeks={keyInsights.easiestWeeks} ids={ids} />
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
    if (this.props.rootStore.studentClassesStore.classes.filter(cl => cl.assignments.length > 0)) {
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
