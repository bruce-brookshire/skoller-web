import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'

import actions from '../../actions'
import Modal from '../../components/Modal'
import Loading from '../../components/Loading'
import ClassForm from './ClassForm'
import StatusForm from './StatusForm'
import {SliderField} from '../../components/Form'

import IssuesModal from '../components/ClassEditor/IssuesModal'
import RequestResolvedModal from './RequestResolvedModal'
import DocumentsDeletedModal from './DocumentsDeletedModal'

import TabbedFileUpload from '../../components/TabbedFileUpload'
import WeightTable from '../components/ClassEditor/Weights/WeightTable'
import WeightForm from '../components/ClassEditor/Weights/WeightForm'
import AdminAssignmentTable from '../components/ClassEditor/Assignments/AdminAssignmentTable'
import AdminAssignmentForm from '../components/ClassEditor/Assignments/AdminAssignmentForm'
import Chat from '../components/ClassEditor/Chat'
import StudentRequestInfo from '../Cards/StudentRequestInfo'
import GradeScale from '../Cards/GradeScale'
import ClassNotes from '../Cards/ClassNotes'
import Professor from '../Cards/Professor'
import StudentList from '../Cards/StudentList'
import ClassCard from '../Cards/ClassCard'
import ClassWithChangeRequests from './ClassWithChangeRequests'

import SkModal from '../components/SkModal/SkModal'
import SkLoader from '../../assets/sk-icons/SkLoader';
import ChangeRequestHistory from './ChangeRequestHistory';

@inject('rootStore') @observer
class ClassAdmin extends React.Component {
  constructor (props) {
    super(props)
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Class Admin'
    this.state = this.initializeState()
    this.tabSelect = this.tabSelect.bind(this)
    console.log(this.props.rootStore)
  }

  /*
  * Initialize state
  */
  initializeState () {
    let {navbarStore} = this.props.rootStore
    navbarStore.isDIY = false
    return {
      cl: null,
      openEditClassModal: false,
      openIssuesModal: false,
      openRequestResolvedModal: false,
      isWeightsEditable: false,
      weights: [],
      openWeightCreateModal: false,
      currentWeight: null,
      currentAssignment: null,
      assignments: [],
      openAssignmentModal: false,
      documents: [],
      openNoDocModal: false,
      tabState: 'class_info',
      uploadingDoc: false,
      loadingClass: true
    }
  }

  /*
  * Fetch the documents for a class.
  * Lock the class.
  */
  componentWillMount () {
    this.intializeComponent()
  }

  /*
  * Intialize the component
  */
  intializeComponent () {
    this.setState(this.initializeState())
    this.getClass()
    this.getDocuments()
  }

  /*
  * Reload the component
  */
  reloadComponent = () => {
    this.setState(this.initializeState())
    this.getClass()
    this.getDocuments()
  }

