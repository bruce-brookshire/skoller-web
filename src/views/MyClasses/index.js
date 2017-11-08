import React from 'react'
import Loading from '../../components/Loading'
import Grid from '../../components/Grid/index'
import Modal from '../../components/Modal/index'
// import AddClass from '../AddClass/index'
import UploadDocuments from './UploadDocuments'
// import userStore from '../../stores/user_store'
// import classStore from '../../stores/class_store'
// import {toJS} from 'mobx'
// import {observer} from 'mobx-react'
// import {logoutUser} from '../../actions/auth'
// import {addClass, deleteClass} from '../../actions/classes'
// import {convertTimeTo12HourClock} from '../../utilities/time'

const headers = [
  {
    field: 'courseNumber',
    display: 'Class Number'
  },
  {
    field: 'name',
    display: 'Class Name'
  },
  {
    field: 'professor',
    display: 'Professor'
  },
  {
    field: 'days',
    display: 'Days'
  },
  {
    field: 'beginTime',
    display: 'Start Time'
  },
  {
    field: 'classLength',
    display: 'Term Length'
  },
  {
    field: 'status',
    display: 'Syllabus Status'
  }
]

const currentClasses = [
  {
    id: 0,
    courseNumber: 'CLA 3323',
    name: 'Intro to Classes',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'COMPLETED'
  },
  {
    id: 1,
    courseNumber: 'ECO 1280',
    name: 'Microeconomics',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'IN_PROGRESS'
  },
  {
    id: 2,
    courseNumber: 'AST 3000',
    name: 'Astronomy',
    professor: 'Dursley',
    days: 'MWF',
    beginTime: '11:00am',
    classLength: 'Full semester',
    status: 'NEEDS_SYLLABUS'
  }
]

