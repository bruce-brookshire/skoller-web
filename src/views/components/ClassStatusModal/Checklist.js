import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class Checklist extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.rootStore.userStore.user,
      cl: this.props.cl,
      status: this.props.status ? this.props.status : this.getStatus(this.props.cl)
    }
  }

  getStatus (cl) {
    let status
    let id = cl.status.id
    if (id === 1100) {
      status = 'needSyllabus'
    } else if (id === 1200) {
      status = 'inReview'
    } else if (id === 1300) {
      status = 'diy'
    } else if (id >= 1400) {
      status = 'live'
    } else if (cl.enrollment > 3) {
      status = 'complete'
    }
    return status
  }

  renderJoinClass () {
    let className = 'complete'
    return (
      <div className='sk-checklist-item'>
        <i className='far fa-check-circle checked' />
        <p className={className}>Join class</p>
      </div>
    )
  }

  renderSendSyllabus () {
    let pClassName = ''
    let cClassName = ''
    if (this.state.status !== 'needSyllabus') {
      cClassName = 'far fa-check-circle checked'
      pClassName = 'complete'
    } else {
      cClassName = 'far fa-circle'
      pClassName = 'bold'
    }
    return (
      <div className='sk-checklist-item'>
        <i className={cClassName} />
        <p className={pClassName}>Send syllabus</p>
      </div>
    )
  }

  renderCommunityFeatures () {
    let enrollment = this.state.cl.enrollment
    let disabled = false
    let complete = false
    if (this.state.status !== 'live' && this.state.status !== 'diy' && this.state.status !== 'complete') {
      disabled = true
    }
    if (this.state.status === 'complete') {
      complete = true
    }
    return (
      <div className={'sk-checklist-item' + (disabled ? ' item-disabled' : '')}>
        <i className={'far fa' + (disabled ? '-circle item-disabled' : '') + (complete ? '-check-circle checked' : '')} />
        <div className='sk-checklist-cf'>
          <p className={(disabled ? 'item-disabled' : '')}>Unlock community features</p>
          <div className='sk-checklist-cf-graphic'>
            <i className={'fas fa-user-check checked' + (disabled ? ' item-disabled' : '')} />
            <i className={'fas fa-user' + (enrollment > 1 ? '-check checked' : '') + (disabled ? ' item-disabled' : '')} />
            <i className={'fas fa-user' + (enrollment > 2 ? '-check checked' : '') + (disabled ? ' item-disabled' : '')} />
            <i className={'fas fa-user' + (enrollment > 3 ? '-check checked' : '') + (disabled ? ' item-disabled' : '')} />
            <small>→</small>
            <i className={'fas fa-unlock ' + (disabled ? ' item-disabled' : ' yellow')} />
          </div>
          <div className='sk-checklist-you'>you</div>
          <div className='sk-checklist-cta'>get 3 classmates to join!</div>
        </div>
      </div>
    )
  }

  renderInReview () {
    return (
      <div className='sk-checklist'>
        <div className='sk-checklist-status'>
          <i className='far fa-clock fa-3x' />
          <h3>SYLLABUS IN REVIEW</h3>
        </div>
      </div>
    )
  }

  renderDiy () {
    return (
      <div className='sk-checklist'>
        <div className='sk-checklist-status'>
          <i className='fas fa-exclamation-circle fa-3x orange' />
          <h3>DIY REQUIRED</h3>
        </div>
      </div>
    )
  }

  renderContent () {
    if (this.state.status === 'inReview') {
      return (
        this.renderInReview()
      )
    } else if (this.state.status === 'diy') {
      return (
        this.renderDiy()
      )
    } else {
      return (
        <div className='sk-checklist'>
          {this.renderJoinClass()}
          {this.renderSendSyllabus()}
          {this.renderCommunityFeatures()}
        </div>
      )
    }
  }

  render () {
    return (
      <div
        className={'sk-checklist-container' + (this.state.status === 'complete' ? ' sk-checklist-container-complete' : '')}
      >
        {this.renderContent()}
      </div>
    )
  }
}

Checklist.propTypes = {
  rootStore: PropTypes.object,
  status: PropTypes.string,
  cl: PropTypes.object
}

export default Checklist
