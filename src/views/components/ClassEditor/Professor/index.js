import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import SearchProfessor from './SearchProfessor'
import ProfessorForm from './ProfessorForm'
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
      step: this.props.cl.professor ? ContentEnum.PROFESSOR_INFO : ContentEnum.SEARCH_PROFESSOR
    }
  }

  /*
  * Render content.
  *
  * @return [Component].
  */
  renderContent () {
    switch (this.state.step) {
      case ContentEnum.SEARCH_PROFESSOR:
        return <SearchProfessor onAddProfessor={this.onAddProfessor.bind(this)} onProfessorSelect={this.onProfessorSelect.bind(this)} />
      case ContentEnum.PROFESSOR_INFO:
        return <ProfessorInfo professor={this.props.cl.professor} onEditProfessor={this.onEditProfessor.bind(this)} onRemoveProfessor={this.onRemoveProfessor.bind(this)} />
      case ContentEnum.PROFESSOR_FORM:
        return <ProfessorForm cl={this.props.cl} onSubmit={this.onSubmitProfessor.bind(this)}/>
      default:
    }
  }

  /*
  * If professor doesn't exist in search results, create professor.
  */
  onAddProfessor () {
    this.setState({step: ContentEnum.PROFESSOR_FORM})
  }

  /*
  * If user wants to edit professor info, edit professor.
  */
  onEditProfessor () {
    this.setState({step: ContentEnum.PROFESSOR_FORM})
  }

  /*
  * Remove the professor from the class.
  */
  onRemoveProfessor () {
    this.onRemoveProfessorFromClass()
  }
  /*
  * On professor select from professor search
  *
  * @param [Object] professor. Professor object.
  */
  onProfessorSelect (professor) {
    this.onAttachProfessorToClass(professor)
  }

  /*
  * Professor submit call back
  *
  * @param [Object] professor. Professor object.
  */
  onSubmitProfessor (professor) {
    this.onAttachProfessorToClass(professor)
  }

  /* Attach professor to the class.
  *
  * @param [Object] professor. Professor object.
  */
  onAttachProfessorToClass (professor) {
    actions.professors.attachProfessorToClass(this.props.cl, professor).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
    }).catch(() => false)
  }

  /*
  * Remove professor from the class.
  */
  onRemoveProfessorFromClass () {
    actions.professors.removeProfessorFromClass(this.props.cl).then((cl) => {
      if (this.props.onSubmit) this.props.onSubmit(cl)
    }).catch(() => false)
  }

  render () {
    const {cl} = this.props
    return (
      <div>
        <h2>Professor info for {cl.name}</h2>
        {this.renderContent()}
      </div>
    )
  }
}

Professor.propTypes = {
  cl: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
}

export default ValidateForm(Form(Professor, 'form'))
