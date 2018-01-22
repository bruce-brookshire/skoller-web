import React from 'react'
import AddClass from '../../components/AddClass'
import CreateClass from '../../components/CreateClass'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal/index'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'

class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      openAddModal: false,
      openCreateModal: false
    }
  }

  componentWillMount () {
    this.updateClasses()
  }

  updateClasses() {
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
    }).catch(() => false)
  }

  updateClass(cl) {
    actions.classes.getClassById(cl.id).then(cl => {
  		const index = this.state.classes.findIndex(c => c.id === cl.id)
  		const newClasses = this.state.classes
  		newClasses[index] = cl
  		this.setState({classes: newClasses})
  	}).catch(() => false)
  }

  numberOfClassesNeedingSyllabus(){
    return this.state.classes.filter((item, index) => {
      return item.status.name == 'Needs Syllabus'
    }).length
  }

  renderNeedsSyllabusInfo(){
    let num = this.numberOfClassesNeedingSyllabus()
    if(num > 0){
      return(
        <div className='needs-syllabus-info margin-bottom center-text cn-red'>
          {`Skoller needs a syllabus for ${num} of your classes.`}
        </div>
      )
    }else{
      return null
    }
  }

  /*
  * Renders the class table for the user
  *
  * @return [Array]. Array of formatted row data.
  */
  renderContent () {
    return (
      <div>
        <div className='cn-table-grid-container'>
          <ClassList
            classes={this.state.classes}
            onDelete={() => this.onDeleteClass.bind(this)}
            deleteMessage={'Are you sure you want to drop this class?'}
            emptyMessage='You are not enrolled in any classes.'
            onUpdate={(cl) => this.updateClass(cl)}
          />
          <button className='button-invert full-width add-button' onClick={() => this.toggleAddModal()}>
            Add a Class
          </button>
        </div>
      </div>
    )
  }
  
  /*
  * Toggle the add class modal.
  *
  * @return null.
  */
  toggleAddModal () {
    this.setState({openAddModal: !this.state.openAddModal})
  }

  /*
  * Toggle the create class modal.
  *
  * @return null.
  */
  toggleCreateModal () {
    this.setState({openCreateModal: !this.state.openCreateModal})
  }

  /*
  * Method for adding a class. Can only add one class at a time.
  *
  * @param [Event] event. Onclick event.
  * @param [Object] cl. Class user would like to add.
  * @return [Object] null.
  */
  onAddClass (cl) {
    actions.classes.enrollInClass(cl.id).then((c) => {
      const newClasses = this.state.classes
      newClasses.push(c)
      this.setState({classes: newClasses, openAddModal: false, openCreateModal: false})
    }).catch(() => false)
  }

  /*
  * Method for deleting a class.
  *
  * @param [Object] cl. Class user is in.
  * @return [Object] null.
  */
  onDeleteClass (cl) {
    actions.classes.dropClass(cl.id).then(() => {
      const newClasses = this.state.classes.filter(cc => cc.id !== cl.id)
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  /*
  * Render the add class modal.
  */
  renderAddClassModal () {
    return (
      <Modal
        open={this.state.openAddModal}
        onClose={this.toggleAddModal.bind(this)}
      >
        <AddClass
          classes={this.state.classes}
          onSubmit={this.onAddClass.bind(this)}
          onCreateClass={this.toggleCreateModal.bind(this)}
          onClose={this.toggleAddModal.bind(this)}
        />
      </Modal>
    )
  }

  /*
  * Render the create class modal.
  */
  renderCreateClassModal () {
    return (
      <Modal
        open={this.state.openCreateModal}
        onClose={this.toggleCreateModal.bind(this)}
      >
        <CreateClass onSubmit={this.onAddClass.bind(this)} onClose={this.toggleCreateModal.bind(this)}/>
      </Modal>
    )
  }

  render () {
    return (
      <div className= 'cn-my-classes-container'>
        <div className='cn-my-classes-header margin-bottom'>
          <div className='left'>
            <h2>My classes</h2><br/>
            <span>From this page, you can enroll in your classes, upload syllabi, and check other class details.</span>
          </div>

          <div className='right'>
            <h4><a onClick={() => this.toggleAddModal()}>Add Class</a></h4>
          </div>
        </div>

        {this.renderNeedsSyllabusInfo()}

        {this.renderContent()}
        {this.renderAddClassModal()}
        {this.renderCreateClassModal()}
      </div>
    )
  }
}

export default MyClasses
