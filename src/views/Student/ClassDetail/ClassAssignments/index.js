import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flipper } from 'react-flip-toolkit'
import moment from 'moment'
import Assignment from './Assignment'

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
      const scrollTo = assignmentToScrollTo.offsetTop - 269

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
    onCompleteAssignment: PropTypes.func,
    onDeleteAssignment: PropTypes.func
  }

  render () {
    const cl = this.props.cl
    let assignments = cl.assignments.slice().sort((a, b) => moment(a.due).isBefore(moment(b.due)) ? -1 : 1)

    let activeAssignmentId
    if (!this.props.activeAssignmentId) {
      assignments.forEach(a => {
        if (!activeAssignmentId) {
          if (!a.is_completed) {
            activeAssignmentId = a.id
          }
        }
      })
    } else {
      activeAssignmentId = this.props.activeAssignmentId
    }

    return (
      <div className='sk-class-assignments-wrapper'>
        <div className='sk-class-assignments' ref={(r) => { this.ref = r }}>
          <Flipper spring={'stiff'} flipKey={assignments.join('|') + assignments.map(a => a.due).join('|')}>
            {assignments.map(a => {
              console.log(a.id)
              return <Assignment
                onDeleteAssignment={this.props.onDeleteAssignment}
                onCompleteAssignment={this.props.onCompleteAssignment}
                editAssignment={this.props.editAssignment}
                registerVisibleAssignment={(id, isVisible) => this.registerVisibleAssignments(id, isVisible)}
                active={activeAssignmentId === a.id}
                scrollTop={this.state.containerScrollTop}
                key={a.id}
                assignment={a}
                color={cl.color}
                cl={cl}
                className={parseInt(this.props.activeAssignmentId) === parseInt(a.id) ? ' focused-assignment' : null}
              />
            })}
          </Flipper>
        </div>
      </div>
    )
  }
}
