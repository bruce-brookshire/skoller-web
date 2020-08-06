import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NestedNav from '../components/NestedNav'
import StudentInsights from './StudentInsights'
import SiClassList from './SiClassList'
import SiTasksList from './SiTasksList'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import SkSelect from '../../components/SkSelect'
import CopyCell from '../components/CopyCell'
import AddClasses from '../components/AddClasses'
import LoadingIndicator from '../components/LoadingIndicator'
import { withRouter } from 'react-router-dom'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays, optionalPlural } from '../utils'
import StatusIndicators from '../components/StatusIndicators'
import OverviewItem from './components/OverviewItem'

@inject('rootStore') @observer
class StudentDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      autoShowAddClasses: this.props.location.state ? this.props.location.state.autoShowAddClasses : this.props.autoShowAddClasses
    }

    this.props.rootStore.navStore.setActivePage('insights/students')
  }

  user () {
    if (this.props.invitation) {
      return this.props.rootStore.insightsStore.invitations.find(s => s.id === parseInt(this.props.invitation.id))
    } else {
      return this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }
  }

  renderTasks () {
    let user = this.user()
    let timeframe = this.props.rootStore.insightsStore.interfaceSettings.timeframe

    return (
      <SiTasksList user={user} maxDays={timeframe} maxTasks={50} classes={user.classes} emptyMessage={"No to-do's yet."} />
    )
  }

  renderClasses () {
    let user = this.user()
    if (user.classes.length > 0) {
      return (
        <SiClassList classes={user.classes} user={user} emptyMessage={'No classes yet.'} />
      )
    } else {
      return (
        <div className='add-athletes-callout'>
          <h1>Add classes!</h1>
          <AddClasses user={this.user()}>
            <div className='plus'>+</div>
          </AddClasses>
          <i className='fas fa-book' />
        </div>
      )
    }
  }

  renderGroups (user) {
    if (user.isInvitation) {
      return user.group_ids.map(id => {
        let t = this.props.rootStore.insightsStore.groups.find(g => g.id === id)
        return (
          <div className='sa-team' key={user.group_ids.indexOf(id)}>
            {t.name}{user.group_ids.indexOf(id) !== user.group_ids.length - 1 ? ', ' : ''}
          </div>
        )
      })
    } else {
      console.log(user.org_groups)
      return user.org_groups.map(t => {
        return (
          <div className='sa-team' key={user.org_groups.indexOf(t)}>
            {t.name}{user.org_groups.indexOf(t) !== user.org_groups.length - 1 ? ', ' : ''}
          </div>
        )
      })
    }
  }

  renderAthlete (user) {
    return (
      <div className='si-student-detail-sa'>
        <Avatar large={true} user={user} />
        <div className='si-student-detail-sa-info'>
          <div className='sa-name'>
            <h1>
              {user.student.name_first + ' ' + user.student.name_last}
            </h1>
            {!this.props.invitation && <div className='watch-toggle-container'>
              <WatchToggle rootStore={this.props.rootStore} showConfirm={true} user={user} />
            </div>}
            <LoadingIndicator />
          </div>
          <div className='contact'>
            {Array.isArray(user.student.users) &&
              <div className='contact-item'><i className='fas fa-envelope' /> <a style={{marginTop: '4px'}} className='link-style' href={'mailto:' + user.student.users[0].email}>{user.student.users[0].email}</a></div>
            }
            {!Array.isArray(user.student.users) &&
              <div className='contact-item'><i className='fas fa-envelope' /> <a style={{marginTop: '4px'}} className='link-style' href={'mailto:' + user.student.user.email}>{user.student.user.email}</a></div>
            }
            <div className='contact-item'><i className='fas fa-phone' /> <CopyCell isPhone={true} text={user.student.phone} /></div>
          </div>
        </div>
      </div>
    )
  }

  renderTimeframeSelect () {
    let interfaceSettings = this.props.rootStore.insightsStore.interfaceSettings
    let timeframeOptions = interfaceSettings.timeframeOptions

    return (
      <div className='si-student-detail-timeframe'>
        <div className='looking-at'>Looking at </div>
        <SkSelect className='si-select' selection={'Next ' + interfaceSettings.timeframe + ' days'} optionsMap={() => timeframeOptions.map(o => {
          return (
            <div
              key={timeframeOptions.indexOf(o)}
              className='si-select-option'
              onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.timeframe = o }}
            >{'Next ' + o + ' days'}</div>
          )
        })} />
      </div>
    )
  }

  renderHeaderRight (user) {
    return (
      <div className='si-student-detail-header-right'>
        <StatusIndicators student={user.isInvitation ? false : user} invitation={user.isInvitation ? user : false} />
        <div className='sa-teams'>
          {this.renderGroups(user)}
        </div>
      </div>
    )
  }

  renderClassesCell () {
    return (
      <div className='si-student-detail-cell classes'>
        <div style={{display: 'flex'}}>
          <h1>Classes</h1>
          <AddClasses autoShow={this.state.autoShowAddClasses} user={this.user()}><span className='classes-plus' style={{cursor: 'pointer'}}><i className='fas fa-plus' /></span></AddClasses>
        </div>
        {this.renderClasses()}
      </div>
    )
  }

  renderTasksCell () {
    return (
      <div className='si-student-detail-cell tasks'>
        <h1>To-Do&apos;s</h1>
        {this.renderTasks()}
      </div>
    )
  }

  renderStudentCell (user) {
    return (
      <div className='si-student-detail-cell'>
        <div className='student'>
          {this.renderAthlete(user)}
          {this.renderHeaderRight(user)}
        </div>
      </div>
    )
  }

  renderOverview (user) {
    let timeframe = this.props.rootStore.insightsStore.interfaceSettings.timeframe
    const assignmentCount = getAssignmentCountInNextNDays(user.assignments, timeframe)
    const weightsTotal = getAssignmentWeightsInNextNDays(user.assignments, timeframe)
    const intensity = user.intensity[timeframe]

    return (
      <div className='si-student-detail-cell overview'>
        <div>
          <h1>Overview</h1>
          {this.renderTimeframeSelect()}
        </div>
        <div className='overview-content'>
          <OverviewItem title={assignmentCount} subtitle={optionalPlural(assignmentCount, 'assignment@')} hoverDescription={
            <div className='overview-desc'>
              {user.student.name_first} has {optionalPlural(assignmentCount, '# assignment@')} due in the next {timeframe} days.
            </div>
          } />
          <OverviewItem title={weightsTotal + '%'} subtitle={'grade impact'} hoverDescription={
            <div className='overview-desc'>
              {weightsTotal + '%'} of {user.student.name_first}&apos;s total grade will be impacted in the next {timeframe} days.
            </div>
          } />
          <OverviewItem title={intensity} subtitle={'stress score'} hoverDescription={
            <div className='overview-desc'>
              Skoller has {user.student.name_first}&apos;s real-time stress score at {intensity} out of 10 based on how many upcoming assignments are due and how important they are.
            </div>
          } />
        </div>
      </div>
    )
  }

  renderInsights (user) {
    return (
      <div className='si-student-detail-cell insights'>
        <h1>Visual Insights</h1>
        <StudentInsights user={user} classes={this.user().classes} />
      </div>
    )
  }

  render () {
    let user = this.user()
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-column'>
            {this.renderStudentCell(user)}
            {this.renderOverview(user)}
            {this.renderClassesCell()}
            {this.renderTasksCell()}
            {this.renderInsights(user)}
          </div>
        </div>
      </div>
    )
  }
}

StudentDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object,
  invitation: PropTypes.object,
  autoShowAddClasses: PropTypes.bool,
  location: PropTypes.object
}

export default withRouter(StudentDetail)
