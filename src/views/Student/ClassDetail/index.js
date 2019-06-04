import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import ClassCard from '../../Cards/ClassCard'
import ClassInviteLink from './ClassInviteLink'
import DeleteDialog from '../../../components/Grid/DeleteDialog'
import AssignmentList from '../../components/AssignmentList'

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
    this.getClassAssignmentsForStudent(this.props.params)
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
  }

  getClassAssignmentsForStudent (cl) {
    let {classId} = cl
    let {userStore} = this.props.rootStore
    const { user: { student } } = userStore
    actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      this.setState({assignments: assignments})
    })
  }

  getClass () {
    const {classId} = this.props.params
    let {navbarStore} = this.props.rootStore
    this.setState({loading: true})
    actions.classes.getClassById(classId).then(cl => {
      this.getClassColor(cl)
      navbarStore.title = cl.name
    }).catch(() => this.setState({loading: false}))
  }

  getClassColor (cl) {
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    actions.studentClasses.getStudentClassById(cl.id, student).then(c => {
      const newClass = {...cl}
      newClass.color = c.color
      console.log(newClass)
      this.setState({ cl: newClass, loading: false })
    }).catch(() => this.setState({ loading: false }))
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
      <div className='cn-class-assignments-title' style={{ color: '#' + cl.color }}><span>{cl.name}</span> <i className='fas fa-info-circle'></i></div>
    )
  }

  renderCurrentClassGrade () {
    const {cl} = this.state
    return (
      <div className='cn-class-assignments-grade' style={{background: '#' + cl.color}}>{cl.grade ? cl.grade + '%' : '- -'}</div>
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

  renderAssignmentList () {
    const {cl} = this.state
    return (
      <AssignmentList
        assignments={this.state.assignments.assignments}
        weights={this.state.assignments.weights}
        onSelect={this.onAssignmentSelect.bind(this)}
        classColor={cl.color}
      />
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

  onAssignmentSelect (assignment) {
    const { cl } = this.state
    browserHistory.push({
      pathname: `/student/class/${cl.id}/assignments/${assignment.assignment_id}`
    })
  }

  render () {
    const {loading, cl} = this.state
    return (
      <div>
        {loading
          ? <Loading />
          : <div>
            {cl.status.id === 1100 || cl.status.id === 1200 || cl.status.id === 1300
              ? <div id='cn-class-detail-container'>
                {this.renderClassDetails()}
              </div>
              : <div className='cn-class-assignments-container'>
                {this.renderClassAssignmentsHeader()}
                <div className='cn-class-list-container margin-top'>
                  {this.renderAssignmentList()}
                </div>
              </div>}
          </div>
        }
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
