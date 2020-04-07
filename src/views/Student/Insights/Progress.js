import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import moment from 'moment'

@inject('rootStore') @observer
class Progress extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hovered: null
    }

    this.docRefs = {}
  }

  renderPathSegments () {
    let assignments = this.props.rootStore.studentAssignmentsStore.assignments.filter(a => a.weight > 0).sort((a, b) => moment(a.due).isBefore(b.due) ? -1 : 1)

    let totalWeights = assignments.reduce((a, b) => a + b.weight, 0)
    let assignmentsWithWeights = []
    assignments.forEach(a => {
      let relativeWeight = a.weight / totalWeights
      assignmentsWithWeights.push({a, relativeWeight})
    })

    let dArray = []
    assignmentsWithWeights.forEach(a => {
      dArray.push({width: a.relativeWeight, color: this.props.rootStore.studentClassesStore.classes.find(cl => cl.id === a.a.class_id).color, a})
    })

    return dArray
  }

  formatDueDate (dd) {
    let today = moment(0, 'HH')
    let dueDate = moment.utc(dd)
    let daysTillDue = dueDate.diff(today, 'days')
    if (moment(today).format('MMDDYYYY') === moment(dueDate).format('MMDDYYYY')) {
      return 'today'
    } else if (daysTillDue === 1) {
      return 'tomorrow'
    } else {
      if (today.isAfter(dueDate)) {
        return moment(dueDate).fromNow()
      } else {
        return daysTillDue >= 7 ? 'in ' + dueDate.from(today, 'days') : 'on ' + moment.weekdays((daysTillDue + today.weekday()) % 7)
      }
    }
  }

  renderHover () {
    let d = this.state.hovered
    if (this.state.hovered) {
      return (
        <div className='hover' style={{left: this.docRefs[d.a.a.class_id + '000' + d.a.a.id].offsetLeft + (this.docRefs[d.a.a.class_id + '000' + d.a.a.id].offsetWidth / 2) - 106 + 'px', top: this.docRefs[d.a.a.class_id + '000' + d.a.a.id].offsetTop - 112 + 'px'}}>
          <div className='hover-content'>
            <span />
            <p>Assignment: <b>{d.a.a.name}</b></p>
            <p>Due: <b>{this.formatDueDate(d.a.a.due)}</b></p>
            <p>Worth: <b>{Math.round(d.a.a.weight * 10000) / 100}% of class grade</b></p>
          </div>
        </div>
      )
    } else {
      return (
        <div className='hover'/>
      )
    }
  }

  renderChart () {
    let dArray = this.renderPathSegments()
    return (
      <React.Fragment>
        <div className='insights-progress-chart' style={{display: 'flex', flexDirection: 'row', width: '100%' + 'px'}}>
          {dArray.filter(d => moment(d.a.a.due).isBefore(moment())).map(d => {
            return (
              <div ref={r => { this.docRefs[d.a.a.class_id + '000' + d.a.a.id] = r }} onMouseEnter={() => this.setState({hovered: d})} onMouseLeave={() => this.setState({hovered: null})} className='progress-a past' key={dArray.indexOf(d)} style={{
                width: (d.width * 100) + '%',
                backgroundColor: '#' + d.color.substring(0, 6) + '50'
              }} />
            )
          })}
          <div className='progress-today'><p>Today</p><div className='bar' /><div className='ball' /></div>
          {dArray.filter(d => moment(d.a.a.due).isAfter(moment()) || moment(d.a.a.due).isSame(moment())).map(d => {
            return (
              <div ref={r => { this.docRefs[d.a.a.class_id + '000' + d.a.a.id] = r }} onMouseEnter={() => this.setState({hovered: d})} onMouseLeave={() => this.setState({hovered: null})} className='progress-a future' key={dArray.indexOf(d)} style={{
                width: (d.width * 100) + '%',
                backgroundColor: '#' + d.color.substring(0, 6)
              }} />
            )
          })}
        </div>
      </React.Fragment>
    )
  }

  renderTitle () {
    return (
      <div className='insights-title' style={{marginBottom: '4rem'}}>
        You have <b>{this.props.rootStore.studentAssignmentsStore.assignments.filter(a => moment(a.due).isAfter(moment()) || moment(a.due).isSame(moment())).length} assignments</b> left this semester.
      </div>
    )
  }

  renderSubTitle () {
    return (
      <div className='insights-title' style={{marginTop: '4rem'}}>
        <b>{this.props.rootStore.studentAssignmentsStore.assignments.filter(a => moment(a.due).isBefore(moment())).length} assignments</b> have already been due.
      </div>
    )
  }

  render () {
    return (
      <div className='insights-progress'>
        {this.renderTitle()}
        {this.renderHover()}
        {this.renderChart()}
        {this.renderSubTitle()}
      </div>
    )
  }
}

Progress.propTypes = {
  rootStore: PropTypes.object
}

export default Progress
