import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import SearchProfessor from '../../components/SearchProfessor'
import actions from '../../../actions'
import ProfessorForm from '../../components/ProfessorForm'
import Modal from '../../../components/Modal'
import Card from '../../../components/Card'

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
    const {professor: {name_first: first, name_last: last, phone, email, office_location: officeLocation, office_availability: availability}} = this.props.cl

    return (
      <div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Name
            </div>
            <strong>{first ? `${first} ` : ''}{last || ''}</strong>
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
            {officeLocation || 'N/A'}
          </div>
        </div>
        <div className='professor-detail-row'>
          <div className='professor-detail-field'>
            <div className='professor-detail-label'>
              Hours
            </div>
            {availability || 'N/A'}
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
        <ProfessorForm
          schoolId={cl.school.id}
          isUniversity={cl.school.is_university}
          onClose={this.toggleProfessorModal.bind(this)}
          onSubmit={this.onAttachProfessorToClass.bind(this)}
          professor={cl.professor}
        />
      </Modal>
    )
  }

  renderContent () {
    const {isEditable} = this.state

    return (
      <div id='class-editor-professor-content'>
        {!isEditable && this.renderProfessorInfo()}
        {isEditable && this.renderProfessorControls()}
        {isEditable && this.renderOptions()}
      </div>
    )
  }

  renderTitle () {
    const {canEdit, cl, hasIssues} = this.props

    return (
      <div className='cn-icon-flex'>
        Professor
        <div>
          {canEdit && <i className='fa fa-pencil cn-blue cursor' onClick={() => !cl.professor ? this.setState({isEditable: true}) : this.toggleProfessorModal()} />}
          {canEdit && cl.professor && <i className='fa fa-trash cn-red cursor margin-left' onClick={() => this.removeProfessorFromClass()} />}
          {hasIssues && <i className='fa fa-warning cn-red cursor margin-left' onClick={() => this.props.onSelectIssue()} />}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div id='class-editor-professor'>
        <Card
          title={this.renderTitle()}
          content={this.renderContent()}
        />
        {this.renderProfessorModal()}
      </div>
    )
  }
}

Professor.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  canEdit: PropTypes.bool,
  hasIssues: PropTypes.bool,
  onSelectIssue: PropTypes.func
}

export default ValidateForm(Form(Professor, 'form'))
