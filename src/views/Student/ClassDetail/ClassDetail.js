import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import AddAssignment from '../Assignments/AddAssignment'
import DropClassButton from '../../components/DropClassButton'
import SiDropClass from '../../Insights/StudentDetail/SiStudentClassDetail/SiDropClass'
import ClassAssignments from './ClassAssignments'
import ColorChanger from './ColorChanger'
import ShareClass from './ShareClass'
import ClassDocuments from './ClassDocuments'
import ClassInsights from './ClassInsights'
import ClassInfo from './ClassInfo'
import actions from '../../../actions'
import { observable, toJS } from 'mobx'
import Classmates from './Classmates'
import { inject, observer } from 'mobx-react'

@inject('rootStore') @observer
class ClassDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showAddAssignmentModal: false,
      visibleAssignments: [],
      focusedAssignment: this.props.activeAssignmentId ? this.props.activeAssignmentId : null,
      classmates: null
    }
  }

  componentDidMount () {
    const { insightsUser, cl, insightsStudents } = this.props
    if (insightsUser && insightsStudents) {
      actions.classes.getClassByIdAdmin(cl.id).then(({ students }) => {
        let primaryStudentId = this.props.insightsUserStudentId

        let pStudent = students.find(s => s.id === primaryStudentId)
        let iStudents = students.filter(s => s.id !== primaryStudentId && insightsStudents.find(is => is.student_id === s.id))
        let nIStudents = students.filter(s => !insightsStudents.find(si => si.student_id === s.id))

        this.setState({ classmates: [pStudent, ...iStudents, ...nIStudents] })
      })
    }
  }

  getCurrentClass () {
    return this.props.cl
  }

  renderDropClassButton () {
    if (this.props.insightsUser) {
      return (
        <SiDropClass icon={true} onDropClass={() => this.props.history.push('/insights/' + (this.props.match.params.invitationId ? ('invitations/' + this.props.match.params.invitationId) : ('students/' + this.props.match.params.orgStudentId)))} cl={this.props.cl} />
      )
    } else {
      return (
        <DropClassButton icon={true} onDropClass={() => this.props.history.push('/student/classes')} cl={this.getCurrentClass()} />
      )
    }
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
        <a className='add-assignment-button link-style' onClick={() => this.setState({ showAddAssignmentModal: true })}>
          <i className='fas fa-plus' style={{ fontSize: '16px', marginTop: '-2px', fontWeight: '600' }} />{emptyWeights.length > 0 ? <div className='add-assignment-button-alert'><div className='add-assignment-button-alert-count'>{emptyWeights.length}</div></div> : null}
        </a>
        { this.state.showAddAssignmentModal
          ? <AddAssignment classes={this.props.classes} insightsUserStudentId={this.props.insightsUserStudentId ? this.props.insightsUserStudentId : false} onSubmit={() => this.props.updateClass()} closeModal={() => this.setState({ showAddAssignmentModal: false })} assignmentParams={{ class: this.getCurrentClass() }} />
          : null
        }
      </div>
    )
  }

  renderHeader () {
    let cl = this.getCurrentClass()
    let { classmates } = this.state
    return (
      <div className='sk-class-header'>
        <div className='sk-class-grade' style={{ backgroundColor: '#' + cl.color }}>
          <h2>
            {cl.grade > 0 ? cl.grade + '%' : '–'}
          </h2>
        </div>
        <div className='sk-class-header-detail'>
          <div className='sk-class-name'>
            <h1 style={{ color: '#' + cl.color }}>
              {cl.name}
            </h1>
          </div>
          <div className='sk-class-icons'>
            <ClassInfo cl={this.getCurrentClass()} />
            <ClassDocuments cl={this.getCurrentClass()} />
            {classmates ? <Classmates students={classmates} cl={cl}/> : <ShareClass cl={this.getCurrentClass()} />}
            <ColorChanger cl={this.getCurrentClass()} updateClassColor={() => null} updateClass = {this.props.updateClass}/>
            {this.renderDropClassButton()}
          </div>
        </div>
      </div>
    )
  }

  renderInsights () {
    return (
      <ClassInsights cl={this.getCurrentClass()} primaryPeriod={this.props.rootStore.userStore.user.student.primary_period} />
    )
  }

  renderAssignments () {
    const cl = this.getCurrentClass()
    return (
      <div className='sk-class-assignments-cell'>
        <h1>Assignments</h1>
        {this.renderAddAssignmentButton()}
        <ClassAssignments
          onDeleteAssignment={this.props.onDeleteAssignment}
          onCompleteAssignment={this.props.onCompleteAssignment}
          editAssignment={this.props.editAssignment}
          visibleAssignmentsCallback={(visibleAssignments) => this.setState({ visibleAssignments })}
          activeAssignmentId={this.state.focusedAssignment}
          classId={cl.id}
          cl={cl}
        />
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
      </div>
    )
  }

  render () {
    return (
      <div>{this.renderLayout()}</div>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,

  cl: PropTypes.object,
  insightsUser: PropTypes.bool,
  updateClass: PropTypes.func,
  onCompleteAssignment: PropTypes.func,
  editAssignment: PropTypes.func,
  onDeleteAssignment: PropTypes.func,
  activeAssignmentId: PropTypes.number,
  insightsUserStudentId: PropTypes.number,
  classes: PropTypes.array
}

export default withRouter(ClassDetail)
