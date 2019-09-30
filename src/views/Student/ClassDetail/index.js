import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import ClassCard from '../../Cards/ClassCard'
import ClassInviteLink from './ClassInviteLink'
import AssignmentList from '../../components/AssignmentList'
import StudentLayout from '../../components/StudentLayout'
import AddAssignment from '../Assignments/AddAssignment'
import DropClassButton from '../../components/DropClassButton'
import UploadAdditionalDocuments from '../../components/ClassStatusModal/UploadAdditionalDocuments'
import SkModal from '../../components/SkModal/SkModal'
import CopyBox from '../../components/CopyBox';

@inject('rootStore') @observer
class ClassDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      cl: {},
      assignments: [],
      showAddAssignmentModal: false,
      showUploadAdditionalDocuments: false,
      studentClass: {}
    }

    this.props.rootStore.studentNavStore.setActivePage('classes')
    this.props.rootStore.studentNavStore.location = this.props.location // set active page route location for access from assignment detail
  }

  componentWillMount () {
    this.getClass()
    this.getClassAssignmentsForStudent(this.props.params)
  }

  getClass () {
    const {classId} = this.props.params
    this.setState({loading: true})
    actions.classes.getClassById(classId).then(cl => {
      this.getClassColor(cl)
    }).catch(() => this.setState({loading: false}))
  }

  getClassColor (cl) {
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    actions.studentClasses.getStudentClassById(cl.id, student).then(c => {
      const newClass = {...cl}
      newClass.color = c.color
      newClass.grade = c.grade
      this.setState({ cl: newClass, studentClass: c, loading: false })
    }).catch(() => this.setState({ loading: false }))
  }

  getClassAssignmentsForStudent (cl) {
    let {classId} = cl
    let {userStore} = this.props.rootStore
    const { user: { student } } = userStore
    actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      this.setState({assignments: assignments})
    })
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
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
      <div className='cn-class-assignments-title' style={{ color: '#' + cl.color }}>
        <span>{cl.name}</span>
        {/* <i className='fas fa-info-circle'></i> */}
      </div>
    )
  }

  renderCurrentClassGrade () {
    const {cl} = this.state
    return (
      <div className='cn-class-assignments-grade' style={{background: '#' + cl.color}}>{cl.grade ? cl.grade + '%' : '- -'}</div>
    )
  }

  renderDropClassButton () {
    return (
      <DropClassButton onDropClass={() => browserHistory.push('/student/classes')} cl={this.state.cl} />
    )
  }

  renderClassAssignmentsHeader () {
    return (
      <div className='cn-class-assignments-header'>
        <div className='cn-class-assignments-header-item'>
          {this.renderBackButton()}
          {/* {this.renderSpeculateGradeButton()} */}
          {this.renderDocumentUploadButton()}
        </div>
        <div className='cn-class-assignments-header-item text-center'>
          {this.renderClassTitle()}
          {this.renderCurrentClassGrade()}
          {this.renderDropClassButton()}
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
      <a className='spec-grade-button'>
        % Speculate Grade
      </a>
    )
  }

  renderDocumentUploadButton () {
    return (
      <div>
        <a
          className='spec-grade-button'
          onClick={() => this.setState({showUploadAdditionalDocuments: true})}
        >
          📄Documents
        </a>
        {this.state.showUploadAdditionalDocuments &&
          <SkModal
            title={this.state.cl.name}
            closeModal={() => this.setState({showUploadAdditionalDocuments: false})}
          >
            <div style={{marginBottom: '1rem'}} />
            <UploadAdditionalDocuments
              cl={this.state.cl}
              onSubmit={() => this.setState({showUploadAdditionalDocuments: false})}
            />
          </SkModal>
        }
      </div>
    )
  }

  /*
  * Render the back button to tab between syllabus sections
  */
  renderBackButton () {
    return (
      <a
        className='back-button'
        onClick={() => {
          browserHistory.push('/student/classes')
        }}
      >
        <i className='fa fa-angle-left' /> All Classes
      </a>
    )
  }

  /*
  * Close the Add Assignment modal
  */
  closeModal = () => {
    this.setState({showAddAssignmentModal: false})
  }

  /*
  * Find class weight categories that don't have assignments
  */
  getEmptyWeights () {
    let weights = this.state.studentClass.weights
    let emptyWeights = []
    let assignments = this.state.studentClass.assignments
    weights.forEach(weight => {
      let assignmentCount = 0
      assignments.forEach(assignment => {
        if (assignment.weight_id === weight.id) {
          assignmentCount += 1
        }
      })
      if (assignmentCount === 0) {
        emptyWeights.push(weight)
      }
    })
    return emptyWeights
  }

  renderAddAssignmentButton () {
    let emptyWeights = this.getEmptyWeights()
    return (
      <div>
        <a className='add-assignment-button' onClick={() => this.setState({showAddAssignmentModal: true})}>
          + Add Assignment{emptyWeights.length > 0 ? <div className='add-assignment-button-alert'><div className='add-assignment-button-alert-count'>{emptyWeights.length}</div></div> : null}
        </a>
        { this.state.showAddAssignmentModal
          ? <AddAssignment closeModal={this.closeModal} assignmentParams={{class: this.state.studentClass}}/>
          : null
        }
      </div>
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

  renderClassShareCell () {
    return (
      <div className='sk-class-detail-share-cell'>
        <h1>Share {this.state.studentClass.name}⚡️️</h1>
        <p>Copy this link for {this.state.studentClass.name} and share it with your classmates.</p>
        <CopyBox linkValue={this.state.studentClass.enrollment_link} />
      </div>
    )
  }

  renderClassDetails () {
    const {cl} = this.state
    return (
      <div className="cn-class-detail-container">
        <div id='cn-class-detail-header'>
          <div className='cn-class-detail-header-item'>
            {this.renderClassCard()}
          </div>
          <div className='cn-class-detail-header-item'>
            {this.renderClassLink()}
          </div>
        </div>
        <UploadDocuments cl={cl} onUpload={this.getClass.bind(this)} />
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
      <StudentLayout>
        <div>
          {loading
            ? <Loading />
            : <div className='cn-class-assignments-wrapper'>
              {cl.status.id === 1100 || cl.status.id === 1200 || cl.status.id === 1300
                ? <div id='cn-class-detail-container'>
                  {this.renderClassDetails()}
                </div>
                : <div>
                  {this.renderClassShareCell()}
                  <div className='cn-class-assignments-container'>
                    {this.renderClassAssignmentsHeader()}
                    <div className='cn-class-list-container margin-top'>
                      {this.renderAssignmentList()}
                    </div>
                  </div>
                </div>}
            </div>
          }
        </div>
      </StudentLayout>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default ClassDetail
