import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import SearchProfessor from './SearchProfessor'
import actions from '../../../../actions'
import ProfessorModal from './ProfessorModal'
import Modal from '../../../../components/Modal'

class Professor extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      isEditable: false,
      openModal: false
    }
  }

  /* Attach professor to the class.
  *
  * @param [Object] professor. Professor object.
  */
  onAttachProfessorToClass (professor) {
    actions.professors.attachProfessorToClass(this.props.cl, professor).then((cl) => {
      this.onSubmit(cl)
    }).catch(() => false)
  }

  onSubmit (cl) {
    this.setState({isEditable: false})
    if (this.props.onSubmit) this.props.onSubmit(cl)
  }

  onCreateProfessor (professor) {
    this.toggleProfessorModal()
  }

  /*
  * Remove professor from the class.
  */
  removeProfessorFromClass () {
    actions.professors.removeProfessorFromClass(this.props.cl).then((cl) => {
      this.onSubmit(cl)
    }).catch(() => false)
  }

  toggleProfessorModal () {
    this.setState({openModal: !this.state.openModal})
  }

  renderNoProfessor () {
    return (
      <div className='margin-top'>
        No professor found for this class.
      </div>
    )
  }

  renderProfessor () {
    const {professor: {name_first, name_last, phone, email, office_location, office_availability}} = this.props.cl

    return (
      <div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Name
            </div>
            <strong>{name_first ? `${name_first} ` : ''}{name_last || ''}</strong>
          </div>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Phone
            </div>
            {phone || 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Email
            </div>
            {email || 'N/A'}
          </div>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Location
            </div>
            {office_location || 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Hours
            </div>
            {office_availability || 'N/A'}
          </div>
        </div>
      </div>
    )
  }

  renderProfessorInfo () {
    const {professor} = this.props.cl

    return (
      <div>
        {!professor ? this.renderNoProfessor() : this.renderProfessor()}
      </div>
    )
  }

  renderProfessorControls () {
    const {cl} = this.props

    return (
      <div className='margin-top'>
        {!cl.professor &&
          <SearchProfessor
            schoolId={cl.school.id}
            isUniversity={cl.school.is_university}
            onProfessorCreate={this.onCreateProfessor.bind(this)}
            onProfessorSelect={this.onAttachProfessorToClass.bind(this)}
          />
        }
      </div>
    )
  }
  renderOptions () {
    return (
      <div className='margin-top'>
        <a
          onClick={() => this.setState({isEditable: false})}
        >&lt; Back</a>
      </div>
    )
  }

  renderProfessorModal () {
    const {cl} = this.props
    return (
      <Modal
        open={this.state.openModal}
        onClose={this.toggleProfessorModal.bind(this)}
      >
        <ProfessorModal
          schoolId={cl.school.id}
          isUniversity={cl.school.is_university}
          onClose={this.toggleProfessorModal.bind(this)}
          onSubmit={this.onAttachProfessorToClass.bind(this)}
          professor={cl.professor}
        />
      </Modal>
    )
  }

  render () {
    const {canEdit, cl} = this.props
    const {isEditable} = this.state

    return (
      <div id='class-editor-professor'>
        <div id='class-editor-professor-content'>
          <div id='professor-title'>
            Professor
            <div>
              {canEdit && <i className='fa fa-pencil cn-blue cursor' onClick={() => !cl.professor ? this.setState({isEditable: true}) : this.toggleProfessorModal()} />}
              {canEdit && cl.professor && <i className='fa fa-trash cn-red cursor margin-left' onClick={() => this.removeProfessorFromClass()} />}
            </div>
          </div>
          {!isEditable && this.renderProfessorInfo()}
          {isEditable && this.renderProfessorControls()}
          {isEditable && this.renderOptions()}
        </div>
        {this.renderProfessorModal()}
      </div>
    )
  }
}

Professor.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  canEdit: PropTypes.bool
}

export default ValidateForm(Form(Professor, 'form'))
