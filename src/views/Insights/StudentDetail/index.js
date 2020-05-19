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

@inject('rootStore') @observer
class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingClasses: true,
      classes: []
    }

    this.props.rootStore.navStore.setActivePage('insights/students')

    this.getStudentClasses()
  }

  getStudentClasses () {
    let user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))

    actions.classes.getStudentClassesById(user.student_id)
      .then(r => {
        this.setState({
          classes: r,
          loadingClasses: false
        })
      })
  }

  renderTasks () {
    let user = this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))

    if (this.state.loadingClasses) {
      return <SkLoader />
    } else {
      return (
        <SiTasksList user={user} maxDays={7} maxTasks={3} classes={this.state.classes} emptyMessage={"No to-do's yet."} />
      )
    }
  }

  renderClasses () {
    if (this.state.loadingClasses) {
      return <SkLoader />
    } else {
      return (
        <SiClassList classes={this.state.classes} emptyMessage={'No classes yet.'} />
      )
    }
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    let user = insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    let title = toTitleCase(insightsStore.org.groupsAlias) + 's'
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-cell-row'>
            <div className='si-student-detail-cell student'>
              <StudentAthleteCard absoluteToggle={true} noLink={true} noTeams={true} user={user} rootStore={this.props.rootStore} />
            </div>
            <div className='si-student-detail-cell teams'>
              <h2>{title}</h2>
              <TeamsCell user={user} org={insightsStore.org} onChange={() => insightsStore.updateData()} />
            </div>
          </div>
          <div className='si-student-detail-cell teams'>
            <h2>Intensity Score:</h2>
            {this.state.loadingClasses ? <SkLoader /> : <StudentInsights user={user} classes={this.state.classes} />}
          </div>
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
    )
  }
}

StudentDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object
}

export default StudentDetail
