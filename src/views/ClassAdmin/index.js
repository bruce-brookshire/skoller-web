import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../actions'
import Modal from '../../components/Modal'
import ClassForm from './ClassForm'
import IssuesModal from '../components/ClassEditor/IssuesModal'
import GradeScale from '../components/ClassEditor/GradeScale'
import HelpResolvedModal from './HelpResolvedModal'
import RequestResolvedModal from './RequestResolvedModal'
import ClassCard from '../../components/ClassCard'
import Loading from '../../components/Loading'
import Professor from '../components/ClassEditor/Professor'
import StudentList from './StudentList'
import WeightTable from '../components/ClassEditor/Weights/WeightTable'
import WeightForm from '../components/ClassEditor/Weights/WeightForm'
import AssignmentTable from '../components/ClassEditor/Assignments/AssignmentTable'
import AssignmentForm from '../components/ClassEditor/Assignments/AssignmentForm'
import Chat from '../components/ClassEditor/Chat'
import FileViewer from '../../components/FileViewer'
import {FileTabs, FileTab} from '../../components/FileTab'
import {browserHistory} from 'react-router'
import StudentRequestInfo from './StudentRequestInfo'

@inject('rootStore') @observer
class ClassAdmin extends React.Component {
  constructor (props) {
    super(props)
    let {navbarStore} = this.props.rootStore
    navbarStore.title = 'Class Admin'
    navbarStore.toggleHelpResolved = this.toggleHelpResolvedModal.bind(this)
    navbarStore.toggleRequestResolved = this.toggleRequestResolvedModal.bind(this)
    this.state = this.initializeState()
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
      openHelpResolvedModal: false,
      openIssuesModal: false,
      openRequestResolvedModal: false,
      isWeightsEditable: false,
      weights: [],
      openWeightCreateModal: false,
      currentWeight: null,
      currentAssignment: null,
      assignments: [],
      openAssignmentModal: false,
      currentDocument: null,
      currentDocumentIndex: 0,
      documents: [],
      hideDocuments: false,
      openStudentRequestInfo: false
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
  * Unlock the class on component will mount
  */
  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = null
    navbarStore.toggleHelpResolved = null
    navbarStore.toggleRequestResolved = null
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
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
      this.setState({documents, currentDocument: (documents[0] && documents[0].path) || null})
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
        weights: this.state.weights
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
  toggleHelpResolvedModal () {
    this.setState({openHelpResolvedModal: !this.state.openHelpResolvedModal})
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

  toggleDocs () {
    this.setState({hideDocuments: !this.state.hideDocuments})
  }

  toggleStudentRequestInfo () {
    this.setState({openStudentRequestInfo: !this.state.openStudentRequestInfo})
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
  updateClass (cl) {
    this.getClass()
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
          onSubmit={this.updateClass.bind(this)}
          onClose={this.toggleEditClassModal.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the help needed info
  */
  renderHelpResolvedModal () {
    const {cl} = this.state
    return (
      <HelpResolvedModal
        cl={cl}
        open={this.state.openHelpResolvedModal}
        onClose={this.toggleHelpResolvedModal.bind(this)}
        onSubmit={(cl) => {
          this.updateClass(cl)
        }}
      />
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
        onSubmit={(cl) => {
          this.updateClass(cl)
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
        onSubmit={(cl) => {
          this.updateClass(cl)
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

  renderAssignmentModal () {
    const {cl, currentAssignment, weights} = this.state
    return (
      <Modal
        open={this.state.openAssignmentModal}
        onClose={this.toggleAssignmentModal.bind(this)}
      >
        <AssignmentForm
          cl={cl}
          assignment={currentAssignment}
          onCreateAssignment={this.onCreateAssignment.bind(this)}
          onUpdateAssignment={this.onUpdateAssignment.bind(this)}
          isAdmin={true}
          weights={weights}
        />
      </Modal>
    )
  }

  renderClassDetais () {
    const {cl} = this.state
    return (
      <div id='cn-class-details' className='class-card'>
        <ClassCard
          cl={cl}
          schoolName={cl.school.name}
          semesterName={cl.class_period.name}
          onEdit={this.toggleEditClassModal.bind(this)}
          isAdmin={true}
          toggleWrench={this.toggleWrench.bind(this)}
          toggleChat={this.toggleChat.bind(this)}
          toggleDocuments={this.toggleDocs.bind(this)}
        />
      </div>
    )
  }

  renderGradeScale () {
    const {cl} = this.state
    return (
      <div className='class-card'>
        <GradeScale
          cl={cl}
          canEdit={true}
          onSubmit={(cl) => this.updateClass(cl)}
          hasIssues={cl.change_requests.findIndex((item) => item.change_type.id === 100 && !item.is_completed) > -1}
          onSelectIssue={this.toggleStudentRequestInfo.bind(this)}
        />
      </div>
    )
  }

  renderProfessor () {
    const {cl} = this.state
    return (
      <div className='class-card'>
        <Professor
          cl={cl}
          canEdit={true}
          onSubmit={(cl) => this.updateClass(cl)}
        />
      </div>
    )
  }

  renderStudents () {
    const {cl} = this.state
    return (
      <div className='class-card'>
        <StudentList
          students={cl.students}
        />
      </div>
    )
  }

  renderStudentRequestInfo () {
    const {cl} = this.state
    return (
      <div className='cn-shadow-box margin-bottom'>
        <div className='cn-shadow-box-content'>
          <StudentRequestInfo
            cl={cl}
            onComplete={this.toggleRequestResolvedModal.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderWeights () {
    const {cl, isWeightsEditable, weights, currentWeight} = this.state
    return (
      <div id='cn-admin-weight-table' className='class-card'>
        <div id='cn-admin-weight-table-content'>
          <div className='cn-admin-weight-table-title'>
            Weights
            <div>
              {isWeightsEditable && <i className='fa fa-plus cn-blue cursor margin-right' onClick={() => this.toggleWeightCreateModal()} />}
              <i className='fa fa-pencil cn-blue cursor' onClick={() => this.setState({isWeightsEditable: !isWeightsEditable})} />
            </div>
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

  renderAssignments () {
    const {cl, assignments, weights} = this.state
    return (
      <div id='cn-admin-assignment-table' className='class-card'>
        <div id='cn-admin-assignment-table-content'>
          <div className='cn-admin-assignment-table-title'>
            Assignments
            <i className='fa fa-plus cn-blue cursor margin-right' onClick={() => this.toggleAssignmentModal()} />
          </div>
          <AssignmentTable
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

  renderChat () {
    const {cl} = this.state
    return (
      <div className='class-card'>
        <Chat
          cl={cl}
        />
      </div>
    )
  }

  /*
  * Render the document tabs for the user to tab between documents.
  */
  renderDocumentTabs () {
    const {currentDocumentIndex, documents} = this.state
    return (
      <FileTabs currentIndex={currentDocumentIndex}>
        {
          documents.map((document, index) => {
            return (
              <FileTab
                key={index}
                name={document.name}
                removable={false}
                changed={false}
                onClick={() =>
                  this.setState({currentDocument: document.path, currentDocumentIndex: index})
                }
              />
            )
          })
        }
      </FileTabs>
    )
  }

  renderSyllabus () {
    const {currentDocument} = this.state
    return (
      <div id='cn-class-docs'>
        <div id='cn-doc-container'>
          <div id='cn-doc-title'>
            Documents
            <i className='fa fa-eye cn-blue cursor' onClick={() => this.toggleDocs()} />
          </div>
          {this.renderDocumentTabs()}
          <div id='cn-doc-content'>
            {currentDocument && <FileViewer source={currentDocument} /> }
          </div>
        </div>
      </div>
    )
  }

  renderClass () {
    const {documents, hideDocuments, openStudentRequestInfo} = this.state
    return (
      <div id='cn-class-admin-container'>
        <div id='cn-class-admin'>
          {this.renderClassDetais()}
          {this.renderGradeScale()}
          {this.renderProfessor()}
          {this.renderStudents()}
          {this.renderWeights()}
          {this.renderAssignments()}
          {this.renderChat()}
        </div>
        {((documents.length !== 0 && !hideDocuments) || openStudentRequestInfo) && <div id='cn-half-panel'>
          {openStudentRequestInfo && this.renderStudentRequestInfo()}
          {documents.length !== 0 && !hideDocuments && this.renderSyllabus()}
        </div>}
        {this.renderIssuesModal()}
        {this.renderHelpResolvedModal()}
        {this.renderRequestResolvedModal()}
        {this.renderEditClassModal()}
        {this.renderWeightCreateModal()}
        {this.renderAssignmentModal()}
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
