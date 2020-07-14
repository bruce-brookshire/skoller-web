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
import OutsideClickHandler from 'react-outside-click-handler'
import SiDropClass from '../../Insights/StudentDetail/SiStudentClassDetail/SiDropClass'

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
      showSpeculate: false,
      showPalette: false
    }

    this.paletteRef = React.createRef()

    this.props.rootStore.navStore.setActivePage('classes')
    this.props.rootStore.navStore.location = this.props.location // set active page route location for access from assignment detail

    this.getClass()
    this.getClassAssignmentsForStudent(this.props.match.params)
  }

  getCurrentClass () {
    let cl
    if (this.props.cl) {
      return this.props.cl
    } else {
      cl = this.props.rootStore.studentClassesStore.classes.filter(cl => cl.id === parseInt(this.props.match.params.classId))[0]
    }
    return cl
  }

  getClass () {
    const {classId} = this.props.match.params
    this.setState({loading: true})
    if (this.props.cl) {
      this.setState({loading: false, cl: this.props.cl, studentClass: this.props.cl})
    } else {
      actions.classes.getClassById(classId).then(cl => {
        this.getClassColor(cl)
      }).catch(() => this.setState({loading: false}))
    }
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
    if (this.props.assignments) {
      this.setState({assignments: this.props.assignments})
    } else {
      actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
        this.setState({assignments})
      })
    }
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
    if (this.props.insightsUser) {
      return (
        <SiDropClass icon={true} onDropClass={() => this.props.history.push('/insights/' + (this.props.match.params.invitationId ? ('invitations/' + this.props.match.params.invitationId) : ('students/' + this.props.match.params.orgStudentId)))} cl={this.props.cl} />
      )
    } else {
      return (
        <DropClassButton icon={true} onDropClass={() => this.props.history.push('/student/classes')} cl={this.state.cl} />
      )
    }
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
        <a className='add-assignment-button link-style' onClick={() => this.setState({showAddAssignmentModal: true})}>
          <i className='fas fa-plus' style={{fontSize: '16px', marginTop: '-2px', fontWeight: '600'}} />{emptyWeights.length > 0 ? <div className='add-assignment-button-alert'><div className='add-assignment-button-alert-count'>{emptyWeights.length}</div></div> : null}
        </a>
        { this.state.showAddAssignmentModal
          ? <AddAssignment closeModal={() => this.setState({showAddAssignmentModal: false})} assignmentParams={{class: this.state.studentClass}}/>
          : null
        }
      </div>
    )
  }

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

  updateColor (color) {
    actions.studentClasses.updateClassColor(this.state.cl, color)
      .then(data => {
        this.setState({cl: data, showPalette: false})
        this.props.rootStore.studentClassesStore.updateClasses()
      })
  }

  renderPalette () {
    let colors = [
      'D73F76ff',
      'E2762Dff',
      'F1AA39ff',
      '19A394ff',
      '61D8A0ff',
      '3484E3ff',
      'FF7BB1ff',
      'DE89F6ff'
    ]
    if (this.state.showPalette) {
      return (
        <OutsideClickHandler
          onOutsideClick={() => this.setState({showPalette: false})}
        >
          {console.log(this.paletteRef)}
          <div className='sk-class-palette' style={{
            top: this.paletteRef.current.offsetTop + 16,
            left: this.paletteRef.current.offsetLeft - (((colors.length * 24) + 16) / 2) + 8
          }}>
            {colors.map(color => {
              return (
                <div
                  className='sk-class-palette-color'
                  style={{backgroundColor: '#' + color}}
                  key={colors.indexOf(color)}
                  onClick={() => this.updateColor(color)}
                />
              )
            })}
          </div>
        </OutsideClickHandler>
      )
    } else {
      return null
    }
  }

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
            {!this.props.insightsUser &&
              <React.Fragment>
                <i
                  className='fas fa-file'
                  title='View class documents'
                  onClick={() => this.setState({showUploadAdditionalDocuments: true})}
                />
                <i
                  className='fas fa-users'
                  title='Share class'
                  onClick={() => this.setState({showShareModal: true})}
                />
                <i
                  className='fas fa-palette'
                  title='Class color'
                  onClick={() => this.setState({showPalette: true})}
                  ref={this.paletteRef}
                />
              </React.Fragment>
            }
            {this.renderDropClassButton()}
            {this.renderClassInfoModal()}
            {this.renderSpeculator()}
            {this.renderPalette()}
          </div>
        </div>
      </div>
    )
  }

  renderInsights () {
    if (this.props.insightsUser) return null
    return (
      <ClassInsights cl={this.getCurrentClass()} />
    )
  }

  renderAssignments () {
    return (
      <div className='sk-class-assignments'>
        <h1>Assignments</h1>
        {this.renderAddAssignmentButton()}
        <TasksList filter={true} maxTasks={5} cl={this.getCurrentClass()} insightsUserData={this.props.insightsUser ? {classes: this.props.classes, assignments: this.props.assignments} : false} />
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
    if (this.props.insightsUser) {
      return this.props.rootStore.studentClassesStore.loading
        ? <SkLoader />
        : this.renderLayout()
    } else {
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
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  assignments: PropTypes.array,
  cl: PropTypes.object,
  insightsUser: PropTypes.bool,
  classes: PropTypes.array
}

export default withRouter(ClassDetail)
