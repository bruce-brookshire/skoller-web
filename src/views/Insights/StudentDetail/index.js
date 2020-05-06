import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NestedNav from '../components/NestedNav'
import TeamsCell from '../components/TeamsCell'
import actions from '../../../actions'
import StudentAthleteCard from '../components/StudentAthleteCard'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import ClassList from '../../components/ClassList'

@inject('rootStore') @observer
class StudentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingClasses: true,
      classes: []
    }

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

  renderClasses () {
    if (this.state.loadingClasses) {
      return <SkLoader />
    } else {
      return (
        <ClassList classes={this.state.classes} emptyMessage={'No classes yet.'} />
      )
    }
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    let user = insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId))
    return (
      <div className='si-student-detail-container'>
        <NestedNav pageType='studentDetail' />
        <div className='si-student-detail'>
          <div className='si-student-detail-cell student'>
            <StudentAthleteCard absoluteToggle={true} noLink={true} noTeams={true} user={user} rootStore={this.props.rootStore} />
          </div>
          <div className='si-student-detail-cell teams'>
            <h2>Teams</h2>
            <TeamsCell user={user} org={insightsStore.org} onChange={() => insightsStore.updateData()} />
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
