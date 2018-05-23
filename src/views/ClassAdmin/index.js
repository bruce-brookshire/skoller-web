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
      currentWeight: null
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
      this.setState({cl, weights: cl.weights})
      this.setState({loadingClass: false})
    }).catch(() => { this.setState({loadingClass: false}) })
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
    this.setState({weights: newWeights, currentWeight: null})
    this.toggleWeightCreateModal()
  }

  /*
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  onSelectWeight (weight) {
    this.setState({currentWeight: weight})
    this.toggleWeightCreateModal()
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
    this.setState({weights: newWeights, currentWeight: null})
    this.toggleWeightCreateModal()
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
    this.setState({cl})
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
          onClose={this.toggleEditClassModal.bind(this)}
          onSubmit={this.updateClass.bind(this)}
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
        onClose={this.toggleWeightCreateModal.bind(this)}
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

  renderClassDetais () {
    const {cl} = this.state
    return (
      <div id='cn-class-details'>
        <ClassCard
          cl={cl}
          schoolName={cl.school.name}
          semesterName={cl.class_period.name}
          onEdit={this.toggleEditClassModal.bind(this)}
          isAdmin={true}
          toggleWrench={this.toggleWrench.bind(this)}
          toggleChat={this.toggleChat.bind(this)}
        />
      </div>
    )
  }

  renderGradeScale () {
    const {cl} = this.state
    return (
      <GradeScale
        cl={cl}
        canEdit={true}
        onSubmit={(cl) => this.updateClass(cl)}
      />
    )
  }

  renderProfessor () {
    const {cl} = this.state
    return (
      <Professor
        cl={cl}
        canEdit={true}
        onSubmit={(cl) => this.updateClass(cl)}
      />
    )
  }

  renderStudents () {
    const {cl} = this.state
    return (
      <StudentList
        students={cl.students}
      />
    )
  }

  renderWeights () {
    const {cl, isWeightsEditable, weights, currentWeight} = this.state
    return (
      <div id='cn-admin-weight-table'>
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

  }

  renderChat () {

  }

  renderSyllabus () {

  }

  renderClass () {
    return (
      <div id='cn-class-admin'>
        {this.renderClassDetais()}
        {this.renderGradeScale()}
        {this.renderProfessor()}
        {this.renderStudents()}
        {this.renderWeights()}
        {this.renderAssignments()}
        {this.renderChat()}
        {this.renderSyllabus()}
        {this.renderIssuesModal()}
        {this.renderHelpResolvedModal()}
        {this.renderRequestResolvedModal()}
        {this.renderEditClassModal()}
        {this.renderWeightCreateModal()}
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
