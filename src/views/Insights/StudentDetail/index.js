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
    let user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))

    this.state = {
      loadingClasses: false,
      classes: user.classes
    }

    this.props.rootStore.navStore.setActivePage('insights/students')
    console.log(user.classes)
  }

  renderTasks () {
    let user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    let timeframe = this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe === 'Next 7 days' ? 7 : 30

    return (
      <SiTasksList user={user} maxDays={timeframe} maxTasks={50} classes={this.state.classes} emptyMessage={"No to-do's yet."} />
    )
  }

  renderClasses () {
    return (
      <SiClassList classes={this.state.classes} emptyMessage={'No classes yet.'} />
    )
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
            <div className='watch-toggle-container'>
              <WatchToggle rootStore={this.props.rootStore} showConfirm={true} user={user} />
            </div>
            {/* <LoadingIndicator /> */}
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
    let timeframeOptions = ['Next 7 days', 'Next 30 days']

    return (
      <div className='si-student-detail-timeframe'>
        <div style={{paddingRight: '8px'}}>Timeframe: </div>
        <SkSelect className='si-select' selection={interfaceSettings.dashboard.timeframe} optionsMap={() => timeframeOptions.map(o => {
          return (
            <div
              key={timeframeOptions.indexOf(o)}
              className='si-select-option'
              onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.dashboard.timeframe = o }}
            >{o}</div>
          )
        })} />
      </div>
    )
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    let user = insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-column lg'>
            <div className='si-student-detail-cell'>
              <div className='student'>
                {this.renderAthlete(user)}
                {this.renderTimeframeSelect()}
              </div>
            </div>
            <div className='si-student-detail-cell contact'>
              <h1>Intensity Score:</h1>
              <StudentInsights user={user} classes={this.state.classes} />
            </div>
            <div className='si-student-detail-cell classes'>
              <h1>Classes</h1>
              {this.renderClasses()}
            </div>
          </div>
          <div className='si-student-detail-column sm'>
            <div className='si-student-detail-cell contact'>
              <h1>Contact</h1>
              <div className='si-student-detail-contact'>
                <p><i className='fas fa-envelope' /> <a style={{marginTop: '4px'}} className='link-style' href={user.student.users[0].email}>{user.student.users[0].email}</a></p>
                <p><i className='fas fa-phone' /> <CopyCell isPhone={true} text={user.student.phone} /></p>
              </div>
            </div>
            <div className='si-student-detail-cell tasks'>
              <h1>To-Do&apos;s</h1>
              {this.renderTasks()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

StudentDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object
}

export default StudentDetail
