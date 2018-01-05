import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AddProfessor from './AddProfessor'
import ClassForm from './ClassForm'
import SearchProfessor from './SearchProfessor'
import actions from '../../../actions'

const ContentEnum = {
  SEARCH_PROFESSOR: 0,
  ADD_PROFESSOR: 1,
  CLASS_FORM: 2
}

@inject ('rootStore') @observer
class CreateClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      form: {}
    }
  }

  renderContent () {
    const {userStore: {user: {student: {school}}}} = this.props.rootStore
    switch (this.state.step) {
      case ContentEnum.SEARCH_PROFESSOR:
        return <SearchProfessor onAddProfessor={this.onAddProfessor.bind(this)} onProfessorSelect={this.onSubmitProfessor.bind(this)} />
      case ContentEnum.ADD_PROFESSOR:
        return <AddProfessor onSubmit={this.onSubmitProfessor.bind(this)} school={school}/>
      case ContentEnum.CLASS_FORM:
        return <ClassForm professor={this.state.form.professor} onSubmit={this.onSubmitClass.bind(this)} school={school}/>
      default:
    }
  }

  onAddProfessor () {
    this.setState({step: ContentEnum.ADD_PROFESSOR})
  }

  onSubmitProfessor (professor) {
    const newForm = {...this.state.form, professor: professor}
    this.setState({form: newForm, step: ContentEnum.CLASS_FORM})
  }

  onSubmitClass (cl) {
    this.props.onSubmit(cl)
  }

  render () {
    return (
      <div className='cn-create-class-container'>
        <div>
          <a onClick={() => this.props.onClose()} className='back'>Back to class search</a>
          <h4 className='cn-modal-header'>Create a new class</h4>
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

CreateClass.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default CreateClass