class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openAddModal: false
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
          <Grid
            className='striped'
            headers={headers}
            rows={this.getRows()}
            canDelete={true}
            onDelete={this.onDeleteClass.bind(this)}
            deleteMessage={'Are you sure you want to drop this class?'}
          />
          <button className='button-full-width' onClick={() => this.toggleAddModal()}>
            Add a Class
          </button>
        </div>
        {/*this.renderIncompleteMessage()*/}
      </div>
    )
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return currentClasses.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const { id, courseNumber, name, professor, professorInfo, days, beginTime, classLength, status } = item

    const row = {
      id: id || '',
      courseNumber: courseNumber || '-',
      name: name || '-',
      // professor: professor || professorInfo ? this.mapProfessor(professor || professorInfo) : 'TBA',
      professor: professor || 'TBA',
      days: days || 'TBA',
      // beginTime: beginTime ? convertTimeTo12HourClock(beginTime) : 'TBA',
      beginTime: beginTime || 'TBA',
      classLength: classLength || 'TBA',
      status: status ? this.mapStatus(status) : '-',
      component: <UploadDocuments cl={item} />
    }

    return row
  }

  /*
  * Map the professors name to the professor.
  *
  * @param [Object] professor. Professor object.
  * @param [String] name. Name of professor.
  */
  mapProfessor (professor) {
    const {firstName, lastName} = professor
    let name = ''

    if (firstName) {
      name = firstName
    }
    if (lastName) {
      name = name ? `${name} ${lastName}` : lastName
    }

    return name || 'TBA'
  }

  /*
  * Map the class status to ui
  *
  * @param [String] status. Class status.
  */
  mapStatus (status) {
    switch (status) {
      case 'NO_FILES':
        return <span style={{color: '#FF0000'}}> UPLOAD SYLLABUS </span>
      case 'NEEDS_SYLLABUS':
        return <span style={{color: '#FF0000'}}> UPLOAD SYLLABUS </span>
      case 'IN_PROGRESS':
        return <span style={{color: 'darkgrey'}} >RECEIVED</span>
      case 'HAS_ISSUE':
        return <span style={{color: 'darkgrey'}} >RECEIVED</span>
      case 'COMPLETED':
        return <span style={{color: '#00C000'}} >COMPLETED</span>
      default:
    }
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
  * Method for adding a class. Can only add one class at a time.
  *
  * @param [Event] event. Onclick event.
  * @param [Object] cl. Class user would like to add.
  * @return [Object] null.
  */
  onAddClass (event, cl) {
    // addClass(cl.id)
    this.toggleAddModal()
  }

  /*
  * Method for deleting a class.
  *
  * @param [Object] cl. Class user is in.
  * @return [Object] null.
  */
  onDeleteClass (cl) {
    // deleteClass(cl.id)
  }

  /*
  * Method for toggling the state of this is done modal.
  *
  * @return null.
  */
  toggleIsDoneModal () {
    this.setState({openIsDoneModal: !this.state.openIsDoneModal})
  }

  /*
  * Render complete modal buttons.
  *
  * @return [Component]. Option buttons for user when they finish.
  */
  renderIsDondeModalButtons () {
    return (
      <div className='modal-buttons-container'>
        <div className='modal-buttons'>
          <button className='close button-box-shadow margin-top' onClick={() => this.toggleIsDoneModal()}>Close</button>
          <button className='margin-top' onClick={() =>  false /*logoutUser()*/}>Logout</button>
        </div>
      </div>
    )
  }

  /*
  * Render complete message in 'done' modal. If the user has classes in progress, let them know
  * they will be texted.
  *
  * @retuns [Component]. Done message.
  */
  renderCompleteMessage () {
    const classesInProgress = currentClasses.findIndex(cl => cl.status !== 'COMPLETED')
    const inProgessMessage = classesInProgress ? 'We will send you a text shortly when all your classes are ready.' : ''

    return (
      <div className='cn-content-message full-size margin-top margin-bottom'>
        <i className='fa fa-check-circle' style={{fontSize: '1em', color: '#00FF00'}} />
        <span className='margin-left'>{`Congratulations! You and your classmates have done all you can do. ${inProgessMessage} Be sure to download our iOS app today, if you have not already, to recieve the full ClassNav experience and enjoy college like you never have before! `}</span>
      </div>
    )
  }

  /*
  * Render incomplete meesage to user
  *
  *
  * @param [Boolean] forModal. Boolean value indicating if the message is to be
  * displayed in the complte modal.
  * @return [Component]. Message info.
  */

  renderIncompleteMessage (forModal) {
    if (!this.checkIfClassesCompleted()) {
      const needed = currentClasses.filter(cl => cl.status === 'NO_FILES' || cl.status === 'NEEDS_SYLLABUS' || !cl.status)
      const fullSizeClass = forModal ? 'full-size' : ''

      return (
        <div className={`cn-content-message ${fullSizeClass} margin-top margin-bottom`}>
          <i className='fa fa-exclamation-triangle' style={{fontSize: '1em', color: 'red'}} />
          <span className='margin-left'>{`We still need a syllabus for (${needed.length}) of your classes.`}</span>
        </div>
      )
    }
  }

  /*
  * Returns whether all classes have syllabi.
  *
  * @return [Boolean]. Boolean value indicating whether all classes have syllabi.
  */
  checkIfClassesCompleted () {
    const needed = currentClasses.filter(cl => cl.status === 'NO_FILES' || cl.status === 'NEEDS_SYLLABUS' || !cl.status)
    return needed.length === 0
  }

  render () {
    return (
      <div className= 'cn-my-classes-container'>
        <div className='cn-my-classes-header margin-bottom'>
          <h2 className='left'>Classes</h2>
          <div className='right'>
            <h4>My classes</h4>
            <h4><a onClick={() => this.toggleAddModal()}>Add Class</a></h4>
          </div>
        </div>

        {this.renderContent()}

        {/*userStore.loading ? <Loading /> : this.renderContent()*/}

        <Modal
          title='Add a Class'
          open={this.state.openAddModal}
          footer={<button className='close button-box-shadow margin-top' onClick={() => this.toggleAddModal()}>Close</button>}
        >
          { /* <AddClass onSubmit={this.addClass.bind(this)}/> */ }
        </Modal>

        <Modal
          title={this.checkIfClassesCompleted() ? 'Nice work!' : 'Are you sure?'}
          open={this.state.openIsDoneModal}
          footer={this.renderIsDondeModalButtons()}
        >
          {this.checkIfClassesCompleted() ? this.renderCompleteMessage() : this.renderIncompleteMessage(true)}
        </Modal>
      </div>
    )
  }
}

export default MyClasses
