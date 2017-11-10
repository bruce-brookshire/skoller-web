import React from 'react'
import {Form, ValidateForm} from 'react-form-library'
import ProfessorTable from './ProfessorTable'
import SearchProfessor from './SearchProfessor'
import ProfessorForm from './ProfessorForm'

const professor = null

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
      showForm: !professor,
      professor: {},
      form: this.initializeFormData()
    }
  }

  /*
  * Method for intializing form data.
  * Professor form data.
  *
  * @param [Object] data. initial data
  * @return [Object]. Form object.
  */
  initializeFormData (data) {
    let formData = data || {}
    const {id, first_name, last_name, email, phone, office, availability} = formData

    return ({
      id: id || '',
      first_name: first_name || '',
      last_name: last_name || '',
      email: email || '',
      phone: phone || '',
      office: office || '',
      availability: availability || ''
    })
  }

  /*
  * Render search component or new professor component.
  *
  * @return [Component].
  */
  renderContent () {
    if (professor) {
      return <ProfessorTable professors={professor} onEdit={this.editProfessor.bind(this)} onDelete={this.deleteProfessor.bind(this)} />
    } else {
      return this.state.showForm ? <ProfessorForm form={this.state.form} formErrors={this.props.formErrors} updateProperty={this.props.updateProperty}/> : <SearchProfessor setProfessor={this.setProfessor.bind(this)} editProfessor={this.editProfessor.bind(this)} />
    }
  }

  /*
  * If professor has not been set, render new  professor buttons
  *
  * @return [Component] button. Button interface to render new professor form.
  */
  renderNewProfessorButton () {
    // if (!this.state.showForm && !this.state.professor.id && !syllabusFormStore.syllabusForm.professorSubmitted) {
    //   return <button className="margin-top align-right" onClick={() => { this.addNewProfessor() }}> New Professor </button>
    // }
  }

  /*
  * Toggle new professor state. Controls whether new professor form is displayed or not.
  *
  */
  addNewProfessor () {
    this.setState({showForm: !this.state.showForm})
  }

  /*
  * Set the professor from search results so that it can be saved.
  *
  * @param [Event] event. OnClick event handler from checkbox.
  * @param [Object] professor. Professor to be saved.
  */
  setProfessor (event, professor) {
    // if professor has already been selected, prevent user from selecting another.
    if (this.state.professor.objectId && this.state.professor.objectId !== professor.objectId) {
      event.preventDefault()
    } else {
      // if professor exists, deselct professor. Else set the professor in state.
      this.state.professor.objectId ? this.setState({professor: {}}) : this.setState({professor})
    }
  }

  /*
  * Set form value equal to professor in order to be updated.
  *
  * @param [Object] professor. Professor object to be edited.
  */
  editProfessor (professor) {
    this.setState({form: this.initializeFormData(professor), showForm: true})
  }

  /*
  * Submit the professor. If existing professor, set. Otherwise, submit.
  *
  * @param [Boolean] nextSyllabus. Determine if the user wants to go to the
  * next Syllabus or continue working the same one.
  */
  submitProfessor (nextSyllabus) {
    // if (!this.state.showForm) {
    //   setExistingProfessor(this.state.professor, nextSyllabus)
    // } else {
    //   const method = (this.state.form.id || this.state.form.objectId) ? 'PUT' : 'POST'
    //   submitProfessor(method, this.state.form, nextSyllabus)
    //   this.setState({showForm: false})
    // }
    //
    // this.setState(this.initializeState())
  }

  /*
  * Delete the professor.
  *
  * @param [Object] professor. Grid row object.
  */
  deleteProfessor (professor) {
    // deleteProfessor(professor.id)
  }

  render () {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default ValidateForm(Form(Professor, 'form'))
