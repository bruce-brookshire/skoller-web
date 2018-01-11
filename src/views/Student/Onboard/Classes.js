import React from 'react'
import PropTypes from 'prop-types'
import AddClass from '../../components/AddClass'
import CreateClass from '../../components/CreateClass'
import Grid from '../../../components/Grid/index'
import Loading from '../../../components/Loading'
import Modal from '../../../components/Modal/index'

import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'

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
    field: 'campus',
    display: 'Campus'
  }
]


class Classes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      openAddModal: false,
      openCreateModal: false
    }
  }

  /*
  * Fetch the classes for a user.
  */
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
      <div className='cn-body margin-top'>
        <div className='cn-table-grid-container'>
          <Grid
            className='striped'
            headers={headers}
            rows={this.getRows()}
            canDelete={false}
            disabled={true}
            emptyMessage='You are not enrolled in any classes.'
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
    const {id, number, name, meet_start_time, meet_days, campus, professor} = item

    const row = {
      id: id || '',
      delete: <div style={{marginLeft: '5px'}} className='button-delete-x center-content' onClick={() => { this.onDeleteClass(item) }}><i className='fa fa-times' /></div>,
      courseNumber: number || '-',
      name: name || '-',
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time ? mapTimeToDisplay(meet_start_time) : 'TBA',
      campus: campus || ''
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

  /*
  * On next.
  */
  onNext () {
    this.props.onNext()
  }

  render () {
    const disableButton = this.state.classes.length === 0
    const disableClass = disableButton ? 'disabled' : ''

    return (
      <div className='cn-my-classes-container cn-container'>
        <div className='cn-header'>
          <h2>Classes</h2>
          <span>Join your classmates for this semester.</span>
        </div>

        {this.renderContent()}


        <div className='cn-footer margin-bottom'>
          <div style={{position: 'relative'}}>
            <button
              className={`button full-width margin-top ${disableClass}`}
              onClick={this.onNext.bind(this)}
              disabled={disableButton}
            >Blam-o</button>
          </div>
        </div>

        {/*userStore.loading ? <Loading /> : this.renderContent()*/}

        {this.renderAddClassModal()}
        {this.renderCreateClassModal()}
      </div>
    )
  }
}

Classes.propTypes = {
  onNext: PropTypes.func.isRequired
}

export default Classes
