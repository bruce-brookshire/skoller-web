import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import moment from 'moment'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import ClassCard from '../../Cards/ClassCard'
import ClassInviteLink from './ClassInviteLink'
import DeleteDialog from '../../../components/Grid/DeleteDialog'

@inject('rootStore') @observer
class ClassDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      cl: {},
      assignments: []
    }
  }

  componentWillMount () {
    this.getClass()
    console.log('this.props.params:')
    console.log(this.props.params)
    console.log('rootStore')
    console.log(this.props.rootStore)
    this.getClassAssignmentsForStudent(this.props.params)
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
  }

  getClassAssignmentsForStudent (cl) {
    let {classId} = cl
    let {userStore} = this.props.rootStore
    // let currentUser = userStore.user
    const { user: { student } } = userStore
    actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      console.log('assignments:')
      // console.log(assignments)
      this.setState({assignments: assignments})
    })
  }

  getClass () {
    const {classId} = this.props.params
    let {navbarStore} = this.props.rootStore

    this.setState({loading: true})
    actions.classes.getClassById(classId).then(cl => {
      this.setState({cl, loading: false})
      navbarStore.title = cl.name
    }).catch(() => this.setState({loading: false}))
  }

  /*
  * Method for deleting a class.
  *
  * @param [Object] cl. Class user is in.
  * @return [Object] null.
  */
  onDeleteClass () {
    var {cl} = this.state
    actions.classes.dropClass(cl.id).then(() => {
      browserHistory.push({
        pathname: `/student/classes`
      })
    }).catch(() => false)
  }

  renderClassTitle () {
    const {cl} = this.state
    return (
      <div className='cn-class-assignments-title'><span>{cl.name}</span> <i className='fas fa-info-circle'></i></div>
    )
  }

  renderCurrentClassGrade () {
    const {cl} = this.state
    return (
      <div className='cn-class-assignments-grade'>{cl.grade ? cl.grade + '%' : '- -'}</div>
    )
  }

  renderClassAssignmentsHeader () {
    return (
      <div className='cn-class-assignments-header'>
        <div className='cn-class-assignments-header-item'>
          {this.renderBackButton()}
          {this.renderSpeculateGradeButton()}
        </div>
        <div className='cn-class-assignments-header-item text-center'>
          {this.renderClassTitle()}
          {this.renderCurrentClassGrade()}
        </div>
        <div className='cn-class-assignments-header-item text-right'>
          {this.renderAddAssignmentButton()}
          {this.renderClassEnrollment()}
        </div>
      </div>
    )
  }

  renderClassCard () {
    const {cl} = this.state
    let professorName = cl.professor ? cl.professor.name_first + ' ' + cl.professor.name_last : ''
    return (
      <ClassCard
        cl={cl}
        schoolName={cl.school.name}
        professorName={professorName}
        semesterName={cl.class_period.name}
        onDelete={this.toggleDeleteDialog.bind(this)}
      />
    )
  }

  renderClassLink () {
    const {cl} = this.state
    const {enrollmentLink, enrollmentCount} = this.props.location.state
    return (
      <ClassInviteLink
        cl={cl}
        enrollmentLink={enrollmentLink}
        enrollmentCount={enrollmentCount}
      />
    )
  }

  renderSpeculateGradeButton () {
    return (
      <a className='spec-grade-button' onClick={() => browserHistory.push('student/classes')}>
        % Speculate Grade
      </a>
    )
  }

  /*
  * Render the back button to tab between syllabus sections
  */
  renderBackButton () {
    return (
      <a className='back-button' onClick={() => browserHistory.push('student/classes')}>
        <i className='fa fa-angle-left' /> Back to Classes
      </a>
    )
  }

  renderAddAssignmentButton () {
    return (
      <a className='add-assignment-button' onClick={() => browserHistory.push('student/classes')}>
        + Add Assignment
      </a>
    )
  }

  renderClassEnrollment () {
    const {cl} = this.state
    return (
      <span><i className="fas fa-users"></i> {cl.enrollment} Student{cl.enrollment > 1 ? 's' : ''}</span>
    )
  }

  toggleDeleteDialog () {
    this.setState({openDeleteDialog: !this.state.openDeleteDialog})
  }

  renderDeleteDialog () {
    return (
      <DeleteDialog
        open={this.state.openDeleteDialog}
        onClose={this.toggleDeleteDialog.bind(this)}
        onDelete={this.onDeleteClass.bind(this)}
        deleteMessage={'Are you sure you want to drop this class?'}
      />
    )
  }

  renderClassDetails () {
    const {cl} = this.state
    return (
      <div className="cn-class-detail-container margin-bottom">
        {this.renderBackButton()}
        {this.renderClassTitle()}
        <div id='cn-class-detail-header'>
          <div className='cn-class-detail-header-item'>
            {this.renderClassCard()}
          </div>
          <div className='cn-class-detail-header-item'>
            {this.renderClassLink()}
          </div>
        </div>
        <UploadDocuments cl={cl} onUpload={this.getClass.bind(this)} />
        {this.renderDeleteDialog()}
      </div>
    )
  }

  renderDueDateInfo (dd) {
    const today = moment()
    if (dd) {
      const dueDate = moment(dd)
      const daysTillDue = dueDate.from(today, 'days')
      if (today.isSame(dueDate)) return 'Today'
      if (today.isBefore(dueDate)) return 'In ' + daysTillDue
      if (today.isAfter(dueDate)) return 'In the Past'
    } else { console.warn('This assignment needs a due date!') }
  }

  renderClassAssignments () {
    const assignments = this.state.assignments.assignments
    return assignments && assignments.length ? assignments.map(a => {
      const gradeSectionBgcolor = { background: a.grade ? '#57b9e4ff' : 'grey' }
      return (
        <div key={'cn_class_detail_row_' + a.id}
          className='cn-class-list-row margin-bottom'
          style={{background: 'white'}}
        >
          <div className='cn-class-list-row-icon-container' style={gradeSectionBgcolor}>
            <span className='cn-class-list-row-icon-text'>{a.grade ? a.grade + '%' : '- -'}</span>
          </div>
          <div className='cn-class-list-row-data'>
            <div className='cn-class-list-row-col'>
              <div className='cn-class-list-title'>{a.name}</div>
              <div className='cn-class-list-subtext'>{a.weight * 100}%</div>
            </div>
            <div className='cn-class-list-row-col'>
              <div className='cn-class-list-subtext cn-class-list-flex-top cn-class-list-text-right'>{this.renderDueDateInfo(a.due)}</div>
            </div>
          </div>
        </div>
      )
    }) : ''
  }

  render () {
    const {loading} = this.state
    return (
      <div>
        <div id='cn-class-detail-container'>
          {loading
            ? <Loading />
            : this.renderClassDetails()}
        </div>
        <div className='cn-class-assignments-container'>
          {this.renderClassAssignmentsHeader()}
          <div className='cn-class-list-container margin-top'>
            {loading
              ? <Loading />
              : this.renderClassAssignments()}
          </div>
        </div>
      </div>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default ClassDetail
