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

@inject('rootStore') @observer
class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    let user = this.user()

    this.state = {
      loadingClasses: false,
      classes: user.classes
    }

    this.props.rootStore.navStore.setActivePage('insights/students')
  }

  user () {
    if (this.props.invitation) {
      console.log(this.props.invitation)
      return this.props.invitation
    } else {
      return this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    }
  }

  renderTasks () {
    let user = this.user()
    let timeframe = this.props.rootStore.insightsStore.interfaceSettings.timeframe

    return (
      <SiTasksList user={user} maxDays={timeframe} maxTasks={50} classes={this.state.classes} emptyMessage={"No to-do's yet."} />
    )
  }

  renderClasses () {
    if (this.state.classes.length > 0) {
      return (
        <SiClassList classes={this.state.classes} emptyMessage={'No classes yet.'} />
      )
    } else {
      return (
        <div className='add-athletes-callout'>
          <h1>Add classes!</h1>
          <div onClick={() => this.toggleShowAddStudents(true)} className='plus'>+</div>
          <i className='fas fa-book' />
        </div>
      )
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
          </div>
          <div className='sa-teams'>
            {user.org_groups.map(t => {
              return (
                <div className='sa-team' key={user.org_groups.indexOf(t)}>
                  {t.name}{user.org_groups.indexOf(t) !== user.org_groups.length - 1 ? ', ' : ''}
                </div>
              )
            })}
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

  renderStatuses () {
    let user = this.user()
    let classesSetup = user.classes.filter(cl => cl.status.id >= 1400).length
    let totalClasses = user.classes.length

    return (
      <div className='statuses'>
        {this.props.invitation && <div className='status-pending'>Pending activation</div>}
        {classesSetup !== totalClasses && <div className='status-classes'>{classesSetup}/{totalClasses} classes setup</div>}
      </div>
    )
  }

  renderHeaderRight () {
    return (
      <div className='si-student-detail-header-right'>
        {this.renderTimeframeSelect()}
        {this.renderStatuses()}
      </div>
    )
  }

  renderClassesCell () {
    return (
      <div className='si-student-detail-cell classes'>
        <h2>Classes</h2>
        {this.renderClasses()}
      </div>
    )
  }

  renderTasksCell () {
    return (
      <div className='si-student-detail-cell tasks'>
        <h2>To-Do&apos;s</h2>
        {this.renderTasks()}
      </div>
    )
  }

  render () {
    let user = this.user()
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-column lg'>
            <div className='si-student-detail-cell'>
              <div className='student'>
                {this.renderAthlete(user)}
                {this.renderHeaderRight()}
              </div>
            </div>
            <div className='si-student-detail-cell contact'>
              <h2>Semester Outlook</h2>
              <StudentInsights user={user} classes={this.state.classes} />
            </div>
            {user.assignments.length > 0 && this.renderClassesCell()}
          </div>
          <div className='si-student-detail-column sm'>
            <div className='si-student-detail-cell contact'>
              <h2>Contact</h2>
              <div className='si-student-detail-contact'>
                {Array.isArray(user.student.users) &&
                  <p><i className='fas fa-envelope' /> <a style={{marginTop: '4px'}} className='link-style' href={'mailto:' + user.student.users[0].email}>{user.student.users[0].email}</a></p>
                }
                <p><i className='fas fa-phone' /> <CopyCell isPhone={true} text={user.student.phone} /></p>
              </div>
            </div>
            {user.assignments.length > 0 ? this.renderTasksCell() : this.renderClassesCell()}
          </div>
        </div>
      </div>
    )
  }
}

StudentDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object,
  invitation: PropTypes.object
}

export default StudentDetail
