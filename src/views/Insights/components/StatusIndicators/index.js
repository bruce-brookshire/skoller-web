import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { asyncForEach } from '../../utils'
import actions from '../../../../actions'
import { inject, observer } from 'mobx-react'
import EmailInvitations from '../EmailInviations'
import Indicator from './Indicator'

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
    student: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    invitation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    group: PropTypes.object,
    hideNumbers: PropTypes.bool,
    hideTooltip: PropTypes.bool,
    rootStore: PropTypes.object
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
        invitation.classes.forEach(studentClass => {
          if (studentClass.status.id < 1400) {
            this.setState({noSetup: true})
          }
        })
      }
    }

    const falseIfZero = (number) => {
      if (number === 0) return false
      return number
    }

    // group
    if (this.props.group) {
      this.setState({
        noAccount: falseIfZero(this.props.group.metrics.unresponded_invitation_count),
        noClasses: falseIfZero(this.props.group.metrics.students_with_no_classes_count),
        noSetup: falseIfZero(this.props.group.metrics.students_with_classes_not_setup_count)
      })
    }
  }

  renderHovering () {
    let text
    if (!this.state.group) {
      const {hovering} = this.state
      text = 'No classes'
      if (hovering === 'noAccount') {
        text = <div className='hover-content'>Account not activated. <EmailInvitations type={'individual'} orgId={this.props.rootStore.insightsStore.org.id} ><span className='link-style'>Send invitation</span></EmailInvitations></div>
      } else if (hovering === 'noSetup') {
        text = 'Has classes that are not set up'
      }
    } else {
      const {hovering} = this.state
      text = 'Students with no classes'
      if (hovering === 'noAccount') {
        text = 'Students who have not verified their account'
      } else if (hovering === 'noSetup') {
        text = "Students with classes that aren't set up"
      }
    }

    return text
  }

  stopHover = () => {
    setTimeout(() => {
      this.setState({hovering: false})
    }, 500)
  }

  render () {
    if (this.state.error) return null
    return (
      <div className={'si-status-indicators ' + (this.props.group && !this.props.hideNumbers ? ' si-group' : '')}>
        <div className={'si-status-indicators-dots ' + (this.props.group && !this.props.hideNumbers ? ' si-group' : '')}>
          <Indicator
            show={this.state.noClasses}
            className='no-classes'
            hoverContent={this.state.group ? 'No classes' : 'Students with no classes'}
            number={this.props.group && !this.props.hideNumbers && this.state.noClasses}
          />
          <Indicator
            show={this.state.noSetup}
            className='no-setup'
            hoverContent={this.state.group ? "Students with classes that aren't set up" : 'Has classes that are not set up'}
            number={this.props.group && !this.props.hideNumbers && this.state.noSetup}
          />
          <Indicator
            show={this.state.noAccount}
            className='no-account'
            hoverContent={
              this.state.group
                ? 'Students who have not verified their account'
                : <div>
                  Account not activated. <EmailInvitations id={this.props.group ? this.props.group.id : this.props.invitation ? this.props.invitation.id : null} type={this.props.group ? 'group' : 'individual'} orgId={this.props.rootStore.insightsStore.org.id} ><span className='link-style'>Send invitation</span></EmailInvitations>
                </div>
            }
            number={this.props.group && !this.props.hideNumbers && this.state.noAccount}
          />
          {/* {this.state.noClasses && <div className='no-classes' ref={(ref) => { this.noClassesRef = ref }} onMouseEnter={() => this.setState({hovering: 'noClasses'})} onMouseLeave={() => this.setState({hovering: false})}>{this.props.group && !this.props.hideNumbers && this.state.noClasses}</div>}
          {this.state.noSetup && <div className='no-setup' ref={(ref) => { this.noSetupRef = ref }} onMouseEnter={() => this.setState({hovering: 'noSetup'})} onMouseLeave={() => this.setState({hovering: false})}>{this.props.group && !this.props.hideNumbers && this.state.noSetup}</div>}
          {this.state.noAccount && <div className='no-account' ref={(ref) => { this.noAccountRef = ref }} onMouseEnter={() => this.setState({hovering: 'noAccount'})} onMouseLeave={() => this.stopHover()}>{this.props.group && !this.props.hideNumbers && this.state.noAccount}</div>} */}
        </div>
      </div>
    )
  }
}
