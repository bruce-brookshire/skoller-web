import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flipper, Flipped } from 'react-flip-toolkit'
import moment from 'moment'
import Assignment from './Assignment'
import EditAssignment from './EditAssignment'

export default class ClassAssignments extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visibleAssignments: []
    }

    this.ref = null
  }

  scroll (scrollTo) {
    this.ref.scroll({top: scrollTo, behavior: 'smooth'})
  }

  componentDidMount () {
    setTimeout(() => {
      const assignmentToScrollTo = document.getElementsByClassName('active-assignment')[0]
      const scrollTo = assignmentToScrollTo.offsetTop

      this.scroll(scrollTo)
    }, 10)
  }

  registerVisibleAssignments (id, isVisible) {
    let visibleAssignments = this.state.visibleAssignments

    if (isVisible) {
      if (!visibleAssignments.includes(id)) {
        visibleAssignments.push(id)
      }
    } else {
      if (visibleAssignments.includes(id)) {
        visibleAssignments.splice(visibleAssignments.indexOf(id), 1)
      }
    }

    this.setState({visibleAssignments})
    this.props.visibleAssignmentsCallback && this.props.visibleAssignmentsCallback(visibleAssignments)
  }

  static propTypes = {
    createAssignment: PropTypes.func,
    editAssignment: PropTypes.func,
    cl: PropTypes.object,
    activeAssignmentId: PropTypes.number,
    visibleAssignmentsCallback: PropTypes.func,
    onCompleteAssignment: PropTypes.func
  }

  render () {
    const cl = this.props.cl
    let assignments = cl.assignments.sort((a, b) => moment(a.due).isBefore(moment(b.due)) ? -1 : 1)

    let activeAssignmentId
    if (!this.props.activeAssignmentId) {
      assignments.forEach(a => {
        if (!activeAssignmentId) {
          if (!a.is_completed) activeAssignmentId = a.assignment_id
        }
      })
      // let assignmentsNotDueBeforeToday = assignments.filter(a => !moment(a.due).isBefore(moment()))
      // let activeAssignmentDueDate = Math.min.apply(Math, assignmentsNotDueBeforeToday.map(a => parseInt(moment(a.due).format('X'))))
      // activeAssignmentId = assignmentsNotDueBeforeToday.find(a => parseInt(moment(a.due).format('X')) === activeAssignmentDueDate).assignment_id
    } else {
      activeAssignmentId = this.props.activeAssignmentId
    }

    return (
      <div className='sk-class-assignments-wrapper'>
        <div className='sk-class-assignments' ref={(r) => { this.ref = r }}>
          <Flipper spring={'stiff'} flipKey={assignments.join('|')}>
            {assignments.map(a => {
              return <Assignment onCompleteAssignment={() => this.props.onCompleteAssignment()} registerVisibleAssignment={(id, isVisible) => this.registerVisibleAssignments(id, isVisible)} active={activeAssignmentId === a.assignment_id} scrollTop={this.state.containerScrollTop} key={a.assignment_id} assignment={a} color={cl.color} />
            })}
            <Flipped flipKey='new-assignment'>
              <EditAssignment assignment={{id: null, due: moment().format('MM-DD-YYYY'), weight_id: 1}} />
            </Flipped>
          </Flipper>
        </div>
      </div>
    )
  }
}
