import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { asyncForEach } from '../utils'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
export default class StatusIndicators extends Component {
  constructor (props) {
    super(props)

    this.state = {
      noClasses: false,
      noAccount: false,
      noSetup: false,
      error: false
    }
  }

  static propTypes = {
    student: PropTypes.object,
    invitation: PropTypes.object,
    group: PropTypes.object,
    hideNumbers: PropTypes.bool
  }

  componentDidMount () {
    this.getStatuses()
  }

  hasIncompleteClasses (classes) {
    let hasIncompleteClasses = false
    classes.forEach(cl => {
      if (cl.status.id < 1400) {
        hasIncompleteClasses = true
      }
    })
    return hasIncompleteClasses
  }

  getStatuses () {
    const {student, invitation, group} = this.props
    if (!student && !invitation && !group) return this.setState({error: true})

    // student
    if (this.props.student) {
      const classes = this.props.student.classes
      if (classes.length === 0) {
        this.setState({noClasses: true})
      }

      if (this.hasIncompleteClasses(classes)) this.setState({noSetup: true})
    }

    // invitation
    if (this.props.invitation) {
      const invitation = this.props.invitation
      this.setState({noAccount: true})

      if (invitation.class_ids.length === 0) {
        this.setState({noClasses: true})
      }

      if (invitation.class_ids.length > 0) {
        asyncForEach(invitation.class_ids, async id => {
          await actions.classes.getClassById(id)
            .then(r => {
              if (r.status.id < 1400) {
                this.setState({noSetup: true})
              }
            })
        })
      }
    }

    // group
    if (this.props.group) {
      const students = group.students
      const invitations = group.invitations

      // accounts
      if (invitations.length > 0) this.setState({noAccount: invitations.length})

      // classes
      let noClasses = 0
      students.forEach(s => {
        if (s.classes.length === 0) noClasses += 1
      })
      invitations.forEach(s => {
        if (s.class_ids.length === 0) noClasses += 1
      })
      this.setState({noClasses: noClasses === 0 ? false : noClasses})

      // setup
      let noSetup = 0
      students.forEach(s => {
        let allSetup = true
        s.classes.forEach(cl => {
          if (cl.status.id < 1400) {
            allSetup = false
          }
        })
        if (!allSetup) noSetup += 1
      })
      invitations.forEach(async s => {
        let allSetup = true
        await asyncForEach(s.class_ids, async id => {
          await actions.classes.getClassById(id)
            .then(r => {
              if (r.status.id < 1400) {
                allSetup = false
              }
            })
        })
        if (!allSetup) noSetup += 1
      })
      this.setState({noSetup: noSetup === 0 ? false : noSetup})
    }
  }

  renderHovering () {
    if (!this.state.hovering || !this.props.group) return null

    const {hovering} = this.state
    let ref = this.noClassesRef
    let text = 'Students with no classes'
    if (hovering === 'noAccount') {
      text = 'Students who have not verified their account'
      ref = this.noAccountRef
    } else if (hovering === 'noSetup') {
      ref = this.noSetupRef
      text = "Students with classes that aren't set up"
    }
    return (
      <div className='hover-container' style={{left: ref ? ref.offsetLeft - 36 : null}}>{text}</div>
    )
  }

  render () {
    if (this.state.error) return null
    return (
      <div className={'si-status-indicators ' + (this.props.group && !this.props.hideNumbers ? ' si-group' : '')}>
        {this.renderHovering()}
        <div className={'si-status-indicators-dots ' + (this.props.group && !this.props.hideNumbers ? ' si-group' : '')}>
          {this.state.noClasses && <div className='no-classes' ref={(ref) => { this.noClassesRef = ref }} onMouseEnter={() => this.setState({hovering: 'noClasses'})} onMouseLeave={() => this.setState({hovering: false})}>{this.props.group && !this.props.hideNumbers && this.state.noClasses}</div>}
          {this.state.noSetup && <div className='no-setup' ref={(ref) => { this.noSetupRef = ref }} onMouseEnter={() => this.setState({hovering: 'noSetup'})} onMouseLeave={() => this.setState({hovering: false})}>{this.props.group && !this.props.hideNumbers && this.state.noSetup}</div>}
          {this.state.noAccount && <div className='no-account' ref={(ref) => { this.noAccountRef = ref }} onMouseEnter={() => this.setState({hovering: 'noAccount'})} onMouseLeave={() => this.setState({hovering: false})}>{this.props.group && !this.props.hideNumbers && this.state.noAccount}</div>}
        </div>
      </div>
    )
  }
}
