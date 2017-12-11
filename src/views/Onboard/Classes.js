import React from 'react'
import AddClass from '../components/AddClass'
import CreateClass from '../components/CreateClass'
import Grid from '../../components/Grid/index'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal/index'

import actions from '../../actions'
import {mapProfessor} from '../../utilities/display'

const headers = [
  {
    field: 'delete',
    display: ''
  },
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
  }
]


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
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
    }).catch(() => false)
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
            canDelete={false}
            disabled={true}
          />
          <button className='button-invert full-width add-button' onClick={() => this.toggleAddModal()}>
            Add a Class
          </button>
        </div>
      </div>
    )
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.classes.map((item, index) =>
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
    const {id, number, name, meet_start_time, meet_days, length, professor} = item

    const row = {
      id: id || '',
      delete: <div style={{marginLeft: '5px'}} className='button-delete-x center-content' onClick={() => { this.onDeleteClass(item) }}><i className='fa fa-times' /></div>,
      courseNumber: number || '-',
      name: name || '-',
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time || 'TBA',
      classLength: length || 'TBA'
    }

    return row
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

  renderAddClassModal () {
    return (
      <Modal
        open={this.state.openAddModal}
        onClose={this.toggleAddModal.bind(this)}
      >
        <AddClass onSubmit={this.onAddClass.bind(this)} onCreateClass={this.toggleCreateModal.bind(this)} onClose={this.toggleAddModal.bind(this)}/>
      </Modal>
    )
  }

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
        <div className='margin-bottom'>
          <h2>Classes</h2>
          <span>Enroll in your classes for this semester.</span>
        </div>

        {this.renderContent()}

        {/*userStore.loading ? <Loading /> : this.renderContent()*/}

        {this.renderAddClassModal()}
        {this.renderCreateClassModal()}
      </div>
    )
  }
}

export default MyClasses