  /*
  * Unlock the class on component will mount
  */
  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = null
  }

  /*
  * Toggle the tab stat
  */
  tabSelect (tabName) {
    this.setState({tabState: tabName})
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
    this.setState({loadingClass: true})
    const {params: {classId}} = this.props
    actions.classes.getClassByIdAdmin(classId).then((cl) => {
      this.setState({cl, weights: cl.weights, assignments: cl.assignments})
      this.setState({loadingClass: false})
    }).catch(() => { this.setState({loadingClass: false}) })
  }

  /*
  * Fetch the documents for a class.
  */
  getDocuments () {
    const {params: {classId}} = this.props
    actions.documents.getClassDocuments(classId).then((documents) => {
      documents.sort((a, b) => b.is_syllabus)
      this.setState({documents})
    }).catch(() => false)
  }

  /*
  * Gets array of all student requests yet to be completed
  */
  openStudentRequests () {
    let {cl} = this.state
    const sr = cl.student_requests.filter(c => !c.is_completed)
    const cr = cl.change_requests.filter(c => !c.is_completed)
    return sr.concat(cr)
  }

  /*
  * On create weight, push weight onto array
  *
  * @param [Object] weight. Weight.
  */
  onCreateWeight (weight) {
    const newWeights = this.state.weights
    newWeights.push(weight)
    this.setState({weights: newWeights, currentWeight: null, openWeightCreateModal: false})
  }

  /*
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  onSelectWeight (weight) {
    this.setState({currentWeight: weight, openWeightCreateModal: true})
  }

  /*
  * On update weight, replace existing weight with the new weight.
  *
  * @param [Object] weight. Weight.
  */
  onUpdateWeight (weight) {
    const newWeights = this.state.weights
    const index = this.state.weights.findIndex(w => w.id === weight.id)
    newWeights[index] = weight
    this.setState({weights: newWeights, currentWeight: null, openWeightCreateModal: false})
  }

  /*
  * Delete weight.
  *
  * @param [Object] weight. The weight to be deleted.
  */
  onDeleteWeight (weight) {
    actions.weights.deleteWeight(weight).then(() => {
      const newWeights = this.state.weights.filter(w => w.id !== weight.id)
      this.setState({weights: newWeights, currentWeight: null})
    }).catch(() => false)
  }

  /*
  * Set form value equal to assignment in order to be edited.
  *
  * @param [Object] assignment. Assignment object to be edited.
  */
  onSelectAssignment (assignment) {
    browserHistory.push({
      pathname: `/assignment/${assignment.id}/admin`,
      state: {assignment,
        school: this.state.cl.school,
        weights: this.state.weights,
        cl: this.state.cl
      }
    })
  }

  /*
  * On create assignment, push assignment onto array
  *
  * @param [Object] assignment. Assignment.
  */
  onCreateAssignment (assignment) {
    const newAssignments = this.state.assignments
    newAssignments.push(assignment)
    this.setState({assignments: newAssignments, currentAssignment: null, openAssignmentModal: false})
  }

  /*
  * On update assignment, replace existing assignment with the new assignment.
  *
  * @param [Object] assignment. Assignment.
  */
  onUpdateAssignment (assignment) {
    const {assignments} = this.state
    const newAssignments = assignments
    const index = assignments.findIndex(a => a.id === assignment.id)
    newAssignments[index] = assignment
    this.setState({assignments: newAssignments, currentAssignment: null, openAssignmentModal: false})
  }

  /*
  * Delete assignment.
  *
  * @param [Object] assignment. The assignment to be deleted.
  */
  onDeleteAssignment (assignment) {
    const {assignments} = this.state
    actions.assignments.deleteAssignment(assignment).then(() => {
      const newAssignments = assignments.filter(a => a.id !== assignment.id)
      this.setState({assignments: newAssignments})
    }).catch(() => false)
  }

  onDocDelete (doc) {
    const {cl, documents} = this.state
    actions.documents.deleteClassDocument(cl.id, doc.id).then(() => {
      const newDocs = documents.filter(d => d.id !== doc.id)
      this.setState({documents: newDocs})
      if (newDocs.length === 0 && !cl.status.is_complete) {
        this.toggleNoDocModal()
      }
    }).catch(() => false)
  }

  onDocUpload (document) {
    const {cl} = this.state
    this.setState({uploadingDoc: true})
    actions.documents.uploadClassDocument(cl, document, false).then((document) => {
      const newDocs = this.state.documents.slice()
      newDocs.push(document)
      this.setState({documents: newDocs, uploadingDoc: false})
    })
  }

  onWeightClose () {
    this.setState({currentWeight: null, openWeightCreateModal: false})
  }

  /*
  * Toggle the edit class modal.
  */
  toggleEditClassModal () {
    this.setState({openEditClassModal: !this.state.openEditClassModal})
  }

  /*
  * Toggle the issues modal.
  */
  toggleIssuesModal () {
    this.setState({openIssuesModal: !this.state.openIssuesModal})
  }

  /*
  * Toggle the issues resolved modal.
  */
  toggleRequestResolvedModal () {
    this.setState({openRequestResolvedModal: !this.state.openRequestResolvedModal})
  }

  toggleWeightCreateModal () {
    this.setState({openWeightCreateModal: !this.state.openWeightCreateModal})
  }

  toggleAssignmentModal () {
    this.setState({openAssignmentModal: !this.state.openAssignmentModal})
  }

  toggleNoDocModal () {
    this.setState({openNoDocModal: !this.state.openNoDocModal})
  }

  toggleChat () {
    const {cl} = this.state
    actions.classes.updateClass({id: cl.id, is_chat_enabled: !cl.is_chat_enabled}).then((cl) => {
      this.setState({cl})
    }).catch(() => false)
  }

  toggleWrench () {
    const {cl} = this.state
    actions.classes.updateClass({id: cl.id, is_editable: !cl.is_editable}).then((cl) => {
      this.setState({cl})
    }).catch(() => false)
  }

  /*
  * Update the class in state.
  *
  * @param [Object]. The class to update with
  */
  updateClass () {
    this.getClass()
  }

  toggleIsPoints () {
    const {cl} = this.state
    actions.classes.updateClass({id: cl.id, is_points: !cl.is_points}).then((cl) => {
      this.updateClass()
    }).catch(() => false)
  }

  /*
  * Render the editclass modal.
  */
  renderEditClassModal () {
    const {cl} = this.state
    return (
      <Modal
        open={this.state.openEditClassModal}
        onClose={this.toggleEditClassModal.bind(this)}
      >
        <ClassForm
          cl={cl}
          classPeriod={cl.class_period}
          onSubmit={this.updateClass.bind(this)}
          onClose={this.toggleEditClassModal.bind(this)}
        />
        <StatusForm
          cl={cl}
          onSubmit={this.updateClass.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the having issues modal.
  */
  renderIssuesModal () {
    const {cl} = this.state
    return (
      <IssuesModal
        cl={cl}
        open={this.state.openIssuesModal}
        onClose={this.toggleIssuesModal.bind(this)}
        onSubmit={() => {
          this.updateClass()
        }}
      />
    )
  }

  /*
  * Render the issues resolved modal.
  */
  renderRequestResolvedModal () {
    const {cl} = this.state
    let openRequests = this.openStudentRequests()
    return (
      <RequestResolvedModal
        cl={cl}
        open={this.state.openRequestResolvedModal}
        onClose={this.toggleRequestResolvedModal.bind(this)}
        onSubmit={() => {
          this.updateClass()
        }}
        request={openRequests[0]}
      />
    )
  }

  renderWeightCreateModal () {
    const {cl, currentWeight} = this.state
    return (
      <Modal
        open={this.state.openWeightCreateModal}
        onClose={this.onWeightClose.bind(this)}
      >
        <WeightForm
          cl={cl}
          weight={currentWeight}
          onCreateWeight={this.onCreateWeight.bind(this)}
          onUpdateWeight={this.onUpdateWeight.bind(this)}
        />
      </Modal>
    )
  }

  renderNoDocModal () {
    const {cl} = this.state
    return (
      <DocumentsDeletedModal
        cl={cl}
        onSubmit={() => {
          this.updateClass()
          this.toggleNoDocModal()
        }}
        open={this.state.openNoDocModal}
        onClose={this.toggleNoDocModal.bind(this)}
      />
    )
  }

  renderAssignmentModal () {
    const {cl, currentAssignment, weights} = this.state
    if (this.state.openAssignmentModal) {
      return (
        <SkModal
          closeModal={this.toggleAssignmentModal.bind(this)}
        >
          <AdminAssignmentForm
            cl={cl}
            assignment={currentAssignment}
            onCreateAssignment={this.onCreateAssignment.bind(this)}
            onUpdateAssignment={this.onUpdateAssignment.bind(this)}
            isAdmin={true}
            weights={weights}
          />
        </SkModal>
      )
    }
  }

  /*
  * Render the list of weights
  */
  renderWeights () {
    const {cl, isWeightsEditable, weights, currentWeight} = this.state
    return (
      <div id='cn-admin-weight-table' className='class-card'>
        <div id='cn-admin-weight-table-content'>
          <div className='cn-admin-weight-table-title'>
            Weights
            <div>
              {isWeightsEditable && <i className='fa fa-plus cn-blue cursor margin-right' onClick={() => this.toggleWeightCreateModal()} />}
              <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => this.setState({isWeightsEditable: !isWeightsEditable})} />
            </div>
          </div>
          <div className='cn-space-between-row margin-bottom'>
            Points?
            <SliderField
              name='isPointSlider'
              onChange={this.toggleIsPoints.bind(this)}
              value={cl.is_points}
            />
          </div>
          <WeightTable
            cl={cl}
            viewOnly={!isWeightsEditable}
            weights={weights}
            onDeleteWeight={this.onDeleteWeight.bind(this)}
            currentWeight={currentWeight}
            onSelectWeight={this.onSelectWeight.bind(this)}
          />
        </div>
      </div>
    )
  }

  /*
  * Render the list of assignments.
  */
  renderAssignments () {
    const {cl, assignments, weights} = this.state
    return (
      <div id='cn-admin-assignment-table' className='class-card'>
        <div id='cn-admin-assignment-table-content'>
          <div className='cn-admin-assignment-table-title'>
            Assignments
            <i className='fa fa-plus cn-blue cursor margin-right' onClick={() => this.toggleAssignmentModal()} />
          </div>
          <AdminAssignmentTable
            cl={cl}
            assignments={assignments}
            viewOnly={false}
            onSelectAssignment={this.onSelectAssignment.bind(this)}
            onDeleteAssignment={this.onDeleteAssignment.bind(this)}
            weights={weights}
            isAdmin={true}
          />
        </div>
      </div>
    )
  }

  renderClassInfo () {
    const {cl} = this.state
    if (this.state.loadingClass) {
      return <SkLoader />
    } else {
      return (
        cl.change_requests.filter(c => !c.is_completed).length > 0
          ? <ClassWithChangeRequests
            cl={cl}
            schoolName={cl.school.name}
            semesterName={cl.class_period.name}
            onEdit={this.toggleEditClassModal.bind(this)}
            isAdmin={true}
            toggleWrench={this.toggleWrench.bind(this)}
            toggleChat={this.toggleChat.bind(this)}
            toggleDocuments={null}
            onSelectIssue={null}
            boxClassName='cn-admin-edit-card'
            contentClassName='cn-admin-edit-card-content'
            onChange={() => this.reloadComponent()}
          />
          : <ClassCard
            cl={cl}
            schoolName={cl.school.name}
            semesterName={cl.class_period.name}
            onEdit={this.toggleEditClassModal.bind(this)}
            isAdmin={true}
            toggleWrench={this.toggleWrench.bind(this)}
            toggleChat={this.toggleChat.bind(this)}
            toggleDocuments={null}
            onSelectIssue={null}
            boxClassName='cn-admin-edit-card'
            contentClassName='cn-admin-edit-card-content'
          />
      )
    }
  }

  renderGradeScale () {
    const {cl} = this.state
    return (
      <GradeScale
        cl={cl}
        canEdit={true}
        onSubmit={() => this.updateClass()}
        hasIssues={false}
        onSelectIssue={null}
        superBoxClassName='cn-admin-super-edit-card'
        boxClassName='cn-admin-edit-card'
        contentClassName='cn-admin-edit-card-content'
      />
    )
  }

  renderProfessor () {
    const {cl} = this.state
    return (
      <Professor
        cl={cl}
        canEdit={true}
        onSubmit={() => this.updateClass()}
        hasIssues={false}
        onSelectIssue={null}
        boxClassName='cn-admin-edit-card'
        contentClassName='cn-admin-edit-card-content'
      />
    )
  }

  renderChat () {
    const {cl} = this.state
    return (
      <Chat
        cl={cl}
        boxClassName='cn-admin-edit-card'
        contentClassName='cn-admin-edit-card-content'
      />
    )
  }

  renderStudents () {
    const {cl} = this.state
    return (
      <StudentList
        students={cl.students}
        boxClassName='cn-admin-edit-card'
        contentClassName='cn-admin-edit-card-content'
      />
    )
  }

  // renderCreatedBy (cl) {
  //   var subtitle = ''
  //   if (cl.created_by) {
  //     subtitle = 'Class Created by ' + cl.created_by
  //   } else {
  //     subtitle = 'Unknown class creator or scripted class'
  //   }
  //   if (cl.created_on) {
  //     subtitle = subtitle + ' on ' + cl.created_on
  //   }
  //   return subtitle
  // }

  // renderUpdatedBy (cl) {
  //   var updateUsers = []
  //   if (cl.updated_by) {
  //     updateUsers.push(cl.updated_by)
  //   }
  //   for (var index in cl.weights) {
  //     var weight = cl.weights[index]
  //     if (weight.updated_by && !updateUsers.includes(weight.updated_by)) {
  //       updateUsers.push(weight.updated_by)
  //     }
  //   }
  //   for (var index in cl.assignments) {
  //     var assignment = cl.assignments[index]
  //     if (assignment.updated_by && !updateUsers.includes(assignment.updated_by)) {
  //       updateUsers.push(assignment.updated_by)
  //     }
  //   }
  //   var subtitle = ''
  //   if (updateUsers.length === 0) {
  //     subtitle = 'Unknown updater or scripted'
  //   } else if (updateUsers.length > 1) {
  //     subtitle = 'Crowdsourced updates'
  //   } else {
  //     subtitle = 'Updated by ' + updateUsers[0]
  //   }
  //   return subtitle
  // }

  renderHistory () {
    return (
      <ChangeRequestHistory cl={this.state.cl} />
    )
  }

  renderClass () {
    const {cl} = this.state
    return (
      <div id='cn-class-admin-container'>

        <div className={cl.change_requests.length > 0 ? 'cn-admin-col-lg' : 'cn-admin-col-md'}>

          <div id='cn-admin-class-title'>{cl.name}</div>
          {/* <div className='cn-admin-class-subtitle'>{this.renderCreatedBy(cl)}</div> */}
          {/* <div className='cn-admin-class-subtitle'>{this.renderUpdatedBy(cl)}</div> */}

          <div id='cn-admin-nav'>
            <button className={'button admin-tab' + (this.state.tabState === 'class_info' ? ' active' : '')} onClick={() => this.tabSelect('class_info')}>
              {cl.change_requests.findIndex((item) => item.change_type.id === 400 && !item.is_completed) > -1 && <i className='fa fa-warning'/>}
              Class Info
            </button>
            <button className={'button admin-tab' + (this.state.tabState === 'grade_scale' ? ' active' : '')} onClick={() => this.tabSelect('grade_scale')}>
              {cl.change_requests.findIndex((item) => item.change_type.id === 100 && !item.is_completed) > -1 && <i className='fa fa-warning'/>}
              Grade Scale
            </button>
            <button className={'button admin-tab' + (this.state.tabState === 'professor' ? ' active' : '')} onClick={() => this.tabSelect('professor')}>
              {cl.change_requests.findIndex((item) => item.change_type.id === 300 && !item.is_completed) > -1 && <i className='fa fa-warning'/>}
              Professor
            </button>
            <button className={'button admin-tab' + (this.state.tabState === 'weights' ? ' active' : '')} onClick={() => this.tabSelect('weights')}>
              {cl.change_requests.findIndex((item) => item.change_type.id === 200 && !item.is_completed) > -1 && <i className='fa fa-warning'/>}
              Weights
            </button>
            <button className={'button admin-tab' + (this.state.tabState === 'assignments' ? ' active' : '')} onClick={() => this.tabSelect('assignments')}>
              {cl.change_requests.findIndex((item) => item.change_type.id === 200 && !item.is_completed) > -1 && <i className='fa fa-warning'/>}
              Assignments
            </button>
            <button className={'button admin-tab' + (this.state.tabState === 'chat' ? ' active' : '')} onClick={() => this.tabSelect('chat')}>Chat</button>
            <button className={'button admin-tab' + (this.state.tabState === 'students' ? ' active' : '')} onClick={() => this.tabSelect('students')}>Students</button>
            <button className={'button admin-tab' + (this.state.tabState === 'history' ? ' active' : '')} onClick={() => this.tabSelect('history')}>History</button>
            <div className='admin-tab-hidden' />
            <div className='admin-tab-hidden' />
          </div>

          <div id="cn-admin-edit-panel">
            {this.state.tabState === 'class_info' && this.renderClassInfo()}
            {this.state.tabState === 'grade_scale' && this.renderGradeScale()}
            {this.state.tabState === 'professor' && this.renderProfessor()}
            {this.state.tabState === 'weights' && this.renderWeights()}
            {this.state.tabState === 'assignments' && this.renderAssignments()}
            {this.state.tabState === 'chat' && this.renderChat()}
            {this.state.tabState === 'students' && this.renderStudents()}
            {this.state.tabState === 'history' && this.renderHistory()}
          </div>

          <div id='cn-admin-footer'>
            <ClassNotes
              cl={cl}
              boxClassName='cn-admin-footer-card'
              contentClassName='cn-admin-footer-card-content'
              onCreateNote={(cl) => this.setState({cl})}
            />
            {cl.change_requests &&
              <StudentRequestInfo
                cl={this.state.cl}
                boxClassName='cn-admin-footer-card margin-top margin-bottom'
                contentClassName='cn-admin-footer-card-content'
                onComplete={this.toggleRequestResolvedModal.bind(this)}
              />
            }
          </div>
        </div>

        <div className='cn-admin-col-lg'>
          <TabbedFileUpload
            documents={this.state.documents ? this.state.documents : []}
            removable={true}
            onUpload={(doc) => this.onDocUpload(doc)}
            onDelete={(doc) => this.onDocDelete(doc)}
          />
        </div>

        {this.renderEditClassModal()}
        {this.renderIssuesModal()}
        {this.renderRequestResolvedModal()}
        {this.renderEditClassModal()}
        {this.renderWeightCreateModal()}
        {this.renderAssignmentModal()}
        {this.renderNoDocModal()}
      </div>
    )
  }

  render () {
    const {cl} = this.state

    return cl ? this.renderClass() : <Loading />
  }
}

ClassAdmin.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  rootStore: PropTypes.object
}

export default ClassAdmin
