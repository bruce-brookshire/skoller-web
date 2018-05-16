import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import SearchProfessor from './SearchProfessor'
import ProfessorInfo from './ProfessorInfo'
import actions from '../../../../actions'

const ContentEnum = {
  SEARCH_PROFESSOR: 0,
  PROFESSOR_INFO: 1,
  PROFESSOR_FORM: 2
}

class Professor extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * If professor changes, update step accordingly.
  */
  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(this.props.cl.professor) !== JSON.stringify(nextProps.cl.professor)) {
      this.setState({step: nextProps.cl.professor ? ContentEnum.PROFESSOR_INFO : ContentEnum.SEARCH_PROFESSOR})
    }
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      step: this.props.cl.professor ? ContentEnum.PROFESSOR_INFO : ContentEnum.SEARCH_PROFESSOR,
      isEditable: false
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

  /*
  * Remove professor from the class.
  */
  removeProfessorFromClass () {
    actions.professors.removeProfessorFromClass(this.props.cl).then((cl) => {
      this.onSubmit(cl)
    }).catch(() => false)
  }

  renderNoProfessor () {
    return (
      <div className='margin-top'>
        No professor found for this class.
      </div>
    )
  }

  renderEditToggle () {
    return (
      <button
        className='button full-width margin-top'
        onClick={() => this.setState({isEditable: true})}
      >
        Edit Professor
      </button>
    )
  }

  renderProfessor () {
    return (
      <ProfessorInfo
        professor={this.props.cl.professor}
        onEditProfessor={this.onEditProfessor.bind(this)}
        onRemoveProfessor={this.onRemoveProfessor.bind(this)}
      />
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
            onProfessorCreate={this.onAddProfessor.bind(this)}
            onProfessorSelect={this.onProfessorSelect.bind(this)}
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

  render () {
    const {canEdit, cl} = this.props
    const {isEditable} = this.state

    return (
      <div id='class-editor-professor'>
        <div id='class-editor-professor-content'>
          <div id='professor-title'>
            Professor
            <div>
              <i className='fa fa-pencil cn-blue cursor' onClick={() => this.setState({isEditable: true})} />
              {cl.professor && <i className='fa fa-trash cn-red cursor margin-left' onClick={() => this.removeProfessorFromClass()} />}
            </div>
          </div>
          {!isEditable && this.renderProfessorInfo()}
          {isEditable && this.renderProfessorControls()}
          {canEdit && !isEditable && this.renderEditToggle()}
          {isEditable && this.renderOptions()}
        </div>
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
