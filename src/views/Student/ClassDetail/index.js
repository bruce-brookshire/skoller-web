import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
import actions from '../../../actions'
import AssignmentList from '../../components/AssignmentList'
import StudentLayout from '../../components/StudentLayout'
import AddAssignment from '../Assignments/AddAssignment'
import DropClassButton from '../../components/DropClassButton'
import UploadAdditionalDocuments from '../../components/ClassStatusModal/UploadAdditionalDocuments'
import SkModal from '../../components/SkModal/SkModal'
import CopyBox from '../../components/CopyBox'
import TasksList from '../Tasks/TasksList'
import ClassInsights from './ClassInsights'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import Speculator from './Speculator'
import NestedNav from '../../components/NestedNav'

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
      studentClass: {},
      showShareModal: false,
      showClassInfoModal: false,
      showSpeculate: false
    }

    this.props.rootStore.studentNavStore.setActivePage('classes')
    this.props.rootStore.studentNavStore.location = this.props.location // set active page route location for access from assignment detail
  }

  getCurrentClass () {
    let cl = this.props.rootStore.studentClassesStore.classes.filter(cl => cl.id === parseInt(this.props.match.params.classId))[0]
    return cl
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
      <DropClassButton icon={true} onDropClass={() => this.props.history.push('/student/classes')} cl={this.state.cl} />
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
  * Find class weight categories that don't have assignments
  */
  getEmptyWeights () {
    let cl = this.getCurrentClass()
    let weights = cl.weights
    let emptyWeights = []
    let assignments = cl.assignments
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
          ? <AddAssignment closeModal={() => this.setState({showAddAssignmentModal: false})} assignmentParams={{class: this.state.studentClass}}/>
          : null
        }
      </div>
    )
  }

  // renderClassEnrollment () {
  //   const {cl} = this.state
  //   return (
  //     <span><i className="fas fa-users"></i> {cl.enrollment} Student{cl.enrollment > 1 ? 's' : ''}</span>
  //   )
  // }

  renderClassShareCell () {
    let cl = this.getCurrentClass()
    return (
      this.state.showShareModal &&
        <SkModal title={`Share ${cl.name}⚡️️`} closeModal={() => this.setState({showShareModal: false})}>
          {/* <h1>Share {cl.name}⚡️️</h1> */}
          <p>Copy this link for {cl.name} and share it with your classmates.</p>
          <CopyBox linkValue={cl.enrollment_link} />
        </SkModal>
    )
  }

  renderDocumentsModal () {
    return (
      this.state.showUploadAdditionalDocuments
        ? <SkModal
          title={this.state.cl.name}
          closeModal={() => this.setState({showUploadAdditionalDocuments: false})}
        >
          <div style={{marginBottom: '1rem'}} />
          <UploadAdditionalDocuments
            cl={this.state.cl}
            onSubmit={() => this.setState({showUploadAdditionalDocuments: false})}
          />
        </SkModal>
        : null
    )
  }

  renderClassInfoModal () {
    let cl = this.getCurrentClass()
    return (
      this.state.showClassInfoModal
        ? <SkModal title={'Class details'} closeModal={() => this.setState({showClassInfoModal: false})}>
          <div
            className='sk-class-detail-info'
          >
            <div className='sk-find-class-selected-class-title'>
              <h3>{cl.name}</h3>
            </div>
            <div className='sk-find-class-selected-class-row'>
              <p>{cl.professor ? ((cl.professor.name_first ? cl.professor.name_first : '') + ' ' + (cl.professor.name_last ? cl.professor.name_last : '')) : '--'}</p>
              <p>
                <i className="fas fa-user fa-xs" style={{marginRight: '2px'}} />{cl.enrollment.toString()}
              </p>
            </div>
            <div className='sk-find-class-selected-class-row'>
              <p>{cl.meet_days} {cl.meet_days === 'Online' ? '' : moment(cl.meet_start_time, 'HH:mm:ss').format('hh:mmA')}</p>
              <p>{cl.subject} {cl.code}.{cl.section}</p>
            </div>
          </div>
        </SkModal>
        : null
    )
  }

  renderSpeculator () {
    let cl = this.getCurrentClass()
    return (
      this.state.showSpeculate
        ? <SkModal closeModal={() => this.setState({showSpeculate: false})}>
          <Speculator cl={cl} />
        </SkModal>
        : null
    )
  }

  // onAssignmentSelect (assignment) {
  //   const { cl } = this.state
  //   this.props.history.push({
  //     pathname: `/student/class/${cl.id}/assignments/${assignment.assignment_id}`
  //   })
  // }

  renderHeader () {
    let cl = this.getCurrentClass()
    return (
      <div className='sk-class-header'>
        <div className='sk-class-grade' style={{backgroundColor: '#' + cl.color}}>
          <h2>
            {cl.grade > 0 ? cl.grade + '%' : '–'}
          </h2>
        </div>
        <div className='sk-class-header-detail'>
          <div className='sk-class-name'>
            <h1 style={{color: '#' + cl.color}}>
              {cl.name}
            </h1>
          </div>
          <div className='sk-class-icons'>
            {/* <i
              className='fas fa-search'
              title='Speculate grade'
              onClick={() => this.setState({showSpeculate: true})}
            /> */}
            <i
              className='fas fa-info-circle'
              title='Class details'
              onClick={() => this.setState({showClassInfoModal: true})}
            />
            <i
              className='fas fa-file'
              title='View class documents'
              onClick={() => this.setState({showUploadAdditionalDocuments: true})}
            />
            <i
              className='fas fa-link'
              title='Share class'
              onClick={() => this.setState({showShareModal: true})}
            />
            {this.renderDropClassButton()}
            {this.renderClassInfoModal()}
            {this.renderSpeculator()}
          </div>
        </div>
      </div>
    )
  }

  renderInsights () {
    return (
      <div className='sk-class-insights'>
        <h1>Insights</h1>
        <ClassInsights cl={this.getCurrentClass()} />
      </div>
    )
  }

  renderAssignments () {
    return (
      <div className='sk-class-assignments'>
        <h1>Assignments</h1>
        {this.renderAddAssignmentButton()}
        <TasksList maxTasks={5} cl={this.getCurrentClass()} />
      </div>
    )
  }

  renderLayout () {
    return (
      <div className='sk-class'>
        <div className='sk-class-column'>
          {this.renderHeader()}
          {this.renderAssignments()}
        </div>
        <div className='sk-class-column'>
          {this.renderInsights()}
        </div>
        {this.renderDocumentsModal()}
        {this.renderClassShareCell()}
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        <NestedNav />
        {this.props.rootStore.studentClassesStore.loading
          ? <SkLoader />
          : this.renderLayout()
        }
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
