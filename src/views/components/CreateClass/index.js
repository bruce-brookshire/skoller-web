import React from 'react'
import AddProfessor from './AddProfessor'
import ClassForm from './ClassForm'
import SearchProfessor from './SearchProfessor'

const ContentEnum = {
  SEARCH_PROFESSOR: 0,
  ADD_PROFESSOR: 1,
  CLASS_FORM: 2
}

class CreateClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0,
      form: {}
    }
  }

  renderContent () {
    switch (this.state.step) {
      case ContentEnum.SEARCH_PROFESSOR:
        return <SearchProfessor onAddProfessor={this.onAddProfessor.bind(this)} />
      case ContentEnum.ADD_PROFESSOR:
        return <AddProfessor onSubmit={this.onSubmitProfessor.bind(this)}/>
      case ContentEnum.CLASS_FORM:
        return <ClassForm professor={this.state.form.professor} />
      default:
    }
  }

  onAddProfessor () {
    this.setState({step: ContentEnum.ADD_PROFESSOR})
  }

  onSubmitProfessor (form) {
    const newForm = {...this.state.form, professor: form}
    this.setState({form: newForm, step: ContentEnum.CLASS_FORM})
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

export default CreateClass
