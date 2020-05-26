import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NestedNav from '../components/NestedNav'
import TeamsCell from '../components/TeamsCell'
import actions from '../../../actions'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import { toTitleCase } from '../utils'
import StudentInsights from './StudentInsights'
import SiClassList from './SiClassList'
import SiTasksList from './SiTasksList'
import LoadingIndicator from '../components/LoadingIndicator'

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

    return (
      <SiTasksList user={user} maxDays={7} maxTasks={3} classes={this.state.classes} emptyMessage={"No to-do's yet."} />
    )
  }

  renderClasses () {
    return (
      <SiClassList classes={this.state.classes} emptyMessage={'No classes yet.'} />
    )
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    let user = insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    let title = toTitleCase(insightsStore.org.groupsAlias) + 's'
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-column lg'>
            <div className='si-student-detail-cell-row'>
              <div className='si-student-detail-cell student'>
                <StudentAthleteCard absoluteToggle={true} noLink={true} noTeams={true} user={user} rootStore={this.props.rootStore} />
              </div>
              <div className='si-student-detail-cell teams'>
                <h2>{title}<LoadingIndicator /></h2>
                <TeamsCell user={user} org={insightsStore.org} onChange={() => insightsStore.updateData(['students'])} />
              </div>
            </div>
            <div className='si-student-detail-cell teams'>
              <h2>Intensity Score:</h2>
              <StudentInsights user={user} classes={this.state.classes} />
            </div>
          </div>
          <div className='si-student-detail-column sm'>
            <div className='si-student-detail-cell tasks'>
              <h2>To-Do&apos;s</h2>
              {/* <div className='si-student-detail-cell-subtitle'>
                Next 7 days
              </div> */}
              {this.renderTasks()}
            </div>
            <div className='si-student-detail-cell classes'>
              <h2>Classes</h2>
              {this.renderClasses()}
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
