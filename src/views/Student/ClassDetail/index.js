import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import ClassInviteLink from './ClassInviteLink'
import AssignmentList from '../../components/AssignmentList'
import StudentLayout from '../../components/StudentLayout'
import AddAssignment from '../Assignments/AddAssignment'
import DropClassButton from '../../components/DropClassButton'
import UploadAdditionalDocuments from '../../components/ClassStatusModal/UploadAdditionalDocuments'
import SkModal from '../../components/SkModal/SkModal'
import CopyBox from '../../components/CopyBox'
import TasksList from '../Tasks/TasksList'

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
    this.getClassAssignmentsForStudent(this.props.match.params)
  }

  getClass () {
    const {classId} = this.props.match.params
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
      this.props.history.push({
        pathname: `/student/classes`
      })
    }).catch(() => false)
  }

  renderClassTitle () {
    const {cl} = this.state
    return (
      <div className='cn-class-assignments-title' style={{ color: '#' + cl.color }}>
        <h1 style={{textAlign: 'center', margin: '0'}}>{cl.name}</h1>
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
      <DropClassButton onDropClass={() => this.props.history.push('/student/classes')} cl={this.state.cl} />
    )
  }

  renderClassHeader () {
    return (
      <div>
        {this.renderClassTitle()}
        <div className='cn-class-assignments-header'>
          <div className='cn-class-assignments-header-item'>
            {this.renderBackButton()}
            {this.renderDocumentUploadButton()}
          </div>
          <div className='cn-class-assignments-header-item text-center'>
            {this.renderCurrentClassGrade()}
            {this.renderDropClassButton()}
          </div>
          <div className='cn-class-assignments-header-item text-right'>
            {this.renderAddAssignmentButton()}
            {this.renderClassEnrollment()}
          </div>
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
          this.props.history.push('/student/classes')
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

  renderClassShareCell () {
    return (
      <div className='sk-class-detail-share-cell'>
        <h1>Share {this.state.studentClass.name}⚡️️</h1>
        <p>Copy this link for {this.state.studentClass.name} and share it with your classmates.</p>
        <CopyBox linkValue={this.state.studentClass.enrollment_link} />
      </div>
    )
  }

  onAssignmentSelect (assignment) {
    const { cl } = this.state
    this.props.history.push({
      pathname: `/student/class/${cl.id}/assignments/${assignment.assignment_id}`
    })
  }

  renderHeader () {
    let cl = this.state.cl
    console.log(this.state.cl)
    return (
      <div className='sk-class-header'>
        <div className='sk-class-grade' style={{backgroundColor: '#' + this.state.cl.color}}>
          <h2>
            {cl.grade > 0 ? cl.grade + '%' : '–'}
          </h2>
        </div>
        <div className='sk-class-header-detail'>
          <div className='sk-class-name'>
            <h1 style={{color: '#' + this.state.cl.color}}>
              {cl.name}
            </h1>
          </div>
          <div className='sk-class-icons'>
            <i className='fas fa-search' />
            <i className='fas fa-info-circle' />
            <i className='fas fa-file' />
            <i className='fas fa-link' />
          </div>
        </div>
      </div>
    )
  }

  renderInsights () {
    return (
      <div className='sk-class-insights'>
        <h1>Insights</h1>
      </div>
    )
  }

  renderAssignments () {
    return (
      <div className='sk-class-assignments'>
        <h1>Assignments</h1>
        <TasksList cl={this.state.cl.id} />
      </div>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <StudentLayout>
        <div className='sk-class'>
          <div className='sk-class-column'>
            {this.renderHeader()}
          </div>
          <div className='sk-class-column'>
            {this.renderInsights()}
          </div>
          <div className='sk-class-column'>
            {this.renderAssignments()}
          </div>
          {/* {loading
            ? <Loading />
            : <div className='cn-class-assignments-wrapper'>
              <div>
                {this.renderClassShareCell()}
                <div className='cn-class-assignments-container'>
                  {this.renderClassHeader()}
                  <div className='cn-class-list-container margin-top'>
                    {this.renderAssignmentList()}
                  </div>
                </div>
              </div>
            </div>
          } */}
        </div>
      </StudentLayout>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(ClassDetail)
